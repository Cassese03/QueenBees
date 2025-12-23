'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { 
  CheckCircleOutlined, 
  TrophyOutlined, 
  SafetyOutlined,
  BulbOutlined,
  HeartOutlined,
  TeamOutlined,
  StarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import styles from './chi-siamo.module.css';

interface ChiSiamoContent {
  [key: string]: string;
}

export default function ChiSiamoPage() {
  const [content, setContent] = useState<ChiSiamoContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/chi_siamo_page');
        if (response.ok) {
          const data = await response.json();
          const contentMap: ChiSiamoContent = {};
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

  const valoriIcons = [
    <TrophyOutlined />,
    <TeamOutlined />,
    <BulbOutlined />,
    <SafetyOutlined />,
    <HeartOutlined />,
    <StarOutlined />
  ];

  const valori = [
    { title: content.valore1_title, desc: content.valore1_desc },
    { title: content.valore2_title, desc: content.valore2_desc },
    { title: content.valore3_title, desc: content.valore3_desc },
    { title: content.valore4_title, desc: content.valore4_desc },
    { title: content.valore5_title, desc: content.valore5_desc },
    { title: content.valore6_title, desc: content.valore6_desc },
  ];

  const certificazioni = [
    content.cert1,
    content.cert2,
    content.cert3,
    content.cert4,
  ].filter(Boolean);

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
            <h1>{content.hero_title || 'Chi Siamo'}</h1>
            <p>{content.hero_subtitle || 'La nostra storia'}</p>
          </motion.div>
        </section>

        {/* Storia */}
        <section className={styles.storiaSection}>
          <div className={styles.container}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2>{content.storia_title || 'La Nostra Storia'}</h2>
                  <p className={styles.storiaText}>
                    {content.storia_text || 'La nostra storia...'}
                  </p>
                </motion.div>
              </Col>
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={styles.imagePlaceholder}
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Immagine Storia Aziendale
                </motion.div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.missionVision}>
          <div className={styles.container}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className={styles.mvCard}>
                    <h3>{content.mission_title || 'Mission'}</h3>
                    <p>{content.mission_text || 'La nostra mission...'}</p>
                  </Card>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className={styles.mvCard}>
                    <h3>{content.vision_title || 'Vision'}</h3>
                    <p>{content.vision_text || 'La nostra vision...'}</p>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Valori */}
        <section className={styles.valoriSection}>
          <div className={styles.container}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.sectionTitle}
            >
              {content.valori_title || 'I Nostri Valori'}
            </motion.h2>

            <Row gutter={[32, 32]}>
              {valori.map((valore, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className={styles.valoreCard}>
                      <div className={styles.valoreIcon}>
                        {valoriIcons[index]}
                      </div>
                      <h4>{valore.title}</h4>
                      <p>{valore.desc}</p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Team */}
        <section className={styles.teamSection}>
          <div className={styles.container}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.sectionTitle}
            >
              {content.team_title || 'Il Nostro Team'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.teamSubtitle}
            >
              {content.team_subtitle || 'Professionisti esperti'}
            </motion.p>
            <p className={styles.teamText}>
              {content.team_text || 'Il nostro team...'}
            </p>
          </div>
        </section>

        {/* Certificazioni */}
        <section className={styles.certSection}>
          <div className={styles.container}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.sectionTitle}
            >
              {content.cert_title || 'Certificazioni'}
            </motion.h2>

            <Row gutter={[24, 24]}>
              {certificazioni.map((cert, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={styles.certBadge}
                  >
                    <CheckCircleOutlined />
                    <span>{cert}</span>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* CTA Finale */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>{content.cta_title || 'Vuoi saperne di più?'}</h2>
              <p>{content.cta_text || 'Contattaci per maggiori informazioni'}</p>
              <Link href="/contatti">
                <motion.button
                  className={styles.ctaButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {content.cta_button || 'Contattaci'}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
