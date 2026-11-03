import type { RegisterFormData } from "@/interfaces/register-form";

export type StepErrors = Record<string, string>;

const REQUIRED = "Campo obrigatório";

const digits = (value: string) => value.replace(/\D/g, "");
const isBlank = (value: string) => !value.trim();
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const validateStore = (d: RegisterFormData): StepErrors => {
  const errors: StepErrors = {};

  const required = (...fields: (keyof RegisterFormData)[]) =>
    fields.forEach((field) => {
      if (isBlank(String(d[field]))) errors[field] = REQUIRED;
    });

  required("name", "legalName", "street", "number", "neighborhood", "city");

  if (!d.state) errors.state = REQUIRED;

  if (isBlank(d.email)) errors.email = REQUIRED;
  else if (!EMAIL_REGEX.test(d.email.trim())) errors.email = "E-mail inválido";

  if (isBlank(d.password)) errors.password = REQUIRED;
  else if (
    d.password.length < 6 ||
    !/[A-Z]/.test(d.password) ||
    !/\d/.test(d.password)
  )
    errors.password = "Mínimo 6 caracteres, com 1 número e 1 letra maiúscula";

  if (isBlank(d.confirmPassword)) errors.confirmPassword = REQUIRED;
  else if (d.confirmPassword !== d.password)
    errors.confirmPassword = "As senhas não coincidem";

  if (isBlank(d.cnpj)) errors.cnpj = REQUIRED;
  else if (digits(d.cnpj).length !== 14) errors.cnpj = "CNPJ incompleto";

  if (isBlank(d.phone)) errors.phone = REQUIRED;
  else if (digits(d.phone).length !== 11) errors.phone = "Telefone incompleto";

  if (isBlank(d.zipCode)) errors.zipCode = REQUIRED;
  else if (digits(d.zipCode).length !== 8) errors.zipCode = "CEP incompleto";

  if (!d.acceptedTerms)
    errors.acceptedTerms = "Aceite os termos para continuar";

  return errors;
};

const validateBank = (d: RegisterFormData): StepErrors => {
  const errors: StepErrors = {};

  if (isBlank(d.holderName)) errors.holderName = REQUIRED;

  const documentLength = digits(d.holderDocument).length;
  if (isBlank(d.holderDocument)) errors.holderDocument = REQUIRED;
  else if (documentLength !== 11 && documentLength !== 14)
    errors.holderDocument = "CPF/CNPJ incompleto";

  if (!d.bank) errors.bank = REQUIRED;
  if (isBlank(d.agency)) errors.agency = REQUIRED;
  if (isBlank(d.accountNumber)) errors.accountNumber = REQUIRED;

  return errors;
};

const validateCategory = (d: RegisterFormData): StepErrors => {
  const errors: StepErrors = {};

  if (!d.mainCategory) errors.mainCategory = "Selecione a categoria principal";
  if (!(d.preparationTimeMinutes > 0))
    errors.preparationTimeMinutes = "Informe o tempo em minutos";

  return errors;
};

const validateHours = (d: RegisterFormData): StepErrors => {
  const errors: StepErrors = {};

  if (!d.businessDays.some((day) => day.open)) {
    errors["hours.none"] = "Abra pelo menos um dia da semana";
    return errors;
  }

  d.businessDays.forEach((day, i) => {
    if (!day.open) return;

    const periods = [
      { key: "morning", opens: day.openMorning, closes: day.closeMorning },
      {
        key: "afternoon",
        opens: day.openAfternoon,
        closes: day.closeAfternoon,
      },
    ];

    const filled = periods.filter((p) => p.opens && p.closes);

    periods.forEach((p) => {
      const partial = !!p.opens !== !!p.closes;
      const inverted = p.opens && p.closes && p.closes <= p.opens;

      if (partial || inverted)
        errors[`hours.${i}.${p.key}`] = "Horário inválido";
    });

    if (filled.length === 0)
      periods.forEach((p) => (errors[`hours.${i}.${p.key}`] = REQUIRED));
  });

  return errors;
};


const VALIDATORS = [
  validateStore,
  validateBank,
  validateCategory,
  validateHours,
  () => ({}),
];

export const validateStep = (
  stepIndex: number,
  data: RegisterFormData,
): StepErrors => VALIDATORS[stepIndex](data);
