"use client";

import { Row, Col } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useContent } from "../../hooks/useContent";

export default function Footer() {
  const { content } = useContent("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[32, 32]}>
          {/* Colonna 1: Info Azienda */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.company_name || "Queen Bees"}
            </h3>
            <p className={styles.description}>
              {content.company_description ||
                "Abbigliamento e calzature firmate a prezzi outlet, forniture per negozi e servizi B2B."}
            </p>
          </Col>

          {/* Colonna 2: Link Rapidi */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.links_title || "Link Rapidi"}
            </h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/">{content.link1_text || "Home"}</Link>
              </li>
              <li>
                <Link href="/servizi">{content.link2_text || "Servizi"}</Link>
              </li>
              <li>
                <Link href="/chi-siamo">
                  {content.link3_text || "Chi Siamo"}
                </Link>
              </li>
              <li>
                <Link href="/contatti">
                  {content.link4_text || "Contatti"}
                </Link>
              </li>
            </ul>
          </Col>

          {/* Colonna 3: Servizi */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.services_title || "I Nostri Servizi"}
            </h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/servizi#elettrici">
                  {content.service1_text || "Outlet Moda"}
                </Link>
              </li>
              <li>
                <Link href="/servizi#domotica">
                  {content.service2_text || "Stock Shoes Outlet"}
                </Link>
              </li>
              <li>
                <Link href="/servizi#rinnovabili">
                  {content.service3_text || "Forniture per Rivenditori"}
                </Link>
              </li>
              <li>
                <Link href="/servizi#manutenzione">
                  {content.service4_text || "Abbigliamento Cerimonia"}
                </Link>
              </li>
            </ul>
          </Col>

          {/* Colonna 4: Contatti */}
          <Col xs={24} sm={12} md={6}>
            <h3 className={styles.title}>
              {content.contacts_title || "Contatti"}
            </h3>
            <ul className={styles.contactList}>
              <li>
                <PhoneOutlined />
                <a href={`tel:${content.phone || "0813931794"}`}>
                  {content.phone || "0813931794"}
                </a>
              </li>
              <li>
                <MailOutlined />
                <a
                  href={`mailto:${content.email || "info@queenbeesnola.com"}`}
                >
                  {content.email || "info@queenbeesnola.com"}
                </a>
              </li>
              <li>
                <EnvironmentOutlined />
                <span>
                  {content.address ||
                    "Via Giuseppe Lippiello, 31, 83022 Baiano AV | Via Variante 7/BIS 112, 80035 Nola NA"}
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className={styles.social}>
              {content.facebook && (
                <a
                  href={content.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined />
                </a>
              )}
              {content.instagram && (
                <a
                  href={content.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined />
                </a>
              )}
              {content.linkedin && (
                <a
                  href={content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined />
                </a>
              )}
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            {content.copyright ||
              `© ${currentYear} Queen Bees - Tutti i diritti riservati`}
          </p>
        </div>
      </div>
    </footer>
  );
}
