import StepBankDetails from "@/components/features/store-register/components/steps/step-bank-details";
import StepBusinessHours from "@/components/features/store-register/components/steps/step-business-hours";
import StepCategory from "@/components/features/store-register/components/steps/step-category";
import StepIdentity from "@/components/features/store-register/components/steps/step-identity";
import StepStore from "@/components/features/store-register/components/steps/step-store";
import RegisterSidebar from "@/components/features/store-register/components/register-sidebar";
import StepFooter from "@/components/features/store-register/components/footer";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const STEPS = [
  { id: 0, label: "Dados da loja", Component: StepStore },
  { id: 1, label: "Dados bancários", Component: StepBankDetails },
  { id: 2, label: "Entrega e categorias", Component: StepCategory },
  { id: 3, label: "Horários", Component: StepBusinessHours },
  { id: 4, label: "Identidade visual", Component: StepIdentity },
];

const Register = () => {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0);
  const { label, Component } = STEPS[stepIndex];

  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === STEPS.length - 1

  const nextStep = () => 
    isLastStep ? router.replace("/dashboard") : setStepIndex(stepIndex + 1);
  const previousStep = () => 
    isFirstStep ? router.push("/login") : setStepIndex(stepIndex - 1);

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>{`${label} · Cadastro · Vitryne`}</title>
      </Head>

      <RegisterSidebar
        steps={STEPS}
        stepIndex={stepIndex}
        selectStep={(i) => setStepIndex(i)}
      />
      <main className="flex-1 bg-screen py-16 px-56">
        <Component />
        <StepFooter
          isLastStep={isLastStep}
          onNext={nextStep}
          onBack={previousStep}
        />
      </main>
    </div>
  );
};

export default Register;
