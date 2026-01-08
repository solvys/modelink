"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children: (activeTab: string) => React.ReactNode;
  tabsWrapperClassName?: string;
  tabClassName?: string;
}

export function Tabs({
  tabs,
  defaultTab,
  onTabChange,
  children,
  tabsWrapperClassName,
  tabClassName,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex gap-2 overflow-x-auto pb-4 border-b border-white/10",
          tabsWrapperClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-white text-gray-900"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              tabClassName
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{children(activeTab)}</div>
    </div>
  );
}
