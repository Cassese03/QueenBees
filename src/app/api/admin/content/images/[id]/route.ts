import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/blob-storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log('[DELETE /api/admin/content/images/[id]] Deleting image id:', id);

    // Prova a prendere l'URL dai query params
    const imageUrl = request.nextUrl.searchParams.get('url');
    
    console.log('[DELETE /api/admin/content/images/[id]] URL from params:', imageUrl);

    // Se non c'è l'URL nei query params, usa l'ID come URL (potrebbe essere l'URL completo)
    const urlToDelete = imageUrl || id;
    
    if (!urlToDelete) {
      return NextResponse.json(
        { error: 'URL immagine non fornito' },
        { status: 400 }
      );
    }

    console.log('[DELETE /api/admin/content/images/[id]] Deleting:', urlToDelete);

    await deleteImage(urlToDelete);

    console.log('[DELETE /api/admin/content/images/[id]] Deleted successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[DELETE /api/admin/content/images/[id]] Error:', error);
    return NextResponse.json(
      { error: 'Errore eliminazione', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    message: 'Le immagini sono accessibili direttamente dal loro URL pubblico',
    id: params.id
  });
}
