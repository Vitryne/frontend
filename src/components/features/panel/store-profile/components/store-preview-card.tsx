import type { StoreProfile } from "@/components/features/panel/store-profile/types";
import Badge from "@/components/ui/badge";
import Image from "next/image";
import {
  LuArrowLeft,
  LuCheck,
  LuHeart,
  LuMapPin,
  LuSend,
  LuShoppingBag,
  LuStar,
  LuTruck,
} from "react-icons/lu";

interface Props {
  profile: StoreProfile;
}

const StorePreviewCard: React.FC<Props> = ({ profile }) => {
  const stats = [
    {
      icon: <LuStar size={14} className="fill-warning text-warning" />,
      value: profile.rating.toLocaleString("pt-BR"),
      label: `${profile.reviewsCount.toLocaleString("pt-BR")} avaliações`,
    },
    {
      icon: <LuMapPin size={14} className="text-primary" />,
      value: `${profile.distanceKm.toLocaleString("pt-BR")} km`,
      label: "distância",
    },
    {
      icon: <LuTruck size={14} className="text-primary" />,
      value: profile.deliveryTime,
      label: "entrega",
    },
  ];

  return (
    <div className="sticky top-8 rounded-[14px] border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[16px] font-semibold text-text-primary">
          Pré-visualização
        </h2>
        <span className="text-[12px] text-text-primary">App do consumidor</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface-subtle pb-3">
        <div className="relative h-32">
          <Image
            src={profile.coverImage}
            alt={`Capa da ${profile.name}`}
            fill
            sizes="360px"
            className="object-cover"
          />
          <div className="absolute inset-x-3 top-3 flex justify-between">
            <span className="flex size-7 items-center justify-center rounded-full bg-surface text-text-primary">
              <LuArrowLeft size={14} />
            </span>
            <div className="flex gap-1.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-surface text-text-primary">
                <LuHeart size={14} />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-surface text-text-primary">
                <LuSend size={14} />
              </span>
              <span className="flex size-7 items-center justify-center rounded-full bg-surface text-text-primary">
                <LuShoppingBag size={14} />
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-3 -mt-8 rounded-xl bg-surface p-3 shadow-md">
          <div className="flex items-center gap-3">
            <Image
              src={profile.logoImage}
              alt={`Logo da ${profile.name}`}
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-display text-[15px] font-bold text-text-primary">
                  {profile.name}
                </p>
                <Badge title="Aberta" variant="success" />
              </div>
              <p className="truncate text-[13px] text-text-primary">
                {profile.mainCategory} - {profile.address.city}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 border-t border-border pt-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="flex items-center justify-center gap-1 text-[12px] font-bold text-text-primary">
                  {stat.icon}
                  {stat.value}
                </p>
                <p className="text-[10px] text-text-tertiary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 flex gap-1.5 text-[11px] text-text-tertiary">
        <LuCheck size={14} className="shrink-0 text-success" />
        Alterações entram no ar em alguns minutos após salvar.
      </p>
    </div>
  );
};

export default StorePreviewCard;
