import PanelLayout from "@/components/features/panel/components/panel-layout";
import CoverLogoCard from "@/components/features/panel/store-profile/components/cover-logo-card";
import PublicIdentityCard from "@/components/features/panel/store-profile/components/public-identity-card";
import type { StoreProfile } from "@/components/features/panel/store-profile/types";
import { STORE_PROFILE_MOCK } from "@/mocks/store-profile-mock";
import { useState } from "react";

const StoreProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StoreProfile>(STORE_PROFILE_MOCK);

  const handleChange = (data: Partial<StoreProfile>) => {
    setProfile((current) => ({ ...current, ...data }));
  };

  return (
    <PanelLayout
      title="Perfil da loja"
      subtitle="Como sua loja aparece para os clientes na vitrine"
    >
      <div className="grid grid-cols-[1fr_360px] items-start gap-5">
        <div className="flex flex-col gap-4">
          <CoverLogoCard profile={profile} />
          <PublicIdentityCard profile={profile} onChange={handleChange} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default StoreProfilePage;