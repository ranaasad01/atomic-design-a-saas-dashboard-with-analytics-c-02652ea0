"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Activity, Users, Settings, ChevronRight, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Layout },
  { href: "/analytics", label: "Analytics", icon: Activity },
  { href: "/users", label: "Users", icon: Users },
  { href: "/revenue", label: "Revenue", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={["flex items-center gap-3 px-4 py-5 border-b border-white/10", collapsed ? "justify-center" : ""].join(" ")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-white font-bold text-lg leading-none">Pulse</span>
            <span className="text-indigo-400 font-bold text-lg leading-none">AI</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative";
          const activeClass = active
            ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
            : "text-slate-400 hover:text-white hover:bg-white/5";
          const collapseClass = collapsed ? "justify-center" : "";
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={[baseClass, activeClass, collapseClass].join(" ")}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-r-full" />
              )}
              <Icon className={["w-5 h-5 flex-shrink-0", active ? "text-indigo-400" : "text-slate-400 group-hover:text-white"].join(" ")} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{label}</span>
                  {active && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                </>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
          <p className="text-xs font-semibold text-white mb-1">Upgrade to Enterprise</p>
          <p className="text-xs text-slate-400 mb-2">Unlock advanced analytics and priority support.</p>
          <button className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Learn more <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="px-3 pb-4">
        <button
          onClick={onToggle}
          className={["w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200", collapsed ? "justify-center" : ""].join(" ")}
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={["hidden lg:flex flex-col bg-[#0F0F1A] border-r border-white/10 transition-all duration-300 ease-in-out flex-shrink-0", collapsed ? "w-16" : "w-60"].join(" ")}
      >
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-64 bg-[#0F0F1A] border-r border-white/10 flex flex-col z-10">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
