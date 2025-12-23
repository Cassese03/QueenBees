'use client';

import { Row, Col, Card } from 'antd';
import { TeamOutlined, SafetyOutlined, RocketOutlined, HeartOutlined } from '@ant-design/icons';
import styles from './ChiSiamoContent.module.css';

const values = [
  {
    icon: <SafetyOutlined />,
    title: 'Sicurezza',
    description: 'La sicurezza è la nostra priorità assoluta in ogni progetto',
  },
  {
    icon: <RocketOutlined />,
    title: 'Innovazione',
    description: 'Utilizziamo le tecnologie più avanzate del settore',
  },
  {
    icon: <HeartOutlined />,
    title: 'Qualità',
    description: 'Materiali certificati e lavorazioni a regola d\'arte',
  },
  {
    icon: <TeamOutlined />,
    title: 'Professionalità',
    description: 'Team di esperti qualificati e certificati',
  },
];

export default function ChiSiamoContent() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Chi Siamo</h1>
          <p>La tua sicurezza è la nostra priorità</p>
        </div>
      </section>

      {/* Storia */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.imagePlaceholder}>
                <span>Immagine Azienda</span>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <h2>La Nostra Storia</h2>
              <p className={styles.text}>
                EL.IT nasce dall'esperienza ventennale nel settore degli impianti elettrici, 
                con l'obiettivo di offrire soluzioni innovative e all'avanguardia per privati e aziende.
              </p>
              <p className={styles.text}>
                Negli anni abbiamo consolidato la nostra presenza sul territorio, diventando 
                un punto di riferimento per chi cerca professionalità, competenza e affidabilità.
              </p>
              <p className={styles.text}>
                Oggi siamo specializzati in impianti elettrici civili e industriali, domotica, 
                energie rinnovabili e sistemi di sicurezza, sempre con un occhio di riguardo 
                verso l'innovazione tecnologica e la sostenibilità ambientale.
              </p>
            </Col>
          </Row>
        </div>
      </section>

      {/* Valori */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>I Nostri Valori</h2>
          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card className={styles.valueCard}>
                  <div className={styles.iconWrapper}>{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <h2>La Nostra Mission</h2>
              <p className={styles.text}>
                La nostra missione è fornire soluzioni elettriche innovative, sicure e sostenibili, 
                garantendo sempre la massima qualità dei materiali e delle lavorazioni.
              </p>
              <ul className={styles.list}>
                <li>Sicurezza e conformità normativa al 100%</li>
                <li>Utilizzo di tecnologie all'avanguardia</li>
                <li>Rispetto dell'ambiente e sostenibilità</li>
                <li>Assistenza continua e personalizzata</li>
                <li>Trasparenza nei prezzi e nei tempi</li>
              </ul>
            </Col>
            <Col xs={24} lg={12}>
              <h2>Perché Sceglierci</h2>
              <p className={styles.text}>
                Scegliere EL.IT significa affidarsi a professionisti certificati con oltre 20 anni 
                di esperienza nel settore elettrico.
              </p>
              <ul className={styles.list}>
                <li>Personale qualificato e costantemente aggiornato</li>
                <li>Materiali certificati e di prima qualità</li>
                <li>Preventivi gratuiti e dettagliati</li>
                <li>Garanzia su tutti i lavori eseguiti</li>
                <li>Assistenza post-vendita e manutenzione</li>
                <li>Interventi rapidi in caso di emergenza</li>
              </ul>
            </Col>
          </Row>
        </div>
      </section>

      {/* Certificazioni */}
      <section className={styles.certificationsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Certificazioni e Qualifiche</h2>
          <p className={styles.centerText}>
            Siamo in possesso di tutte le certificazioni necessarie per operare nel settore elettrico, 
            garantendo lavori a norma di legge e in totale sicurezza.
          </p>
          <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
            <Col xs={12} sm={8} md={6}>
              <div className={styles.certBadge}>Certificazione CEI</div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className={styles.certBadge}>ISO 9001</div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className={styles.certBadge}>SOA Categoria</div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className={styles.certBadge}>Sicurezza Lavoro</div>
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
}
