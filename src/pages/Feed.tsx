import { type CSSProperties } from "react";
import { FeedPage } from "@/components/FeedPage";
import { PillNavbar } from "@/components/PillNavbar";
import { AppSidebar } from "@/components/AppSidebar";
import { useSidebar } from "@/contexts/SidebarContext";

function Feed() {
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
        <main className="flex-1 overflow-y-auto">
          <FeedPage />
        </main>
      </div>
    </div>
  );
}

export default Feed;

