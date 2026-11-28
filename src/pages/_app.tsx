import "@/styles/global.css";
import type { AppProps } from "next/app";
import AuthGuard from "@/components/auth-guard";
import { StoreStatusProvider } from "@/components/hooks/use-store-status";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreStatusProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </StoreStatusProvider>
  );
}
