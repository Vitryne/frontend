import ButtonGoogle from "@/components/ui/button-google";
import Input from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import LogoSvg from "@/components/ui/logo-svg";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoginService from "@/service/login-service";
import { saveToken } from "@/lib/auth-storage";

const Login: React.FC = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    const errors = {
      email: email.trim() ? "" : "Informe o e-mail",
      password: password ? "" : "Informe a senha",
    };
    setFieldErrors(errors);
    setError("");
    if (errors.email || errors.password) return;
    setLoading(true);
    try {
      const { accessToken } = await LoginService().login({
        email: email.trim(),
        password,
      });
      saveToken(accessToken, remember);
      router.replace("/dashboard");
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      setError(
        status === 401
          ? "E-mail ou senha inválidos."
          : "Não foi possível entrar. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>Entrar · Vitryne</title>
      </Head>

      <div className="hidden lg:block lg:w-[46%] relative overflow-hidden">
        <Image
          src="/partner_hero.jpg"
          alt="Partner hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary/85 to-[#3B0F63]/90" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 lg:p-12 text-white">
          <div className="w-42.5">
            <LogoSvg color="white" />
          </div>
          <div>
            <span className="inline-block rounded-full border border-white/30 px-3 py-1  text-[11px] font-semibold uppercase tracking-wider text-white/90">
              Portal do parceiro
            </span>
            <h2 className="font-display font-bold text-[34px] leading-[1.15] mt-4">
              Gerencie sua loja em um só lugar.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/80 mt-4 max-w-105">
              Catálogo, pedidos em tempo real, financeiro e entrega — desenhado
              para quem vive de moda.
            </p>
            <div className="flex items-center gap-8 mt-8">
              <div>
                <p className="font-display font-bold text-2xl">+12k</p>
                <p className=" text-[13px] text-white/70">lojas ativas</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">94%</p>
                <p className="text-[13px] text-white/70">aprovação</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">45min</p>
                <p className="text-[13px] text-white/70">entrega média</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[54%] min-h-screen bg-screen flex items-center justify-center px-6 lg:px-7">
        <div className="w-full max-w-md">
          <h1 className="font-display font-bold text-[32px] leading-tight text-text-primary">
            Entrar
          </h1>
          <p className=" text-[14px] leading-normal text-text-secondary mt-2 mb-8">
            Acesse o painel da sua loja.
          </p>

          <form
            className="space-y-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <Input
                title="E-mail"
                type="email"
                placeholder="atelier@norte.com.br"
                icon={<HiOutlineMail size={18} />}
                value={email}
                onChange={setEmail}
                error={fieldErrors.email || undefined}
              />
            </div>

            <div>
              <Input
                title="Senha"
                placeholder="digite sua senha..."
                type="password"
                icon={<IoEyeOutline size={18} />}
                value={password}
                onChange={setPassword}
                error={fieldErrors.password || undefined}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary"
                />
                <span className=" text-[13px] text-text-primary">
                  Lembrar este dispositivo
                </span>
              </label>
              <a
                href="#"
                className=" text-[13px] text-primary font-semibold hover:underline"
              >
                Problemas ao acessar?
              </a>
            </div>

            {error && (
              <p className="text-center text-[13px] font-semibold text-danger">
                {error}
              </p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-[10px] border border-primary/30 bg-white hover:bg-primary/5 text-primary font-semibold text-[14px] py-3.5 transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Entrando..." : "Entrar no painel"}
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className=" text-[13px] text-text-secondary">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <ButtonGoogle
            icon={<FcGoogle size={20} />}
            title="Entrar com o Google"
          />

          <p className="text-center  text-[13px] text-text-secondary mt-8">
            Ainda não vende na Vitryne?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Cadastre sua loja
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
