'use server';

import dbConnect from '@/lib/mongodb';
import Candidate from '@/lib/models/Candidate';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCandidate(prevState: any, formData: FormData) {
  await dbConnect();
  
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    role: formData.get('role') as string,
    experience: Number(formData.get('experience')),
    location: formData.get('location') as string,
    status: (formData.get('status') as string) || 'Applied',
  };

  try {
    const candidate = new Candidate(rawFormData);
    await candidate.save();
  } catch (error: any) {
    return { ...prevState, error: error.message };
  }

  revalidatePath('/candidates');
  redirect('/candidates');
}

export async function updateCandidate(id: string, prevState: any, formData: FormData) {
  await dbConnect();
  
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    role: formData.get('role') as string,
    experience: Number(formData.get('experience')),
    location: formData.get('location') as string,
    status: formData.get('status') as string,
  };

  try {
    await Candidate.findByIdAndUpdate(id, rawFormData);
  } catch (error: any) {
    return { ...prevState, error: error.message };
  }

  revalidatePath('/candidates');
  revalidatePath(`/candidates/${id}`);
  redirect('/candidates');
}

export async function deleteCandidate(id: string) {
  await dbConnect();
  
  try {
    await Candidate.findByIdAndDelete(id);
    revalidatePath('/candidates');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
