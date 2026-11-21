import type { StoreProfile } from "@/components/features/panel/store-profile/types";

export const STORE_PROFILE_MOCK: StoreProfile = {
  name: "Atelier Norte",
  description:
    "Moda contemporânea em peças atemporais, produção autoral em Maringá. Atendimento exclusivo via vitrine digital, com entrega no mesmo dia.",
  mainCategory: "Moda feminina",
  tags: ["Vestidos", "Blazers", "Saias"],
  phone: "(44) 99421-8842",
  whatsapp: "(44) 99421-8842",
  email: "contato@ateliernorte.com.br",
  address: {
    cep: "87020-190",
    street: "R. Paranaguá",
    number: "123",
    neighborhood: "Jardim das Flores",
    city: "Maringá",
    state: "PR",
  },
  instagram: "@ateliernorte",
  tiktok: "@ateliernorte",
  pinterest: "",
  website: "ateliernorte.com.br",
  coverImage: "/bg_loja.jpg",
  logoImage: "/Logo_AtelierNorte.jpg",
  rating: 4.9,
  reviewsCount: 1254,
  distanceKm: 1.2,
  deliveryTime: "45-60 min",
};
