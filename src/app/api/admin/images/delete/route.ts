import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || !url.startsWith('/uploads/')) {
      return NextResponse.json(
        { error: 'URL non valido' },
        { status: 400 }
      );
    }

    // Rimuovi /uploads/ dall'inizio
    const relativePath = url.replace('/uploads/', '');
    const filepath = path.join(process.cwd(), 'public', 'uploads', relativePath);

    await unlink(filepath);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Errore durante eliminazione' },
      { status: 500 }
    );
  }
}
