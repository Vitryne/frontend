

interface Props {
    onNext: () => void
}

const StepBusinessHours: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente horarios</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepBusinessHours