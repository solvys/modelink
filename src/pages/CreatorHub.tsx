import { useState, type CSSProperties } from "react";
import { PillNavbar } from "@/components/PillNavbar";
import { CreatorHubContent } from "@/components/CreatorHubContent";
import { SettingsPanel } from "@/components/SettingsPanel";
import { AppSidebar } from "@/components/AppSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

function CreatorHub() {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
        <PillNavbar onSettingsClick={() => setSettingsOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <CreatorHubContent />
        </main>
        <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </div>
  );
}

export default CreatorHub;

