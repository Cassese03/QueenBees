import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/blob-storage';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL non fornito' },
        { status: 400 }
      );
    }

    console.log('[POST /api/admin/images/delete] Deleting:', url);

    await deleteImage(url);

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[POST /api/admin/images/delete] Error:', error);
    return NextResponse.json(
      { error: 'Errore eliminazione', details: error.message },
      { status: 500 }
    );
  }
}
