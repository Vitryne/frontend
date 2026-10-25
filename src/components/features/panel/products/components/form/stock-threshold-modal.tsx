import Alert from "@/components/ui/alert";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import CheckBox from "@/components/ui/checkbox";
import Modal from "@/components/ui/modal";
import { useEffect, useId, useRef, useState } from "react";
import { LuPackage } from "react-icons/lu";



interface Props {
  open: boolean;
  subtitle: string;
  currentThreshold: number;
  otherProductsCount: number;
  onCancel: () => void;
  onSave: (threshold: number, applyToAll: boolean) => void;
}

const units = (count: number) => `${count} ${count === 1 ? "unidade" : "unidades"}`;


const StockThresholdModal: React.FC<Props> = ({ 
  open, 
  subtitle, 
  currentThreshold, 
  otherProductsCount, 
  onCancel, 
  onSave 
}) => {

  const id = useId()
  const [threshold, setThreshold] = useState(currentThreshold);
  const inputRef = useRef<HTMLInputElement>(null);
  const [applyToAll, setApplyToAll] = useState(false);

  useEffect(() => {
    if (open) {
      setThreshold(currentThreshold);
      setApplyToAll(false);
    }
  }, [open, currentThreshold]);

  const invalid = threshold < 1;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Limiar de aviso de estoque"
      subtitle={subtitle}
      icon={<LuPackage size={22} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onCancel} />
          <ButtonPrimary
            title="Salvar limiar"
            onClick={() => {
              if (!invalid) onSave(threshold, applyToAll);
            }}
          />
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-4">
        <p className="text-[13px] text-text-secondary">
          Avisamos você quando um tamanho chegar a esta quantidade. O limiar vale só para este produto, a menos que você aplique a toda a loja.
        </p>

        <div>
          <label 
            htmlFor={id}
            className="mb-1.5 block text-[12px] font-semibold text-text-primary"
          >
            Avisar quando restarem *
          </label>

          <div
            onClick={() => inputRef.current?.focus()}
            className="flex h-11 w-56 cursor-text items-center gap-1.5 rounded-xl border border-border-strong bg-surface px-3.5 text-[13px] transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
          >
            <span className="text-text-tertiary">Até</span>
            <input
              ref={inputRef}
              id={id}
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={threshold === 0 ? "" : String(threshold)}
              onChange={(event) =>
                setThreshold(Number(event.target.value.replace(/\D/g, "").slice(0, 3)))
              }
              style={{ width: `${Math.max(1, String(threshold || "").length)}ch` }}
              className="bg-transparent text-text-primary outline-none placeholder:text-text-disabled"
            />
            <span className="text-text-primary">
              {threshold === 1 ? "unidade" : "unidades"}
            </span>
          </div>

          <p
            className={`mt-1.5 text-[12px] ${
              invalid ? "text-danger" : "text-text-tertiary"
            }`}
          >
            {invalid
              ? "Informe pelo menos 1 unidade."
              : `Por tamanho · vigente hoje: ${units(currentThreshold)}`}
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-screen p-4">
          <span className="mt-0.5">
              <CheckBox checked={applyToAll} onChange={setApplyToAll} />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-text-primary">
              Aplicar a todos os produtos da loja
            </span>
            <span className="block text-[12px] text-text-tertiary">
              Substitui o limiar individual definido em cada produto 
            </span>
          </span>
        </label>

        {applyToAll && !invalid && (
          <Alert
            message={`Os limiares de ${otherProductsCount} produtos serão substituídos por ${units(threshold)}.`}
          />
        )}
      </div>
    </Modal>
  )

}



export default StockThresholdModal;