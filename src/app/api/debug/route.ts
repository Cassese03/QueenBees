import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    platform: 'vercel',
    env: {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? 'EXISTS' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    hasFs: false, // Deve essere false su Vercel
    modulesImported: {
      blobStorage: true,
      fs: false, // Deve essere false
    }
  });
}
