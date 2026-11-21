import type { StoreProfile } from "@/components/features/panel/store-profile/types";
import ButtonSecondary from "@/components/ui/button-secondary";
import Image from "next/image";
import { LuUpload } from "react-icons/lu";

interface Props {
  profile: StoreProfile;
}

const CoverLogoCard: React.FC<Props> = ({ profile }) => {
  return (
    <div className="rounded-[14px] border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          Capa & logo
        </h2>
        <span className="text-[12px] text-text-tertiary">
          A capa aparece no topo da página da loja no App.
        </span>
      </div>

      <div className="relative mt-4 h-52 overflow-hidden rounded-xl">
        <Image
          src={profile.coverImage}
          alt={`Capa da ${profile.name}`}
          fill
          sizes="800px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        <ButtonSecondary
          title="Trocar capa"
          btnIcon={<LuUpload size={14} />}
          iconPosition="left"
          className="absolute top-3 right-3 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-surface px-3 text-[12px] font-semibold text-text-primary shadow-sm transition-colors hover:bg-surface-subtle"
        />

        <div className="absolute bottom-4 left-5">
          <p className="font-display text-[22px] font-bold text-white">
            {profile.name}
          </p>
          <p className="text-[12px] text-white/80">
            {profile.mainCategory} · {profile.address.city}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Image
          src={profile.logoImage}
          alt={`Logo da ${profile.name}`}
          width={64}
          height={64}
          className="size-16 rounded-xl object-cover"
        />
        <div>
          <p className="text-[13px] font-semibold text-text-primary">
            Logo da loja
          </p>
          <ButtonSecondary
            title="Substituir logo"
            btnIcon={<LuUpload size={14} />}
            iconPosition="left"
            className="mt-1.5 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-surface-subtle px-3 text-[12px] font-semibold text-text-primary transition-colors hover:bg-border"
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLogoCard;
