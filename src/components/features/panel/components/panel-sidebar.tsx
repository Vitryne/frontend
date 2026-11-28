import LogoutModal from "@/components/features/panel/components/logout-modal";
import PauseStoreModal from "@/components/features/panel/components/pause-store-modal";
import LogoSvg from "@/components/ui/logo-svg";
import Switch from "@/components/ui/switch";
import Tooltip from "@/components/ui/tooltip";
import {
  clearToken,
  getRoleLabel,
  getSessionUser,
  type SessionUser,
} from "@/lib/auth-storage";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuClipboardList,
  LuLayoutDashboard,
  LuLayoutGrid,
  LuLogOut,
  LuPackage,
  LuSettings,
  LuStore,
  LuTag,
  LuTruck,
  LuWallet,
} from "react-icons/lu";

const STEPS = [
  {
    title: "Operação",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
      { href: "/orders", label: "Pedidos", icon: LuClipboardList },
      { href: "/products", label: "Produtos", icon: LuPackage },
      { href: "/categories", label: "Categorias", icon: LuLayoutGrid },
    ],
  },
  {
    title: "Gestão",
    items: [
      { href: "/finance", label: "Financeiro", icon: LuWallet },
      { href: "/deliveries", label: "Entregas", icon: LuTruck },
      { href: "/promotions", label: "Promoções", icon: LuTag },
    ],
  },
  {
    title: "Configurações",
    items: [
      { href: "/settings", label: "Configurações", icon: LuSettings },
      { href: "/store-profile", label: "Perfil da loja", icon: LuStore },
    ],
  },
];

interface Props {
  storeName: string;
  storeOpen: boolean;
  onToggleStore: (open: boolean) => void;
}

const PanelSidebar: React.FC<Props> = ({
  storeName,
  storeOpen,
  onToggleStore,
}) => {
  const router = useRouter();
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(`${href}/`);

  const handleToggleStore = (open: boolean) => {
    if (open) {
      onToggleStore(true);
      return;
    }

    setIsPauseOpen(true);
  };

  const handleConfirmPause = () => {
    setIsPauseOpen(false);
    onToggleStore(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    clearToken();
    localStorage.removeItem("vitryne:store-name");
    onToggleStore(true);
    router.replace("/login");
  };

  return (
    <div className="sticky top-0 flex h-screen w-60 shrink-0 flex-col gap-6 bg-white px-4 py-6 shadow-[4px_0_16px_rgba(0,0,0,0.04)]">
      <div className="w-40 px-2">
        <LogoSvg color="black"></LogoSvg>
      </div>

      <div className="rounded-xl bg-surface-subtle p-3">
        <div className="flex items-center gap-3">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/Logo_AtelierNorte.jpg"
              alt=""
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="text-[.85rem] font-bold text-text-primary">
            {storeName}
          </span>
        </div>

        <div
          className={`mt-3 flex items-center justify-between rounded-full border px-3 py-1.5 transition-colors ${
            storeOpen
              ? "border-success bg-success-soft"
              : "border-border bg-white"
          }`}
        >
          <span
            className={`flex items-center gap-1.5 text-[.75rem] ${
              storeOpen ? "text-success" : "text-text-secondary"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${storeOpen ? "bg-success" : "bg-text-disabled"}`}
            />
            {storeOpen ? "Loja aberta" : "Loja pausada"}
          </span>
          <Switch checked={storeOpen} onChange={handleToggleStore} />
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
        {STEPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[.7rem] font-bold uppercase tracking-wider text-text-disabled">
              {group.title}
            </p>

            <ul className="flex flex-col gap-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[.85rem] transition-colors ${
                        active
                          ? "bg-primary-soft font-bold text-primary-hover"
                          : "text-text-primary hover:bg-surface-subtle"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 border-t border-border px-2 pt-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-[.7rem] font-bold text-primary-hover">
          {user?.email.slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <Tooltip content={user?.email} onlyWhenTruncated>
            <p className="truncate text-[.85rem] font-bold text-text-primary">
              {user?.email}
            </p>
          </Tooltip>
          <p className="text-[.7rem] text-text-disabled">
            {user && getRoleLabel(user.role)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="cursor-pointer rounded-lg p-1.5 text-text-disabled transition-colors hover:bg-surface-subtle hover:text-text-primary"
        >
          <LuLogOut size={16} />
        </button>
      </div>

      <PauseStoreModal
        open={isPauseOpen}
        onClose={() => setIsPauseOpen(false)}
        onConfirm={handleConfirmPause}
      />

      <LogoutModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default PanelSidebar;
