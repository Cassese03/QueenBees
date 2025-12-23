import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/blob-storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log('[DELETE] Deleting image:', id);

    const imageUrl = request.nextUrl.searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL immagine non fornito' },
        { status: 400 }
      );
    }

    await deleteImage(imageUrl);

    return NextResponse.json({ 
      success: true, 
      message: 'Immagine eliminata con successo dal Blob' 
    });
  } catch (error: any) {
    console.error('[DELETE] Error:', error);
    return NextResponse.json(
      { error: 'Errore eliminazione', details: error.message },
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
