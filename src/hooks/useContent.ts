import { useState, useEffect } from "react";

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
        console.log(
          `useContent: Response status for "${section}":`,
          response.status
        );

        if (response.ok) {const data = await response.json();
          console.log(`useContent: Raw data for "${section}":`, data);
          
          const contentMap: { [key: string]: string } = {};
          
          // Caso A: formato { contents: [{ key, value }, ...] }  <-- footer qui
          if (data && Array.isArray((data as any).contents)) {
            console.log(
              `useContent: "${section}" -> using contents[] format, length:`,
              (data as any).contents.length
            );
          
            (data as any).contents.forEach(
              (item: { key?: string; value?: unknown }, index: number) => {
                console.log(`useContent: "${section}" contents[${index}] =`, item);
          
                if (!item || typeof item.key !== "string") return;
                if (typeof item.value === "string") {
                  contentMap[item.key] = item.value;
                }
              }
            );
          
          // Caso B: data è direttamente un array di { key, value, ... } (es. header/cta se non hanno "contents")
          } else if (Array.isArray(data)) {
            console.log(
              `useContent: "${section}" -> using direct array format, length:`,
              data.length
            );
          
            (data as Array<{ key?: string; value?: unknown }>).forEach(
              (item, index) => {
                console.log(`useContent: "${section}" array[${index}] =`, item);
          
                if (!item || typeof item.key !== "string") return;
                if (typeof item.value === "string") {
                  contentMap[item.key] = item.value;
                }
              }
            );
          
          // Caso C: oggetto piatto { slide1_title: '...', ... } (hero ecc.)
          } else if (data && typeof data === "object") {
            console.log(
              `useContent: "${section}" -> using flat object format, keys:`,
              Object.keys(data as Record<string, unknown>)
            );
          
            Object.entries(data as Record<string, unknown>).forEach(
              ([key, value], index) => {
                console.log(
                  `useContent: "${section}" flat[${index}] key="${key}" value=`,
                  value
                );
                if (typeof value === "string") contentMap[key] = value;
              }
            );
          
          // Caso D: formato inatteso
          } else {
            console.error(
              `useContent: "${section}" -> unsupported data format:`,
              data
            );
          }
          
          console.log(`useContent: Final mapped content for "${section}":`, contentMap);
          setContent(contentMap);
          
        } else {
          const errorText = await response.text();
          console.error(
            `useContent: Error response for "${section}":`,
            errorText
          );
          setError(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error(`useContent: Exception for "${section}":`, error);
        setError("Errore di connessione");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [section]);

  return { content, loading, error };
}
