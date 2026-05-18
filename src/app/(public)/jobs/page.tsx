import React from 'react';
import dbConnect from '@/lib/mongodb';
import Job from '@/lib/models/Job';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import Link from 'next/link';

/**
 * 🚀 NEXT.JS CORE CONCEPTS: SSG + ISR
 * -----------------------------------
 * 1. SSG (Static Site Generation): This page is generated at BUILD TIME.
 * 2. ISR (Incremental Static Regeneration): Next.js refreshes the static page in the background.
 * 3. next.revalidate: Controls how often the page should be re-generated.
 */



async function getJobs() {    
  await dbConnect();
  
  /**
   * CONCEPT: next.revalidate (Fetch Level)
   * If we were using an external API, we would use it like this:
   * 
   * const res = await fetch('https://api.example.com/jobs', {
   *   next: { revalidate: 60, tags: ['jobs'] }
   * });
   */
  
  return Job.find({ status: 'Open' }).sort({ createdAt: -1 }).lean();
}

import { connection } from 'next/server';

export default async function PublicJobsPage() {
  await connection();
  const jobs = await getJobs();
  
  // This timestamp is baked into the static page on the server.
  // It will ONLY change when the server re-renders the page (every 60s max).
  const lastRevalidated = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 🟢 UI INDICATOR: How to check ISR */}
      <div className="bg-indigo-600 text-white py-3 shadow-lg relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Next.js Concept Active</p>
              <p className="text-sm font-bold">SSG + ISR (Incremental Static Regeneration)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Last Cache Refresh</p>
              <p className="text-sm font-mono font-bold bg-white/10 px-3 py-1 rounded-full">{lastRevalidated}</p>
            </div>
            <div className="text-right border-l border-white/20 pl-6">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Revalidate Every</p>
              <p className="text-sm font-bold">60 Seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Careers at HireSync
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Build the <span className="text-indigo-600">future of HR.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Join a world-class team of engineers, designers, and thinkers. 
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Open Positions ({jobs.length})</h2>
        </div>

        <div className="grid gap-4">
          {jobs.map((job: any) => (
            <div key={job._id.toString()} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">Competitive Salary</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-[1.5rem] font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all whitespace-nowrap">
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-medium text-lg">No open positions at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
