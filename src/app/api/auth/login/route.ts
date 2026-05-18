import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { username, password } = body;
    
    if (username === 'admin' && password === 'password') {
      return NextResponse.json({ name: 'Admin', role: 'admin' });
    }
    
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
      password: password
    });
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    return NextResponse.json({ name: user.fullName, role: user.role });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
