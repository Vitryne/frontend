import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import { LuArrowLeft, LuArrowRight, LuCheck } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import RegisterService from "@/service/register-service";
import { toRegisterDTO } from "@/lib/register-mapper";
import type { RegisterFormData } from "@/interfaces/register-form";

interface Props {
  isLastStep: boolean;
  data: RegisterFormData;
  validate: () => boolean;
  onNext: () => void;
  onBack: () => void;
  onRegistered: () => void;
}

const StepFooter: React.FC<Props> = ({
  isLastStep,
  data,
  validate,
  onNext,
  onBack,
  onRegistered,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const registerService = RegisterService();

  const registerStore = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      if (data.name?.trim()) {
        localStorage.setItem("vitryne:store-name", data.name.trim());
      }
      await registerService.registerStore(toRegisterDTO(data));
      onRegistered();
    } catch (e) {
      const message = axios.isAxiosError(e)
        ? e.response?.data?.message
        : undefined;
      setError(
        message ?? "Não foi possível cadastrar a loja. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (!validate()) return;
    if (isLastStep) registerStore();
    else onNext();
  };

  return (
    <>
      {error && (
        <p className="mt-6 text-[13px] font-semibold text-danger">{error}</p>
      )}
      <footer className="mt-10 flex justify-between border-t border-border pt-8">
        <ButtonSecondary
          title="Voltar"
          btnIcon={<LuArrowLeft />}
          onClick={onBack}
        />

        <ButtonPrimary
          title={isLastStep ? "Cadastrar loja" : "Continuar"}
          btnIcon={isLastStep ? <LuCheck /> : <LuArrowRight />}
          onClick={handleContinue}
        />
      </footer>
    </>
  );
};

export default StepFooter;
