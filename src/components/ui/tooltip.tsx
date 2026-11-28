import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: "top" | "bottom";
  onlyWhenTruncated?: boolean;
  className?: string;
}

interface Position {
  top: number;
  left: number;
  placement: "top" | "bottom";
}

const GAP = 8;
const EDGE = 8;

const Tooltip: React.FC<Props> = ({
  content,
  children,
  placement = "top",
  onlyWhenTruncated = false,
  className,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const id = useId();

  const show = () => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    if (onlyWhenTruncated) {
      const target = anchor.firstElementChild ?? anchor;
      if (target.scrollWidth <= target.clientWidth) return;
    }

    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setPosition(null);
  };

  useEffect(() => {
    if (!open) return;

    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!anchor || !tooltip) return;

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const fitsAbove = anchorRect.top - tooltipRect.height - GAP >= EDGE;
    const fitsBelow =
      anchorRect.bottom + tooltipRect.height + GAP <= window.innerHeight - EDGE;
    const resolved =
      placement === "top"
        ? fitsAbove || !fitsBelow
          ? "top"
          : "bottom"
        : fitsBelow || !fitsAbove
          ? "bottom"
          : "top";

    const centered =
      anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
    const left = Math.min(
      Math.max(centered, EDGE),
      window.innerWidth - tooltipRect.width - EDGE,
    );

    setPosition({
      top:
        resolved === "top"
          ? anchorRect.top - tooltipRect.height - GAP
          : anchorRect.bottom + GAP,
      left,
      placement: resolved,
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };

    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, placement]);

  return (
    <div
      ref={anchorRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? id : undefined}
      className={`min-w-0 ${className ?? ""}`}
    >
      {children}

      {open &&
        createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              visibility: position ? "visible" : "hidden",
            }}
            className="pointer-events-none fixed z-50 max-w-72 rounded-lg bg-text-primary px-3 py-1.5 text-[12px] font-medium leading-snug break-words text-text-on-brand shadow-lg"
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
