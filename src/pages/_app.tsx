import "@/styles/global.css";
import type { AppProps } from "next/app";
import AuthGuard from "@/components/auth-guard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}
