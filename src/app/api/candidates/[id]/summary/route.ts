import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const candidate = await Candidate.findById(params.id).select('name role status skills experience').lean();
    
    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    // In a real app, this might use AI to generate a summary.
    // For now, we return a structured summary object.
    const summary = {
      title: `${candidate.name} - ${candidate.role}`,
      status: candidate.status,
      experience: `${candidate.experience} years`,
      topSkills: candidate.skills.slice(0, 3),
      brief: `${candidate.name} is a ${candidate.role} with ${candidate.experience} years of experience, currently in the ${candidate.status} stage.`
    };
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('API Candidate Summary GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidate summary' }, { status: 500 });
  }
}
