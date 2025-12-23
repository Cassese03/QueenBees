import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('[GET /api/admin/images/list] Listing from Blob');

    const { blobs } = await list({
      prefix: 'uploads/'
    });

    const images = blobs.map(blob => ({
      id: blob.pathname,
      url: blob.url,
      name: blob.pathname.split('/').pop(),
      uploadedAt: blob.uploadedAt,
      size: blob.size
    }));

    return NextResponse.json({ 
      success: true, 
      images 
    });
  } catch (error: any) {
    console.error('[GET /api/admin/images/list] Error:', error);
    return NextResponse.json(
      { error: 'Errore caricamento lista', details: error.message },
      { status: 500 }
    );
  }
}
