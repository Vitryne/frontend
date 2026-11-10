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

export const formatMoney = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("pt-BR");

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatTimeAgo = (iso: string) => {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);

  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest === 0 ? `há ${hours} h` : `há ${hours} h ${rest}`;
};

export const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
};

export const formatToday = () => {
  const today = new Date();
  const weekday = today
    .toLocaleDateString("pt-BR", { weekday: "long" })
    .split("-")[0];
  const dayAndMonth = today.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });

  return `${weekday[0].toUpperCase()}${weekday.slice(1)}, ${dayAndMonth}`;
};

export const formatMoneyRounded = (cents: number, signed = false) =>
  (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    signDisplay: signed ? "exceptZero" : "auto",
  });

export const formatChange = (value: number) =>
  value.toLocaleString("pt-BR", { signDisplay: "exceptZero" });

export const formatShortDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`);
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");

  return `${date.getDate()} ${month}`;
};

export const formatDayMonth = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
