import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth-storage";

const PUBLIC_ROUTES = ["/login", "/register"];

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const isPublic = PUBLIC_ROUTES.includes(router.pathname);
    const hasToken = !!getToken();

    if (!isPublic && !hasToken) {
      setAuthorized(false);
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [router, router.isReady, router.pathname, router.asPath]);

  if (!authorized) return null;

  return <>{children}</>;
};

export default AuthGuard;
