"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children: (activeTab: string) => React.ReactNode;
}

export function Tabs({ tabs, defaultTab, onTabChange, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-4 border-b border-soft-gray">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
              "hover:bg-white/20 dark:hover:bg-gray-700/50",
              activeTab === tab.id
                ? "bg-baby-pink/30 dark:bg-baby-pink/40 text-gray-900 dark:text-white shadow-soft"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{children(activeTab)}</div>
    </div>
  );
}

