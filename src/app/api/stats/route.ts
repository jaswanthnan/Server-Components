import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';
import Job from '@/lib/models/Job';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const [
      totalCandidates,
      totalJobs,
      activeJobs,
      candidatesByStatus,
      recentCandidates
    ] = await Promise.all([
      Candidate.countDocuments(),
      Job.countDocuments(),
      Job.countDocuments({ status: 'Open' }),
      Candidate.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Candidate.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    const stats = {
      overview: {
        totalCandidates,
        totalJobs,
        activeJobs,
      },
      candidatesByStatus: candidatesByStatus.reduce((acc: any, curr: any) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      recentCandidates
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('API Stats GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
