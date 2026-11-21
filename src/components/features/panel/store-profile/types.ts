export interface StoreAddress {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface StoreProfile {
  name: string;
  description: string;
  mainCategory: string;
  tags: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: StoreAddress;
  instagram: string;
  tiktok: string;
  pinterest: string;
  website: string;
  coverImage: string;
  logoImage: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  deliveryTime: string;
}