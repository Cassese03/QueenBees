import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/blob-storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { section } = params;
    console.log('[GET /api/content/[section]] Loading section:', section);

    const content = await getContent();
    const sectionData = (content as any)[section];

    if (!sectionData) {
      return NextResponse.json(
        { error: `Section '${section}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(sectionData);
  } catch (error: any) {
    console.error('[GET /api/content/[section]] Error:', error);
    return NextResponse.json(
      { error: 'Errore caricamento', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const { section } = params;
    const data = await request.json();

    console.log('[POST /api/content/[section]] Saving section:', section);

    const content = await getContent();
    (content as any)[section] = data;

    await saveContent(content);

    return NextResponse.json({
      success: true,
      message: `Section '${section}' salvata su Blob`
    });
  } catch (error: any) {
    console.error('[POST /api/content/[section]] Error:', error);
    return NextResponse.json(
      { error: 'Errore salvataggio', details: error.message },
      { status: 500 }
    );
  }
}
