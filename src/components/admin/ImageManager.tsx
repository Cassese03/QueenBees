'use client';

import { useState, useEffect } from 'react';
import { Card, Upload, Button, Select, Image, Modal, message, Row, Col, Spin } from 'antd';
import { 
  UploadOutlined, 
  DeleteOutlined, 
  ReloadOutlined,
  PictureOutlined 
} from '@ant-design/icons';
import type { UploadFile } from 'antd';
import styles from './ImageManager.module.css';

const { Option } = Select;

interface ImageItem {
  filename: string;
  url: string;
  size: number;
  created: string;
}

const categories = [
  { value: 'hero', label: '🎯 Hero/Carousel' },
  { value: 'services', label: '⚡ Servizi' },
  { value: 'about', label: '👥 Chi Siamo' },
  { value: 'gallery', label: '📸 Gallery Progetti' },
  { value: 'logo', label: '🔖 Logo' },
  { value: 'general', label: '📁 Generale' },
];

export default function ImageManager() {
  const [category, setCategory] = useState('hero');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [category]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/images/list?category=${category}`);
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      message.error('Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        message.success(`Immagine caricata: ${data.filename}`);
        loadImages();
      } else {
        const error = await response.json();
        message.error(error.error || 'Errore upload');
      }
    } catch (error) {
      message.error('Errore di connessione');
    } finally {
      setUploading(false);
    }

    return false; // Previene upload automatico di antd
  };

  const handleDelete = (url: string) => {
    Modal.confirm({
      title: 'Conferma eliminazione',
      content: 'Sei sicuro di voler eliminare questa immagine?',
      okText: 'Elimina',
      okType: 'danger',
      cancelText: 'Annulla',
      onOk: async () => {
        try {
          const response = await fetch('/api/admin/images/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          if (response.ok) {
            message.success('Immagine eliminata');
            loadImages();
          } else {
            message.error('Errore eliminazione');
          }
        } catch (error) {
          message.error('Errore di connessione');
        }
      },
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    message.success('URL copiato negli appunti!');
  };

  return (
    <div className={styles.container}>
      <Card
        title={
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Gestione Immagini</h2>
            <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#666', fontWeight: 'normal' }}>
              Carica, visualizza ed elimina le immagini del sito. Max 5MB per file.
            </p>
          </div>
        }
        extra={
          <Button 
            icon={<ReloadOutlined />} 
            onClick={loadImages}
            loading={loading}
          >
            Ricarica
          </Button>
        }
      >
        {/* Selettore Categoria + Upload */}
        <div className={styles.toolbar}>
          <div className={styles.categorySelector}>
            <label>Categoria:</label>
            <Select
              value={category}
              onChange={setCategory}
              style={{ width: 250 }}
              size="large"
            >
              {categories.map(cat => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
            </Select>
          </div>

          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*"
            multiple={false}
          >
            <Button 
              type="primary" 
              icon={<UploadOutlined />} 
              loading={uploading}
              size="large"
            >
              Carica Immagine
            </Button>
          </Upload>
        </div>

        {/* Lista Immagini */}
        {loading ? (
          <div className={styles.loading}>
            <Spin size="large" tip="Caricamento immagini..." />
          </div>
        ) : images.length === 0 ? (
          <div className={styles.empty}>
            <PictureOutlined style={{ fontSize: 64, color: '#ccc' }} />
            <p>Nessuna immagine in questa categoria</p>
          </div>
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {images.map((img) => (
              <Col xs={24} sm={12} md={8} lg={6} key={img.url}>
                <Card
                  hoverable
                  cover={
                    <div className={styles.imageWrapper}>
                      <Image
                        src={img.url}
                        alt={img.filename}
                        style={{ width: '100%', height: 200, objectFit: 'cover' }}
                      />
                    </div>
                  }
                  actions={[
                    <Button 
                      key="copy" 
                      type="link" 
                      onClick={() => copyToClipboard(img.url)}
                    >
                      Copia URL
                    </Button>,
                    <Button 
                      key="delete" 
                      type="link" 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(img.url)}
                    >
                      Elimina
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={<div className={styles.filename}>{img.filename}</div>}
                    description={
                      <div className={styles.info}>
                        <span>{(img.size / 1024).toFixed(1)} KB</span>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </div>
  );
}
