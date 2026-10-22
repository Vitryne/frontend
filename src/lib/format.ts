export const formatPrice = (priceInCents: number) => {
  const reais = Math.floor(priceInCents / 100).toLocaleString("pt-BR");
  const cents = String(priceInCents % 100).padStart(2, "0");

  return { reais, cents };
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");