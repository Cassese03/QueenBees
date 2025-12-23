'use client';

import { useRef } from 'react';
import { Row, Col, Card } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/hooks/useContent';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref);
  const { content, loading } = useContent('testimonials');

  const testimonials = [
    {
      name: content.test1_name || 'Marco Rossi',
      role: content.test1_role || 'Proprietario Casa',
      rating: 5,
      text: content.test1_text || 'Servizio eccellente!',
    },
    {
      name: content.test2_name || 'Laura Bianchi',
      role: content.test2_role || 'Titolare Azienda',
      rating: 5,
      text: content.test2_text || 'Professionisti seri',
    },
    {
      name: content.test3_name || 'Giuseppe Verdi',
      role: content.test3_role || 'Amministratore',
      rating: 5,
      text: content.test3_text || 'Ottimo rapporto qualità-prezzo',
    },
  ];

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {content.section_title || 'Cosa Dicono i Nostri Clienti'}
        </motion.h2>
        
        <motion.p 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.section_subtitle || 'La soddisfazione dei clienti è la nostra priorità'}
        </motion.p>

        <Row gutter={[24, 24]} style={{ marginTop: 50 }}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className={styles.testimonialCard}>
                  <div className={styles.rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarFilled key={i} className={styles.star} />
                    ))}
                  </div>
                  <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>
                      <UserOutlined />
                    </div>
                    <div>
                      <div className={styles.name}>{testimonial.name}</div>
                      <div className={styles.role}>{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default TestimonialsSection;
