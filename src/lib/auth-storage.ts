const TOKEN_KEY = "vitryne:access-token";

export const saveToken = (token: string, remember: boolean) => {
  clearToken();
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

export interface SessionUser {
  email: string;
  role: string;
}

export const getSessionUser = (): SessionUser | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(payload), (char) => char.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes));

    if (typeof claims.email !== "string") return null;

    return { email: claims.email, role: String(claims.role ?? "") };
  } catch {
    return null;
  }
};

const ROLE_LABELS: Record<string, string> = {
  STORE: "Lojista",
  ADMIN: "Administrador",
  DELIVERER: "Entregador",
  CONSUMER: "Cliente",
};

export const getRoleLabel = (role: string): string => ROLE_LABELS[role] ?? role;
