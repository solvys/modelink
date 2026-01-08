import { type CSSProperties } from "react";
import { PortfolioEditor } from "@/components/PortfolioEditor";
import { PillNavbar } from "@/components/PillNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

function PortfolioStudio() {
  const { offset } = useSidebar();
  const sidebarPaddingStyle = {
    "--sidebar-offset": `${offset}px`,
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-[--bg-base]">
      <AppSidebar />
      <div
        className="transition-[padding-left] duration-300 lg:pl-[var(--sidebar-offset)]"
        style={sidebarPaddingStyle}
      >
        <PillNavbar onSettingsClick={() => {}} />
        <PortfolioEditor />
      </div>
    </div>
  );
}

export default PortfolioStudio;

