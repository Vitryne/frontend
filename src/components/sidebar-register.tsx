import LogoSvg from "@/components/logo-svg";
import { FaCheck } from "react-icons/fa"


interface Step {
    id: number,
    label: string
}
interface Props {
    steps: Step[]
    stepIndex: number
    selectStep: (i: number) => void
}

const SidebarRegister: React.FC<Props> = ({steps, stepIndex, selectStep}) => {
    return (
        <div className="sticky top-0 flex h-screen w-85 shrink-0 flex-col gap-8 px-6 py-8 shadow-[4px_0_16px_rgba(0,0,0,0.04)]">
            <div className="w-42.5">
                <LogoSvg color="black" />
            </div>
            
            <div className="h-auto w-auto bg-primary-soft rounded-xl py-3 px-4">
                <p className="text-primary-hover text-[.8rem]">
                    Vamos preparar sua loja na Vitryne em 6 passos rápidos.
                </p>
            </div>

            <ul className="flex flex-col gap-y-1">
                {
                    steps.map((step, i) => {
                        const stepCompleted = i < stepIndex
                        const currentStep = i === stepIndex

                        return (
                            <li key={step.id}>
                                {
                                    stepCompleted ? (
                                        <div 
                                            onClick={() => selectStep(i)} 
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 w-full cursor-pointer hover:bg-screen transition-colors"
                                        >
                                            <span className="flex size-7 justify-center items-center rounded-full bg-success text-white">
                                                <FaCheck size={14}/>
                                            </span>
                                            <span className="text-text-secondary font-bold">
                                                {step.label}
                                            </span>
                                        </div>
                                    ) : (
                                        <div 
                                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                                                currentStep ? "bg-primary-soft" : "bg-transparent"
                                            }`}
                                        >
                                            <span
                                                className={`flex size-7 justify-center items-center rounded-full ${
                                                    currentStep
                                                        ? "bg-primary text-white font-bold"
                                                        : "bg-gray-200 text-text-terciary font-bold"
                                                }`}    
                                            >
                                                {i + 1}
                                            </span>
                                            <span
                                                className={
                                                    currentStep
                                                        ? "font-bold text-primary-hover"
                                                        : "text-text-terciary font-bold"
                                                }
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                    ) 
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SidebarRegister