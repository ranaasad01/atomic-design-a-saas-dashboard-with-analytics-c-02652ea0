"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TrafficDonutChart from "@/components/charts/TrafficDonutChart";
import RevenueMultiLineChart from "@/components/charts/RevenueMultiLineChart";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import SignupsBarChart from "@/components/charts/SignupsBarChart";
import { Activity, TrendingUp, Users, ArrowUp } from 'lucide-react';

const dateRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "Last 12 months", "All time"];

const summaryStats = [
  { label: "Page Views", value: "1.24M", change: 12.4, color: "text-indigo-400" },
  { label: "Unique Visitors", value: "284K", change: 8.7, color: "text-purple-400" },
  { label: "Avg. Session", value: "4m 32s", change: 3.2, color: "text-cyan-400" },
  { label: "Bounce Rate", value: "34.2%", change: -2.1, color: "text-emerald-400" },
  { label: "Conversion Rate", value: "3.8%", change: 0.6, color: "text-amber-400" },
  { label: "Revenue/Visitor", value: "$0.42", change: 5.1, color: "text-pink-400" },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("Last 12 months");

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Deep-dive into your growth metrics and traffic patterns.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {dateRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={["text-xs font-medium px-3 py-1.5 rounded-lg transition-all", selectedRange === range ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"].join(" ")}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {summaryStats.map((stat) => (
          <div key={stat.label} className="bg-[#13131F] border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all">
            <p className="text-xs text-slate-500 mb-2">{stat.label}</p>
            <p className={["text-xl font-bold", stat.color].join(" ")}>{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUp className={["w-3 h-3", stat.change >= 0 ? "text-emerald-400" : "text-red-400 rotate-180"].join(" ")} />
              <span className={["text-xs font-medium", stat.change >= 0 ? "text-emerald-400" : "text-red-400"].join(" ")}>
                {Math.abs(stat.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insight Banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Growth Insight</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Your organic search traffic grew 38% this quarter, making it your top acquisition channel. 
            Pro plan conversions are up 12% — consider A/B testing your pricing page to further improve conversion.
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <RevenueMultiLineChart />
        </div>
        <div>
          <TrafficDonutChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <ActiveUsersAreaChart />
        <SignupsBarChart />
      </div>

      {/* Funnel Section */}
      <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Conversion Funnel</h3>
        </div>
        <div className="space-y-3">
          {[
            { stage: "Visitors", count: 284000, pct: 100, color: "#6366F1" },
            { stage: "Sign-up Page", count: 42600, pct: 15, color: "#8B5CF6" },
            { stage: "Trial Started", count: 18480, pct: 6.5, color: "#06B6D4" },
            { stage: "Paid Conversion", count: 10810, pct: 3.8, color: "#10B981" },
            { stage: "Retained (90d)", count: 9180, pct: 3.2, color: "#F59E0B" },
          ].map((item) => (
            <div key={item.stage} className="flex items-center gap-4">
              <div className="w-28 text-xs text-slate-400 flex-shrink-0">{item.stage}</div>
              <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden relative">
                <div
                  className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                  style={{ width: item.pct + "%", backgroundColor: item.color + "33", borderLeft: "3px solid " + item.color }}
                >
                  <span className="text-xs font-medium text-white">{item.count.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-12 text-right text-xs font-semibold" style={{ color: item.color }}>{item.pct}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <p className="text-xs text-slate-500">Overall visitor-to-paid conversion rate: <span className="text-white font-semibold">3.8%</span> — industry avg is 2.1%</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
