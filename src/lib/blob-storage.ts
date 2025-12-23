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
    const { blobs } = await list({ 
      prefix: CONTENT_BLOB_PATH,
      limit: 1,
      token: process.env.BLOB_READ_WRITE_TOKEN 
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
    
    // Elimina il vecchio file se esiste
    const { blobs } = await list({ 
      prefix: CONTENT_BLOB_PATH,
      limit: 10,
      token: process.env.BLOB_READ_WRITE_TOKEN 
    });
    
    for (const blob of blobs) {
      console.log('Deleting old blob:', blob.url);
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }

    // Salva il nuovo contenuto
    const result = await put(CONTENT_BLOB_PATH, JSON.stringify(content, null, 2), {
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
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
      limit: 1,
      token: process.env.BLOB_READ_WRITE_TOKEN 
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
    
    const { blobs } = await list({ 
      prefix: IMAGES_CONFIG_BLOB_PATH,
      limit: 10,
      token: process.env.BLOB_READ_WRITE_TOKEN 
    });
    
    for (const blob of blobs) {
      console.log('Deleting old config blob:', blob.url);
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }

    const result = await put(IMAGES_CONFIG_BLOB_PATH, JSON.stringify(config, null, 2), {
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
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
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
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
    console.log('Deleting image:', imageUrl);
    await del(imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image from Blob:', error);
  }
}

function getDefaultContent(): ContentData {
  return {
    hero: {
      title: "Queen Bees - Centro Estetico",
      subtitle: "Il tuo benessere è la nostra missione",
      cta: "Prenota Ora",
      image: "/images/hero.jpg"
    },
    about: {
      title: "Chi Siamo",
      description: "Queen Bees è un centro estetico all'avanguardia...",
      features: [
        "Professionisti certificati",
        "Prodotti di alta qualità",
        "Ambiente rilassante"
      ]
    },
    services: [],
    gallery: [],
    testimonials: [],
    contact: {
      email: "info@queenbees.com",
      phone: "+39 123 456 7890",
      address: "Via Example 123, Milano",
      hours: "Lun-Ven: 9:00-19:00"
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
