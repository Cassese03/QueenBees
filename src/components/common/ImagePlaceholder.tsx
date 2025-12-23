'use client';

import { CSSProperties } from 'react';

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  text?: string;
  gradient?: string;
  className?: string;
}

export default function ImagePlaceholder({ 
  width = '100%', 
  height = '300px', 
  text = 'Immagine',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  className = ''
}: ImagePlaceholderProps) {
  const style: CSSProperties = {
    width,
    height,
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: 500,
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className={className} style={style}>
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {text}
      </div>
    </div>
  );
}
