import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/blob-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body.url || body.imageUrl;

    console.log('[POST /api/admin/images/delete] Request body:', body);

    if (!url) {
      return NextResponse.json(
        { error: 'URL non fornito', received: body },
        { status: 400 }
      );
    }

    console.log('[POST /api/admin/images/delete] Deleting:', url);

    await deleteImage(url);

    console.log('[POST /api/admin/images/delete] Deleted successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[POST /api/admin/images/delete] Error:', error);
    return NextResponse.json(
      { error: 'Errore eliminazione', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    console.log('[DELETE /api/admin/images/delete] Query url:', url);

    if (!url) {
      return NextResponse.json(
        { error: 'URL non fornito nei query params' },
        { status: 400 }
      );
    }

    console.log('[DELETE /api/admin/images/delete] Deleting:', url);

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
