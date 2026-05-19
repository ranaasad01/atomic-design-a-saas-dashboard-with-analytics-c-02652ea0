"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { churnData } from "@/lib/mock-data";

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="text-white font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChurnAreaChart() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Churn vs Retention Rate</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly churn and retention percentages</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg font-semibold">
          1.3% churn
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={churnData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v + "%"} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }}
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
          />
          <Area type="monotone" dataKey="churnRate" stroke="#EF4444" strokeWidth={2} fill="url(#churnGrad)" name="Churn Rate" />
          <Area type="monotone" dataKey="retentionRate" stroke="#10B981" strokeWidth={2} fill="url(#retentionGrad)" name="Retention Rate" yAxisId={0} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
