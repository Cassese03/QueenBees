import { NextResponse } from 'next/server';
import { saveContent, saveImagesConfig, getContent, getImagesConfig } from '@/lib/blob-storage';

export async function POST() {
  try {
    console.log('[POST /api/admin/init] Initializing Blob storage...');

    // Forza la creazione dei file di default
    const content = await getContent(); // Questo creerà il file se non esiste
    const imagesConfig = await getImagesConfig(); // Questo creerà il file se non esiste

    console.log('[POST /api/admin/init] Content:', content);
    console.log('[POST /api/admin/init] Images config:', imagesConfig);

    return NextResponse.json({
      success: true,
      message: 'Blob storage initialized successfully',
      data: {
        content,
        imagesConfig
      }
    });
  } catch (error: any) {
    console.error('[POST /api/admin/init] Error:', error);
    return NextResponse.json(
      { error: 'Initialization failed', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('[GET /api/admin/init] Checking Blob storage...');

    const content = await getContent();
    const imagesConfig = await getImagesConfig();

    return NextResponse.json({
      success: true,
      message: 'Blob storage is ready',
      data: {
        content,
        imagesConfig
      }
    });
  } catch (error: any) {
    console.error('[GET /api/admin/init] Error:', error);
    return NextResponse.json(
      { error: 'Check failed', details: error.message },
      { status: 500 }
    );
  }
}
