export interface RegistrationResponseDTO {
  userId: number;
  clientId: number;
  storeId: number;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface RegisterStoreRequestDTO {
  email: string;
  password: string;
  name: string;
  cnpj: string;
  phone: string;
  legalName: string;
  description: string;
  address: AddressRequestDTO;
  bankAccount: StoreBankAccountRequestDTO;
  mainCategory: string;
  tags: string[];
  deliveryRadiusKm: number;
  preparationTimeMinutes: number;
  openingPeriods: OpeningPeriodRequestDTO[];
  photoUrl: string;
  bannerUrl: string;
}

export enum UserRole {
  CONSUMER = "CONSUMER",
  STORE = "STORE",
  DELIVERER = "DELIVERER",
  ADMIN = "ADMIN",
}

export interface AddressRequestDTO {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface StoreBankAccountRequestDTO {
  holderName: string;
  holderDocument: string;
  accountType: BankAccountType;
  bankCode: string;
  agency: string;
  accountNumber: string;
  pixKey: string;
}

export interface OpeningPeriodRequestDTO {
  opensAt: string;
  closesAt: string;
  dayOfWeek: DayOfWeek;
}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export enum BankAccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  PAYMENT = "PAYMENT",
}
