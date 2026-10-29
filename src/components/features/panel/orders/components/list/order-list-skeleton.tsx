const OrderRowSkeleton: React.FC = () => {
  return (
    <tr className="animate-pulse border-t border-border">
      <td className="py-3 pr-6 pl-5">
        <div className="h-3 w-16 rounded bg-surface-subtle" />
        <div className="mt-1.5 h-2.5 w-10 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="h-3 w-28 rounded bg-surface-subtle" />
        <div className="mt-1.5 h-2.5 w-36 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="ml-auto h-3 w-16 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="h-6 w-20 rounded-full bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="h-7 w-50 rounded-lg bg-surface-subtle" />
      </td>
      <td className="py-3 pr-5 pl-2">
        <div className="ml-auto h-8 w-28 rounded-lg bg-surface-subtle" />
      </td>
    </tr>
  );
};

export default OrderRowSkeleton;
