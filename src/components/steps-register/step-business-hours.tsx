import StepHeader from "@/components/steps-register/header"
import { FiArrowLeft, FiArrowRight, FiClock } from "react-icons/fi";
import Button from "@/components/button"
import { useState } from "react";


interface Props {
    onNext: () => void;
    onBack?: () => void;
}

const DAYS_MODELS = [
    { name: "Segunda", open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "20:00" },
    { name: "Terça",   open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "20:00" },
    { name: "Quarta",  open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "20:00" },
    { name: "Quinta",  open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "20:00" },
    { name: "Sexta",   open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "22:00" },
    { name: "Sábado",  open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "",      closeAfternoon: ""      },
    { name: "Domingo", open: false, openMorning: "",      closeMorning: "",      openAfternoon: "",      closeAfternoon: ""      },
];

const PRESETS = [
    {
        name: "Comerical (Seg-Sex 9h-18h)",
        days: [
            { name: "Segunda", open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "18:00" },
            { name: "Terça",   open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "18:00" },
            { name: "Quarta",  open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "18:00" },
            { name: "Quinta",  open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "18:00" },
            { name: "Sexta",   open: true,  openMorning: "09:00", closeMorning: "12:00", openAfternoon: "13:30", closeAfternoon: "18:00" },
            { name: "Sábado",  open: false, openMorning: "", closeMorning: "", openAfternoon: "", closeAfternoon: "" },
            { name: "Domingo", open: false, openMorning: "", closeMorning: "", openAfternoon: "", closeAfternoon: "" },
        ]
    },
    {
        name: "Loja física (Seg-Sáb 10h-20h)",
        days: [
            { name: "Segunda", open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Terça",   open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Quarta",  open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Quinta",  open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Sexta",   open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Sábado",  open: true,  openMorning: "10:00", closeMorning: "13:00", openAfternoon: "14:00", closeAfternoon: "20:00" },
            { name: "Domingo", open: false, openMorning: "", closeMorning: "", openAfternoon: "", closeAfternoon: "" },
        ]
    },
    {
        name: "24/7",
        days: DAYS_MODELS.map((day) => ({
            name: day.name,
            open: true,
            openMorning: "00:00",
            closeMorning: "12:00",
            openAfternoon: "12:00",
            closeAfternoon: "23:59",
        })),
    }
]

const StepBusinessHours: React.FC<Props> = ({ onNext, onBack }) => {
    const [days, setDays] = useState(DAYS_MODELS)
    const [activePreset, setActivePreset] = useState("Loja física (Seg-Sáb 10h-20h)")

    const applyPreset = (preset: typeof PRESETS[number]) => {
        setDays(preset.days)
        setActivePreset(preset.name)
    }

    const alternateDays = (i: number) => {
        const news = [...days]
        news[i] = {...news[i], open: !news[i].open}
        setDays(news)
        setActivePreset("")
    }

    const changeHour = (i: number, field: string, value: string) => {
        const news = [...days]
        news[i] = {...news[i], [field]: value}
        setDays(news)
        setActivePreset("")
    }


    return (
        <div>
            <StepHeader
                steps="passo 4 de 5"
                title="Horário de funcionamento"
                subtitle="Fora destes horários, a Vitryne fecha a loja automaticamente."
            />

            <div className="flex items-center gap-3">
                {PRESETS.map((preset) => {
                    const active = activePreset === preset.name

                    return (
                        <button
                            key={preset.name}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            aria-pressed={active}
                            className={`cursor-pointer px-5 py-3 border rounded-xl font-semibold text-primary-deep text-[.9rem] ${
                                active
                                    ? "border-primary bg-primary-soft text-primary-strong"
                                    : "border-border-strong bg-surface text-primary-deep hover:border-primary hover:bg-primary/10"
                            }`}
                        >
                            {preset.name}
                        </button>
                    )
                })}
            </div>

            <div className="rounded-xl border border-border bg-surface px-5 py-2 mt-6">    
                <div className="flex items-center gap-8 border-b border-border py-2">
                    <span className="w-24" />
                    <span className="w-32" />
                    <span className="flex-1 text-[11px] uppercase tracking-wider text-center text-text-terciary">
                        Manhã
                    </span>
                    <span className="flex-1 text-[11px] uppercase tracking-wider text-center text-text-terciary">
                        Tarde
                    </span>
                </div>


                {days.map((day, i) => (
                    <div
                        key={day.name}
                        className={`flex items-center gap-8 border-b border-border py-3 last:border-b-0 transition-opacity ${
                            day.open ? "" : "opacity-60"
                        }`}
                    >
                        <span className="w-24 font-semibold text-[15px] text-text-primary">
                            {day.name}
                        </span>
                        <div className="flex w-32 items-center gap-2">
                            <button
                                type="button"
                                onClick={() => alternateDays(i)}
                                aria-pressed={day.open}
                                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                                    day.open ? "bg-primary" : "bg-border-strong"
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                                        day.open ? "left-5.5" : "left-0.5"
                                    }`}
                                />
                            </button>

                            <span className="text-[13px] text-text-secondary">
                                {day.open ? "Aberto" : "Fechado"}
                            </span>
                        </div>


                        <div className="flex flex-1 items-center gap-2">
                            <input
                                type="time"
                                value={day.openMorning}
                                disabled={!day.open}
                                onChange={(e) => changeHour(i, "openMorning", e.target.value)}
                                className="w-full max-w-30 rounded-[10px] border border-border bg-surface px-3 py-2 text-center text-[14px] text-text-primary outline-none focus:border-primary disabled:bg-screen disabled:text-text-terciary"
                            />
                            <span className="shrink-0 text-[13px] text-text-secondary">até</span>
                            <input
                                type="time"
                                value={day.closeMorning}
                                disabled={!day.open}
                                onChange={(e) => changeHour(i, "closeMorning", e.target.value)}
                                className="w-full max-w-30 rounded-[10px] border border-border bg-surface px-3 py-2 text-center text-[14px] text-text-primary outline-none focus:border-primary disabled:bg-screen disabled:text-text-terciary"
                            />       
                        </div>

                        <div className="flex flex-1 items-center gap-2">
                            <input
                                type="time"
                                value={day.openAfternoon}
                                disabled={!day.open}
                                onChange={(e) => changeHour(i, "openAfternoon", e.target.value)}
                                className="w-full max-w-30 rounded-[10px] border border-border bg-surface px-3 py-2 text-center text-[14px] text-text-primary outline-none focus:border-primary disabled:bg-screen disabled:text-text-terciary"
                            />
                            <span className="shrink-0 text-[13px] text-text-secondary">até</span>
                            <input
                                type="time"
                                value={day.closeAfternoon}
                                disabled={!day.open}
                                onChange={(e) => changeHour(i, "closeAfternoon", e.target.value)}
                                className="w-full max-w-30 rounded-[10px] border border-border bg-surface px-3 py-2 text-center text-[14px] text-text-primary outline-none focus:border-primary disabled:bg-screen disabled:text-text-terciary"
                            />       
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 mt-6 font-semibold text-warning">
                <FiClock size={16} />
                Fora do horário, a Vitryne fecha sua loja automaticamente. Você pode abrir manualmente a qualquer momento.
            </div>

            <div className="flex justify-between pt-17">
                <button 
                    onClick={onBack}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] border  border-border-brand w-35 py-2 font-semibold text-[1rem] text-text-brand transition-all duration-200 ease-in-out hover:bg-screen hover:scale-[1.02] active:scale-95"
                >
                    <FiArrowLeft size={20}/>
                    Voltar
                </button>

                <Button
                    onClick={onNext} 
                    title="Próximo"
                    titleClassName="text-[1rem]"
                    buttonIcon={<FiArrowRight size={20} />}
                    className="cursor-pointer flex items-center justify-center gap-1 rounded-[10px] bg-primary w-35 py-2 font-semibold text-[14px] text-white transition-all duration-200 ease-in-out shadow-[0_8px_24px_rgba(149,48,217,0.35)] hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                />
            </div>
        </div>
    )
}

export default StepBusinessHours