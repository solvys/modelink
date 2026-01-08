import { type CSSProperties } from "react";
import { PillNavbar } from "@/components/PillNavbar";
import { LindaChat } from "@/components/LindaChat";
import { AppSidebar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

function Linda() {
  const { offset } = useSidebar();
  const sidebarPaddingStyle = {
    "--sidebar-offset": `${offset}px`,
  } as CSSProperties;

  return (
    <div className="h-screen bg-[--bg-base] overflow-hidden" style={{ color: "var(--text-primary)" }}>
      <AppSidebar />
      <div
        className="transition-[padding-left] duration-300 lg:pl-[var(--sidebar-offset)] h-full flex flex-col overflow-hidden"
        style={sidebarPaddingStyle}
      >
        <PillNavbar onSettingsClick={() => {}} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[764px] lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                Linda · AI Strategist
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3">
                Supercharge your career ops with Linda
              </h1>
              <p className="text-white/60 mt-2 max-w-2xl text-sm sm:text-base">
                Generate bespoke scripts, pitch responses, and weekly action plans. Linda is tuned for
                modeling workflows—send any prompt or drop a post URL for instant guidance.
              </p>
            </motion.div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full lg:col-span-2"
              >
                <LindaChat variant="full" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Zap className="w-4 h-4 text-amber-300" />
                  Power Prompts
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-white/70">
                  <p>"Draft a remake script referencing my Vogue BTS carousel."</p>
                  <p>"Summarize open pitches and who needs follow-up."</p>
                  <p>"Generate a 3-post plan for NYFW castings with CTAs."</p>
                  <p>"Turn today's DM with Alo Yoga into a stylish reply."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Linda;


