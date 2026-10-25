import Image from "next/image";
import React, { useRef, useState } from "react";
import { LuGripVertical, LuTrash2, LuUpload } from "react-icons/lu";

export interface ProductPhoto {
  id: string;
  url: string;
}

interface Props {
  photos: ProductPhoto[];
  onChange: (photos: ProductPhoto[]) => void;
}

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const PhotoGallery: React.FC<Props> = ({ photos, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const valid = Array.from(files).filter(
      (file) => ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_SIZE,
    );
    const accepted = valid.slice(0, 8 - photos.length);
    const ignored = files.length - accepted.length;

    setError(
      ignored > 0
        ? `${ignored} arquivo(s) ignorado(s). Envie JPG, PNG ou WebP de até 5 MB, no máximo 8 fotos.`
        : "",
    );

    if (accepted.length === 0) return;

    onChange([
      ...photos,
      ...accepted.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const removePhoto = (id: string) => {
    const photo = photos.find((item) => item.id === id);
    if (photo) URL.revokeObjectURL(photo.url);

    onChange(photos.filter((item) => item.id !== id));
    setError("");
  };

  const movePhoto = (fromId: string, toId: string) => {
    if (fromId === toId) return;

    const from = photos.findIndex((item) => item.id === fromId);
    const to = photos.findIndex((item) => item.id === toId);

    const reordered = [...photos];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);

    onChange(reordered);
  };

  const resetDrag = () => {
    setDraggedId(null);
    setOverId(null);
  };

  const dropHandlers = {
    onClick: () => inputRef.current?.click(),
    onDragOver: (event: React.DragEvent) => {
      if (draggedId) return;
      event.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);
      addFiles(event.dataTransfer.files);
    },
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {photos.length === 0 ? (
        <button
          type="button"
          {...dropHandlers}
          className={`flex w-full items-center gap-4 px-5 py-6 text-left cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
            dragging
              ? "border-primary bg-primary-soft-2"
              : "border-border-brand bg-primary-soft hover:border-primary"
          }`}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft-2 text-primary">
            <LuUpload size={20} />
          </span>

          <span>
            <span className="block text-[14px] font-semibold text-primary-hover">
              Arraste as fotos ou clique para enviar
            </span>
            <span className="block text-[12px] text-text-tertiary">
              Envie até 8 fotos. A primeira será a capa do produto na vitrine.
            </span>
          </span>
        </button>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              draggable
              onDragStart={(event) => {
                setDraggedId(photo.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(event) => {
                if (!draggedId) return;
                event.preventDefault();
                setOverId(photo.id);
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (draggedId) movePhoto(draggedId, photo.id);
                resetDrag();
              }}
              onDragEnd={resetDrag}
              className={`relative aspect-4/5 cursor-grab overflow-hidden rounded-xl border-2 transition-opacity active:cursor-grabbing ${
                i === 0 ? "border-primary" : "border-transparent"
              } ${draggedId === photo.id ? "opacity-40" : ""} ${
                overId === photo.id && draggedId !== photo.id
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
            >
              <Image
                src={photo.url}
                alt=""
                fill
                unoptimized
                draggable={false}
                className="object-cover"
              />

              <span className="absolute left-1.5 top-1.5 flex size-7 items-center justify-center rounded-md bg-surface/90 text-text-secondary">
                <LuGripVertical size={14} />
              </span>

              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute right-1.5 top-1.5 flex size-7 cursor-pointer items-center justify-center rounded-md bg-surface/90 text-danger transition-colors hover:bg-surface"
              >
                <LuTrash2 size={14} />
              </button>

              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-on-brand">
                  Capa
                </span>
              )}
            </div>
          ))}

          {photos.length < 8 && (
            <button
              type="button"
              {...dropHandlers}
              className={`flex aspect-4/5 flex-col items-center justify-center gap-2 cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
                dragging
                  ? "border-primary bg-primary-soft-2"
                  : "border-border-brand bg-primary-soft hover:border-primary"
              }`}
            >
              <LuUpload size={18} className="text-primary" />
              <span className="text-[12px] font-semibold text-primary-hover">
                Enviar fotos
              </span>
            </button>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-[12px] text-danger">{error}</p>}
    </div>
  );
};

export default PhotoGallery;
