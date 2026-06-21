import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await dbConnect();
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password against encrypted hash
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Return user without password
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    return NextResponse.json({ 
      message: 'Login successful',
      user: userWithoutPassword 
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
