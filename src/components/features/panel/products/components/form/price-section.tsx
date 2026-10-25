import Badge from "@/components/ui/badge";
import Switch from "@/components/ui/switch";
import { formatDate, formatMoney, formatPrice } from "@/lib/format";
import Link from "next/link";
import { useId, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import type { ProductPromotion } from "@/components/features/panel/products/types";

interface Props {
  priceInCents: number;
  onChange: (priceInCents: number) => void;
  isEdit?: boolean;
  promotion?: ProductPromotion;
}

const PriceSection: React.FC<Props> = ({
  priceInCents,
  onChange,
  isEdit = false,
  promotion,
}) => {
  const id = useId();
  const [promotionActive, setPromotionActive] = useState(
    promotion !== undefined,
  );

  const showPromotion = isEdit && promotion !== undefined && promotionActive;
  const savings = promotion ? priceInCents - promotion.priceInCents : 0;
  const discount = savings > 0 ? Math.round((savings / priceInCents) * 100) : 0;

  const handleChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    onChange(Number(digits));
  };

  const manageLink = (
    <Link
      href="/promotions"
      className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:underline"
    >
      Gerenciar em Promoções
      <LuArrowRight size={14} />
    </Link>
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12px] font-semibold text-text-primary"
      >
        Preço de venda *
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-text-tertiary">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="0,00"
          value={priceInCents === 0 ? "" : formatMoney(priceInCents)}
          onChange={(event) => handleChange(event.target.value)}
          className="w-full rounded-xl border border-border-strong bg-surface py-3 pl-11 pr-3.5 text-[13px] text-text-primary outline-none placeholder:text-text-disabled hover:border-border-strong focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <p className="mt-1.5 text-[12px] text-text-tertiary">
        Valor cheio, sem promoção aplicada
      </p>

      {showPromotion ? (
        <div className="mt-4 rounded-xl border border-border-brand bg-primary-soft p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-primary-hover">
              Promoção ativa
            </span>
            <Switch checked onChange={setPromotionActive} />
          </div>

          <div className="mt-3 flex items-center justify-between text-[13px]">
            <span className="text-text-tertiary">Preço promocional</span>
            <span className="font-semibold text-text-primary">
              R$ {formatPrice(promotion.priceInCents).reais},
              <span className="text-[11px]">
                {formatPrice(promotion.priceInCents).cents}
              </span>
            </span>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[13px]">
            <span className="text-text-tertiary">Término em</span>
            <span className="font-semibold text-text-primary">
              {formatDate(promotion.endsAt)}
            </span>
          </div>

          {savings > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Badge title={`-${discount}%`} variant="brand" />
              <span className="text-[13px] text-primary-hover">
                Cliente economiza R$ {formatMoney(savings)}
              </span>
            </div>
          )}

          {manageLink}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-border-strong bg-screen p-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-text-primary">
              Promoção
            </span>
            <Switch
              checked={false}
              onChange={setPromotionActive}
              disabled={!promotion}
            />
          </div>

          <p className="mt-2 text-[13px] text-text-tertiary">
            {!isEdit
              ? "Disponível depois que o produto for cadastrado."
              : promotion
                ? "Promoção pausada. Ative para voltar a aplicar o preço promocional."
                : "Nenhuma promoção para este produto."}
          </p>

          {manageLink}
        </div>
      )}
    </div>
  );
};

export default PriceSection;