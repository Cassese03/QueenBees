import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/blob-storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'images';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('Uploading file:', file.name, 'to folder:', folder);

    const imageUrl = await uploadImage(file, folder);

    console.log('Upload successful:', imageUrl);

    return NextResponse.json({ 
      success: true, 
      url: imageUrl 
    });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    return NextResponse.json(
      { error: `Failed to upload image: ${error}` },
      { status: 500 }
    );
  }
}
