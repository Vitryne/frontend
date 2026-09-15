

interface Props {
    onNext: () => void
}

const StepCategory: React.FC<Props> = ({onNext}) => {
    return (
        <div>
            <h1>Tela componente categoria e entrega</h1>

            <button onClick={onNext} className="cursor-pointer">
                proximo
            </button>
        </div>
    )
}

export default StepCategory