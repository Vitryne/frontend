

interface Props {
    onNext: () => void
}

const StepFirstProduct: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente primeiro produto</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepFirstProduct