import { cn } from "@/lib/utils";
import React from "react";

function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed w-64 inset-y-0 left-0 z-20 flex flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white hoverEffect shadow-2xl hoverEffect"
      )}
    >
      Sidebar
    </aside>
  );
}

export default Sidebar;
