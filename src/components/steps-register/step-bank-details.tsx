

interface Props {
    onNext: () => void
}

const StepBankDetails: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente dados bancario</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepBankDetails