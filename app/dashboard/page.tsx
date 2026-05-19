export const dynamic = "force-dynamic";
import DashboardLayout from "@/components/layout/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import MRRLineChart from "@/components/charts/MRRLineChart";
import SignupsBarChart from "@/components/charts/SignupsBarChart";
import ActiveUsersAreaChart from "@/components/charts/ActiveUsersAreaChart";
import TrafficDonutChart from "@/components/charts/TrafficDonutChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { kpiData } from "@/lib/mock-data";
import { Sparkles, Users, Activity, ArrowDown } from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Alex. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live data
          </div>
          <button className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Monthly Revenue"
          value="$118K"
          change={kpiData.totalRevenue.change}
          icon={Sparkles}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/10"
        />
        <KPICard
          title="MRR"
          value="$105K"
          change={kpiData.mrr.change}
          icon={Activity}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
        />
        <KPICard
          title="Active Users"
          value="7,500"
          change={kpiData.activeUsers.change}
          icon={Users}
          iconColor="text-cyan-400"
          iconBg="bg-cyan-500/10"
        />
        <KPICard
          title="Churn Rate"
          value="1.3"
          suffix="%"
          change={kpiData.churnRate.change}
          changeLabel="vs last month"
          icon={ArrowDown}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <MRRLineChart />
        </div>
        <div>
          <TrafficDonutChart />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        <SignupsBarChart />
        <ActiveUsersAreaChart />
      </div>

      {/* Transactions Table */}
      <RecentTransactions />
    </DashboardLayout>
  );
}
