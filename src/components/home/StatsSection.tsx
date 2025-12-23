'use client';

import { useRef } from 'react';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useContent } from '@/hooks/useContent';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { 
  TrophyOutlined, 
  TeamOutlined, 
  ProjectOutlined, 
  SmileOutlined 
} from '@ant-design/icons';
import styles from './StatsSection.module.css';

const StatsSection = () => {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref);
  const { content, loading } = useContent('stats');

  // Valori di default se content è vuoto
  const stats = [
    {
      icon: <TrophyOutlined />,
      value: parseInt(content.years_value || '20'),
      suffix: '+',
      label: content.years_title || 'Anni di Esperienza',
    },
    {
      icon: <ProjectOutlined />,
      value: parseInt(content.projects_value || '500'),
      suffix: '+',
      label: content.projects_title || 'Progetti Completati',
    },
    {
      icon: <TeamOutlined />,
      value: parseInt(content.team_value || '15'),
      suffix: '',
      label: content.team_title || 'Professionisti Qualificati',
    },
    {
      icon: <SmileOutlined />,
      value: parseInt(content.satisfaction_value || '98'),
      suffix: '%',
      label: content.satisfaction_title || 'Clienti Soddisfatti',
    },
  ];

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.container}>
        <Row gutter={[32, 32]}>
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <motion.div
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.iconWrapper}>{stat.icon}</div>
                <div className={styles.value}>
                  {loading ? (
                    <span>{stat.value}</span>
                  ) : (
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2}
                    />
                  )}
                </div>
                <div className={styles.label}>{stat.label}</div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StatsSection;
