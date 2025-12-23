import { NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';

export async function POST() {
  try {
    console.log('Starting cleanup...');
    
    // Lista tutti i file
    const { blobs } = await list();
    
    console.log(`Found ${blobs.length} total blobs`);
    
    // Trova duplicati di images-config
    const configFiles = blobs.filter(b => b.pathname.includes('data/images-config'));
    
    console.log(`Found ${configFiles.length} config files`);
    
    // Ordina per data (più recente prima)
    configFiles.sort((a, b) => {
      const aTime = new Date(a.uploadedAt).getTime();
      const bTime = new Date(b.uploadedAt).getTime();
      return bTime - aTime;
    });
    
    // Tieni solo il primo (più recente), elimina gli altri
    const toDelete = configFiles.slice(1);
    
    console.log(`Deleting ${toDelete.length} old config files...`);
    
    for (const blob of toDelete) {
      console.log('Deleting:', blob.pathname);
      await del(blob.url);
    }
    
    // Fai lo stesso per content.json
    const contentFiles = blobs.filter(b => b.pathname.includes('data/content'));
    contentFiles.sort((a, b) => {
      const aTime = new Date(a.uploadedAt).getTime();
      const bTime = new Date(b.uploadedAt).getTime();
      return bTime - aTime;
    });
    
    const toDeleteContent = contentFiles.slice(1);
    
    console.log(`Deleting ${toDeleteContent.length} old content files...`);
    
    for (const blob of toDeleteContent) {
      console.log('Deleting:', blob.pathname);
      await del(blob.url);
    }
    
    // Lista i file rimanenti
    const { blobs: remainingBlobs } = await list();
    
    return NextResponse.json({
      success: true,
      message: 'Cleanup completed! ✅',
      deleted: {
        config: toDelete.length,
        content: toDeleteContent.length
      },
      remaining: remainingBlobs.map(b => ({
        pathname: b.pathname,
        url: b.url,
        size: b.size,
        uploadedAt: b.uploadedAt
      }))
    });
  } catch (error: any) {
    console.error('Cleanup error:', error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
