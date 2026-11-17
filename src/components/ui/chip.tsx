interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip: React.FC<Props> = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 cursor-pointer rounded-full border px-3.5 text-[12px] font-semibold transition-colors ${
        selected
          ? "border-text-primary bg-text-primary text-white"
          : "border-border-strong bg-surface text-text-primary hover:border-text-tertiary"
      }`}
    >
      {label}
    </button>
  );
};

export default Chip;
