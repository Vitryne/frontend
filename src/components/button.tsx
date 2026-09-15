interface Props {
  title?: string;
  className?: string;
  titleClassName?: string;
  onClick?: () => void;
  buttonIcon?: React.ReactElement;
}

const Button: React.FC<Props> = ({
  title,
  onClick,
  className,
  buttonIcon,
  titleClassName,
}) => {
  return (
    <button
      type="submit"
      className={`${className ? className : "w-full rounded-[10px] bg-primary hover:bg-primary-hover text-white font-body font-semibold text-[14px] py-3.5 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"}`}
      onClick={onClick}
    >
      {titleClassName ? (
        <p className={titleClassName}>{title}</p>
      ) : (
        <p>{title}</p>
      )}
      {buttonIcon}
    </button>
  );
};

export default Button;
