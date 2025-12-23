import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('[GET /api/admin/content/images] Listing images from Blob');
    
    // Lista TUTTE le immagini senza prefix per debug
    const { blobs } = await list();

    console.log(`[GET /api/admin/content/images] Found ${blobs.length} total blobs`);
    
    // Filtra solo quelle in uploads/
    const uploadBlobs = blobs.filter(blob => blob.pathname.startsWith('uploads/'));
    
    console.log(`[GET /api/admin/content/images] Found ${uploadBlobs.length} upload images`);

    const images = uploadBlobs.map((blob) => ({
      id: blob.pathname,
      url: blob.url,
      name: blob.pathname.split('/').pop(),
      section: blob.pathname.split('/')[1] || 'general',
      uploadedAt: blob.uploadedAt,
      size: blob.size
    }));

    return NextResponse.json({ 
      success: true, 
      images,
      debug: {
        totalBlobs: blobs.length,
        uploadBlobs: uploadBlobs.length,
        allPaths: blobs.map(b => b.pathname)
      }
    });
  } catch (error: any) {
    console.error('[GET /api/admin/content/images] Error:', error);
    return NextResponse.json(
      { error: 'Errore caricamento immagini', details: error.message },
      { status: 500 }
    );
  }
}
