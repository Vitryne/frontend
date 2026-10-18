import LogoSvg from "@/components/ui/logo-svg"
import Switch from "@/components/ui/switch"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link";
import { LuClipboardList, LuLayoutDashboard, LuLayoutGrid, LuLogOut, LuPackage, LuSettings, LuStore, LuTag, LuTruck, LuWallet } from "react-icons/lu"

const STEPS = [
    {
        title: "Operação",
        items: [
            { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
            { href: "/pedidos", label: "Pedidos", icon: LuClipboardList },
            { href: "/produtos", label: "Produtos", icon: LuPackage },
            { href: "/categorias", label: "Categorias", icon: LuLayoutGrid },
        ],
    },
    {
        title: "Gestão",
        items: [
            { href: "/financeiro", label: "Financeiro", icon: LuWallet },
            { href: "/entregas", label: "Entregas", icon: LuTruck },
            { href: "/promocoes", label: "Promoções", icon: LuTag },
        ],
    },
    {
        title: "Configurações",
        items: [
            { href: "/configuracoes", label: "Configurações", icon: LuSettings },
            { href: "/perfil-loja", label: "Perfil da loja", icon: LuStore },
        ],
    },
]

interface Props {
    storeName: string
    storeOpen: boolean
    onToggleStore: (open: boolean) => void
}

const PanelSidebar: React.FC<Props> = ({
    storeName,
    storeOpen,
    onToggleStore,
}) => {
    
    const router = useRouter()

    const isActive = (href: string) =>
        router.pathname === href || router.pathname.startsWith(`${href}/`)

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
                            className={`size-1.5 rounded-full ${storeOpen ? "bg-success" : "bg-gray-400"}`}
                        />
                        {storeOpen ? "Loja aberta" : "Loja fechada"}
                    </span>
                    <Switch checked={storeOpen} onChange={onToggleStore} label="Status da loja" />
                </div> 
            </div>

            <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
                {STEPS.map((group) => (
                    <div key={group.title}>
                        <p className="px-3 pb-2 text-[.7rem] font-bold uppercase tracking-wider text-text-disabled">
                            {group.title}
                        </p>

                        <ul className="flex flex-col gap-y-1">
                            {group.items.map((i) => {
                                const active = isActive(i.href)
                                const Icon = i.icon

                                return(
                                    <li key={i.href}>
                                        <Link
                                            href={i.href}
                                            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[.85rem] transition-colors ${
                                                active
                                                    ? "bg-primary-soft font-bold text-primary-hover"
                                                    : "text-text-primary hover:bg-surface-subtle"
                                            }`}
                                        >
                                            <Icon size={16} aria-hidden="true" />
                                            <span className="flex-1">{i.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="flex items-center gap-3 border-t border-border px-2 pt-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-[.7rem] font-bold text-primary-hover">
                    ME
                </span>
                <div className="flex-1">
                    <p className="text-[.85rem] font-bold text-text-primary">Maria Estrela</p>
                    <p className="text-[.7rem] text-text-disabled">Administradora</p>
                </div>
                <Link
                    href="/login"
                    aria-label="Sair"
                    className="rounded-lg p-1.5 text-text-disabled transition-colors hover:bg-surface-subtle hover:text-text-primary"
                >
                    <LuLogOut size={16}/>
                </Link>
            </div>
        </div>
    )
}

export default PanelSidebar;