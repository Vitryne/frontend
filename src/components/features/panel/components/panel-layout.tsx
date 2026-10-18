import { useState } from "react"
import PanelSidebar from "@/components/features/panel/components/panel-sidebar"
import PanelTopbar from "@/components/features/panel/components/panel-topbar"

interface Props {
    title: string
    subtitle?: string
    children: React.ReactNode
}

const PanelLayout: React.FC<Props> = ({title, subtitle, children }) => {
    
    const [storeOpen, setStoreOpen] = useState(true)

    return (
        <div className="flex min-h-screen">
            <PanelSidebar
                storeName="Atelier Norte"
                storeOpen={storeOpen}
                onToggleStore={setStoreOpen}
            />
            <div className="flex flex-1 flex-col">
                <PanelTopbar title={title} subtitle={subtitle} />
                <main className="flex-1 bg-screen px-10 py-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default PanelLayout;