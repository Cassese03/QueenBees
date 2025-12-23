import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/blob-storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const section = (formData.get('section') as string) || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'Nessun file fornito' },
        { status: 400 }
      );
    }

    console.log('[POST /api/admin/images/upload] Uploading to Blob:', file.name);

    const imageUrl = await uploadImage(file, `uploads/${section}`);

    return NextResponse.json({
      success: true,
      url: imageUrl,
      image: {
        id: Date.now().toString(),
        url: imageUrl,
        name: file.name,
        section: section,
        uploadedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('[POST /api/admin/images/upload] Error:', error);
    return NextResponse.json(
      { error: 'Errore upload', details: error.message },
      { status: 500 }
    );
  }
}
