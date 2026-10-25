import Switch from "@/components/ui/switch";
import { formatMoney } from "@/lib/format";
import Link from "next/link";
import { useId } from "react";
import { LuArrowRight } from "react-icons/lu";




interface Props {
  priceInCents: number;
  onChange: (priceInCents: number) => void;
}

const PriceSection: React.FC<Props> = ({priceInCents, onChange}) => {

  const id = useId();

  const handleChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    onChange(Number(digits));
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-semibold text-text-primary">
        Preço de venda *
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-text-tertiary">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="0,00"
          value={priceInCents === 0 ? "" : formatMoney(priceInCents)}
          onChange={(event) => handleChange(event.target.value)}
          className="w-full rounded-[10px] border border-border bg-surface py-3 pl-11 pr-4 text-[14px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <p className="mt-1.5 text-[11px] text-text-tertiary">
        Valor cheio, sem promoção aplicada
      </p>

      <div className="mt-4 rounded-xl border border-border bg-screen p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-text-secondary">
            Promoção
          </span>
          <Switch
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>

        <p className="mt-2 text-[12px] text-text-tertiary">
          Disponível depois que o produto for cadastrado.
        </p>

        <Link
          href="/promotions"
          className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
        >
          Gerenciar em Promoções
          <LuArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default PriceSection;