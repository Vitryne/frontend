import ButtonSecondary from "@/components/ui/button-secondary";
import { LuDownload, LuLayoutGrid, LuList, LuListFilter } from "react-icons/lu";



interface Props {
  children?: React.ReactNode;
}


const OrdersToolbar: React.FC<Props> = ({children}) => {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="min-w-0 flex-1" >
        { children }
      </div>

      <ButtonSecondary title="Filtros" btnIcon={<LuListFilter size={16} />} />
      <ButtonSecondary title="Relatórios" btnIcon={<LuDownload size={16} />} />

      <div className="flex items-center rounded-xl bg-surface p-1">
        <button
          type="button"
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-surface px-3 text-[13px] font-semibold text-primary-hover shadow-sm"
        >
          <LuLayoutGrid size={14} />
          Kanban
        </button>
        <button
          type="button"
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-surface px-3 text-[13px] font-semibold text-primary-hover shadow-sm"
        >
          <LuList size={14} />
          Lista
        </button>
      </div>
    </div>
  )
}

export default OrdersToolbar;