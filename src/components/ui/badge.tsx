interface Props {
    title: string;
    variant?: "neutral" | "primary" | "danger";
    size?: "sm" | "md";
}

const VARIANTS = {
    neutral: "bg-cream text-text-primary",
    primary: "bg-primary-soft text-primary-hover",
    danger: "bg-danger-soft text-danger",
};

const SIZES = {
    sm: "px-3 py-1 text-[11px] uppercase tracking-wide",
    md: "px-2.5 py-0.5 text-[13px]",
};

const Badge: React.FC<Props> = ({
    title,
    variant = "neutral",
    size = "sm",
}) => {
    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full font-bold ${VARIANTS[variant]} ${SIZES[size]}`}
        >
            {title}
        </span>
    );
};

export default Badge;
