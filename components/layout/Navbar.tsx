"use client";

import { useState } from "react";
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onMobileMenuOpen: () => void;
}

const notifications = [
  { id: 1, text: "New enterprise signup: Acme Corp", time: "2m ago", unread: true },
  { id: 2, text: "MRR milestone reached: $100K", time: "1h ago", unread: true },
  { id: 3, text: "Churn alert: 3 Pro users cancelled", time: "3h ago", unread: false },
  { id: 4, text: "Payment failed: TXN-8814", time: "5h ago", unread: false },
];

export default function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 bg-[#0F0F1A]/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-4 sticky top-0 z-40">
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden text-slate-400 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search metrics, users, reports..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-[#1A1A2E] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">Mark all read</span>
              </div>
              <div className="divide-y divide-white/5">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                    <div className={["w-2 h-2 rounded-full mt-1.5 flex-shrink-0", n.unread ? "bg-indigo-500" : "bg-transparent"].join(" ")} />
                    <div>
                      <p className="text-xs text-slate-300">{n.text}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              AJ
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-white leading-none">Alex Johnson</p>
              <p className="text-xs text-slate-500 leading-none mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-48 bg-[#1A1A2E] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs font-semibold text-white">Alex Johnson</p>
                <p className="text-xs text-slate-500">alex@pulseai.com</p>
              </div>
              <div className="py-1">
                {["Profile", "Settings", "Billing", "Sign out"].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
