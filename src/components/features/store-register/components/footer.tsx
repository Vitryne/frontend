import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import { LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";

interface Props {
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StepFooter: React.FC<Props> = ({ isLastStep, onNext, onBack }) => {
  return (
    <footer className="mt-10 flex justify-between border-t border-border pt-8">
      <ButtonSecondary
        title="Voltar"
        btnIcon={<LuArrowLeft />}
        onClick={onBack}
      />

      <ButtonPrimary
        title={isLastStep ? "Cadastrar loja" : "Continuar"}
        btnIcon={isLastStep ? <LuCheck /> : <LuArrowRight />}
        onClick={onNext}
      />
    </footer>
  );
};

export default StepFooter;
