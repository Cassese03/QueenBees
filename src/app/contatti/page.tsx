'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Input, Button, message, Collapse } from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './contatti.module.css';

const { TextArea } = Input;

interface ContattiContent {
  [key: string]: string;
}

export default function ContattiPage() {
  const [content, setContent] = useState<ContattiContent>({});
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/contatti_page');
        if (response.ok) {
          const data = await response.json();
          const contentMap: ContattiContent = {};
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

  const onFinish = async (values: any) => {
    setSubmitting(true);
    
    // Simula invio form (qui implementare invio reale)
    setTimeout(() => {
      message.success(content.form_success || 'Messaggio inviato!');
      form.resetFields();
      setSubmitting(false);
    }, 1500);
  };

  const faqItems = [
    {
      key: '1',
      label: content.faq1_q || 'FAQ 1',
      children: <p>{content.faq1_a || 'Risposta 1'}</p>,
    },
    {
      key: '2',
      label: content.faq2_q || 'FAQ 2',
      children: <p>{content.faq2_a || 'Risposta 2'}</p>,
    },
    {
      key: '3',
      label: content.faq3_q || 'FAQ 3',
      children: <p>{content.faq3_a || 'Risposta 3'}</p>,
    },
    {
      key: '4',
      label: content.faq4_q || 'FAQ 4',
      children: <p>{content.faq4_a || 'Risposta 4'}</p>,
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <h1>{content.hero_title || 'Contattaci'}</h1>
            <p>{content.hero_subtitle || 'Siamo a tua disposizione'}</p>
          </motion.div>
        </section>

        {/* Info + Form */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <Row gutter={[48, 48]}>
              {/* Info Contatti */}
              <Col xs={24} lg={10}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className={styles.sectionTitle}>
                    {content.info_title || 'Informazioni di Contatto'}
                  </h2>

                  <div className={styles.infoCards}>
                    {/* Indirizzo */}
                    <Card className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <EnvironmentOutlined />
                      </div>
                      <h3>{content.address_title || 'Sede'}</h3>
                      <p>{content.address}</p>
                    </Card>

                    {/* Telefono */}
                    <Card className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <PhoneOutlined />
                      </div>
                      <h3>{content.phone_title || 'Telefono'}</h3>
                      <p>{content.phone}</p>
                      {content.mobile && <p>{content.mobile}</p>}
                    </Card>

                    {/* Email */}
                    <Card className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <MailOutlined />
                      </div>
                      <h3>{content.email_title || 'Email'}</h3>
                      <p>{content.email}</p>
                      {content.email_support && <p>{content.email_support}</p>}
                    </Card>

                    {/* Orari */}
                    <Card className={styles.infoCard}>
                      <div className={styles.infoIcon}>
                        <ClockCircleOutlined />
                      </div>
                      <h3>{content.hours_title || 'Orari'}</h3>
                      <p>{content.hours_weekdays}</p>
                      <p>{content.hours_saturday}</p>
                      <p>{content.hours_sunday}</p>
                      <p className={styles.emergency}>{content.hours_emergency}</p>
                    </Card>
                  </div>
                </motion.div>
              </Col>

              {/* Form Contatti */}
              <Col xs={24} lg={14}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className={styles.formCard}>
                    <h2>{content.form_title || 'Invia una Richiesta'}</h2>
                    <p className={styles.formSubtitle}>
                      {content.form_subtitle || 'Compila il form'}
                    </p>

                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                      size="large"
                    >
                      <Form.Item
                        name="name"
                        label={content.form_name || 'Nome'}
                        rules={[{ required: true, message: 'Inserisci il nome' }]}
                      >
                        <Input placeholder={content.form_name} />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="email"
                            label={content.form_email || 'Email'}
                            rules={[
                              { required: true, message: 'Inserisci email' },
                              { type: 'email', message: 'Email non valida' },
                            ]}
                          >
                            <Input placeholder={content.form_email} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            name="phone"
                            label={content.form_phone || 'Telefono'}
                            rules={[{ required: true, message: 'Inserisci telefono' }]}
                          >
                            <Input placeholder={content.form_phone} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="subject"
                        label={content.form_subject || 'Oggetto'}
                        rules={[{ required: true, message: 'Inserisci oggetto' }]}
                      >
                        <Input placeholder={content.form_subject} />
                      </Form.Item>

                      <Form.Item
                        name="message"
                        label={content.form_message || 'Messaggio'}
                        rules={[{ required: true, message: 'Inserisci messaggio' }]}
                      >
                        <TextArea 
                          rows={6} 
                          placeholder={content.form_message}
                          showCount
                          maxLength={1000}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          icon={<SendOutlined />}
                          loading={submitting}
                          block
                        >
                          {content.form_button || 'Invia'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </div>
        </section>

        {/* Mappa (Placeholder) */}
        <section className={styles.mapSection}>
          <div className={styles.mapPlaceholder}>
            <p>Mappa Google Maps</p>
            <small>Inserire qui iframe Google Maps</small>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.sectionTitle}
            >
              {content.faq_title || 'Domande Frequenti'}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Collapse 
                items={faqItems} 
                defaultActiveKey={['1']}
                className={styles.faqCollapse}
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
