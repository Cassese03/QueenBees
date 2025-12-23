import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'Nessun file caricato' },
        { status: 400 }
      );
    }

    // Verifica tipo file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato file non supportato. Usa: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Verifica dimensione (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File troppo grande. Max 5MB' },
        { status: 400 }
      );
    }

    // Crea directory se non esiste
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory già esistente
    }

    // Genera nome file unico
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    // Salva file
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    await writeFile(filepath, buffer);

    // URL pubblico
    const publicUrl = `/uploads/${category}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      category,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Errore durante upload' },
      { status: 500 }
    );
  }
}
