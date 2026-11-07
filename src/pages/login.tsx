import ButtonGoogle from "@/components/ui/button-google";
import Input from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
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
import CheckBox from "@/components/ui/checkbox";
import ButtonPrimary from "@/components/ui/button-primary";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login: React.FC = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <title>Vitryne - Entrar</title>
      </Head>

      <div className="hidden lg:block lg:w-[46%] relative overflow-hidden">
        <Image
          src="/login.jpg"
          alt="imagem login"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary/85 to-primary-deep/70" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 lg:p-12 text-white">
          <div className="w-60">
            <LogoSvg color="white" />
          </div>
          <div>
            <span className="inline-block rounded-full border border-white/50 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
              Portal do parceiro
            </span>
            <h2 className="max-w-120 font-display font-bold text-[38px] leading-[1.1] mt-4">
              Sua loja merece chegar mais longe.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/80 mt-4 max-w-120">
              Leve seus produtos para o digital, conquiste novos clientes e
              acompanhe suas vendas em um só lugar. A Vitryne conecta sua loja a
              quem está procurando moda perto de você.
            </p>
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
                type={showPassword ? "text" : "password"}
                icon={
                  showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />
                }
                onIconClick={() => setShowPassword(!showPassword)}
                value={password}
                onChange={setPassword}
                error={fieldErrors.password || undefined}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <CheckBox checked={remember} onChange={setRemember} />
                <span className="text-[13px] text-text-primary">
                  Lembrar este dispositivo
                </span>
              </label>
              <a
                href="#"
                className="text-[13px] font-semibold text-primary hover:underline"
              >
                Problemas ao acessar?
              </a>
            </div>

            {error && (
              <p className="text-center text-[13px] font-semibold text-danger">
                {error}
              </p>
            )}

            <ButtonPrimary
              type="submit"
              disabled={loading}
              title={loading ? "Entrando..." : "Entrar no painel"}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary py-3 text-[14px] font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            />
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[12px] text-text-tertiary">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <ButtonGoogle
            icon={<FcGoogle size={20} />}
            title="Entrar com o Google"
          />

          <p className="text-center text-[13px] text-text-secondary mt-8">
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
