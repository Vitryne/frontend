

interface Props {
    onNext: () => void
}

const StepIdentity: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente Identidade visual</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepIdentity