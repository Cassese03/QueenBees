'use client';

import { useRef } from 'react';
import { Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/hooks/useContent';
import { useImageConfig } from '@/hooks/useImageConfig';
import styles from './AboutPreview.module.css';

const AboutPreview = () => {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref);
  const { content, loading } = useContent('about');
  
  // Carica immagine configurata
  const imageUrl = useImageConfig('about', 'main', 'https://picsum.photos/seed/about/600/400');
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    content.feature1 || 'Oltre 20 anni di esperienza',
    content.feature2 || 'Personale qualificato',
    content.feature3 || 'Materiali di alta qualità',
    content.feature4 || 'Assistenza 24/7',
    content.feature5 || 'Preventivi gratuiti',
    content.feature6 || 'Garanzia sui lavori',
  ].filter(Boolean);

  return (
    <section className={styles.about} ref={ref}>
      <div className={styles.container}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div 
              className={styles.imageWrapper}
              style={{ y }}
            >
              <motion.div 
                className={styles.imagePlaceholder}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!imageUrl && <span>Immagine Azienda</span>}
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
            >
              {content.title || 'Chi Siamo'}
            </motion.h2>
            
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.description || 'La nostra storia'}
            </motion.p>

            <motion.ul 
              className={styles.featuresList}
              variants={listVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {features.map((feature, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircleOutlined className={styles.checkIcon} />
                    <span>{feature}</span>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/chi-siamo">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button type="primary" size="large">
                    Scopri di più
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutPreview;
