import React from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import RecruitmentAnalytics from '@/components/dashboard/RecruitmentAnalytics';
import RecentCandidates from '@/components/dashboard/RecentCandidates';

/**
 * CONCEPT: SSR (Server Side Rendering) / Dynamic Rendering
 * This page is rendered on the server for EVERY request.
 */



import { connection } from 'next/server';

export default async function DashboardPage() {
  await connection();
  // CONCEPT: no-store Simulation
  // In a real app, you'd fetch with { cache: 'no-store' }
  const lastFetch = new Date().toLocaleTimeString();

  const stats = [
    { name: 'Total Candidates', value: '2,840', change: '+12.5%', icon: Users, trend: 'up' },
    { name: 'Active Jobs', value: '45', change: '+3.2%', icon: Briefcase, trend: 'up' },
    { name: 'Interviews Scheduled', value: '128', change: '-2.4%', icon: Clock, trend: 'down' },
    { name: 'Hiring Rate', value: '68%', change: '+5.4%', icon: TrendingUp, trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Concept Header */}
      <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500 text-white rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">Dynamic Rendering Mode (SSR)</p>
            <p className="text-sm text-rose-500/80 font-medium">Data refreshed on every request</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Last Server Render</p>
          <p className="text-sm font-mono font-bold text-slate-900 dark:text-white">{lastFetch}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" : "bg-rose-50 text-rose-600 dark:bg-rose-900/20"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-500">{stat.name}</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecruitmentAnalytics />
        </div>
        <div className="lg:col-span-1">
          <RecentCandidates />
        </div>
      </div>
    </div>
  );
}

// Helper for cn in server component
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
