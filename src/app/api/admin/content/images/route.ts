import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('[GET /api/admin/content/images] Listing images from Blob');
    
    // Lista tutte le immagini dal Blob
    const { blobs } = await list({
      prefix: 'uploads/'
    });

    const images = blobs.map((blob) => ({
      id: blob.pathname,
      url: blob.url,
      name: blob.pathname.split('/').pop(),
      section: blob.pathname.split('/')[1] || 'general',
      uploadedAt: blob.uploadedAt,
      size: blob.size
    }));

    return NextResponse.json({ 
      success: true, 
      images 
    });
  } catch (error: any) {
    console.error('[GET /api/admin/content/images] Error:', error);
    return NextResponse.json(
      { error: 'Errore caricamento immagini', details: error.message },
      { status: 500 }
    );
  }
}
