import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const query: any = {};
    if (status) query.status = status;
    const candidates = await Candidate.find(query).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(candidates);
  } catch (error) {
    console.error('API Candidates GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const candidate = await Candidate.create(body);
    return NextResponse.json(candidate, { status: 201 });
  } catch (error: any) {
    console.error('API Candidates POST Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create candidate' }, { status: 400 });
  }
}
