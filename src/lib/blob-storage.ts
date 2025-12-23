import { put, list, del } from '@vercel/blob';

export interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
  };
  about: {
    title: string;
    description: string;
    features: string[];
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
  gallery: Array<{
    id: string;
    image: string;
    caption: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    text: string;
    rating: number;
  }>;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
}

const CONTENT_BLOB_PATH = 'data/content.json';
const IMAGES_CONFIG_BLOB_PATH = 'data/images-config.json';

// Leggi il content.json dal Blob
export async function getContent(): Promise<ContentData> {
  try {
    console.log('Fetching content from Blob...');
    // NON passare token, lo legge automaticamente
    const { blobs } = await list({ 
      prefix: CONTENT_BLOB_PATH,
      limit: 1
    });
    
    if (blobs.length === 0) {
      console.log('No content found, creating default...');
      const defaultContent = getDefaultContent();
      await saveContent(defaultContent);
      return defaultContent;
    }

    console.log('Content blob found:', blobs[0].url);
    const response = await fetch(blobs[0].url, { cache: 'no-store' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading content from Blob:', error);
    return getDefaultContent();
  }
}

// Salva il content.json sul Blob
export async function saveContent(content: ContentData): Promise<void> {
  try {
    console.log('Saving content to Blob...');
    
    // Elimina TUTTI i vecchi file con lo stesso prefix
    const { blobs } = await list({ 
      prefix: 'data/content'  // ← Cambiato per trovare tutti i file content
    });
    
    console.log(`Found ${blobs.length} old content files to delete`);
    
    for (const blob of blobs) {
      console.log('Deleting old blob:', blob.pathname);
      await del(blob.url);
    }

    // Salva il nuovo contenuto
    const result = await put(CONTENT_BLOB_PATH, JSON.stringify(content, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false  // ← Impedisce di aggiungere suffisso random
    });
    
    console.log('Content saved successfully:', result.url);
  } catch (error) {
    console.error('Error saving content to Blob:', error);
    throw new Error(`Failed to save content: ${error}`);
  }
}

// Leggi images-config.json dal Blob
export async function getImagesConfig() {
  try {
    console.log('Fetching images config from Blob...');
    const { blobs } = await list({ 
      prefix: IMAGES_CONFIG_BLOB_PATH,
      limit: 1
    });
    
    if (blobs.length === 0) {
      console.log('No images config found, creating default...');
      const defaultConfig = getDefaultImagesConfig();
      await saveImagesConfig(defaultConfig);
      return defaultConfig;
    }

    console.log('Images config blob found:', blobs[0].url);
    const response = await fetch(blobs[0].url, { cache: 'no-store' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading images config from Blob:', error);
    return getDefaultImagesConfig();
  }
}

// Salva images-config.json sul Blob
export async function saveImagesConfig(config: any): Promise<void> {
  try {
    console.log('Saving images config to Blob...');
    
    // Elimina TUTTI i vecchi file config
    const { blobs } = await list({ 
      prefix: 'data/images-config'  // ← Cambiato per trovare tutti i config
    });
    
    console.log(`Found ${blobs.length} old config files to delete`);
    
    for (const blob of blobs) {
      console.log('Deleting old config blob:', blob.pathname);
      await del(blob.url);
    }

    const result = await put(IMAGES_CONFIG_BLOB_PATH, JSON.stringify(config, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false  // ← Impedisce di aggiungere suffisso random
    });
    
    console.log('Images config saved successfully:', result.url);
  } catch (error) {
    console.error('Error saving images config to Blob:', error);
    throw new Error(`Failed to save images config: ${error}`);
  }
}

// Upload di un'immagine sul Blob
export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    console.log('Uploading image:', file.name, 'size:', file.size, 'type:', file.type);
    
    if (!file || file.size === 0) {
      throw new Error('File is empty or invalid');
    }

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${folder}/${timestamp}-${sanitizedName}`;
    
    console.log('Upload filename:', filename);
    
    const blob = await put(filename, file, {
      access: 'public'
    });

    console.log('Image uploaded successfully:', blob.url);
    return blob.url;
  } catch (error) {
    console.error('Error uploading image to Blob:', error);
    throw new Error(`Failed to upload image: ${error}`);
  }
}

// Elimina un'immagine dal Blob
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    console.log('[blob-storage] Deleting image:', imageUrl);
    
    if (!imageUrl) {
      throw new Error('URL immagine vuoto');
    }

    await del(imageUrl);
    
    console.log('[blob-storage] Image deleted successfully');
  } catch (error: any) {
    console.error('[blob-storage] Error deleting image:', error);
    // Non lanciare errore se l'eliminazione fallisce (l'immagine potrebbe non esistere)
    if (error.message && !error.message.includes('not found')) {
      throw error;
    }
  }
}

function getDefaultContent(): ContentData {
  return {
    hero: {
      title: "Abbigliamento e Calzature Firmate",
      subtitle: "Outlet Nola e Baiano: moda firmata per tutti",
      cta: "Prenota Ora",
      image: "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg"
    },
    about: {
      title: "Chi Siamo",
      description: "Queen Bees è un centro estetico all'avanguardia che offre servizi di alta qualità per il benessere e la bellezza.",
      features: [
        "Professionisti certificati con esperienza pluriennale",
        "Prodotti di alta qualità selezionati",
        "Ambiente rilassante e accogliente"
      ]
    },
    services: [
      {
        id: "service1",
        title: "Outlet Moda",
        description: "Abbigliamento firmato a prezzi outlet",
        image: "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
        link: "#"
      },
      {
        id: "service2",
        title: "Stock Shoes",
        description: "Scarpe di marca per negozi",
        image: "https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg",
        link: "#"
      }
    ],
    gallery: [
      {
        id: "gallery1",
        image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
        caption: "Il nostro store"
      }
    ],
    testimonials: [
      {
        id: "test1",
        name: "Mario Rossi",
        text: "Ottimo servizio e prezzi competitivi!",
        rating: 5
      }
    ],
    contact: {
      email: "info@queenbees.com",
      phone: "+39 081 393 1794",
      address: "Via Example 123, Nola (NA)",
      hours: "Lunedì – Sabato: 9:00 – 13:00 | 16:00 – 20:30"
    }
  };
}

function getDefaultImagesConfig() {
  return {
    hero: {
      slide1: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg',
      slide2: 'https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg',
      slide3: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg',
    },
    about: {
      main: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    },
    services: {
      service1: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg',
      service2: 'https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg',
      service3: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg',
      service4: 'https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg',
    },
    logo: {
      main: '/uploads/logo/logo.png',
      favicon: '/uploads/logo/favicon.png',
    },
    chisiamo: {
      storia: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
      team: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    },
  };
}
