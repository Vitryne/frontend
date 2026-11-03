import { BankAccountType } from "@/interfaces/register-interface";

export interface BusinessDay {
  name: string;
  open: boolean;
  openMorning: string;
  closeMorning: string;
  openAfternoon: string;
  closeAfternoon: string;
}

export const openDay = (
  name: string,
  openMorning: string,
  closeMorning: string,
  openAfternoon = "",
  closeAfternoon = "",
): BusinessDay => ({
  name,
  open: true,
  openMorning,
  closeMorning,
  openAfternoon,
  closeAfternoon,
});

export const closedDay = (name: string): BusinessDay => ({
  name,
  open: false,
  openMorning: "",
  closeMorning: "",
  openAfternoon: "",
  closeAfternoon: "",
});

export const DEFAULT_BUSINESS_DAYS: BusinessDay[] = [
  openDay("Segunda", "09:00", "12:00", "13:30", "20:00"),
  openDay("Terça", "09:00", "12:00", "13:30", "20:00"),
  openDay("Quarta", "09:00", "12:00", "13:30", "20:00"),
  openDay("Quinta", "09:00", "12:00", "13:30", "20:00"),
  openDay("Sexta", "09:00", "12:00", "13:30", "22:00"),
  openDay("Sábado", "10:00", "13:00"),
  closedDay("Domingo"),
];

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  cnpj: string;
  phone: string;
  legalName: string;
  description: string;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  acceptedTerms: boolean;
  holderName: string;
  holderDocument: string;
  accountType: BankAccountType;
  bank: string;
  agency: string;
  accountNumber: string;
  pixKey: string;
  mainCategory: string;
  tags: string[];
  deliveryRadiusKm: number;
  preparationTimeMinutes: number;
  businessDays: BusinessDay[];
  hoursPreset: string;
  logoFile: File | null;
  bannerFile: File | null;
}

export const INITIAL_REGISTER_DATA: RegisterFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  cnpj: "",
  phone: "",
  legalName: "",
  description: "",
  zipCode: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  acceptedTerms: false,
  holderName: "",
  holderDocument: "",
  accountType: BankAccountType.CHECKING,
  bank: "",
  agency: "",
  accountNumber: "",
  pixKey: "",
  mainCategory: "",
  tags: [],
  deliveryRadiusKm: 12,
  preparationTimeMinutes: 30,
  businessDays: DEFAULT_BUSINESS_DAYS,
  hoursPreset: "Comercial (Seg-Sex 8h-18h)",
  logoFile: null,
  bannerFile: null,
};

export interface StepProps {
  data: RegisterFormData;
  onChange: (fields: Partial<RegisterFormData>) => void;
  errors: Record<string, string>;
}
