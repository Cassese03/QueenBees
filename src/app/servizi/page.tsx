'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { CheckCircleOutlined, ThunderboltOutlined, HomeOutlined, SunOutlined, ToolOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './servizi.module.css';

interface ServiceContent {
  [key: string]: string;
}

export default function ServiziPage() {
  const [content, setContent] = useState<ServiceContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/servizi_page');
        if (response.ok) {
          const data = await response.json();
          const contentMap: ServiceContent = {};
          data.contents.forEach((item: any) => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const services = [
    {
      id: 'elettrici',
      icon: <ThunderboltOutlined />,
      title: content.elettrici_title || 'Impianti Elettrici',
      intro: content.elettrici_intro || '',
      features: [
        content.elettrici_feat1,
        content.elettrici_feat2,
        content.elettrici_feat3,
        content.elettrici_feat4,
      ].filter(Boolean),
      color: '#1890ff',
    },
    {
      id: 'domotica',
      icon: <HomeOutlined />,
      title: content.domotica_title || 'Domotica',
      intro: content.domotica_intro || '',
      features: [
        content.domotica_feat1,
        content.domotica_feat2,
        content.domotica_feat3,
        content.domotica_feat4,
      ].filter(Boolean),
      color: '#52c41a',
    },
    {
      id: 'rinnovabili',
      icon: <SunOutlined />,
      title: content.rinnovabili_title || 'Energie Rinnovabili',
      intro: content.rinnovabili_intro || '',
      features: [
        content.rinnovabili_feat1,
        content.rinnovabili_feat2,
        content.rinnovabili_feat3,
        content.rinnovabili_feat4,
      ].filter(Boolean),
      color: '#faad14',
    },
    {
      id: 'manutenzione',
      icon: <ToolOutlined />,
      title: content.manutenzione_title || 'Manutenzione',
      intro: content.manutenzione_intro || '',
      features: [
        content.manutenzione_feat1,
        content.manutenzione_feat2,
        content.manutenzione_feat3,
        content.manutenzione_feat4,
      ].filter(Boolean),
      color: '#f5222d',
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <h1>{content.page_title || 'I Nostri Servizi'}</h1>
            <p>{content.page_subtitle || 'Soluzioni professionali'}</p>
          </motion.div>
        </section>

        {/* Services Sections */}
        <div className={styles.servicesContainer}>
          {services.map((service, index) => (
            <section 
              key={service.id} 
              id={service.id}
              className={styles.serviceSection}
              style={{ 
                background: index % 2 === 0 ? '#ffffff' : '#f5f5f5' 
              }}
            >
              <div className={styles.container}>
                <Row gutter={[48, 48]} align="middle">
                  <Col xs={24} lg={12} order={index % 2 === 0 ? 1 : 2}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <div 
                        className={styles.iconWrapper}
                        style={{ color: service.color }}
                      >
                        {service.icon}
                      </div>
                      <h2 className={styles.serviceTitle}>{service.title}</h2>
                      <p className={styles.serviceIntro}>{service.intro}</p>
                      
                      <ul className={styles.featuresList}>
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          >
                            <CheckCircleOutlined style={{ color: service.color }} />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </Col>

                  <Col xs={24} lg={12} order={index % 2 === 0 ? 2 : 1}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={styles.imagePlaceholder}
                      style={{ background: `linear-gradient(135deg, ${service.color}33, ${service.color}66)` }}
                    >
                      Immagine {service.title}
                    </motion.div>
                  </Col>
                </Row>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
