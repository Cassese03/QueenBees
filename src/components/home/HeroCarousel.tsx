'use client';

import { Carousel, Button } from 'antd';
import { PhoneOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useContent } from '@/hooks/useContent';
import { useSectionImages } from '@/hooks/useImageConfig';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel() {
  const { content, loading } = useContent('hero');
  const { images, loading: imagesLoading } = useSectionImages('hero');

  const slides = [
    {
      image: images.slide1 || 'https://picsum.photos/seed/slide1/1920/800',
      title: content.slide1_title || 'Impianti Elettrici di Qualità',
      subtitle: content.slide1_subtitle || 'Servizi professionali per imprese e privati',
    },
    {
      image: images.slide2 || 'https://picsum.photos/seed/slide2/1920/800',
      title: content.slide2_title || 'Domotica e Automazione',
      subtitle: content.slide2_subtitle || 'Tecnologie smart per la tua casa',
    },
    {
      image: images.slide3 || 'https://picsum.photos/seed/slide3/1920/800',
      title: content.slide3_title || 'Energie Rinnovabili',
      subtitle: content.slide3_subtitle || 'Soluzioni sostenibili per il futuro',
    },
  ];

  return (
    <div className={styles.heroWrapper}>
      <Carousel 
        autoplay 
        autoplaySpeed={5000}
        effect="fade"
        dots={{ className: styles.carouselDots }}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className={styles.slide}
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})` 
              }}
            >
              <div className={styles.content}>
                <motion.div
                  key={`slide-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>

                  <div className={styles.actions}>
                    <a href={`tel:${content.phone?.replace(/\s/g, '') || '0932768628'}`}>
                      <Button 
                        type="primary" 
                        size="large" 
                        icon={<PhoneOutlined />}
                        className={styles.btnPrimary}
                      >
                        {content.cta_primary || 'Chiama Ora'}
                      </Button>
                    </a>
                    <a href="/contatti">
                      <Button 
                        size="large" 
                        icon={<ArrowRightOutlined />}
                        className={styles.btnSecondary}
                      >
                        {content.cta_secondary || 'Richiedi Preventivo'}
                      </Button>
                    </a>
                  </div>

                  {content.schedule && (
                    <p className={styles.schedule}>
                      📞 {content.schedule}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
