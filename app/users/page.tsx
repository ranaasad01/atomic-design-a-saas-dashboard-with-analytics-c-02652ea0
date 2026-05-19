"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { usersData } from "@/lib/mock-data";
import { Search, Users, ArrowUp, ArrowDown, User, Mail, Calendar } from 'lucide-react';

const planColors: Record<string, string> = {
  Enterprise: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Pro: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Starter: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

const statusColors: Record<string, string> = {
  Active: "text-emerald-400 bg-emerald-400/10",
  Churned: "text-red-400 bg-red-400/10",
  Trial: "text-amber-400 bg-amber-400/10",
};

type SortKey = "name" | "plan" | "mrr" | "joined" | "status";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterPlan, setFilterPlan] = useState("All");

  const plans = ["All", "Enterprise", "Pro", "Starter"];

  const filtered = usersData
    .filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchPlan = filterPlan === "All" || u.plan === filterPlan;
      return matchSearch && matchPlan;
    })
    .sort((a, b) => {
      let av: string | number = a[sortKey];
      let bv: string | number = b[sortKey];
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUp className="w-3 h-3 text-slate-600" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-indigo-400" /> : <ArrowDown className="w-3 h-3 text-indigo-400" />;
  };

  const totalMRR = usersData.filter((u) => u.status === "Active").reduce((s, u) => s + u.mrr, 0);
  const activeCount = usersData.filter((u) => u.status === "Active").length;
  const trialCount = usersData.filter((u) => u.status === "Trial").length;
  const churnedCount = usersData.filter((u) => u.status === "Churned").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor your customer base.</p>
        </div>
        <button className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto">
          + Invite User
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: usersData.length, icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Active", value: activeCount, icon: User, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "In Trial", value: trialCount, icon: Calendar, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "MRR from Users", value: "$" + totalMRR.toLocaleString(), icon: Mail, color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#13131F] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className={["w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", stat.bg].join(" ")}>
              <stat.icon className={["w-5 h-5", stat.color].join(" ")} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => setFilterPlan(plan)}
              className={["text-xs font-medium px-3 py-2 rounded-xl transition-all border", filterPlan === plan ? "bg-indigo-600 text-white border-indigo-600" : "bg-white/5 text-slate-400 hover:text-white border-white/10"].join(" ")}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13131F] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/2">
                <th className="text-left px-5 py-3">
                  <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-white transition-colors">
                    User <SortIcon col="name" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">
                  <button onClick={() => handleSort("plan")} className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-white transition-colors">
                    Plan <SortIcon col="plan" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 hidden md:table-cell">
                  <button onClick={() => handleSort("status")} className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-white transition-colors">
                    Status <SortIcon col="status" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">
                  <button onClick={() => handleSort("mrr")} className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-white transition-colors">
                    MRR <SortIcon col="mrr" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">
                  <button onClick={() => handleSort("joined")} className="flex items-center gap-1 text-xs text-slate-500 font-medium hover:text-white transition-colors">
                    Joined <SortIcon col="joined" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 hidden xl:table-cell">
                  <span className="text-xs text-slate-500 font-medium">Last Active</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-white/3 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className={["text-xs font-medium px-2 py-0.5 rounded-full border", planColors[user.plan] || "text-slate-400"].join(" ")}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className={["text-xs font-medium px-2 py-0.5 rounded-full", statusColors[user.status] || "text-slate-400 bg-slate-400/10"].join(" ")}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-white font-semibold">
                      {user.mrr > 0 ? "$" + user.mrr.toLocaleString() : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-slate-400">{user.joined}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden xl:table-cell">
                    <span className="text-xs text-slate-500">{user.lastActive}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {usersData.length} users</p>
          <div className="flex items-center gap-1">
            {churnedCount > 0 && (
              <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">{churnedCount} churned</span>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
