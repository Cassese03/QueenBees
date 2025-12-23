"use client";

import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";
import Link from "next/link";
import styles from "./Footer.module.css";
import { useContent } from "../../hooks/useContent"; // <-- correggi il path se diverso

export default function Footer() {
  const { content } = useContent("footer");
  const currentYear = new Date().getFullYear();

  const companyName = content.company_name || "Queen Bees";
  const companyDescription =
    content.company_description ||
    "Abbigliamento e calzature firmate a prezzi outlet, forniture per negozi e servizi B2B.";
  const linksTitle = content.links_title || "Link Rapidi";

  const phone = content.phone || "0813931794";
  const email = content.email || "info@queenbeesnola.com";
  const address =
    content.address ||
    "Via Giuseppe Lippiello, 31, 83022 Baiano AV | Via Variante 7/BIS 112, 80035 Nola NA";

  const facebook = content.facebook || "";
  const instagram = content.instagram || "";
  const linkedin = content.linkedin || "";

  const copyrightText =
    content.copyright ||
    `© ${currentYear} ${companyName} - Tutti i diritti riservati`;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Row gutter={[32, 32]}>
          {/* Colonna azienda */}
          <Col xs={24} md={8}>
            <h3 className={styles.companyName}>{companyName}</h3>
            <p className={styles.companyDescription}>{companyDescription}</p>
          </Col>

          {/* Colonna link rapidi */}
          <Col xs={24} md={8}>
            <h4 className={styles.columnTitle}>{linksTitle}</h4>
            <ul className={styles.linksList}>
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
                <Link href="/contatti">{content.link4_text || "Contatti"}</Link>
              </li>
            </ul>
          </Col>

          {/* Colonna servizi + contatti */}
          <Col xs={24} md={8}>
            <h4 className={styles.columnTitle}>
              {content.services_title || "I Nostri Servizi"}
            </h4>
            <ul className={styles.servicesList}>
              <li>{content.service1_text || "Outlet Moda"}</li>
              <li>{content.service2_text || "Stock Shoes Outlet"}</li>
              <li>{content.service3_text || "Forniture per Rivenditori"}</li>
              <li>{content.service4_text || "Abbigliamento Cerimonia"}</li>
            </ul>

            <h4 className={styles.columnTitle}>
              {content.contacts_title || "Contatti"}
            </h4>
            <ul className={styles.contactsList}>
              <li>
                <PhoneOutlined /> <a href={`tel:${phone}`}>{phone}</a>
              </li>
              <li>
                <MailOutlined /> <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <EnvironmentOutlined /> {address}
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.socials}>
          {facebook && (
            <a href={facebook} target="_blank" rel="noreferrer">
              <FacebookOutlined />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noreferrer">
              <InstagramOutlined />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer">
              <LinkedinOutlined />
            </a>
          )}
        </div>
        <div className={styles.copy}>{copyrightText}</div>
      </div>
    </footer>
  );
}
