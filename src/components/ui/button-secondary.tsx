interface Props {
    title?: string;
    className?: string;
    titleClassName?: string;
    onClick?: () => void;
    btnIcon?: React.ReactElement;
    iconPosition?: "left" | "right";
    type?: "button" | "submit";
}

const ButtonSecondary: React.FC<Props> = ({
    title,
    onClick,
    className,
    btnIcon,
    titleClassName,
    iconPosition = "left",
    type = "button",
}) => {
    return (
        <button
            type={type}
            className={`${className ? className : "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-primary/30 bg-white hover:bg-primary/5 text-primary font-semibold text-[14px] px-5 py-2.5 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"}`}
            onClick={onClick}
        >
            {iconPosition === "left" && btnIcon}
            {titleClassName ? (
                <p className={titleClassName}>{title}</p>
            ) : (
                <p>{title}</p>
            )}
            {iconPosition === "right" && btnIcon}
        </button>
    );
};

export default ButtonSecondary;
