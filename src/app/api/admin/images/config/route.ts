import { NextRequest, NextResponse } from 'next/server';
import { getImagesConfig, saveImagesConfig } from '@/lib/blob-storage';

const defaultConfig = {
  hero: {
    slide1: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg', // Moda uomo/donna
    slide2: 'https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg', // Scarpe outlet
    slide3: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg', // Stock abbigliamento
  },
  about: {
    main: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg', // Team lavoro
  },
  services: {
    service1: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg', // Outlet moda
    service2: 'https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg', // Stock Shoes
    service3: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg', // Forniture rivenditori
    service4: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg', // Abiti cerimonia
  },
  logo: {
    main: '/uploads/logo/logo.png', // Logo personalizzato, da inserire
    favicon: '/uploads/logo/favicon.png', // Favicon personalizzato
  },
  chisiamo: {
    storia: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg', // Storia azienda
    team: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg', // Team
  },
};

export async function GET() {
  try {
    const config = await getImagesConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error in GET /api/admin/images/config:', error);
    return NextResponse.json(
      { error: 'Errore nel caricamento configurazione' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { section, key, url } = await request.json();
    
    const config = await getImagesConfig();
    
    if (!config[section]) {
      config[section] = {};
    }
    
    config[section][key] = url;
    
    await saveImagesConfig(config);
    
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Error in POST /api/admin/images/config:', error);
    return NextResponse.json(
      { error: 'Errore nel salvataggio' },
      { status: 500 }
    );
  }
}
