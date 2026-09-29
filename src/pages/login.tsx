import Button from "@/components/button";
import ButtonGoogle from "@/components/button-google";
import Input from "@/components/input";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import LogoSvg from "@/components/logo-svg";

const Login: React.FC = ({}) => {
  return (
    <div className="flex min-h-screen">
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
                <p className=" text-[13px] text-white/70">
                  lojas ativas
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">94%</p>
                <p className="text-[13px] text-white/70">aprovação</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">45min</p>
                <p className="text-[13px] text-white/70">
                  entrega média
                </p>
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

          <form className="space-y-4">
            <div>
              <Input
                title="E-mail"
                type="email"
                placeholder="atelier@norte.com.br"
                icon={<HiOutlineMail size={18} />}
              />
            </div>

            <div>
              <Input
                title="Senha"
                placeholder="digite sua senha..."
                type="password"
                icon={<IoEyeOutline size={18} />}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
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
            <Button title="Entrar no painel" />
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className=" text-[13px] text-text-secondary">
              ou
            </span>
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
