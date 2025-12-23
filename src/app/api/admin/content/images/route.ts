import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json');

async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readImages() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(IMAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { images: [] };
  }
}

async function writeImages(data: any) {
  await ensureDataDir();
  await fs.writeFile(IMAGES_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await readImages();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Errore lettura' }, { status: 500 });
  }
}
