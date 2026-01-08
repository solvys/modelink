import { useState } from "react";
import { PillNavbar } from "@/components/PillNavbar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { PersonalDashboard } from "@/components/PersonalDashboard";
import { LiquidBackdrop } from "@/components/LiquidBackdrop";

function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <LiquidBackdrop />
      <PillNavbar onSettingsClick={() => setSettingsOpen(true)} />
      <PersonalDashboard lookbookMode onSettingsClick={() => setSettingsOpen(true)} />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

export default Home;

