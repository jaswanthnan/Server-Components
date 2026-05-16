import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/lib/models/Job';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const job = await Job.findById(params.id).lean();
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('API Job GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const job = await Job.findByIdAndUpdate(params.id, body, { new: true }).lean();
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error: any) {
    console.error('API Job PATCH Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update job' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const job = await Job.findByIdAndDelete(params.id);
    
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('API Job DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
