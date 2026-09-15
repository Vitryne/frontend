import StepBankDetails from "@/components/steps-register/step-bank-details";
import StepBusinessHours from "@/components/steps-register/step-business-hours";
import StepCategory from "@/components/steps-register/step-category";
import StepFirstProduct from "@/components/steps-register/step-first-product";
import StepIdentity from "@/components/steps-register/step-identity";
import StepStore from "@/components/steps-register/step-store";
import SidebarRegister from "@/components/sidebar-register";
import { useState } from "react";


const STEPS = [
    {id: 0, label: "Dados da loja", Component: StepStore},
    {id: 1, label: "Identidade visual", Component: StepIdentity},
    {id: 2, label: "Categoria & entrega", Component: StepCategory},
    {id: 3, label: "Horários", Component: StepBusinessHours},
    {id: 4, label: "Dados bancários", Component: StepBankDetails},
    {id: 5, label: "Primeiro produto", Component: StepFirstProduct}
]

const Register = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const { Component } = STEPS[stepIndex];

    const nextStep = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))

    return(
        <div className="flex min-h-screen">
            <SidebarRegister
                steps={STEPS}
                stepIndex={stepIndex}
                selectStep={(i) => setStepIndex(i)}
            />
            <main className="flex-1 bg-screen py-16 px-56">
                <Component 
                    onNext={nextStep}
                />
            </main>
        </div>
    )
}

export default Register;