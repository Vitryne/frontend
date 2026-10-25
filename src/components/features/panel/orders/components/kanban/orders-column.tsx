interface Props {
  title: string;
  dotClass: string;
  count: number;
  children?: React.ReactNode;
}

const OrdersColumn: React.FC<Props> = ({ title, dotClass, count, children}) => {
  return (
    <div className="flex w-69 shrink-0 flex-col gap-3 rounded-[14px] bg-surface-subtle p-3">
      <header className="flex items-center gap-2 px-1">
        <span className={`size-2 shrink-0 rounded-full ${dotClass}`} />
          <h2 className="flex-1 text-[13px] font-semibold text-text-primary">
            { title }
          </h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-surface px-1.5 text-[11px] font-semibold text-text-secondary">
            { count }
          </span>
      </header>

      <div className="flex flex-col gap-2.5">
        { children }
      </div>
    </div>
  )
}

export default OrdersColumn