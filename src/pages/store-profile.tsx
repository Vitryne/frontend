import PanelLayout from "@/components/features/panel/components/panel-layout";
import ContactCard from "@/components/features/panel/store-profile/components/contact-card";
import CoverLogoCard from "@/components/features/panel/store-profile/components/cover-logo-card";
import ImageUploadModal, { ImageType } from "@/components/features/panel/store-profile/components/img-upload-modal";
import PublicIdentityCard from "@/components/features/panel/store-profile/components/public-identity-card";
import SocialCard from "@/components/features/panel/store-profile/components/social-card";
import StorePreviewCard from "@/components/features/panel/store-profile/components/store-preview-card";
import { StoreProfile } from "@/components/features/panel/store-profile/types";
import { STORE_PROFILE_MOCK } from "@/mocks/store-profile-mock";
import { useState } from "react";

const StoreProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StoreProfile>(STORE_PROFILE_MOCK);
  const [imageModal, setImageModal] = useState<ImageType | null>(null)

  const handleChange = (data: Partial<StoreProfile>) => {
    setProfile((current) => ({ ...current, ...data }));
  };

  const handleImageConfirm = (url: string) => {
    handleChange(
      imageModal === "cover" ? { coverImage: url } : { logoImage: url },
    );
    setImageModal(null);
  };

  return (
    <PanelLayout
      title="Perfil da loja"
      subtitle="Como sua loja aparece para os clientes na vitrine"
    >
      <div className="grid grid-cols-[1fr_360px] items-start gap-5">
        <div className="flex flex-col gap-4">
          <CoverLogoCard 
            profile={profile}
            onChangeCover={() => setImageModal("cover")}
            onChangeLogo={() => setImageModal("logo")}
          />
          <PublicIdentityCard profile={profile} onChange={handleChange} />
          <ContactCard profile={profile} onChange={handleChange} />
          <SocialCard profile={profile} onChange={handleChange} />
        </div>

        <StorePreviewCard profile={profile} />
      </div>

      <ImageUploadModal
        type={imageModal}
        currentImage={
          imageModal === "logo" ? profile.logoImage : profile.coverImage
        }
        onClose={() => setImageModal(null)}
        onConfirm={handleImageConfirm}
      />
    </PanelLayout>
  );
};

export default StoreProfilePage;
