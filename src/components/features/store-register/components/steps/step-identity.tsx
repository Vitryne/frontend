import Image from "next/image";
import StepHeader from "@/components/features/store-register/components/header";
import { FiUpload } from "react-icons/fi";

const StepIdentity = () => {
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
          <div className="flex size-20 shrink-0 items-center justify-center rounded-[18px] bg-text-primary font-display text-2xl font-bold text-white">
            AN
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
            src="/onboarding.jpg"
            alt="Banner da loja"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-5 left-6 select-none text-white">
            <p className="font-display text-2xl font-bold">Atelier Norte</p>
            <p className="text-[13px] text-white/80">Moda feminina · Maringá</p>
          </div>

          <label className="absolute bottom-5 right-5 flex h-8 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 text-[12px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle">
            <FiUpload size={14} />
            Trocar banner
            <input type="file" accept="image/jpeg" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepIdentity;
