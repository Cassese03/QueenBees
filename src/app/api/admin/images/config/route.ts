import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'data', 'images-config.json');

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

async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function readConfig() {
  await ensureDataDir();
  try {
    await fs.access(CONFIG_FILE);
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }
}

async function writeConfig(config: any) {
  await ensureDataDir();
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export async function GET() {
  try {
    const config = await readConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore nel caricamento configurazione' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { section, key, url } = await request.json();
    
    const config = await readConfig();
    
    if (!config[section]) {
      config[section] = {};
    }
    
    config[section][key] = url;
    
    await writeConfig(config);
    
    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { error: 'Errore nel salvataggio' },
      { status: 500 }
    );
  }
}
