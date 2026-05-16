'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', applications: 400, interviews: 240, hires: 140 },
  { name: 'Feb', applications: 300, interviews: 139, hires: 80 },
  { name: 'Mar', applications: 200, interviews: 980, hires: 200 },
  { name: 'Apr', applications: 278, interviews: 390, hires: 110 },
  { name: 'May', applications: 189, interviews: 480, hires: 90 },
  { name: 'Jun', applications: 239, interviews: 380, hires: 120 },
];

export default function RecruitmentAnalytics() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recruitment Pipeline</h2>
          <p className="text-sm text-slate-500 mt-1">Application flow over the last 6 months</p>
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-medium px-4 py-2 focus:ring-2 focus:ring-indigo-500">
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="applications" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorApps)" 
            />
            <Area 
              type="monotone" 
              dataKey="interviews" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              fillOpacity={0} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
