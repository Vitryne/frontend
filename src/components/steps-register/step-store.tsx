

interface Props {
    onNext: () => void
}

const StepStore: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente Dados da Loja</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepStore