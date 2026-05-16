import React, { Suspense } from 'react';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';
import CandidateTable from '@/components/candidates/CandidateTable';
import CandidateFilters from '@/components/candidates/CandidateFilters';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  await dbConnect();

  // Basic filtering logic (server-side)
  const query: any = {};
  if (params.status) {
    query.status = params.status;
  }

  const candidates = await Candidate.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Link
          href="/candidates/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Candidate
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CandidateFilters />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="h-[600px] w-full bg-white animate-pulse rounded-3xl" />}>
            <CandidateTable initialData={JSON.parse(JSON.stringify(candidates))} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
