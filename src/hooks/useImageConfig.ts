import { useState, useEffect } from 'react';

interface ImageConfig {
  [section: string]: {
    [key: string]: string;
  };
}

export function useImageConfig(section: string, key: string, fallback: string = ''): string {
  const [imageUrl, setImageUrl] = useState<string>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/admin/images/config');
        if (response.ok) {
          const config: ImageConfig = await response.json();
          const url = config[section]?.[key];
          
          if (url) {
            setImageUrl(url);
          } else {
            setImageUrl(fallback);
          }
        }
      } catch (error) {
        console.error('Error loading image config:', error);
        setImageUrl(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [section, key, fallback]);

  return imageUrl;
}

// Hook per caricare tutte le immagini di una sezione
export function useSectionImages(section: string) {
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/admin/images/config');
        if (response.ok) {
          const config: ImageConfig = await response.json();
          setImages(config[section] || {});
        }
      } catch (error) {
        console.error('Error loading images config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [section]);

  return { images, loading };
}
