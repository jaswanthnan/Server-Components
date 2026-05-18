'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  // Map path to page name
  const pageName = pathname === '/dashboard' ? 'Dashboard'
                 : pathname?.startsWith('/candidates') ? 'Candidates'
                 : pathname?.startsWith('/jobs') ? 'Jobs'
                 : pathname?.startsWith('/search') ? 'Search'
                 : '';

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{pageName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
      </div>
    </header>
  );
}
