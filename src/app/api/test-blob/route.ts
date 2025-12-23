import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!token) {
      return NextResponse.json({ 
        error: 'BLOB_READ_WRITE_TOKEN not found',
        env: process.env 
      }, { status: 500 });
    }

    // Test: crea un file di prova
    const testData = { test: 'Hello Blob!', timestamp: new Date().toISOString() };
    const blob = await put('test/test.json', JSON.stringify(testData), {
      access: 'public',
      contentType: 'application/json',
      token,
    });

    // Test: lista i file
    const { blobs } = await list({ token, limit: 5 });

    return NextResponse.json({
      success: true,
      message: 'Blob is working!',
      testBlob: blob,
      existingBlobs: blobs.map(b => ({ url: b.url, pathname: b.pathname })),
    });
  } catch (error: any) {
    console.error('Blob test error:', error);
    return NextResponse.json({
      error: error.message,
      details: error,
      token: process.env.BLOB_READ_WRITE_TOKEN ? 'exists' : 'missing',
    }, { status: 500 });
  }
}
