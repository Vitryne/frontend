const ProductRowSkeleton: React.FC = () => {
  return (
    <tr className="animate-pulse border-t border-border">
      <td className="w-px py-3 pl-5 pr-2">
        <div className="size-4 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="flex items-center gap-3">
          <div className="h-13 w-10 shrink-0 rounded-lg bg-surface-subtle" />
          <div>
            <div className="h-3.5 w-36 rounded bg-surface-subtle" />
            <div className="mt-1.5 h-2.5 w-20 rounded bg-surface-subtle" />
          </div>
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="h-6 w-20 rounded-full bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="h-3.5 w-20 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="flex gap-1.5">
          <div className="h-6 w-12 rounded-full bg-surface-subtle" />
          <div className="h-6 w-12 rounded-full bg-surface-subtle" />
          <div className="h-6 w-12 rounded-full bg-surface-subtle" />
        </div>
      </td>
      <td className="px-2 py-3">
        <div className="ml-auto h-3.5 w-12 rounded bg-surface-subtle" />
      </td>
      <td className="px-2 py-3">
        <div className="h-5 w-20 rounded-full bg-surface-subtle" />
      </td>
      <td className="py-3 pl-2 pr-5">
        <div className="size-8 rounded-full bg-surface-subtle" />
      </td>
    </tr>
  );
};

export default ProductRowSkeleton;
