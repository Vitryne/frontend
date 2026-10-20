import StepHeader from "@/components/features/store-register/components/header";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";
import ButtonSecondary from "@/components/ui/button-secondary";
import ButtonPrimary from "@/components/ui/button-primary";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const CATEGORIES = [
  "Vestidos",
  "Saias",
  "Camisas",
  "Calças",
  "Blazers",
  "Tricô",
  "Acessórios",
  "Calçados",
  "Lingerie",
  "Fitness",
];
const PREP_TIMER = ["20 min", "30 min", "45 min", "60 min", "Personalizado"];

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

const StepCategory: React.FC<Props> = ({ onNext, onBack }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [radius, setRadius] = useState(12);
  const [prepTime, setPrepTime] = useState("30 min");

  const toggleCategory = (category: string) => {
    setCategories((current) => {
      if (current.includes(category)) {
        return current.filter((c) => c !== category);
      } else {
        return [...current, category];
      }
    });
  };

  return (
    <div>
      <StepHeader
        steps="passo 3 de 5"
        title="Categorias e raio de entrega"
        subtitle="Em quais categorias sua loja atua e até onde você entrega?"
      />

      <div>
        <h2 className="text-xl font-bold text-primary-deep">
          Categorias da loja
        </h2>

        <div className="flex flex-wrap gap-3 pt-3">
          {CATEGORIES.map((category) => {
            const active = categories.includes(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                aria-pressed={active}
                className={`flex items-center gap-2 cursor-pointer rounded-full border px-6 py-2 text-[1rem] transition-colors ${
                  active
                    ? "bg-primary border-primary text-white"
                    : "bg-surface border-border-strong text-text-primary hover:border-border-strong"
                }`}
              >
                {active && <FiCheck size={14} />}
                {category}
              </button>
            );
          })}
        </div>

        <div className="pt-10">
          <h2 className="text-xl font-bold text-primary-deep pb-4">
            Raio máximo de entrega
          </h2>

          <div className="bg-surface p-8 border border-border rounded-2xl">
            <div className="flex pb-4 justify-between  items-center">
              <h3 className="text-text-secondary text-[1.1rem]">
                De 1 a 50 km
              </h3>
              <span className="font-display font-bold text-primary-strong text-3xl">
                {radius} km
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={50}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-primary-hover cursor-pointer"
            />

            <div className="flex justify-between text-[1rem] text-text-tertiary">
              <span>1 km</span>
              <span>25 km</span>
              <span>50km</span>
            </div>
          </div>
        </div>

        <div className="pt-10">
          <h2 className="text-xl font-bold text-primary-deep pb-4">
            Tempo médio de preparação
          </h2>

          <div className="flex gap-3">
            {PREP_TIMER.map((time) => {
              const active = prepTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setPrepTime(time)}
                  aria-pressed={active}
                  className={`cursor-pointer border border-border rounded-2xl px-6 py-3 text-[1rem] transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "bg-surface border-border text-text-primary hover:border-border-strong"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-17">
        <ButtonSecondary
          title="Voltar"
          btnIcon={<LuArrowLeft />}
          onClick={onBack}
        />

        <ButtonPrimary
          title="Próximo"
          btnIcon={<LuArrowRight />}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default StepCategory;
