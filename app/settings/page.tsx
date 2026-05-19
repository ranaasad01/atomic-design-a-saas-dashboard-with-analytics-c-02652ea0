"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { User, Bell, Lock, Settings, Check, Mail, Eye, EyeOff } from 'lucide-react';

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    churnAlerts: true,
    mrrMilestones: true,
    newSignups: false,
    paymentFailed: true,
    weeklyReport: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account, preferences, and security settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-[#13131F] border border-white/10 rounded-2xl p-2 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={["w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all", activeTab === id ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"].join(" ")}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <div className="bg-[#13131F] border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  AJ
                </div>
                <div>
                  <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: "Alex", type: "text" },
                  { label: "Last Name", value: "Johnson", type: "text" },
                  { label: "Email Address", value: "alex@pulseai.com", type: "email" },
                  { label: "Job Title", value: "Head of Growth", type: "text" },
                  { label: "Company", value: "PulseAI Inc.", type: "text" },
                  { label: "Timezone", value: "UTC-5 (Eastern Time)", type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Building the future of SaaS analytics at PulseAI. Passionate about data-driven growth and customer success."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : null}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
                <button className="text-sm font-medium text-slate-400 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-[#13131F] border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
              <p className="text-sm text-slate-400">Choose which events trigger email and in-app notifications.</p>

              <div className="space-y-4">
                {[
                  { key: "emailDigest", label: "Daily Email Digest", desc: "Receive a daily summary of key metrics and activity." },
                  { key: "churnAlerts", label: "Churn Alerts", desc: "Get notified when users cancel or downgrade their plan." },
                  { key: "mrrMilestones", label: "MRR Milestones", desc: "Celebrate when you hit new MRR milestones." },
                  { key: "newSignups", label: "New Signups", desc: "Notify on every new user registration." },
                  { key: "paymentFailed", label: "Payment Failures", desc: "Alert when a payment fails or is declined." },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Receive a comprehensive weekly performance report." },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className={["relative w-10 h-5 rounded-full transition-all flex-shrink-0 mt-0.5", notifications[key as keyof typeof notifications] ? "bg-indigo-600" : "bg-white/10"].join(" ")}
                    >
                      <span className={["absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all", notifications[key as keyof typeof notifications] ? "left-5" : "left-0.5"].join(" ")} />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleSave} className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-colors">
                {saved ? <Check className="w-4 h-4" /> : null}
                {saved ? "Saved!" : "Save Preferences"}
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-[#13131F] border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">Security Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all pr-10"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">New Password</label>
                  <input type="password" placeholder="Enter new password" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="text-xs font-medium text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-medium text-white mb-3">Active Sessions</p>
                {[
                  { device: "MacBook Pro — Chrome", location: "New York, US", time: "Current session", current: true },
                  { device: "iPhone 15 — Safari", location: "New York, US", time: "2 hours ago", current: false },
                  { device: "Windows PC — Firefox", location: "Chicago, US", time: "3 days ago", current: false },
                ].map((session) => (
                  <div key={session.device} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-medium text-white">{session.device}</p>
                      <p className="text-xs text-slate-500">{session.location} · {session.time}</p>
                    </div>
                    {session.current ? (
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Active</span>
                    ) : (
                      <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={handleSave} className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-colors">
                {saved ? <Check className="w-4 h-4" /> : null}
                {saved ? "Saved!" : "Update Password"}
              </button>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="bg-[#13131F] border border-white/10 rounded-2xl p-6 space-y-6">
              <h2 className="text-base font-semibold text-white">App Preferences</h2>

              <div>
                <p className="text-sm font-medium text-white mb-3">Theme</p>
                <div className="flex gap-3">
                  {["dark", "light", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={["flex-1 py-3 rounded-xl border text-sm font-medium capitalize transition-all", theme === t ? "border-indigo-500 bg-indigo-600/20 text-indigo-400" : "border-white/10 bg-white/5 text-slate-400 hover:text-white"].join(" ")}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">Dashboard Default View</p>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all">
                  <option value="overview">Overview (All Charts)</option>
                  <option value="revenue">Revenue Focus</option>
                  <option value="users">User Growth Focus</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">Currency Display</p>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">Compact Mode</p>
                  <p className="text-xs text-slate-500 mt-0.5">Show more data with reduced spacing.</p>
                </div>
                <button className="relative w-10 h-5 rounded-full bg-white/10 transition-all">
                  <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-white">Auto-refresh Charts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Refresh chart data every 5 minutes.</p>
                </div>
                <button className="relative w-10 h-5 rounded-full bg-indigo-600 transition-all">
                  <span className="absolute top-0.5 left-5 w-4 h-4 rounded-full bg-white transition-all" />
                </button>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-sm font-medium text-white mb-3">Danger Zone</p>
                <div className="flex gap-3">
                  <button className="text-xs font-medium text-amber-400 border border-amber-400/30 px-4 py-2 rounded-xl hover:bg-amber-400/10 transition-colors">
                    Export All Data
                  </button>
                  <button className="text-xs font-medium text-red-400 border border-red-400/30 px-4 py-2 rounded-xl hover:bg-red-400/10 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={handleSave} className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-colors">
                  {saved ? <Check className="w-4 h-4" /> : null}
                  {saved ? "Saved!" : "Save Preferences"}
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="w-3 h-3" />
                  Need help? Contact support@pulseai.com
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
