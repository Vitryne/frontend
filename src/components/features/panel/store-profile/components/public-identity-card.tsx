import type { StoreProfile } from "@/components/features/panel/store-profile/types";
import Chip from "@/components/ui/chip";
import Input from "@/components/ui/input";
import SelectField from "@/components/ui/select-field";
import Textarea from "@/components/ui/textarea";
import { STORE_CATEGORIES, STORE_TAGS } from "@/lib/store-options";

interface Props {
  profile: StoreProfile;
  onChange: (data: Partial<StoreProfile>) => void;
}

const PublicIdentityCard: React.FC<Props> = ({ profile, onChange }) => {
  const toggleTag = (tag: string) => {
    onChange({
      tags: profile.tags.includes(tag)
        ? profile.tags.filter((item) => item !== tag)
        : [...profile.tags, tag],
    });
  };

  const tagsCount = profile.tags.length;

  return (
    <div className="rounded-[14px] border border-border bg-surface p-5">
      <h2 className="font-display text-[16px] font-semibold text-text-primary">
        Identidade pública
      </h2>

      <div className="mt-4 flex flex-col gap-4">
        <Input
          title="Nome público *"
          placeholder="Nome da loja"
          value={profile.name}
          onChange={(name) => onChange({ name })}
        />

        <Textarea
          title="Descrição"
          placeholder="Conte o que sua loja oferece"
          rows={3}
          value={profile.description}
          onChange={(description) => onChange({ description })}
        />

        <SelectField
          title="Categoria principal *"
          placeholder="Selecione uma categoria"
          options={STORE_CATEGORIES}
          value={profile.mainCategory}
          onChange={(mainCategory) => onChange({ mainCategory })}
        />

        <div>
          <p className="mb-2 text-[12px] font-semibold text-text-primary">
            Tags da loja
          </p>
          <div className="flex flex-wrap gap-2">
            {STORE_TAGS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                selected={profile.tags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-text-tertiary">
            {`Escolha na lista de tags da Vitryne - ${tagsCount} ${tagsCount === 1 ? "selecionada" : "selecionadas"}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicIdentityCard;