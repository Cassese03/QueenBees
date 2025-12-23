import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/blob-storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    console.log('[GET /api/admin/content/texts] Loading section:', section);

    const content = await getContent();

    if (section && section !== 'all') {
      // Restituisci solo la sezione richiesta
      const sectionData = (content as any)[section];
      
      if (!sectionData) {
        return NextResponse.json(
          { error: `Section '${section}' not found` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        contents: Array.isArray(sectionData) ? sectionData : [sectionData]
      });
    }

    // Restituisci tutto il contenuto
    return NextResponse.json({ contents: content });
  } catch (error: any) {
    console.error('[GET /api/admin/content/texts] Error:', error);
    return NextResponse.json(
      { error: 'Errore nel caricamento', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, contents } = body;

    console.log('[POST /api/admin/content/texts] Saving section:', section);
    console.log('[POST /api/admin/content/texts] Contents:', contents);

    // Carica il contenuto esistente
    const content = await getContent();

    // Aggiorna la sezione
    if (section && contents) {
      (content as any)[section] = contents;
    } else {
      // Se non c'è una sezione specifica, aggiorna tutto
      Object.assign(content, body);
    }

    // Salva sul Blob
    await saveContent(content);

    console.log('[POST /api/admin/content/texts] Saved successfully');

    return NextResponse.json({
      success: true,
      message: 'Contenuto salvato con successo su Vercel Blob'
    });
  } catch (error: any) {
    console.error('[POST /api/admin/content/texts] Error:', error);
    return NextResponse.json(
      { 
        error: 'Errore nel salvataggio', 
        details: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}
