import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('[GET /api/admin/images/list] Listing from Blob');

    // Lista TUTTO
    const { blobs } = await list();
    
    console.log(`[GET /api/admin/images/list] Found ${blobs.length} total blobs`);

    // Filtra solo uploads/
    const uploadBlobs = blobs.filter(blob => blob.pathname.startsWith('uploads/'));

    const images = uploadBlobs.map(blob => ({
      id: blob.pathname,
      url: blob.url,
      name: blob.pathname.split('/').pop(),
      uploadedAt: blob.uploadedAt,
      size: blob.size,
      pathname: blob.pathname
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
    console.error('[GET /api/admin/images/list] Error:', error);
    return NextResponse.json(
      { error: 'Errore caricamento lista', details: error.message },
      { status: 500 }
    );
  }
}
