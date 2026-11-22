import type { StoreAddress } from "@/components/features/panel/store-profile/types";
import Alert from "@/components/ui/alert";
import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Input from "@/components/ui/input";
import MaskedInput from "@/components/ui/masked-input";
import Modal from "@/components/ui/modal";
import SelectUf from "@/components/ui/select-uf";
import { useState } from "react";
import { LuMapPin } from "react-icons/lu";

interface Props {
  address: StoreAddress;
  onClose: () => void;
  onConfirm: (address: StoreAddress) => void;
}

type AddressErrors = Partial<Record<keyof StoreAddress, string>>;

const getAddressErrors = (address: StoreAddress): AddressErrors => ({
  cep: address.cep.length < 9 ? "Informe o CEP completo" : undefined,
  street: address.street.trim() ? undefined : "Informe o endereço",
  number: address.number.trim() ? undefined : "Informe o número",
  neighborhood: address.neighborhood.trim() ? undefined : "Informe o bairro",
  city: address.city.trim() ? undefined : "Informe a cidade",
  state: address.state ? undefined : "Selecione a UF",
});

const AddressModal: React.FC<Props> = ({ address, onClose, onConfirm }) => {
  const [draft, setDraft] = useState<StoreAddress>(address);
  const [submitted, setSubmitted] = useState(false);

  const errors = submitted ? getAddressErrors(draft) : {};

  const update = (data: Partial<StoreAddress>) => {
    setDraft((current) => ({ ...current, ...data }));
  };

  const handleSave = () => {
    setSubmitted(true);

    const currentErrors = getAddressErrors(draft);
    if (Object.values(currentErrors).some(Boolean)) return;

    onConfirm(draft);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Alterar endereço da loja"
      subtitle="É o ponto usado na busca por proximidade e de onde saem as entregas."
      icon={<LuMapPin size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={onClose} />
          <ButtonPrimary title="Salvar endereço" onClick={handleSave} />
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-4">
        <Alert
          variant="info"
          message="Ao salvar, recalculamos as coordenadas e o alcance da entrega da loja."
        />

        <div className="grid grid-cols-[140px_1fr] items-start gap-4">
          <MaskedInput
            title="CEP *"
            mask="00000-000"
            placeholder="00000-000"
            value={draft.cep}
            onAccept={(cep) => update({ cep })}
            error={errors.cep}
          />
          <Input
            title="Endereço *"
            placeholder="Rua, avenida..."
            value={draft.street}
            onChange={(street) => update({ street })}
            error={errors.street}
          />
        </div>

        <div className="grid grid-cols-[140px_1fr] items-start gap-4">
          <Input
            title="Número *"
            placeholder="123"
            value={draft.number}
            onChange={(number) => update({ number })}
            error={errors.number}
          />
          <Input
            title="Bairro *"
            placeholder="Bairro"
            value={draft.neighborhood}
            onChange={(neighborhood) => update({ neighborhood })}
            error={errors.neighborhood}
          />
        </div>

        <div className="grid grid-cols-[1fr_110px] items-start gap-4">
          <Input
            title="Cidade *"
            placeholder="Cidade"
            value={draft.city}
            onChange={(city) => update({ city })}
            error={errors.city}
          />
          <div>
            <SelectUf
              title="UF *"
              value={draft.state}
              onChange={(state) => update({ state })}
              error={!!errors.state}
            />
            {errors.state && (
              <p className="mt-1.5 text-[12px] text-danger">{errors.state}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
