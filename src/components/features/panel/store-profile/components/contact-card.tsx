import { StoreProfile } from "@/components/features/panel/store-profile/types";
import Input from "@/components/ui/input";
import MaskedInput from "@/components/ui/masked-input";
import { LuPencil } from "react-icons/lu";

interface Props {
  profile: StoreProfile;
  onChange: (data: Partial<StoreProfile>) => void;
}

const ContactCard: React.FC<Props> = ({ profile, onChange }) => {
  const { street, number, neighborhood, city, state } = profile.address;
  const fullAddress = `${street}, ${number} - ${neighborhood} - ${city} - ${state}`;

  return (
    <div className="rounded-[14px] border border-border bg-surface p-5">
      <h2 className="font-display text-[16px] font-semibold text-text-primary">
        Contato e localização
      </h2>

      <div className="mt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <MaskedInput
            title="Telefone"
            mask="(00) 00000-0000"
            placeholder="(44) 99999-9999"
            value={profile.phone}
            onAccept={(phone) => onChange({ phone })}
          />
          <MaskedInput
            title="WhatsApp comercial"
            mask="(00) 00000-0000"
            placeholder="(44) 99999-9999"
            value={profile.whatsapp}
            onAccept={(whatsapp) => onChange({ whatsapp })}
          />
        </div>

        <Input
          title="E-mail público"
          type="email"
          placeholder="contato@sualoja.com.br"
          value={profile.email}
          onChange={(email) => onChange({ email })}
        />

        <div>
          <p className="mb-1.5 text-[12px] font-semibold text-text-primary">
            Endereço
          </p>
          <div className="flex h-11 items-center justify-between gap-3 rounded-xl border border-border-strong bg-surface px-3.5">
            <span className="truncate text-[13px] text-text-secondary">
              {fullAddress}
            </span>
            <button
              type="button"
              className="shrink-0 cursor-pointer text-text-secondary transition-colors hover:text-text-primary"
            >
              <LuPencil size={16} />
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-text-tertiary">
            Ao mudar o endereço, recalculamos o alcance da entrega.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;