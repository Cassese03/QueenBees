'use client';

import { Button } from 'antd';
import { PhoneOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  return (
    <section className={styles.hero}>
      {/* Background con effetto Parallax */}
      <motion.div 
        className={styles.heroBackground}
        style={{ y }}
      >
        <div className={styles.backgroundImage}>
          {/* Placeholder per immagine sfondo impianti elettrici */}
          <div className={styles.imagePlaceholder}>
            Immagine: Installazione Impianti Elettrici
          </div>
        </div>
        <div className={styles.overlay}></div>
      </motion.div>

      <div className={styles.heroContent}>
        {/* Logo animato con fade-in */}
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className={styles.logoText}>EL.IT</h1>
        </motion.div>

        <div className={styles.mainContent}>
          {/* Testo principale con fade-in */}
          <motion.h2 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            Impianti Elettrici di Qualità
          </motion.h2>

          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          >
            Servizi professionali per imprese e privati
          </motion.p>

          {/* Call to Action animata */}
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          >
            <motion.a 
              href="tel:+390932768628"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="primary" 
                size="large" 
                icon={<PhoneOutlined />}
                className={styles.primaryButton}
              >
                Chiama +39 0932 768628
              </Button>
            </motion.a>

            <Link href="/servizi">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className={styles.secondaryButton}
                >
                  Scopri i Servizi
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Orari */}
          <motion.div 
            className={styles.schedule}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p>Lunedì – Venerdì: 7:30 – 13:00 | 14:30 – 17:00</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator animato */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <div className={styles.scrollMouse}></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
