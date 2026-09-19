interface Props {
    steps: string,
    title: string,
    subtitle: string
}

const StepHeader: React.FC<Props> = ({
    steps,
    title,
    subtitle
}) => {
    return (
        <header>
            <span className="bg-primary-soft rounded-xl uppercase p-1.5 text-[.8rem] font-semibold text-primary-hover tracking-wider">
                {steps}
            </span>

            <h1 className="text-text-primary font-display font-bold text-4xl pt-10">
                {title}
            </h1>
            <p className="text-text-secondary text-[1rem] mt-3 mb-10">
                {subtitle}
            </p>
        </header>
    );
};

export default StepHeader;