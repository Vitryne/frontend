import type { Category } from "@/components/features/panel/categories/types";

export const CATEGORIES_MOCK: Category[] = [
  {
    name: "Blazers",
    description:
      'Blazers de alfaiataria e oversized. Aparece no menu Feminino da home e na busca por "blazer".',
    visible: true,
    productsCount: 12,
    inStockCount: 10,
    salesThisMonth: 64,
    revenueThisMonthInCents: 2873600,
    products: [
      {
        sku: "VTR-0081",
        name: "Blazer oversize",
        image: "/p_blazer_oversize.jpg",
        priceInCents: 44900,
        stock: 8,
      },
      {
        sku: "VTR-0168",
        name: "Vestido blazer",
        image: "/Vestido_azul.jpg",
        priceInCents: 38900,
        stock: 5,
      },
    ],
  },
  {
    name: "Calças",
    description:
      'Alfaiataria, jeans e linho. Aparece nos menus Feminino e Masculino da home e na busca por "calça".',
    visible: true,
    productsCount: 9,
    inStockCount: 8,
    salesThisMonth: 51,
    revenueThisMonthInCents: 1626900,
    products: [
      {
        sku: "VTR-0088",
        name: "Calça de alfaiataria",
        image: "/p_calca_alfaiataria.jpg",
        priceInCents: 31900,
        stock: 12,
      },
      {
        sku: "VTR-0065",
        name: "Calça jeans reta",
        image: "/cat_calcas.jpg",
        priceInCents: 25900,
        stock: 7,
      },
    ],
  },
  {
    name: "Camisas",
    description:
      'Camisas de linho, sociais e casuais. Aparece nos menus Feminino e Masculino da home e na busca por "camisa".',
    visible: true,
    productsCount: 18,
    inStockCount: 15,
    salesThisMonth: 97,
    revenueThisMonthInCents: 2124300,
    products: [
      {
        sku: "VTR-0138",
        name: "Camisa de linho manga longa",
        image: "/p_camisa_linho.jpg",
        priceInCents: 21900,
        stock: 15,
      },
      {
        sku: "VTR-0069",
        name: "Camisa social branca",
        image: "/cat_camisas.jpg",
        priceInCents: 18900,
        stock: 9,
      },
      {
        sku: "VTR-0171",
        name: "Vestido chemise floral",
        image: "/p_vestido_floral.jpg",
        priceInCents: 22900,
        stock: 7,
      },
    ],
  },
  {
    name: "Jaquetas",
    description:
      'Couro, jeans e corta-vento. Aparece no menu Inverno da home e na busca por "jaqueta".',
    visible: true,
    productsCount: 6,
    inStockCount: 4,
    salesThisMonth: 22,
    revenueThisMonthInCents: 1757800,
    products: [
      {
        sku: "VTR-0121",
        name: "Jaqueta de couro ecológico",
        image: "/p_jaqueta_couro.jpg",
        priceInCents: 79900,
        stock: 3,
      },
      {
        sku: "VTR-0068",
        name: "Jaqueta jeans oversized",
        image: "/cat_jaquetas.jpg",
        priceInCents: 34900,
        stock: 5,
      },
    ],
  },
  {
    name: "Moletons",
    description:
      "Moletons e conjuntos de malha. Fica fora da vitrine até a próxima coleção de inverno.",
    visible: false,
    productsCount: 5,
    inStockCount: 5,
    salesThisMonth: 0,
    revenueThisMonthInCents: 0,
    products: [
      {
        sku: "VTR-0074",
        name: "Moletom oversized",
        image: "/p_moletom.jpg",
        priceInCents: 28900,
        stock: 11,
      },
      {
        sku: "VTR-0062",
        name: "Moletom canelado",
        image: "/cat_moletons.jpg",
        priceInCents: 24900,
        stock: 6,
      },
      {
        sku: "VTR-0175",
        name: "Vestido moletom",
        image: "/p_moletom.jpg",
        priceInCents: 19900,
        stock: 0,
      },
    ],
  },
  {
    name: "Saias",
    description:
      'Midi, plissadas e de cetim. Aparece no menu Feminino da home e na busca por "saia".',
    visible: true,
    productsCount: 7,
    inStockCount: 6,
    salesThisMonth: 43,
    revenueThisMonthInCents: 769700,
    products: [
      {
        sku: "VTR-0109",
        name: "Saia plissada midi",
        image: "/p_saia_plissada.jpg",
        priceInCents: 17900,
        stock: 10,
      },
      {
        sku: "VTR-0067",
        name: "Saia midi de cetim",
        image: "/cat_saias.jpg",
        priceInCents: 22900,
        stock: 4,
      },
    ],
  },
  {
    name: "Tênis",
    description:
      'Tênis casuais e esportivos. Aparece no menu Calçados da home e na busca por "tênis".',
    visible: true,
    productsCount: 4,
    inStockCount: 3,
    salesThisMonth: 29,
    revenueThisMonthInCents: 1592100,
    products: [
      {
        sku: "VTR-0096",
        name: "Tênis branco minimalista",
        image: "/p_tenis_branco.jpg",
        priceInCents: 54900,
        stock: 6,
      },
      {
        sku: "VTR-0066",
        name: "Tênis de corrida leve",
        image: "/cat_tenis.jpg",
        priceInCents: 49900,
        stock: 2,
      },
    ],
  },
  {
    name: "Vestidos",
    description:
      'Peças midi e longas em tecidos leves. Aparece no menu Feminino da home e na busca por "vestido".',
    visible: true,
    productsCount: 24,
    inStockCount: 21,
    salesThisMonth: 186,
    revenueThisMonthInCents: 1240000,
    products: [
      {
        sku: "VTR-AN-289",
        name: "Vestido midi seda fluida",
        image: "/p_vestido_seda.jpg",
        priceInCents: 28900,
        stock: 14,
      },
      {
        sku: "VTR-AN-249",
        name: "Vestido floral verão",
        image: "/p_vestido_floral.jpg",
        priceInCents: 24900,
        stock: 10,
      },
      {
        sku: "VTR-AN-319",
        name: "Vestido alça crepe",
        image: "/cat_vestidos.jpg",
        priceInCents: 31900,
        stock: 6,
      },
      {
        sku: "VTR-AN-269",
        name: "Vestido midi pregueado",
        image: "/Vestido_Branco.jpg",
        priceInCents: 26900,
        stock: 4,
      },
    ],
  },
];

export const PLATFORM_CATEGORIES_MOCK: string[] = [
  "Acessórios",
  "Bermudas",
  "Blazers",
  "Blusas",
  "Bolsas",
  "Calças",
  "Camisas",
  "Jaquetas",
  "Macacões",
  "Moda praia",
  "Moletons",
  "Saias",
  "Shorts",
  "Tênis",
  "Tricôs",
  "Vestidos",
];
