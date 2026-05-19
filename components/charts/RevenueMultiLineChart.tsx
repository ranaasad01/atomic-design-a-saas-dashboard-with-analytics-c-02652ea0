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
import { revenueByPlanData } from "@/lib/mock-data";

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

export default function RevenueMultiLineChart() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Revenue by Plan</h3>
          <p className="text-xs text-slate-500 mt-0.5">Starter, Pro, and Enterprise breakdown</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={revenueByPlanData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000) + "K"} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }}
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
          />
          <Line type="monotone" dataKey="starter" stroke="#06B6D4" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} name="Starter" />
          <Line type="monotone" dataKey="pro" stroke="#6366F1" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} name="Pro" />
          <Line type="monotone" dataKey="enterprise" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} name="Enterprise" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
