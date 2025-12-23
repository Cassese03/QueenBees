import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import PageLoader from '@/components/common/PageLoader';
import PageTransition from '@/components/common/PageTransition';
import './globals.css';

export const metadata: Metadata = {
  title: 'EL.IT - Impianti Elettrici',
  description: 'Soluzioni professionali per impianti elettrici, domotica ed energie rinnovabili',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        {/* Loader iniziale (primo caricamento) */}
        <PageLoader duration={2000} />
        
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 8,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              },
            }}
          >
            {/* Loader navigazione (cambio pagina) */}
            <PageTransition />
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
