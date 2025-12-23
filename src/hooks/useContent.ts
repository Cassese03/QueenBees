import { useState, useEffect } from 'react';

interface ContentItem {
  key: string;
  value: string;
  label: string;
}

export function useContent(section: string) {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      console.log(`useContent: Fetching section "${section}"`);
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/content/${section}`);
        console.log(`useContent: Response status for "${section}":`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`useContent: Received data for "${section}":`, data);
          
          const contentMap: { [key: string]: string } = {};
          
          if (data.contents && Array.isArray(data.contents)) {
            data.contents.forEach((item: ContentItem) => {
              contentMap[item.key] = item.value;
            });
          }
          
          console.log(`useContent: Mapped content for "${section}":`, contentMap);
          setContent(contentMap);
        } else {
          const errorText = await response.text();
          console.error(`useContent: Error response for "${section}":`, errorText);
          setError(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error(`useContent: Exception for "${section}":`, error);
        setError('Errore di connessione');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content, loading, error };
}
