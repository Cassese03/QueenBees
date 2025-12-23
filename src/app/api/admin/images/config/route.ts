import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'data', 'images-config.json');

const defaultConfig = {
  hero: {
    slide1: '/uploads/hero/default1.jpg',
    slide2: '/uploads/hero/default2.jpg',
    slide3: '/uploads/hero/default3.jpg',
  },
  about: {
    main: '/uploads/about/default.jpg',
  },
  services: {
    service1: '/uploads/services/elettrici.jpg',
    service2: '/uploads/services/domotica.jpg',
    service3: '/uploads/services/rinnovabili.jpg',
    service4: '/uploads/services/manutenzione.jpg',
  },
  logo: {
    main: '/uploads/logo/logo.png',
    favicon: '/uploads/logo/favicon.png',
  },
  chisiamo: {
    storia: '/uploads/about/storia.jpg',
    team: '/uploads/about/team.jpg',
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
