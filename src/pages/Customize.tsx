import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { AgencyCustomization } from "@/data/types";
import { getAgencies } from "@/api/agencies";
import { LiquidBackdrop } from "@/components/LiquidBackdrop";

function Customize() {
  const agencies = useMemo(() => getAgencies(), []);
  const defaultAgency = agencies[0];
  const [customization, setCustomization] = useState<AgencyCustomization>(
    defaultAgency?.customization ?? {
      palette: "blush",
      font: "inter",
      logoPlacement: "header",
    },
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <LiquidBackdrop />
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Site</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Customization Panel</h1>
            {defaultAgency?.logo && (
              <img src={defaultAgency.logo} alt={defaultAgency.name} className="h-10 w-10 rounded-lg object-cover" />
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CustomizationPanel customization={customization} onUpdate={setCustomization} />
      </main>
    </div>
  );
}

export default Customize;

