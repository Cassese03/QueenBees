'use client';

import { ConfigProvider } from 'antd';
import itIT from 'antd/locale/it_IT';
import { ReactNode } from 'react';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      locale={itIT}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Button: {
            controlHeight: 40,
            fontSize: 16,
          },
          Input: {
            controlHeight: 40,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
