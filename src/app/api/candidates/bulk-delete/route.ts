import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: 'Invalid candidate IDs' }, { status: 400 });
    }
    
    const result = await Candidate.deleteMany({ _id: { $in: ids } });
    
    return NextResponse.json({ 
      message: 'Candidates deleted successfully', 
      deletedCount: result.deletedCount 
    });
  } catch (error: any) {
    console.error('API Candidates Bulk Delete Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete candidates' }, { status: 500 });
  }
}
