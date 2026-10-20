import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPages = (page: number, totalPages: number): (number | "...")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: (number | "...")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("...");
  for (let current = start; current <= end; current++) pages.push(current);
  if (end < totalPages - 1) pages.push("...");

  pages.push(totalPages);
  return pages;
};

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  return (
    <nav className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-7 items-center justify-center rounded-lg text-[.8rem] font-semibold transition-colors cursor-pointer border border-border bg-white text-text-primary hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <LuChevronLeft size={16} />
      </button>

      {getPages(page, totalPages).map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex size-7 items-center justify-center text-[.8rem] text-text-secondary"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={`flex size-7 items-center justify-center rounded-lg text-[.8rem] font-semibold transition-colors ${item === page ? "bg-primary text-white" : "cursor-pointer border border-border bg-white text-text-primary hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"}`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex size-7 items-center justify-center rounded-lg text-[.8rem] font-semibold transition-colors cursor-pointer border border-border bg-white text-text-primary hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
      >
        <LuChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
