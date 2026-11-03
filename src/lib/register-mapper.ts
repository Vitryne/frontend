import type { RegisterFormData } from "@/interfaces/register-form";
import type {
  DayOfWeek,
  OpeningPeriodRequestDTO,
  RegisterStoreRequestDTO,
} from "@/interfaces/register-interface";

// essas duas URLS estão indo como padrão por em quanto até eu integrar o CloudFlareR2 no back-end para hospedar imagensß
export const DEFAULT_LOGO_URL = "https://placehold.co/512x512.png";
export const DEFAULT_BANNER_URL = "https://placehold.co/1600x480.png";

const DAY_OF_WEEK: Record<string, DayOfWeek> = {
  Segunda: "MONDAY",
  Terça: "TUESDAY",
  Quarta: "WEDNESDAY",
  Quinta: "THURSDAY",
  Sexta: "FRIDAY",
  Sábado: "SATURDAY",
  Domingo: "SUNDAY",
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const toOpeningPeriods = (
  days: RegisterFormData["businessDays"],
): OpeningPeriodRequestDTO[] =>
  days
    .filter((day) => day.open)
    .flatMap((day) => {
      const dayOfWeek = DAY_OF_WEEK[day.name];

      return [
        { opensAt: day.openMorning, closesAt: day.closeMorning, dayOfWeek },
        { opensAt: day.openAfternoon, closesAt: day.closeAfternoon, dayOfWeek },
      ].filter((period) => period.opensAt && period.closesAt);
    });

export const toRegisterDTO = (
  v: RegisterFormData,
): RegisterStoreRequestDTO => ({
  email: v.email.trim(),
  password: v.password,
  name: v.name.trim(),
  cnpj: onlyDigits(v.cnpj),
  phone: onlyDigits(v.phone),
  legalName: v.legalName.trim(),
  description: v.description.trim(),
  address: {
    zipCode: onlyDigits(v.zipCode),
    street: v.street.trim(),
    number: v.number.trim(),
    complement: "",
    neighborhood: v.neighborhood.trim(),
    city: v.city.trim(),
    state: v.state,
  },
  bankAccount: {
    holderName: v.holderName.trim(),
    holderDocument: onlyDigits(v.holderDocument),
    accountType: v.accountType,
    bankCode: v.bank.split(" · ")[0],
    agency: v.agency.trim(),
    accountNumber: v.accountNumber.trim(),
    pixKey: v.pixKey.trim(),
  },
  mainCategory: v.mainCategory,
  tags: v.tags,
  deliveryRadiusKm: v.deliveryRadiusKm,
  preparationTimeMinutes: v.preparationTimeMinutes,
  openingPeriods: toOpeningPeriods(v.businessDays),
  photoUrl: DEFAULT_LOGO_URL,
  bannerUrl: DEFAULT_BANNER_URL,
});
