import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || 'general';

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);

    try {
      const files = await readdir(uploadDir);
      
      const images = await Promise.all(
        files
          .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
          .map(async (file) => {
            const filepath = path.join(uploadDir, file);
            const stats = await stat(filepath);
            
            return {
              filename: file,
              url: `/uploads/${category}/${file}`,
              size: stats.size,
              created: stats.birthtime,
            };
          })
      );

      // Ordina per data (più recenti prima)
      images.sort((a, b) => b.created.getTime() - a.created.getTime());

      return NextResponse.json({ images });

    } catch (error) {
      // Directory non esiste o vuota
      return NextResponse.json({ images: [] });
    }

  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json(
      { error: 'Errore nel caricamento immagini' },
      { status: 500 }
    );
  }
}
