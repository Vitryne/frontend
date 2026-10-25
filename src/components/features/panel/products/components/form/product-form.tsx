import ButtonPrimary from "@/components/ui/button-primary";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import SelectField from "@/components/ui/select-field";
import Textarea from "@/components/ui/textarea";
import { PRODUCTS_MOCK } from "@/mocks/products-mock";
import Link from "next/link";
import { useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import TagsInput from "./tag-input";
import PhotoGallery, {
  ProductPhoto,
} from "@/components/features/panel/products/components/form/photo-gallery";
import { ProductStock } from "@/components/features/panel/products/types";
import { getTotal } from "@/components/features/panel/products/stock";
import SizesStock from "./sizes-stock";
import PriceSection from "./price-section";
import VisibilitySection from "@/components/features/panel/products/components/form/visibility-section";

const CATEGORIES = [
  ...new Set(PRODUCTS_MOCK.map((product) => product.category)),
].sort();

const TAG_SUGGESTIONS = [
  "floral",
  "midi",
  "verão 2026",
  "festa",
  "linho",
  "viscose",
  "básico",
];

const SIZES = ["PP", "P", "M", "G", "GG"];

const ProductForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<ProductPhoto[]>([]);
  const [stock, setStock] = useState<ProductStock[]>(
    SIZES.map((size) => ({ size, quantity: 0 })),
  );
  const totalStock = getTotal(stock);
  const [priceInCents, setPriceInCents] = useState(0);
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:underline"
        >
          <LuChevronLeft size={16} />
          Voltar para produtos
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-[10px] border border-primary/30 bg-white px-5 py-2.5 text-[14px] font-semibold text-primary transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/5 active:scale-95"
          >
            Cancelar
          </Link>
          <ButtonPrimary title="Cadastrar produto" />
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Card title="Informações básicas">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <div className="min-w-0 flex-1">
                  <Input
                    title="Nome do produto *"
                    placeholder="Ex.: Vestido midi floral"
                  />
                </div>

                <div className="w-55 shrink-0">
                  <Input
                    title="SKU"
                    placeholder="Gerado ao cadastrar"
                    disabled
                  />
                  <p className="mt-1.5 text-[12px] text-text-tertiary">
                    Gerado automaticamente
                  </p>
                </div>
              </div>

              <Textarea
                title="Descrição *"
                placeholder="Descreva a peça: tecido, caimento, composição e cuidados de lavagem."
              />

              <div className="grid grid-cols-2 gap-3.5">
                <SelectField
                  title="Categoria *"
                  placeholder="Selecione uma categoria"
                  listTitle="Categoria"
                  options={CATEGORIES}
                  value={category}
                  onChange={setCategory}
                />

                <TagsInput
                  title="Tags"
                  suggestions={TAG_SUGGESTIONS}
                  value={tags}
                  onChange={setTags}
                />
              </div>
            </div>
          </Card>

          <Card
            title="Galeria de fotos"
            aside={`${photos.length} de 8 fotos · JPG, PNG ou WebP até 5 MB`}
          >
            <PhotoGallery photos={photos} onChange={setPhotos} />
          </Card>

          <Card
            title="Tamanhos e estoque"
            aside={
              totalStock > 0
                ? `${totalStock} ${totalStock === 1 ? "unidade" : "unidades"} · alerta em 3 unidades`
                : `Informe a quantidade por tamanho · alerta em 3 unidades`
            }
          >
            <SizesStock stock={stock} alertThreshold={3} onChange={setStock} />
          </Card>
        </div>

        <div className="flex w-85 shrink-0 flex-col gap-4">
          <Card title="Preço">
            <PriceSection
              priceInCents={priceInCents}
              onChange={setPriceInCents}
            />
          </Card>

          <Card title="Visibilidade">
            <VisibilitySection
              active={active}
              onActiveChange={setActive}
              featured={featured}
              onFeaturedChange={setFeatured}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
