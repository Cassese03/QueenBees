'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroContent {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesConfig, setImagesConfig] = useState<any>(null);

  // Carica la configurazione delle immagini
  useEffect(() => {
    fetch('/api/admin/images/config')
      .then(res => res.json())
      .then(data => setImagesConfig(data))
      .catch(err => console.error('Error loading images config:', err));
  }, []);

  // Array delle slide del carosello
  const slides = imagesConfig?.hero ? [
    imagesConfig.hero.slide1,
    imagesConfig.hero.slide2,
    imagesConfig.hero.slide3,
  ].filter(Boolean) : [content.image];

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.carousel}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className={styles.slideImage}
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            />
            <div className={styles.overlay} />
          </motion.div>
        </AnimatePresence>

        {/* Frecce di navigazione - mostrale solo se ci sono più slide */}
        {slides.length > 1 && (
          <>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={prevSlide}
              aria-label="Slide precedente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={nextSlide}
              aria-label="Slide successiva"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Indicatori */}
            <div className={styles.indicators}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentSlide(index);
                  }}
                  aria-label={`Vai alla slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenuto Hero */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <motion.a
            href="#contact"
            className={styles.cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
