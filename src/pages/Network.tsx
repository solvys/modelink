import { type CSSProperties } from "react";
import { NetworkPage } from "@/components/NetworkPage";
import { PillNavbar } from "@/components/PillNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

function Network() {
  const { offset } = useSidebar();
  const sidebarPaddingStyle = {
    "--sidebar-offset": `${offset}px`,
  } as CSSProperties;

  return (
    <div className="h-screen bg-[--bg-base] overflow-hidden">
      <AppSidebar />
      <div
        className="transition-[padding-left] duration-300 lg:pl-[var(--sidebar-offset)] h-full flex flex-col overflow-hidden"
        style={sidebarPaddingStyle}
      >
        <PillNavbar onSettingsClick={() => {}} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <NetworkPage />
        </main>
      </div>
    </div>
  );
}

export default Network;

