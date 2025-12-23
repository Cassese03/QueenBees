import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/blob-storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('[Vercel] GET /api/content - Start');
    const content = await getContent();
    console.log('[Vercel] GET /api/content - Success');
    return NextResponse.json(content);
  } catch (error: any) {
    console.error('[Vercel] Error in GET /api/content:', error);
    return NextResponse.json(
      { error: 'Failed to load content', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('[Vercel] POST /api/content - Start');
    const content = await request.json();
    console.log('[Vercel] POST /api/content - Saving...');
    
    await saveContent(content);
    
    console.log('[Vercel] POST /api/content - Success');
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully on Vercel Blob' 
    });
  } catch (error: any) {
    console.error('[Vercel] Error in POST /api/content:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save content', 
        details: error.message,
        stack: error.stack,
        env: {
          hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
          platform: 'vercel'
        }
      },
      { status: 500 }
    );
  }
}
