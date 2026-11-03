interface Props {
  title: string;
  subtitle: string;
}

const StepHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header>
      <h1 className="text-text-primary font-display font-bold text-4xl">
        {title}
      </h1>
      <p className="text-text-secondary font-display font-light text-[1rem] mt-3 mb-10">
        {subtitle}
      </p>
    </header>
  );
};

export default StepHeader;
