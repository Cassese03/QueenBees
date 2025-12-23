import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/blob-storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('GET /api/content - Start');
    const content = await getContent();
    console.log('GET /api/content - Success');
    return NextResponse.json(content);
  } catch (error: any) {
    console.error('Error in GET /api/content:', error);
    return NextResponse.json(
      { error: 'Failed to load content', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/content - Start');
    const content = await request.json();
    console.log('POST /api/content - Saving:', content);
    
    await saveContent(content);
    
    console.log('POST /api/content - Success');
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully' 
    });
  } catch (error: any) {
    console.error('Error in POST /api/content:', error);
    return NextResponse.json(
      { error: 'Failed to save content', details: error.message },
      { status: 500 }
    );
  }
}
