import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

async function ensureDirs() {
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

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

export async function POST(request: NextRequest) {
  try {
    await ensureDirs();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nessun file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileId = uuidv4();
    const ext = path.extname(file.name);
    const filename = `${fileId}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filepath, new Uint8Array(buffer));

    const imageData = await readImages();
    const newImage = {
      id: fileId,
      url: `/uploads/${filename}`,
      name: file.name,
      section: 'general',
      uploadedAt: new Date().toISOString(),
    };

    imageData.images.push(newImage);
    await writeImages(imageData);

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Errore upload' }, { status: 500 });
  }
}
