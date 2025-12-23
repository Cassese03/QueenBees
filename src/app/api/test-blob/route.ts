import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    console.log('Testing Blob...');
    console.log('Token exists:', !!token);
    console.log('Token length:', token?.length);
    
    if (!token) {
      return NextResponse.json({ 
        error: 'BLOB_READ_WRITE_TOKEN not found in environment variables',
        availableEnvVars: Object.keys(process.env).filter(k => k.includes('BLOB'))
      }, { status: 500 });
    }

    // Test: crea un file di prova
    const testData = { test: 'Hello Blob!', timestamp: new Date().toISOString() };
    const blob = await put('test/test.json', JSON.stringify(testData), {
      access: 'public',
      contentType: 'application/json'
    });

    console.log('Test blob created:', blob.url);

    // Test: lista i file
    const { blobs } = await list({ limit: 5 });

    console.log('Existing blobs:', blobs.length);

    return NextResponse.json({
      success: true,
      message: 'Blob is working! ✅',
      testBlob: {
        url: blob.url,
        pathname: blob.pathname
      },
      existingBlobs: blobs.map(b => ({ 
        url: b.url, 
        pathname: b.pathname,
        size: b.size 
      })),
      tokenInfo: {
        exists: true,
        length: token.length,
        prefix: token.substring(0, 20) + '...'
      }
    });
  } catch (error: any) {
    console.error('Blob test error:', error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      tokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
    }, { status: 500 });
  }
}
