import { useEffect, useState } from "react";
import PanelSidebar from "@/components/features/panel/components/panel-sidebar";
import PanelTopbar from "@/components/features/panel/components/panel-topbar";
import { useStoreStatus } from "@/components/hooks/use-store-status";
import Head from "next/head";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PanelLayout: React.FC<Props> = ({ title, subtitle, children }) => {
  const { storeOpen, setStoreOpen } = useStoreStatus();
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vitryne:store-name");
      if (saved?.trim()) {
        setStoreName(saved.trim());
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Head>
        <title>{`Vitryne - ${title}`}</title>
      </Head>

      <PanelSidebar
        storeName={storeName}
        storeOpen={storeOpen}
        onToggleStore={setStoreOpen}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <PanelTopbar title={title} subtitle={subtitle} />
        <main className="flex-1 bg-screen px-10 py-8">{children}</main>
      </div>
    </div>
  );
};

export default PanelLayout;
