interface Props {
  title?: string;
  className?: string;
  titleClassName?: string;
  onClick?: () => void;
  btnIcon?: React.ReactElement;
  iconPosition?: "left" | "right";
  type?: "button" | "submit";
}


const ButtonPrimary: React.FC<Props> = ({
    title,
    onClick,
    className,
    btnIcon,
    titleClassName,
    iconPosition = "right",
    type = "button",
}) => {
    return (
        <button
            type={type}
            className={`${className ? className : "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] px-5 py-2.5 shadow-lg shadow-primary/30 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"}`}
            onClick={onClick}
        >
            {iconPosition === "left" && btnIcon}
            {titleClassName ? (
                <p className={titleClassName}>{ title }</p>
            ) : (
                <p>{ title }</p>
            )}
            {iconPosition === "right" && btnIcon}
        </button>
    )
}

export default ButtonPrimary;