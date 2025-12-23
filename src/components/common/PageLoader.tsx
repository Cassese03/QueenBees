'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './PageLoader.module.css';

interface PageLoaderProps {
  duration?: number;
}

export default function PageLoader({ duration = 2000 }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loaderContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className={styles.loaderContent}>
            {/* Logo Animato */}
            <motion.div
              className={styles.logoWrapper}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className={styles.logo}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="https://lirp.cdn-website.com/78675042/dms3rep/multi/opt/queen_bees-206w.png"
                  alt="EL.IT Logo"
                  width={120}
                  height={120}
                  className={styles.logoImage}
                  priority
                />
              </motion.div>

              {/* Cerchi animati attorno al logo */}
              <motion.div
                className={styles.circle}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  scale: { duration: 0.8, ease: 'easeOut' },
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                }}
              />
              
              <motion.div
                className={styles.circleOuter}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: -360 }}
                transition={{
                  scale: { duration: 1, ease: 'easeOut', delay: 0.2 },
                  rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                }}
              />
            </motion.div>

            {/* Testo Loading */}
            <motion.div
              className={styles.loadingText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Caricamento
              </motion.span>
              <motion.span className={styles.dots}>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
              </motion.span>
            </motion.div>

            {/* Barra di progresso */}
            <motion.div
              className={styles.progressBar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
