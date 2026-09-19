import Image from "next/image"
import StepHeader from "@/components/steps-register/step-header"
import { FiArrowLeft, FiArrowRight, FiUpload } from "react-icons/fi"
import Button from "../button"

interface Props {
    onNext: () => void
    onBack?: () => void;
}

const StepIdentity: React.FC<Props> = ({ onNext, onBack }) => {
    return (
        <div>
            <StepHeader
                steps="passo 2 de 5"
                title="Identidade visual"
                subtitle="Logo e banner são os primeiros elementos que o cliente vê na vitrine."
            />

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-[1rem]">Logo da loja</h2>
                        <span className="text-[1rem] text-text-secondary">
                            JPG ou PNG · até 5MB · 512×512px mínimo
                        </span>
                    </div>


                    <div className="flex gap-4 items-center">
                        <div className="size-32 shrink-0 rounded-3xl bg-text-primary text-white font-bold text-5xl flex items-center justify-center">
                            AN
                        </div>
                        <label className="flex-1 flex items-center gap-4 rounded-xl py-6 border-2 border-dashed border-primary bg-primary-soft px-5 cursor-pointer">
                            <span className="flex size-14 text-2xl items-center justify-center rounded-xl bg-avatar text-primary">
                                <FiUpload />
                            </span>
                            <span>
                                <p className="font-bold text-xl text-primary-hover">Arraste o arquivo ou clique para enviar</p>
                                <p className="text-[1rem] text-text-secondary">Use uma versão limpa e legível em fundo claro</p>
                            </span>
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-[1rem]">Banner público</h2>
                        <span className="text-[1rem] text-text-secondary">
                            JPG · 1600×480px · até 5MB
                        </span>
                    </div>

                    <div className="relative aspect-1700/480 overflow-hidden rounded-3xl">
                        <Image
                            src="/onboarding.jpg"
                            alt="Onboarding"
                            fill
                            priority
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-10 text-white">
                            <p className="font-bold font-display text-3xl select-none">
                                Atelier Norte
                            </p>
                            <p className="font-display font-thin pt-1 select-none">
                                Moda autoral · São Paulo
                            </p>
                        </div>

                        <label className="absolute bottom-4 right-4 cursor-pointer bg-white px-4 py-2 flex items-center gap-3 rounded-xl">
                            <FiUpload />
                            <span>Trocar banner</span>
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

            <div className="flex justify-between pt-17">
                <button 
                    onClick={onBack}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] border  border-border-brand w-35 py-2 font-body font-semibold text-[1rem] text-text-brand transition-all duration-200 ease-in-out hover:bg-screen hover:scale-[1.02] active:scale-95"
                >
                    <FiArrowLeft size={20}/>
                    Voltar
                </button>

                <Button
                    onClick={onNext} 
                    title="Próximo"
                    titleClassName="text-[1rem]"
                    buttonIcon={<FiArrowRight size={20} />}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] bg-primary w-35 py-2 font-body font-semibold text-[14px] text-white transition-all duration-200 ease-in-out shadow-[0_8px_24px_rgba(149,48,217,0.35)] hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                />
            </div>
        </div>
    )
}

export default StepIdentity