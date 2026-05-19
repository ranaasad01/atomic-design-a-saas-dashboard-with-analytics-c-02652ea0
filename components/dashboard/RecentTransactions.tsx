"use client";

import { transactionsData } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  Paid: "text-emerald-400 bg-emerald-400/10",
  Failed: "text-red-400 bg-red-400/10",
  Refunded: "text-amber-400 bg-amber-400/10",
};

export default function RecentTransactions() {
  return (
    <div className="bg-[#13131F] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest billing activity</p>
        </div>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">Transaction</th>
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">User</th>
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4 hidden sm:table-cell">Plan</th>
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4 hidden md:table-cell">Date</th>
              <th className="text-right text-xs text-slate-500 font-medium pb-3 pr-4">Amount</th>
              <th className="text-right text-xs text-slate-500 font-medium pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactionsData.slice(0, 8).map((txn) => (
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
  );
}
