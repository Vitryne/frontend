import { getToken } from "@/lib/auth-storage";
import type { OrderResponseDTO } from "@/interfaces/orders-interface";
import { useEffect, useRef } from "react";

export type OrdersStreamEvent = {
  type: "order_created" | "order_updated";
  order: OrderResponseDTO;
};

type Handlers = {
  onEvent: (event: OrdersStreamEvent) => void;
  onReconnect?: () => void;
};

const MIN_RETRY_MS = 1_000;
const MAX_RETRY_MS = 15_000;
const FATAL_STATUS = [401, 403, 404];

const parseBlock = (block: string): { event: string; data: string } | null => {
  let event = "message";
  const data: string[] = [];

  for (const line of block.split(/\r?\n/)) {
    if (!line || line.startsWith(":")) continue;
    const separator = line.indexOf(":");
    const field = separator === -1 ? line : line.slice(0, separator);
    const value =
      separator === -1 ? "" : line.slice(separator + 1).replace(/^ /, "");

    if (field === "event") event = value;
    if (field === "data") data.push(value);
  }

  return data.length > 0 ? { event, data: data.join("\n") } : null;
};

export const useOrdersStream = ({ onEvent, onReconnect }: Handlers) => {
  const handlers = useRef<Handlers>({ onEvent, onReconnect });

  useEffect(() => {
    handlers.current = { onEvent, onReconnect };
  });

  useEffect(() => {
    const controller = new AbortController();
    let retryDelay = MIN_RETRY_MS;
    let hasConnected = false;

    const connect = async () => {
      while (!controller.signal.aborted) {
        try {
          const token = getToken();
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/store/orders/stream`,
            {
              headers: {
                Accept: "text/event-stream",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              signal: controller.signal,
            },
          );

          if (FATAL_STATUS.includes(response.status)) return;
          if (!response.ok || !response.body) {
            throw new Error(`Stream indisponível (${response.status})`);
          }

          if (hasConnected) handlers.current.onReconnect?.();
          hasConnected = true;
          retryDelay = MIN_RETRY_MS;

          const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();
          let buffer = "";

          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += value;
            const blocks = buffer.split(/\r?\n\r?\n/);
            buffer = blocks.pop() ?? "";

            for (const block of blocks) {
              const message = parseBlock(block);
              if (
                !message ||
                (message.event !== "order_created" &&
                  message.event !== "order_updated")
              ) {
                continue;
              }

              try {
                handlers.current.onEvent({
                  type: message.event,
                  order: JSON.parse(message.data) as OrderResponseDTO,
                });
              } catch {}
            }
          }
        } catch {
          if (controller.signal.aborted) return;
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        retryDelay = Math.min(retryDelay * 2, MAX_RETRY_MS);
      }
    };

    void connect();

    return () => controller.abort();
  }, []);
};
