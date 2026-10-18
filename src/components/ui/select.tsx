import { LuChevronDown } from "react-icons/lu"


interface Option {
    value: string
    label: string
}

interface Props {
    label: string
    value: string
    options: Option[]
    onChange: (value: string) => void
}

const Select: React.FC<Props> = ({label, value, options, onChange}) => {

    return (
        <label className="relative inline-flex h-10 cursor-pointer items-center rounded-[10px] border border-border bg-white pl-3 pr-9 text-[.85rem] transition-colors focus-within:border-primary hover:bg-surface-subtle">
            <span className="text-text-secondary">{ label }</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pl-1.5 font-bold text-text-primary outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        { option.label }
                    </option>
                ))}
            </select>
            <LuChevronDown
                size={16}
                className="pointer-events-none absolute right-3 text-text-primary"
            />
        </label>
    )
}

export default Select