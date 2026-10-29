const OrderCardSkeleton: React.FC = () => {
  return (
    <div className="mb-2.5 animate-pulse rounded-xl border border-border bg-surface p-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-surface-subtle" />
        <div className="h-3 w-10 rounded bg-surface-subtle" />
      </div>
      <div className="mt-2.5 h-3 w-28 rounded bg-surface-subtle" />
      <div className="mt-1.5 h-2.5 w-36 rounded bg-surface-subtle" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3.5 w-16 rounded bg-surface-subtle" />
        <div className="h-8 w-20 rounded-lg bg-surface-subtle" />
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
