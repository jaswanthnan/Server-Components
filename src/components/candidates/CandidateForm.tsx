'use client';

import React from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { createCandidate } from '@/lib/actions/candidate-actions';
import { Loader2, Save, X } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  message: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Save className="w-5 h-5" />
          Save Candidate
        </>
      )}
    </button>
  );
}

export default function CandidateForm() {
  // @ts-ignore - useFormState types can be tricky with Server Actions
  const [state, formAction] = useFormState(createCandidate, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
          <input
            required
            name="name"
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
          <input
            required
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Job Role</label>
          <input
            required
            name="role"
            type="text"
            placeholder="Senior Developer"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Experience (Years)</label>
          <input
            required
            name="experience"
            type="number"
            min="0"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label>
        <input
          required
          name="location"
          type="text"
          placeholder="New York, NY"
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {state?.error && (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium border border-rose-100 animate-in fade-in zoom-in-95">
          {state.error}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Link
          href="/candidates"
          className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-2xl font-bold transition-all"
        >
          <X className="w-5 h-5" />
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
