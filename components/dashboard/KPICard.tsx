"use client";

import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
;

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  prefix?: string;
  suffix?: string;
}

export default function KPICard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor,
  iconBg,
  prefix = "",
  suffix = "",
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">
            {prefix}{value}{suffix}
          </p>
        </div>
        <div className={["w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg].join(" ")}>
          <Icon className={["w-5 h-5", iconColor].join(" ")} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={["flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md", isPositive ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"].join(" ")}>
          {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
        <span className="text-xs text-slate-500">{changeLabel}</span>
      </div>
    </div>
  );
}
