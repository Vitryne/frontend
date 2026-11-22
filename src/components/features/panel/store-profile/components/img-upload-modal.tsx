import ButtonPrimary from "@/components/ui/button-primary";
import ButtonSecondary from "@/components/ui/button-secondary";
import Modal from "@/components/ui/modal";
import Image from "next/image";
import { useState } from "react";
import { LuImage, LuUpload } from "react-icons/lu";

export type ImageType = "cover" | "logo";

interface Props {
  type: ImageType | null;
  currentImage: string;
  onClose: () => void;
  onConfirm: (url: string) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;

const CONFIG = {
  cover: {
    title: "Enviar imagem da capa",
    subtitle: "Troque a capa que aparece na vitrine da sua loja.",
    hint: "JPG · 1600x480px · até 5MB",
    accept: ["image/jpeg"],
    typeError: "Envie uma imagem JPG.",
    currentLabel: "Capa atual",
    newLabel: "Nova capa",
  },
  logo: {
    title: "Enviar imagem da logo",
    subtitle: "Troque a logo que aparece na vitrine da sua loja.",
    hint: "JPG ou PNG · até 5MB · 512x512px mínimo",
    accept: ["image/jpeg", "image/png"],
    typeError: "Envie uma imagem JPG ou PNG.",
    currentLabel: "Logo atual",
    newLabel: "Nova logo",
  },
};

const ImageUploadModal: React.FC<Props> = ({
  type,
  currentImage,
  onClose,
  onConfirm,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  if (!type) return null;

  const config = CONFIG[type];

  const clearPreview = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const selectFile = (file: File | undefined) => {
    if (!file) return;

    clearPreview();

    if (!config.accept.includes(file.type)) {
      setError(config.typeError);
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("A imagem precisa ter até 5MB.");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    clearPreview();
    setError("");
    setIsDragging(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!preview) return;

    onConfirm(preview);
    setPreview(null);
    setError("");
  };

  const dropzone = (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        selectFile(e.dataTransfer.files[0]);
      }}
      className={`flex flex-1 cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-4 transition-colors ${
        error
          ? "border-danger bg-danger-soft"
          : isDragging
            ? "border-primary bg-primary-soft-2"
            : "border-border-brand bg-primary-soft hover:bg-primary-soft-2"
      }`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft-2 text-primary">
        <LuUpload size={18} />
      </span>
      <span>
        <p className="text-[13px] font-semibold text-primary-hover">
          Arraste a nova imagem ou clique para enviar
        </p>
        <p className="text-[11px] text-text-tertiary">{config.hint}</p>
      </span>
      <input
        type="file"
        accept={config.accept.join(",")}
        className="hidden"
        onChange={(e) => {
          selectFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </label>
  );

  return (
    <Modal
      open
      onClose={handleClose}
      title={config.title}
      subtitle={config.subtitle}
      icon={<LuImage size={20} />}
      footer={
        <>
          <ButtonSecondary title="Cancelar" onClick={handleClose} />
          <ButtonPrimary
            title="Enviar imagem"
            onClick={handleConfirm}
            disabled={!preview}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          />
        </>
      }
    >
      <div className="pt-4">
        <p className="mb-2 text-[12px] font-semibold text-text-primary">
          {preview ? config.newLabel : config.currentLabel}
        </p>

        {type === "cover" ? (
          <div className="flex flex-col gap-3">
            <div className="relative h-36 overflow-hidden rounded-xl">
              <Image
                src={preview ?? currentImage}
                alt={config.currentLabel}
                fill
                sizes="560px"
                className="object-cover"
              />
            </div>
            {dropzone}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Image
              src={preview ?? currentImage}
              alt={config.currentLabel}
              width={80}
              height={80}
              className="size-20 shrink-0 rounded-xl object-cover"
            />
            {dropzone}
          </div>
        )}

        {error && <p className="mt-1.5 text-[12px] text-danger">{error}</p>}
      </div>
    </Modal>
  );
};

export default ImageUploadModal;