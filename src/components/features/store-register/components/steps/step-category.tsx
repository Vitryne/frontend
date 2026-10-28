import StepHeader from "@/components/features/store-register/components/header";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";

const CATEGORIES = [
  "Moda feminina",
  "Moda masculina",
  "Infantil",
  "Fitness",
  "Plus Size",
  "Brechó",
  "Streetwear",
  "Country",
  "Alfaiataria",
  "Moda praia",
  "Moda gestante",
  "Lingerie",
];

const TAGS = [
  "Vestidos",
  "Saias",
  "Camisas",
  "Calças",
  "Conjuntos",
  "Kimonos",
  "Shorts",
  "Cardigans",
  "Blazers",
  "Tricô",
  "Jaquetas",
  "Macacões",
  "Bolsas",
  "Acessórios",
];

const PREP_TIMER = ["15 min", "30 min", "45 min", "60 min", "Personalizado"];

const StepCategory = () => {
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([])
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [radius, setRadius] = useState(12);
  const [prepTime, setPrepTime] = useState("30 min");

  const visibleCategories = showAllCategories
    ? CATEGORIES
    : CATEGORIES.slice(0, 9);
  const visibleTags = showAllTags ? TAGS : TAGS.slice(0, 8);
  
  const radiusPercent =
    ((radius - 1) / (50 - 1)) * 100;

  const toggleTag = (tag: string) => {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );
  };


  return (
    <div>
      <StepHeader
        title="Entrega e categoria"
        subtitle="Até onde você entrega e em quais categorias sua loja atua?"
      />

            <div>
        <p className="mb-2 text-[12px] font-semibold text-text-primary">
          Categoria principal da loja
        </p>

        <div className="flex flex-wrap gap-3">
          {visibleCategories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`h-11 w-35 cursor-pointer rounded-2xl border text-[14px] font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "border-border-strong bg-surface text-text-primary hover:border-primary"
                }`}
              >
                {item}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="h-11 w-35 cursor-pointer rounded-2xl border border-dashed border-border-brand text-[12px] font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            {showAllCategories ? "Menos categorias" : "Mais categorias"}
          </button>
        </div>
      </div>


      <div className="pt-8">
        <p className="mb-2 text-[15px] font-semibold text-text-primary">
          Tags da loja
        </p>

        <div className="flex flex-wrap gap-3">
          {visibleTags.map((tag) => {
            const active = tags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`flex h-11 cursor-pointer items-center gap-2 rounded-2xl border px-5 text-[14px] font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30"
                    : "border-border-strong bg-surface text-text-primary hover:border-primary"
                }`}
              >
                {active && <FiCheck size={14} />}
                {tag}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowAllTags((prev) => !prev)}
            className="h-11 w-35 cursor-pointer rounded-2xl border border-dashed border-border-brand text-[12px] font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            {showAllTags ? "Menos tags" : "Mais tags"}
          </button>
        </div>
      </div>

      <div className="pt-8">
        <p className="mb-2 text-[15px] font-semibold text-text-primary">
          Raio máximo da entrega
        </p>

        <div className="rounded-2xl border border-border-strong bg-surface p-6">
          <div className="flex items-center justify-between pb-4">
            <span className="text-[13px] text-text-secondary">
              {`De ${1} a ${50} km`}
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              {radius} km
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={50}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--color-primary) ${radiusPercent}%, var(--color-border) ${radiusPercent}%)`,
            }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
          />

          <div className="flex justify-between pt-2 text-[11px] text-text-tertiary">
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <p className="mb-2 text-[15px] font-semibold text-text-primary">
          Tempo médio de preparação
        </p>

        <div className="flex flex-wrap gap-3">
          {PREP_TIMER.map((time) => {
            const active = prepTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => setPrepTime(time)}
                className={`h-11 cursor-pointer rounded-2xl border px-6 text-[14px] font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary-soft-2 text-primary-hover"
                    : "border-border-strong bg-surface text-text-primary hover:border-primary"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepCategory;
