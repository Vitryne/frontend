import ButtonPrimary from "@/components/ui/button-primary";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import SelectField from "@/components/ui/select-field";
import Textarea from "@/components/ui/textarea";
import { PRODUCTS_MOCK } from "@/mocks/products-mock";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import TagsInput from "./tag-input";
import PhotoGallery, {
  ProductPhoto,
} from "@/components/features/panel/products/components/form/photo-gallery";
import {
  Product,
  ProductStock,
} from "@/components/features/panel/products/types";
import { getTotal } from "@/components/features/panel/products/stock";
import SizesStock from "@/components/features/panel/products/components/form/sizes-stock";
import PriceSection from "./price-section";
import VisibilitySection from "@/components/features/panel/products/components/form/visibility-section";
import StockThresholdModal from "./stock-threshold-modal";
import { ProductStatus } from "@/interfaces/product-interface";
import { toCreateProductDTO, toEditProductDTO } from "@/lib/product-mapper";
import ProductService from "@/service/product-service";

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

interface Props {
  product?: Product;
}

interface FieldErrors {
  name?: string;
  description?: string;
  category?: string;
  price?: string;
  stocks?: string;
}

const SIZES = ["PP", "P", "M", "G", "GG"];

const ProductForm: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const isEdit = product !== undefined;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [tags, setTags] = useState<string[]>(product?.tags ?? []);
  const [photos, setPhotos] = useState<ProductPhoto[]>(() =>
    (product?.images ?? (product ? [product.image] : [])).map((url) => ({
      id: crypto.randomUUID(),
      url,
    })),
  );
  const [stock, setStock] = useState<ProductStock[]>(
    product?.stock && product.stock.length > 0
      ? product.stock
      : SIZES.map((size) => ({ size, quantity: 0 })),
  );
  const totalStock = getTotal(stock);
  const [priceInCents, setPriceInCents] = useState(product?.priceInCents ?? 0);
  const [active, setActive] = useState(product?.active ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  const [alertThreshold, setAlertThreshold] = useState(
    product?.stockAlertThreshold ?? 3,
  );
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categoryOptions =
    category && !CATEGORIES.includes(category)
      ? [...CATEGORIES, category].sort()
      : CATEGORIES;

  const validate = (): boolean => {
    const nextErrors: FieldErrors = {};

    if (!name.trim()) {
      nextErrors.name = "O nome do produto é obrigatório.";
    }
    if (!description.trim()) {
      nextErrors.description = "A descrição do produto é obrigatória.";
    }
    if (!category.trim()) {
      nextErrors.category = "Selecione uma categoria.";
    }
    if (priceInCents <= 0) {
      nextErrors.price = "O preço do produto deve ser maior que zero.";
    }
    if (stock.length === 0) {
      nextErrors.stocks = "Informe pelo menos um tamanho de estoque.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const applyApiErrors = (err: unknown) => {
    if (!axios.isAxiosError(err)) {
      setFormError("Não foi possível salvar o produto. Tente novamente.");
      return;
    }

    const data = err.response?.data as
      | {
          message?: string;
          detail?: string;
          fields?: Record<string, string>;
        }
      | undefined;

    const apiFields = data?.fields;
    if (apiFields && Object.keys(apiFields).length > 0) {
      const mappedErrors: FieldErrors = {};

      if (apiFields.name) mappedErrors.name = apiFields.name;
      if (apiFields.description)
        mappedErrors.description = apiFields.description;
      if (apiFields.type) mappedErrors.category = apiFields.type;
      if (apiFields.price) mappedErrors.price = apiFields.price;

      const stockFieldKey = Object.keys(apiFields).find((key) =>
        key.startsWith("stocks"),
      );
      if (stockFieldKey) {
        mappedErrors.stocks = apiFields[stockFieldKey];
      }

      setFieldErrors(mappedErrors);
    }

    const detailMessage = data?.detail ?? data?.message;
    if (detailMessage) {
      if (detailMessage.toLowerCase().includes("preço")) {
        setFieldErrors((prev) => ({ ...prev, price: detailMessage }));
      } else if (detailMessage.toLowerCase().includes("nome")) {
        setFieldErrors((prev) => ({ ...prev, name: detailMessage }));
      } else if (detailMessage.toLowerCase().includes("descrição")) {
        setFieldErrors((prev) => ({ ...prev, description: detailMessage }));
      } else if (detailMessage.toLowerCase().includes("tipo")) {
        setFieldErrors((prev) => ({ ...prev, category: detailMessage }));
      } else if (
        detailMessage.toLowerCase().includes("estoque") ||
        detailMessage.toLowerCase().includes("tamanho")
      ) {
        setFieldErrors((prev) => ({ ...prev, stocks: detailMessage }));
      }
      setFormError(detailMessage);
      return;
    }

    setFormError("Não foi possível salvar o produto. Tente novamente.");
  };

  const syncEditedStocks = async (productId: number) => {
    const service = ProductService();
    const initialStocksById = new Map(
      (product?.stock ?? [])
        .filter((item) => item.id !== undefined)
        .map((item) => [item.id as number, item]),
    );

    for (const item of stock) {
      if (item.id === undefined) {
        await service.addStock(productId, {
          size: item.size,
          quantity: item.quantity,
        });
        continue;
      }

      const initial = initialStocksById.get(item.id);
      if (!initial || item.quantity === initial.quantity) continue;

      if (item.quantity > initial.quantity) {
        await service.replenishStock(productId, item.id, {
          quantity: item.quantity - initial.quantity,
        });
      } else {
        await service.adjustStock(productId, item.id, {
          quantity: item.quantity,
          version: item.version ?? initial.version ?? 0,
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setFormError("");
    if (!validate()) return;

    setSubmitting(true);
    const service = ProductService();
    const formValues = {
      name,
      description,
      category,
      color: product?.color,
      priceInCents,
      stockAlertThreshold: alertThreshold,
      photoUrls: photos.map((photo) => photo.url),
      stock,
    };

    try {
      if (isEdit && product.id !== undefined) {
        await service.editProduct(product.id, toEditProductDTO(formValues));
        await syncEditedStocks(product.id);

        if (active !== product.active) {
          await service.alterStatus(product.id, {
            status: active ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
          });
        }
      } else {
        const created = await service.createProduct(
          toCreateProductDTO(formValues),
        );

        if (!active) {
          await service.alterStatus(created.id, {
            status: ProductStatus.INACTIVE,
          });
        }
      }

      router.push("/products");
    } catch (err) {
      applyApiErrors(err);
    } finally {
      setSubmitting(false);
    }
  };

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
            {isEdit ? "Descartar" : "Cancelar"}
          </Link>
          <ButtonPrimary
            title={
              submitting
                ? "Salvando..."
                : isEdit
                  ? "Salvar alterações"
                  : "Cadastrar produto"
            }
            onClick={handleSubmit}
          />
        </div>
      </div>

      {formError && (
        <p className="mb-4 text-[13px] font-semibold text-danger">
          {formError}
        </p>
      )}

      <div className="flex items-start gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Card title="Informações básicas">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3.5">
                <div className="min-w-0 flex-1">
                  <Input
                    title="Nome do produto *"
                    placeholder="Ex.: Vestido midi floral"
                    value={name}
                    onChange={(value) => {
                      setName(value);
                      if (fieldErrors.name) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          name: undefined,
                        }));
                      }
                    }}
                    error={fieldErrors.name}
                  />
                </div>

                <div className="w-55 shrink-0">
                  <Input
                    title="SKU"
                    placeholder="Gerado ao cadastrar"
                    disabled
                    defaultValue={product?.sku}
                  />
                  <p className="mt-1.5 text-[12px] text-text-tertiary">
                    Gerado automaticamente
                  </p>
                </div>
              </div>

              <div>
                <Textarea
                  title="Descrição *"
                  placeholder="Descreva a peça: tecido, caimento, composição e cuidados de lavagem."
                  value={description}
                  onChange={(value) => {
                    setDescription(value);
                    if (fieldErrors.description) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        description: undefined,
                      }));
                    }
                  }}
                />
                {fieldErrors.description && (
                  <p className="mt-1.5 text-[12px] text-danger">
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <SelectField
                    title="Categoria *"
                    placeholder="Selecione uma categoria"
                    listTitle="Categoria"
                    options={categoryOptions}
                    value={category}
                    onChange={(value) => {
                      setCategory(value);
                      if (fieldErrors.category) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          category: undefined,
                        }));
                      }
                    }}
                    error={!!fieldErrors.category}
                  />
                  {fieldErrors.category && (
                    <p className="mt-1.5 text-[12px] text-danger">
                      {fieldErrors.category}
                    </p>
                  )}
                </div>

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
                ? `${totalStock} ${totalStock === 1 ? "unidade" : "unidades"} · alerta em ${alertThreshold} unidades`
                : `Informe a quantidade por tamanho · alerta em ${alertThreshold} unidades`
            }
          >
            <SizesStock
              stock={stock}
              alertThreshold={alertThreshold}
              onChange={(nextStock) => {
                setStock(nextStock);
                if (fieldErrors.stocks) {
                  setFieldErrors((prev) => ({ ...prev, stocks: undefined }));
                }
              }}
              onConfigureThreshold={() => setThresholdModalOpen(true)}
            />
            {fieldErrors.stocks && (
              <p className="mt-1.5 text-[12px] text-danger">
                {fieldErrors.stocks}
              </p>
            )}
          </Card>
        </div>

        <div className="flex w-85 shrink-0 flex-col gap-4">
          <Card title="Preço">
            <PriceSection
              priceInCents={priceInCents}
              onChange={(value) => {
                setPriceInCents(value);
                if (fieldErrors.price) {
                  setFieldErrors((prev) => ({ ...prev, price: undefined }));
                }
              }}
              isEdit={isEdit}
              promotion={product?.promotion}
            />
            {fieldErrors.price && (
              <p className="mt-1.5 text-[12px] text-danger">
                {fieldErrors.price}
              </p>
            )}
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

      <StockThresholdModal
        open={thresholdModalOpen}
        subtitle={
          product ? `${product.name} · SKU ${product.sku}` : "Novo produto"
        }
        currentThreshold={alertThreshold}
        otherProductsCount={PRODUCTS_MOCK.length - 1}
        onCancel={() => setThresholdModalOpen(false)}
        onSave={(threshold) => {
          setAlertThreshold(threshold);
          setThresholdModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProductForm;
