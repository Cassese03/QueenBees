import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/blob-storage';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error in GET /api/content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    await saveContent(content);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully' 
    });
  } catch (error) {
    console.error('Error in POST /api/content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
