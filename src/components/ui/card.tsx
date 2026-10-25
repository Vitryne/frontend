interface Props {
  title: string;
  aside?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ title, aside, children }) => {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          {title}
        </h2>
        {aside && (
          <span className="text-[12px] text-text-primary">{aside}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
