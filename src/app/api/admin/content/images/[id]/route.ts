import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

async function readImages() {
  try {
    const data = await fs.readFile(IMAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { images: [] };
  }
}

async function writeImages(data: any) {
  await fs.writeFile(IMAGES_FILE, JSON.stringify(data, null, 2));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageData = await readImages();
    const image = imageData.images.find((img: any) => img.id === params.id);

    if (!image) {
      return NextResponse.json({ error: 'Immagine non trovata' }, { status: 404 });
    }

    const filepath = path.join(process.cwd(), 'public', image.url);
    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    imageData.images = imageData.images.filter((img: any) => img.id !== params.id);
    await writeImages(imageData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Errore eliminazione' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const imageData = await readImages();
    
    const index = imageData.images.findIndex((img: any) => img.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Immagine non trovata' }, { status: 404 });
    }

    imageData.images[index] = {
      ...imageData.images[index],
      name: body.name,
      section: body.section,
    };

    await writeImages(imageData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Errore aggiornamento' }, { status: 500 });
  }
}
