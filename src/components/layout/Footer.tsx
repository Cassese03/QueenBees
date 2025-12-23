'use client';

import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/footer');
        if (response.ok) {
          const data = await response.json();
          const contentMap: { [key: string]: string } = {};
          data.contents.forEach((item: any) => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
        }
      } catch (error) {
        console.error('Error loading footer content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[32, 32]}>
          {/* Colonna 1: Info Azienda */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.company_name || 'EL.IT'}
            </h3>
            <p className={styles.description}>
              {content.company_description || 'Impianti elettrici, domotica ed energie rinnovabili.'}
            </p>
          </Col>

          {/* Colonna 2: Link Rapidi */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.links_title || 'Link Rapidi'}
            </h3>
            <ul className={styles.linkList}>
              <li><Link href="/">{content.link1_text || 'Home'}</Link></li>
              <li><Link href="/servizi">{content.link2_text || 'Servizi'}</Link></li>
              <li><Link href="/chi-siamo">{content.link3_text || 'Chi Siamo'}</Link></li>
              <li><Link href="/contatti">{content.link4_text || 'Contatti'}</Link></li>
            </ul>
          </Col>

          {/* Colonna 3: Servizi */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.services_title || 'I Nostri Servizi'}
            </h3>
            <ul className={styles.linkList}>
              <li><Link href="/servizi#elettrici">{content.service1_text || 'Impianti Elettrici'}</Link></li>
              <li><Link href="/servizi#domotica">{content.service2_text || 'Domotica'}</Link></li>
              <li><Link href="/servizi#rinnovabili">{content.service3_text || 'Energie Rinnovabili'}</Link></li>
              <li><Link href="/servizi#manutenzione">{content.service4_text || 'Manutenzione'}</Link></li>
            </ul>
          </Col>

          {/* Colonna 4: Contatti */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.contacts_title || 'Contatti'}
            </h3>
            <ul className={styles.contactList}>
              <li>
                <PhoneOutlined />
                <a href={`tel:${content.phone || '+390932768628'}`}>
                  {content.phone || '+39 0932 768628'}
                </a>
              </li>
              <li>
                <MailOutlined />
                <a href={`mailto:${content.email || 'info@elit.it'}`}>
                  {content.email || 'info@elit.it'}
                </a>
              </li>
              <li>
                <EnvironmentOutlined />
                <span>{content.address || 'Via Esempio 123, Roma'}</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className={styles.social}>
              {content.facebook && (
                <a href={content.facebook} target="_blank" rel="noopener noreferrer">
                  <FacebookOutlined />
                </a>
              )}
              {content.instagram && (
                <a href={content.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramOutlined />
                </a>
              )}
              {content.linkedin && (
                <a href={content.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedinOutlined />
                </a>
              )}
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>{content.copyright || `© ${currentYear} EL.IT - Tutti i diritti riservati`}</p>
        </div>
      </div>
    </footer>
  );
}
