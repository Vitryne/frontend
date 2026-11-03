import Image from "next/image";
import StepHeader from "@/components/features/store-register/components/header";
import { FiUpload } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { StepProps } from "@/interfaces/register-form";

// Gera uma URL temporária para mostrar o preview do arquivo escolhido
const usePreviewUrl = (file: File | null) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const StepIdentity = ({ data, onChange }: StepProps) => {
  const logoPreview = usePreviewUrl(data.logoFile);
  const bannerPreview = usePreviewUrl(data.bannerFile);

  const storeName = data.name || "Nome da loja";
  const subtitle = [data.mainCategory, data.city].filter(Boolean).join(" · ");

  return (
    <div>
      <StepHeader
        title="Identidade visual"
        subtitle="Logo e banner são os primeiros elementos que o cliente vê em sua loja."
      />

      <div>
        <div className="mb-2 flex items-end justify-between">
          <p className="text-[12px] font-semibold text-text-primary">
            Logo da loja
          </p>
          <span className="text-[11px] text-text-tertiary">
            JPG ou PNG · até 5MB · 512x512px mínimo
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-text-primary font-display text-2xl font-bold text-white">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Logo da loja"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              getInitials(data.name) || "?"
            )}
          </div>

          <label className="flex h-20 flex-1 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-border-brand bg-primary-soft px-5 transition-colors hover:bg-primary-soft-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft-2 text-primary">
              <FiUpload size={18} />
            </span>
            <span>
              <p className="text-[13px] font-semibold text-primary-hover">
                Arraste o arquivo ou clique para enviar
              </p>
              <p className="text-[12px] text-text-secondary">
                Use uma versão limpa e legível em fundo claro
              </p>
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={(e) =>
                onChange({ logoFile: e.target.files?.[0] ?? null })
              }
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-end justify-between">
          <p className="text-[12px] font-semibold text-text-primary">
            Banner público
          </p>
          <span className="text-[11px] text-text-tertiary">
            JPG · até 5MB · 1600x480px
          </span>
        </div>

        <div className="relative aspect-1600/480 overflow-hidden rounded-[18px]">
          <Image
            src={bannerPreview ?? "/onboarding.jpg"}
            unoptimized={!!bannerPreview}
            alt="Banner da loja"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-5 left-6 select-none text-white">
            <p className="font-display text-2xl font-bold">{storeName}</p>
            {subtitle && (
              <p className="text-[13px] text-white/80">{subtitle}</p>
            )}
          </div>

          <label className="absolute bottom-5 right-5 flex h-8 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 text-[12px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle">
            <FiUpload size={14} />
            Trocar banner
            <input
              type="file"
              accept="image/jpeg"
              className="hidden"
              onChange={(e) =>
                onChange({ bannerFile: e.target.files?.[0] ?? null })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepIdentity;
