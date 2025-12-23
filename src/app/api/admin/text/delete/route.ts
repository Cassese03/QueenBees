import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/blob-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body.url || body.imageUrl;

    console.log('[POST /api/admin/images/delete] Request body:', body);
    console.log('[POST /api/admin/images/delete] URL to delete:', url);

    if (!url) {
      return NextResponse.json(
        { error: 'URL non fornito', received: body },
        { status: 400 }
      );
    }

    console.log('[POST /api/admin/images/delete] Deleting from Blob:', url);

    await deleteImage(url);

    console.log('[POST /api/admin/images/delete] Deleted successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[POST /api/admin/images/delete] Error:', error);
    return NextResponse.json(
      { 
        error: 'Errore eliminazione', 
        details: error.message, 
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Prova prima dal body (se presente)
    let url = null;
    
    try {
      const body = await request.json();
      url = body.url || body.imageUrl;
    } catch {
      // Se non c'è body, prova dai query params
      url = request.nextUrl.searchParams.get('url');
    }

    console.log('[DELETE /api/admin/images/delete] URL to delete:', url);

    if (!url) {
      return NextResponse.json(
        { error: 'URL non fornito (cercato in body e query params)' },
        { status: 400 }
      );
    }

    console.log('[DELETE /api/admin/images/delete] Deleting from Blob:', url);

    await deleteImage(url);

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[DELETE /api/admin/images/delete] Error:', error);
    return NextResponse.json(
      { error: 'Errore eliminazione', details: error.message },
      { status: 500 }
    );
  }
}
