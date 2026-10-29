import { useEffect, useId, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: React.ReactElement;
  tone?: "primary" | "warning";
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const TONES = {
  primary: "bg-primary-soft text-primary",
  warning: "bg-warning-soft text-warning",
};

const Modal: React.FC<Props> = ({
  open,
  onClose,
  title,
  subtitle,
  icon,
  tone = "primary",
  children,
  footer,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onMouseDown={(e) => {
        pressedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedOnBackdrop.current && e.target === e.currentTarget) {
          onClose();
        }
        pressedOnBackdrop.current = false;
      }}
      className="m-auto w-full max-w-140 rounded-2xl bg-surface p-0 shadow-xl backdrop:bg-scrim backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5 p-6">
        <div className="flex items-center gap-4">
          <span
            className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}
          >
            {icon}
          </span>
          <div>
            <h2
              id={titleId}
              className="font-display text-[20px] font-semibold leading-[1.3] text-text-primary"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-[14px] text-text-tertiary">{subtitle}</p>
            )}
          </div>
        </div>

        {children && (
          <div className="border-t border-border text-[14px] text-text-primary">
            {children}
          </div>
        )}

        {footer && (
          <div className="flex items-center justify-end gap-3">{footer}</div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
