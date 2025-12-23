import { NextRequest, NextResponse } from 'next/server';

// Credenziali hardcoded (in produzione usa variabili d'ambiente)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        token: 'admin-token-' + Date.now()
      });
    }

    return NextResponse.json(
      { error: 'Credenziali non valide' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Errore login', details: error.message },
      { status: 500 }
    );
  }
}
