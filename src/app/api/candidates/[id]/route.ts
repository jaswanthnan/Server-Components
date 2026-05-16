import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const candidate = await Candidate.findById(params.id).lean();
    
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    return NextResponse.json(candidate);
  } catch (error) {
    console.error('API Candidate GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidate' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const candidate = await Candidate.findByIdAndUpdate(params.id, body, { new: true }).lean();
    
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    return NextResponse.json(candidate);
  } catch (error: any) {
    console.error('API Candidate PATCH Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update candidate' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const candidate = await Candidate.findByIdAndDelete(params.id);
    
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('API Candidate DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete candidate' }, { status: 500 });
  }
}
