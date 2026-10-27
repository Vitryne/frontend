import LogoSvg from "@/components/ui/logo-svg";
import { FaCheck } from "react-icons/fa";

interface Step {
  id: number;
  label: string;
}
interface Props {
  steps: Step[];
  stepIndex: number;
  selectStep: (i: number) => void;
}

const RegisterSidebar: React.FC<Props> = ({ steps, stepIndex, selectStep }) => {
  return (
    <div className="sticky top-0 flex h-screen w-100 shrink-0 flex-col gap-8 border-r border-border bg-surface px-6 py-8">
      <div className="w-36">
        <LogoSvg color="black" />
      </div>

      <div className="rounded-xl bg-primary-soft px-4 py-3">
        <p className="text-primary-hover text-[13px]]">
          {`Vamos preparar sua loja na Vitryne em ${steps.length} passos rápidos.`}
        </p>
      </div>

      <ul className="flex flex-col gap-y-1">
        {steps.map((step, i) => {
          const stepCompleted = i < stepIndex;
          const currentStep = i === stepIndex;

          return (
            <li key={step.id}>
              <button
                type="button"
                disabled={!stepCompleted}
                onClick={() => selectStep(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  currentStep
                    ? "bg-primary-soft"
                    : stepCompleted
                      ? "cursor-pointer hover:bg-surface-subtle"
                      : ""
                }`}
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                    currentStep
                      ? "bg-primary text-white"
                      : stepCompleted
                        ? "bg-success text-white"
                        : "bg-surface-subtle text-text-tertiary"
                  }`}
                >
                  {stepCompleted ? <FaCheck size={12} /> : i + 1}
                </span>

                <span
                  className={`text-[14px] ${
                    currentStep
                      ? "font-semibold text-primary-hover"
                      : stepCompleted
                        ? "text-text-secondary"
                        : "text-text-disabled"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RegisterSidebar;
