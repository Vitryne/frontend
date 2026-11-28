import ConfirmDeadline from "@/components/features/panel/orders/components/confirm-deadline";
import {
  ORDER_COLUMNS,
  getNextStatus,
} from "@/components/features/panel/orders/columns";
import {
  getOrderHistory,
  getPaymentInfo,
} from "@/components/features/panel/orders/labels";
import type { Order } from "@/components/features/panel/orders/types";
import Badge from "@/components/ui/badge";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import { formatPrice, formatTimeAgo } from "@/lib/format";
import {
  LuCreditCard,
  LuQrCode,
  LuReceipt,
  LuShirt,
  LuTruck,
} from "react-icons/lu";

interface Props {
  order: Order | null;
  onClose: () => void;
  onAdvance: (order: Order) => void;
  onRefuse: (order: Order) => void;
}

const OrderDetailModal: React.FC<Props> = ({
  order,
  onClose,
  onAdvance,
  onRefuse,
}) => {
  if (!order) return null;

  const isNew = order.status === "new";
  const isCompleted = order.status === "completed";
  const statusLabel = ORDER_COLUMNS.find(
    (column) => column.status === order.status,
  )?.label;
  const nextLabel = ORDER_COLUMNS.find(
    (column) => column.status === getNextStatus(order.status),
  )?.label;
  const history = getOrderHistory(order);
  const payment = getPaymentInfo(order);
  const total = formatPrice(order.totalInCents);
  const shipping = formatPrice(order.shippingInCents);

  return (
    <Modal
      open
      onClose={onClose}
      title={`Pedido #${order.id}`}
      subtitle={`${order.customerName} - recebido ${formatTimeAgo(order.createdAt)}`}
      icon={<LuReceipt size={20} />}
      footer={
        <>
          <ButtonSecondary
            title={isCompleted ? "Fechar" : "Voltar"}
            onClick={onClose}
          />
          {isNew && (
            <>
              <ButtonSecondary
                title="Recusar"
                onClick={() => onRefuse(order)}
              />
              <ButtonPrimary
                title="Aceitar pedido"
                onClick={() => onAdvance(order)}
              />
            </>
          )}
          {!isNew && nextLabel && (
            <ButtonPrimary
              title={`Mover para ${nextLabel}`}
              onClick={() => onAdvance(order)}
            />
          )}
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-4">
        {isNew ? (
          <ConfirmDeadline order={order} />
        ) : (
          statusLabel && (
            <div>
              <Badge
                title={statusLabel}
                variant={isCompleted ? "success" : "primary"}
              />
            </div>
          )
        )}

        <section>
          <h3 className="text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
            Itens do pedido
          </h3>
          <ul className="mt-1 divide-y divide-border">
            {order.items.map((item, index) => {
              const price = formatPrice(item.priceInCents * item.quantity);

              return (
                <li
                  key={`${item.name}-${item.size}-${index}`}
                  className="flex items-center gap-3 py-2.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-text-tertiary">
                    <LuShirt size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-text-primary">
                      {item.name}
                    </p>
                    <p className="text-[12px] text-text-tertiary">
                      {[
                        item.size && `Tamanho ${item.size}`,
                        `${item.quantity} un.`,
                      ]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </div>
                  <span className="text-[13px] font-bold whitespace-nowrap text-text-primary">
                    R$ {price.reais}
                    <span className="text-[10px]">,{price.cents}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
            Entrega e pagamento
          </h3>
          <ul className="mt-1 divide-y divide-border">
            <li className="flex gap-3 py-2.5">
              <LuTruck
                size={16}
                className="mt-0.5 shrink-0 text-text-secondary"
              />
              <div>
                <p className="text-[13px] font-semibold text-text-primary">
                  {order.deliveryArea
                    ? `Entrega em ${order.deliveryArea}`
                    : "Entrega no endereço do cliente"}
                </p>
                <p className="text-[12px] text-text-tertiary">
                  Endereço completo visível apenas para o entregador
                </p>
              </div>
            </li>
            <li className="flex gap-3 py-2.5">
              {order.paymentMethod === "pix" ? (
                <LuQrCode
                  size={16}
                  className="mt-0.5 shrink-0 text-text-secondary"
                />
              ) : (
                <LuCreditCard
                  size={16}
                  className="mt-0.5 shrink-0 text-text-secondary"
                />
              )}
              <div>
                <p className="text-[13px] font-semibold text-text-primary">
                  {payment.title}
                </p>
                <p className="text-[12px] text-text-tertiary">
                  {payment.description}
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-[11px] font-semibold tracking-wider text-text-tertiary uppercase">
            Histórico do pedido
          </h3>
          <ul className="mt-2 flex flex-col gap-2">
            {history.map((step, index) => (
              <li
                key={`${step.label}-${index}`}
                className="flex items-center gap-2.5 text-[13px]"
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${
                    step.done ? "bg-primary" : "bg-text-disabled"
                  }`}
                />
                <span
                  className={`flex-1 ${
                    step.done
                      ? "text-text-secondary"
                      : "font-semibold text-text-primary"
                  }`}
                >
                  {step.label}
                </span>
                {step.time && (
                  <span className="text-[12px] text-text-tertiary">
                    {step.time}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-xl border border-border bg-surface-subtle px-4 py-3 text-[13px]">
          {order.shippingInCents > 0 && (
            <div className="flex justify-between pb-2 text-text-secondary">
              <span>Frete</span>
              <span>
                R$ {shipping.reais},{shipping.cents}
              </span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-text-primary">
            <span>Total do pedido</span>
            <span>
              R$ {total.reais},{total.cents}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
