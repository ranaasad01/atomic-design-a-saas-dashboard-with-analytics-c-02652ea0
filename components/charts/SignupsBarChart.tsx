"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { signupsData } from "@/lib/mock-data";

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
            <span className="text-white font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SignupsBarChart() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">User Signups</h3>
          <p className="text-xs text-slate-500 mt-0.5">New signups vs churned users per month</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-lg font-semibold">
          920 this month
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={signupsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }}
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
          />
          <Bar dataKey="signups" fill="#6366F1" radius={[4, 4, 0, 0]} name="Signups" />
          <Bar dataKey="churned" fill="#EF4444" radius={[4, 4, 0, 0]} name="Churned" opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
