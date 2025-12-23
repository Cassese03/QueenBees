'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/header');
        if (response.ok) {
          const data = await response.json();
          const contentMap: { [key: string]: string } = {};
          data.contents.forEach((item: any) => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
        }
      } catch (error) {
        console.error('Error loading header content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: content.menu_home || 'Home' },
    { path: '/chi-siamo', label: content.menu_chisiamo || 'Chi Siamo' },
    { path: '/servizi', label: content.menu_servizi || 'Servizi' },
    { path: '/contatti', label: content.menu_contatti || 'Contatti' },
  ];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            {content.logo_text || 'EL.IT'}
          </Link>

          {/* Desktop Menu */}
          <nav className={styles.desktopNav}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <a href={`tel:${content.header_phone || '0123456789'}`} className={styles.contactItem}>
              <PhoneOutlined />
              <span>{content.header_phone || '012 345 6789'}</span>
            </a>
            <a href={`mailto:${content.header_email || 'info@elit.it'}`} className={styles.contactItem}>
              <MailOutlined />
              <span>{content.header_email || 'info@elit.it'}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileOpen(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={content.logo_text || 'EL.IT'}
        placement="right"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        className={styles.mobileDrawer}
      >
        <nav className={styles.mobileNav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.mobileNavLink} ${pathname === item.path ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileContact}>
          <a href={`tel:${content.header_phone}`} className={styles.mobileContactItem}>
            <PhoneOutlined />
            <span>{content.header_phone || '012 345 6789'}</span>
          </a>
          <a href={`mailto:${content.header_email}`} className={styles.mobileContactItem}>
            <MailOutlined />
            <span>{content.header_email || 'info@elit.it'}</span>
          </a>
        </div>
      </Drawer>
    </>
  );
}
