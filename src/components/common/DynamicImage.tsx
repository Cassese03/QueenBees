'use client';

import { CSSProperties } from 'react';

interface DynamicImageProps {
  width?: string | number;
  height?: string | number;
  category: string;
  alt?: string;
  className?: string;
}

export default function DynamicImage({ 
  width = '100%', 
  height = '300px',
  category,
  alt = 'Immagine',
  className = ''
}: DynamicImageProps) {
  const numericWidth = typeof width === 'string' ? 800 : width;
  const numericHeight = typeof height === 'string' ? 600 : height;
  
  const categoryMap: { [key: string]: number } = {
    'electrical': 1,
    'domotica': 2,
    'solar': 3,
    'team': 4,
    'office': 5,
    'tools': 6,
  };
  
  const imageId = categoryMap[category] || Math.floor(Math.random() * 100);
  const imageUrl = `https://picsum.photos/seed/${category}${imageId}/${numericWidth}/${numericHeight}`;

  const containerStyle: CSSProperties = {
    width,
    height,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className={className} style={containerStyle}>
      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
