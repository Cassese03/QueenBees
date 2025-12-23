'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './login.module.css';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Login effettuato con successo!');
        router.push('/admin/dashboard');
      } else {
        message.error(data.error || 'Credenziali non valide');
      }
    } catch (error) {
      message.error('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <div className={styles.logoSection}>
          <h1>EL.IT</h1>
          <h2>Pannello Admin</h2>
        </div>

        <Form
          name="admin-login"
          onFinish={onFinish}
          size="large"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Inserisci email' },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Inserisci password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
            >
              Accedi
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.hint}>
          <p>Credenziali predefinite:</p>
          <p><strong>Email:</strong> admin</p>
          <p><strong>Password:</strong> admin</p>
        </div>
      </Card>
    </div>
  );
}
