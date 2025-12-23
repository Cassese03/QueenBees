'use client';

import { useRef } from 'react';
import { Row, Col, Card } from 'antd';
import { ThunderboltOutlined, HomeOutlined, ToolOutlined, SunOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/hooks/useContent';
import { useSectionImages } from '@/hooks/useImageConfig';
import styles from './ServicesPreview.module.css';

const ServicesPreview = () => {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref);
  const { content, loading } = useContent('services');
  const { images } = useSectionImages('services');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const services = [
    {
      icon: <ThunderboltOutlined />,
      title: content.service1_title || 'Impianti Elettrici',
      description: content.service1_desc || 'Progettazione e installazione di impianti elettrici',
      link: '/servizi#elettrici',
      imageUrl: images.service1 || 'https://picsum.photos/seed/electrical/600/400',
    },
    {
      icon: <HomeOutlined />,
      title: content.service2_title || 'Domotica',
      description: content.service2_desc || 'Sistemi intelligenti per automazione',
      link: '/servizi#domotica',
      imageUrl: images.service2 || 'https://picsum.photos/seed/smarthome/600/400',
    },
    {
      icon: <SunOutlined />,
      title: content.service3_title || 'Energie Rinnovabili',
      description: content.service3_desc || 'Impianti fotovoltaici',
      link: '/servizi#rinnovabili',
      imageUrl: images.service3 || 'https://picsum.photos/seed/solar/600/400',
    },
    {
      icon: <ToolOutlined />,
      title: content.service4_title || 'Manutenzione',
      description: content.service4_desc || 'Assistenza programmata',
      link: '/servizi#manutenzione',
      imageUrl: images.service4 || 'https://picsum.photos/seed/maintenance/600/400',
    },
  ];

  return (
    <section className={styles.services} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <span className={styles.badge}>{content.badge || 'I NOSTRI SERVIZI'}</span>
          <h2 className={styles.sectionTitle}>
            {content.section_title || 'Soluzioni Complete'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {content.section_subtitle || 'Servizi professionali'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Row gutter={[32, 32]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Link href={service.link}>
                    <Card
                      hoverable
                      className={styles.serviceCard}
                      cover={
                        <div style={{ height: '220px', overflow: 'hidden' }}>
                          <img 
                            src={service.imageUrl}
                            alt={service.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      }
                    >
                      <motion.div 
                        className={styles.iconWrapper}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 10,
                          transition: { duration: 0.3 }
                        }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className={styles.cardTitle}>
                        {service.title}
                      </h3>
                      <p className={styles.cardDescription}>
                        {service.description}
                      </p>
                      <div className={styles.cardFooter}>
                        <span className={styles.learnMore}>
                          Scopri di più →
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
