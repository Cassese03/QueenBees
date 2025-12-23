'use client';

import { useState, useEffect } from 'react';
import { Card, Select, Input, Button, message, Divider, Image, Space, Tag } from 'antd';
import { SaveOutlined, PictureOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './ImageConfigurator.module.css';

const { Option } = Select;

interface ImageConfig {
  [section: string]: {
    [key: string]: string;
  };
}

const imageSlots = {
  hero: [
    { key: 'slide1', label: 'Slide 1', description: 'Prima immagine carousel homepage' },
    { key: 'slide2', label: 'Slide 2', description: 'Seconda immagine carousel homepage' },
    { key: 'slide3', label: 'Slide 3', description: 'Terza immagine carousel homepage' },
  ],
  about: [
    { key: 'main', label: 'Immagine Principale', description: 'Immagine sezione "Chi Siamo" homepage' },
  ],
  services: [
    { key: 'service1', label: 'Impianti Elettrici', description: 'Card servizio 1' },
    { key: 'service2', label: 'Domotica', description: 'Card servizio 2' },
    { key: 'service3', label: 'Energie Rinnovabili', description: 'Card servizio 3' },
    { key: 'service4', label: 'Manutenzione', description: 'Card servizio 4' },
  ],
  logo: [
    { key: 'main', label: 'Logo Principale', description: 'Logo header e footer' },
    { key: 'favicon', label: 'Favicon', description: 'Icona browser' },
  ],
  chisiamo: [
    { key: 'storia', label: 'Storia Aziendale', description: 'Immagine pagina Chi Siamo - Storia' },
    { key: 'team', label: 'Team', description: 'Immagine pagina Chi Siamo - Team' },
  ],
};

export default function ImageConfigurator() {
  const [config, setConfig] = useState<ImageConfig>({});
  const [selectedSection, setSelectedSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tempUrls, setTempUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (config[selectedSection]) {
      setTempUrls(config[selectedSection]);
    } else {
      setTempUrls({});
    }
  }, [selectedSection, config]);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/images/config');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      message.error('Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (key: string) => {
    if (!tempUrls[key]) {
      message.error('Inserisci un URL valido');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/images/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: selectedSection,
          key,
          url: tempUrls[key],
        }),
      });

      if (response.ok) {
        message.success('Immagine configurata!');
        loadConfig();
      } else {
        message.error('Errore nel salvataggio');
      }
    } catch (error) {
      message.error('Errore di connessione');
    } finally {
      setSaving(false);
    }
  };

  const handleUrlChange = (key: string, value: string) => {
    setTempUrls(prev => ({ ...prev, [key]: value }));
  };

  const sections = [
    { value: 'hero', label: '🎯 Hero/Carousel (Homepage)', color: 'blue' },
    { value: 'about', label: '👥 Chi Siamo Preview (Homepage)', color: 'green' },
    { value: 'services', label: '⚡ Servizi (Homepage)', color: 'orange' },
    { value: 'chisiamo', label: '👔 Pagina Chi Siamo', color: 'purple' },
    { value: 'logo', label: '🔖 Logo & Branding', color: 'red' },
  ];

  return (
    <div className={styles.container}>
      <Card
        title={
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Configurazione Immagini Sito</h2>
            <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#666', fontWeight: 'normal' }}>
              Associa le immagini caricate alle sezioni del sito. Copia gli URL dalla tab "Gestione Immagini".
            </p>
          </div>
        }
        extra={
          <Button 
            icon={<ReloadOutlined />} 
            onClick={loadConfig}
            loading={loading}
          >
            Ricarica
          </Button>
        }
      >
        {/* Selettore Sezione */}
        <div className={styles.sectionSelector}>
          <label>Seleziona Sezione:</label>
          <Select
            value={selectedSection}
            onChange={setSelectedSection}
            style={{ width: '100%', maxWidth: 500 }}
            size="large"
          >
            {sections.map(section => (
              <Option key={section.value} value={section.value}>
                <Tag color={section.color}>{section.label}</Tag>
              </Option>
            ))}
          </Select>
        </div>

        <Divider />

        {/* Slot Immagini */}
        <div className={styles.slots}>
          {imageSlots[selectedSection as keyof typeof imageSlots]?.map((slot) => {
            const currentUrl = config[selectedSection]?.[slot.key] || '';
            const tempUrl = tempUrls[slot.key] || currentUrl;
            
            return (
              <Card 
                key={slot.key} 
                className={styles.slotCard}
                type="inner"
                title={
                  <div className={styles.slotHeader}>
                    <PictureOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    {slot.label}
                  </div>
                }
              >
                <p className={styles.description}>{slot.description}</p>
                
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  {/* Preview Immagine Corrente */}
                  {currentUrl && (
                    <div className={styles.preview}>
                      <label>Immagine Attuale:</label>
                      <Image
                        src={currentUrl}
                        alt={slot.label}
                        style={{ maxWidth: 300, borderRadius: 8 }}
                        fallback="/placeholder.png"
                      />
                      <code className={styles.currentUrl}>{currentUrl}</code>
                    </div>
                  )}

                  {/* Input URL */}
                  <div>
                    <label className={styles.inputLabel}>Nuovo URL Immagine:</label>
                    <Input.Group compact style={{ display: 'flex', gap: 8 }}>
                      <Input
                        value={tempUrl}
                        onChange={(e) => handleUrlChange(slot.key, e.target.value)}
                        placeholder="/uploads/categoria/nome-file.jpg"
                        style={{ flex: 1 }}
                        size="large"
                      />
                      <Button 
                        type="primary" 
                        icon={<SaveOutlined />}
                        onClick={() => handleSave(slot.key)}
                        loading={saving}
                        size="large"
                      >
                        Salva
                      </Button>
                    </Input.Group>
                    <small style={{ color: '#999', display: 'block', marginTop: 8 }}>
                      💡 Vai su "Gestione Immagini", carica l'immagine e copia l'URL qui
                    </small>
                  </div>

                  {/* Preview Nuova Immagine */}
                  {tempUrl && tempUrl !== currentUrl && (
                    <div className={styles.newPreview}>
                      <label>Anteprima Nuovo URL:</label>
                      <Image
                        src={tempUrl}
                        alt="Preview"
                        style={{ maxWidth: 300, borderRadius: 8 }}
                        fallback="/placeholder.png"
                      />
                    </div>
                  )}
                </Space>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
