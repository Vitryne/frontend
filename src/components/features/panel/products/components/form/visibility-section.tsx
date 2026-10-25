import Badge from "@/components/ui/badge";
import Switch from "@/components/ui/switch";

interface Props {
  active: boolean;
  onActiveChange: (active: boolean) => void;
  featured: boolean;
  onFeaturedChange: (featured: boolean) => void;
}

const VisibilitySection: React.FC<Props> = ({
  active,
  onActiveChange,
  featured,
  onFeaturedChange,
}) => {
  return (
    <ul className="flex flex-col divide-y divide-border border-t border-border">
      <li className="flex items-center justify-between py-2.5 first:pt-0">
        <span className="text-[13px] text-text-primary">Ativo no catálogo</span>
        <Switch checked={active} onChange={onActiveChange} />
      </li>

      <li className="flex items-center justify-between py-2.5">
        <span className="text-[13px] text-text-primary">Destaque na home</span>

        <Switch checked={featured} onChange={onFeaturedChange} />
      </li>

      <li className="flex items-center justify-between py-2.5 last:pb-0">
        <span className="text-[13px] text-text-disabled">
          Aceitar pré-encomenda
        </span>
        <Badge title="Em breve" />
      </li>
    </ul>
  );
};

export default VisibilitySection;
