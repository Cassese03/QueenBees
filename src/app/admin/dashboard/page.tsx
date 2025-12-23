'use client';

import { Tabs } from 'antd';
import { FileTextOutlined, PictureOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';
import TextEditor from '@/components/admin/TextEditor';
import ImageManager from '@/components/admin/ImageManager';
import ImageConfigurator from '@/components/admin/ImageConfigurator';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>
          <DashboardOutlined style={{ marginRight: 12 }} />
          Admin Dashboard
        </h1>
        <p>✨ Gestione completa dei contenuti e delle immagini del sito</p>
      </div>

      <Tabs
        defaultActiveKey="texts"
        size="large"
        type="card"
        items={[
          {
            key: 'texts',
            label: (
              <span>
                <FileTextOutlined />
                 Gestione Testi
              </span>
            ),
            children: <TextEditor />,
          },
          {
            key: 'images',
            label: (
              <span>
                <PictureOutlined />
                 Gestione Immagini
              </span>
            ),
            children: <ImageManager />,
          },
          {
            key: 'config',
            label: (
              <span>
                <SettingOutlined />
                 Configura Immagini
              </span>
            ),
            children: <ImageConfigurator />,
          },
        ]}
      />
    </div>
  );
}
