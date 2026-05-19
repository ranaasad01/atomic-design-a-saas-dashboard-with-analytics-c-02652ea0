"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { trafficSourceData } from "@/lib/mock-data";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-[#1A1A2E] border border-white/10 rounded-xl p-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.color }} />
          <span className="text-slate-300">{item.name}:</span>
          <span className="text-white font-semibold">{item.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TrafficDonutChart() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white">Traffic Sources</h3>
        <p className="text-xs text-slate-500 mt-0.5">Breakdown of where your users come from</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={trafficSourceData}
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {trafficSourceData.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 space-y-2">
        {trafficSourceData.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: item.value + "%", backgroundColor: item.color }} />
              </div>
              <span className="text-xs text-white font-medium w-8 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
