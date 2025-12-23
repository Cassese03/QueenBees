import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Credenziali hardcoded (in produzione usa database!)
    if (email === 'admin' && password === 'admin') {
      // Crea token semplice
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      // Setta cookie
      cookies().set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 ore
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Credenziali non valide' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore server' },
      { status: 500 }
    );
  }
}
