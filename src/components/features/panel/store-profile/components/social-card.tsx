import type { StoreProfile } from "@/components/features/panel/store-profile/types";
import Input from "@/components/ui/input";
import { FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";


interface Props {
  profile: StoreProfile
  onChange: (data: Partial<StoreProfile>) => void
}

const SocialCard: React.FC<Props> = ({ profile, onChange}) => {

  const networks = [
    {
      label: "Instagram",
      icon: <FaInstagram size={16} />,
      placeholder: "@sualoja",
      value: profile.instagram,
      onChange: (instagram: string) => onChange({ instagram }),
    },
    {
      label: "TikTok",
      icon: <FaTiktok size={15} />,
      placeholder: "@sualoja",
      value: profile.tiktok,
      onChange: (tiktok: string) => onChange({ tiktok }),
    },
    {
      label: "Pinterest",
      icon: <FaPinterest size={16} />,
      placeholder: "@sualoja",
      value: profile.pinterest,
      onChange: (pinterest: string) => onChange({ pinterest }),
    },
    {
      label: "Website",
      icon: <LuGlobe size={16} />,
      placeholder: "sualoja.com.br",
      value: profile.website,
      onChange: (website: string) => onChange({ website }),
    },
  ];

  return (
    <div className="rounded-[14px] border border-border bg-surface p-5">
      <h2 className="font-display text-[16px] font-semibold text-text-primary">
        Redes sociais
      </h2>

      <ul className="mt-2 divide-y divide-border">
        {networks.map((network) => (
          <li
            key={network.label}
            className="flex items-center justify-between gap-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-surface-subtle text-text-secondary">
                { network.icon }
              </span>
              <span className="text-[13px] font-semibold text-text-primary">
                { network.label }
              </span>
            </div>

            <div className="w-64">
              <Input
                placeholder={network.placeholder}
                value={network.value}
                onChange={network.onChange}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default SocialCard