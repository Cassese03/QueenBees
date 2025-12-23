"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import styles from "./Header.module.css";
import { useContent } from "../../hooks/useContent"; // adatta il path

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { content } = useContent("header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { path: "/", label: content.menu_home || "Home" },
    { path: "/chi-siamo", label: content.menu_chisiamo || "Chi Siamo" },
    { path: "/servizi", label: content.menu_servizi || "Servizi" },
    { path: "/contatti", label: content.menu_contatti || "Contatti" },
  ];

  return (
    <>
      {/* qui incolla il tuo JSX reale dell'header, ad esempio: */}
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.logo}>{content.logo_text || "Queen Bees"}</div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={
                pathname === item.path ? styles.activeLink : styles.link
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerContacts}>
          <a href={`tel:${content.header_phone || "0813931794"}`}>
            <PhoneOutlined /> {content.header_phone || "0813931794"}
          </a>
          <a href={`mailto:${content.header_email || "info@queenbeesnola.com"}`}>
            <MailOutlined /> {content.header_email || "info@queenbeesnola.com"}
          </a>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlined />
        </button>
      </header>

      <Drawer
        placement="left"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        className={styles.mobileDrawer}
      >
        <nav className={styles.mobileNav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileContacts}>
          <a href={`tel:${content.header_phone || "0813931794"}`}>
            <PhoneOutlined /> {content.header_phone || "0813931794"}
          </a>
          <a href={`mailto:${content.header_email || "info@queenbeesnola.com"}`}>
            <MailOutlined /> {content.header_email || "info@queenbeesnola.com"}
          </a>
        </div>
      </Drawer>
    </>
  );
}
