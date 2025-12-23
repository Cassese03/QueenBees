'use client';

import { Button } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useContent } from '@/hooks/useContent';
import styles from './ContactCTA.module.css';

const ContactCTA = () => {
  const { content, loading } = useContent('cta');

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.title || 'Hai bisogno di un preventivo?'}
        </motion.h2>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.subtitle || 'Contattaci oggi stesso per una consulenza gratuita e senza impegno'}
        </motion.p>

        <motion.div 
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="tel:+390932768628">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="primary" 
                size="large" 
                icon={<PhoneOutlined />}
                style={{ minWidth: 180 }}
              >
                {content.button_phone || 'Chiama Ora'}
              </Button>
            </motion.div>
          </a>
          
          <Link href="/contatti">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="large" 
                icon={<MailOutlined />}
                style={{ minWidth: 180, background: 'white', color: '#1890ff', borderColor: 'white' }}
              >
                {content.button_contact || 'Invia Richiesta'}
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
