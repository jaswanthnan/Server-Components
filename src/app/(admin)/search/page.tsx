'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Users, Briefcase, FileText, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * 🔍 CONCEPT: Dynamic Client-Side Search
 * This component demonstrates:
 * 1. Client-side interactivity.
 * 2. URL-based state (Search Params).
 * 3. Fetching from an API route.
 */

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ candidates: any[], jobs: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
        // Update URL
        router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        setResults(null);
        router.push('/search', { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  async function performSearch(searchTerm: string) {
    setIsLoading(true);
    try {
      // In a real app, you would have an API route like /api/search
      // For this demo, we'll simulate a fetch to an endpoint
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
      // Fallback for demo if API isn't ready
      setResults({ candidates: [], jobs: [] });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Global Search</h1>
        <p className="text-slate-500 mt-1">Search across candidates, jobs, and documents.</p>
      </div>

      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
           {isLoading ? (
             <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
           ) : (
             <SearchIcon className="w-6 h-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
           )}
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing to search (e.g. Jaswanth)..." 
          className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-[2rem] text-xl font-medium shadow-sm transition-all outline-none"
        />
      </div>

      {!results && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Candidates', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Jobs', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Documents', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((item) => (
            <button key={item.label} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all text-center space-y-4 group">
              <div className={`mx-auto w-16 h-16 ${item.bg} dark:bg-slate-800 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8" />
              </div>
              <span className="block font-bold text-slate-900 dark:text-white">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {results && (
        <div className="space-y-8">
          {/* Candidates Results */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Candidates ({results.candidates.length})
            </h2>
            {results.candidates.length > 0 ? (
              <div className="grid gap-4">
                {results.candidates.map((c: any) => (
                  <div key={c._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-indigo-500 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600 uppercase">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center text-slate-500">
                No candidates found.
              </div>
            )}
          </section>

          {/* Jobs Results */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              Jobs ({results.jobs.length})
            </h2>
            {results.jobs.length > 0 ? (
              <div className="grid gap-4">
                {results.jobs.map((j: any) => (
                  <div key={j._id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-indigo-500 transition-all">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{j.title}</p>
                      <p className="text-xs text-slate-500">{j.department} • {j.location}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center text-slate-500">
                No jobs found.
              </div>
            )}
          </section>
        </div>
      )}

      {!results && !isLoading && !query && (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-center">
          <div className="max-w-xs mx-auto space-y-4">
            <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
              <SearchIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Start Searching</h3>
            <p className="text-slate-500">Enter a name, job title, or keyword above.</p>
          </div>
        </div>
      )}
    </div>
  );
}
