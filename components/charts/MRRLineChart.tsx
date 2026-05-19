"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mrrData } from "@/lib/mock-data";

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
            <span className="text-slate-300 capitalize">{entry.name}:</span>
            <span className="text-white font-semibold">${(entry.value / 1000).toFixed(1)}K</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MRRLineChart() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">MRR Growth</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly recurring revenue over time</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg font-semibold">
          +7.4% this month
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={mrrData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000) + "K"} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }}
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
          />
          <Line type="monotone" dataKey="mrr" stroke="#6366F1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#6366F1" }} name="MRR" />
          <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#8B5CF6" }} name="Revenue" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="target" stroke="#06B6D4" strokeWidth={1.5} dot={false} activeDot={{ r: 4, fill: "#06B6D4" }} name="Target" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
