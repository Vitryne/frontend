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
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="m-auto w-full max-w-105 rounded-2xl bg-surface p-0 shadow-xl backdrop:bg-scrim backdrop:backdrop-blur-sm"
        >
            <div className="flex items-start gap-3 px-5 pt-5 pb-4">
                <span
                    aria-hidden="true"
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}
                >
                    {icon}
                </span>
                <div>
                    <h2
                        id={titleId}
                        className="font-display text-[17px] font-semibold leading-[1.3] text-text-primary"
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-0.5 text-[12px] text-text-tertiary">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {children && (
                <div className="border-t border-border px-5 py-4 text-[13px] text-text-primary">
                    {children}
                </div>
            )}

            {footer && (
                <div className="flex items-center justify-end gap-2 px-5 pb-5">
                    {footer}
                </div>
            )}
        </dialog>
    );
};

export default Modal;
