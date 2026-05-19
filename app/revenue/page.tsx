export const dynamic = "force-dynamic";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MRRLineChart from "@/components/charts/MRRLineChart";
import ChurnAreaChart from "@/components/charts/ChurnAreaChart";
import RevenueMultiLineChart from "@/components/charts/RevenueMultiLineChart";
import { kpiData, transactionsData } from "@/lib/mock-data";
import { Sparkles, ArrowUp, ArrowDown, TrendingUp, Activity } from 'lucide-react';

const statusColors: Record<string, string> = {
  Paid: "text-emerald-400 bg-emerald-400/10",
  Failed: "text-red-400 bg-red-400/10",
  Refunded: "text-amber-400 bg-amber-400/10",
};

const planBreakdown = [
  { plan: "Enterprise", users: 4, mrr: 9600, pct: 9.1, color: "#8B5CF6" },
  { plan: "Pro", mrr: 74700, users: 501, pct: 71.1, color: "#6366F1" },
  { plan: "Starter", mrr: 20700, users: 422, pct: 19.7, color: "#06B6D4" },
];

export default function RevenuePage() {
  const arr = kpiData.mrr.value * 12;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue</h1>
          <p className="text-sm text-slate-500 mt-1">Track MRR, ARR, churn, and billing performance.</p>
        </div>
        <button className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto">
          Download Report
        </button>
      </div>

      {/* Key Revenue Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "MRR",
            value: "$105,000",
            change: kpiData.mrr.change,
            positive: true,
            sub: "Monthly Recurring Revenue",
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
          },
          {
            label: "ARR",
            value: "$" + (arr / 1000000).toFixed(2) + "M",
            change: kpiData.arr.change,
            positive: true,
            sub: "Annual Recurring Revenue",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            label: "Churn Rate",
            value: "1.3%",
            change: Math.abs(kpiData.churnRate.change),
            positive: false,
            sub: "Down from 1.4% last month",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            label: "ARPU",
            value: "$14",
            change: Math.abs(kpiData.avgRevenuePerUser.change),
            positive: false,
            sub: "Avg Revenue Per User",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
        ].map((metric) => (
          <div key={metric.label} className="bg-[#13131F] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider">{metric.label}</p>
              <div className={["w-8 h-8 rounded-lg flex items-center justify-center", metric.bg].join(" ")}>
                <Sparkles className={["w-4 h-4", metric.color].join(" ")} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
            <p className="text-xs text-slate-500 mb-2">{metric.sub}</p>
            <div className={["flex items-center gap-1 text-xs font-semibold", metric.positive ? "text-emerald-400" : "text-red-400"].join(" ")}>
              {metric.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {metric.change}% vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Plan Breakdown */}
      <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">Revenue by Plan</h3>
          <span className="ml-auto text-xs text-slate-500">Total MRR: $105,000</span>
        </div>
        <div className="space-y-4">
          {planBreakdown.map((item) => (
            <div key={item.plan}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-white">{item.plan}</span>
                  <span className="text-xs text-slate-500">{item.users} users</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-white">${item.mrr.toLocaleString()}/mo</span>
                  <span className="text-xs text-slate-500 w-10 text-right">{item.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: item.pct + "%", backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <MRRLineChart />
        <ChurnAreaChart />
      </div>

      <RevenueMultiLineChart />

      {/* Recent Transactions */}
      <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5 mt-4">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-white">All Transactions</h3>
          <span className="ml-auto text-xs text-slate-500">{transactionsData.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">ID</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">Customer</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4 hidden sm:table-cell">Plan</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4 hidden md:table-cell">Date</th>
                <th className="text-right text-xs text-slate-500 font-medium pb-3 pr-4">Amount</th>
                <th className="text-right text-xs text-slate-500 font-medium pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactionsData.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-xs font-mono text-slate-400">{txn.id}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-xs text-white font-medium">{txn.user}</span>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <span className="text-xs text-slate-400">{txn.plan}</span>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell">
                    <span className="text-xs text-slate-500">{txn.date}</span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="text-xs text-white font-semibold">${txn.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={["text-xs font-medium px-2 py-0.5 rounded-full", statusColors[txn.status] || "text-slate-400 bg-slate-400/10"].join(" ")}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
