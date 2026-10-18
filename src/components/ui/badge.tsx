interface Props {
    title: string
    variant?: "neutral" | "primary" | "danger"
}

const VARIANTS = {
    neutral: "bg-surface-subtle text-text-primary",
    primary: "bg-prmary-soft text-primary-hover",
    danger: "bg-red-50 text-red-600"
}

const Badge: React.FC<Props> = ({title, variant = "neutral"}) => {
    
    return (
        <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[.65rem] font-bold uppercase tracking-wide ${VARIANTS[variant]}`}
        >
            { title }
        </span>
    )
}

export default Badge;
