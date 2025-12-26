"use client";

import { useState, useEffect } from "react";
import { Card, Form, Input, Button, Select, message, Spin } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "./TextEditor.module.css";

const { TextArea } = Input;
const { Option } = Select;

interface TextContent {
  section: string;
  key: string;
  value: string;
  label: string;
}

const sections = [
  { value: "header", label: "🔝 Header & Menu (Tutte le Pagine)" },
  { value: "hero", label: "🎯 Hero Section (Home Page)" },
  { value: "stats", label: "📊 Statistiche (Home Page)" },
  { value: "services", label: "⚡ Servizi Preview (Home Page)" },
  { value: "about", label: "👥 Chi Siamo Preview (Home Page)" },
  { value: "testimonials", label: "💬 Testimonianze (Home Page)" },
  { value: "cta", label: "📞 Call to Action (Home Page)" },
  { value: "servizi_page", label: "📄 Pagina Servizi Completa" },
  { value: "chi_siamo_page", label: "👔 Pagina Chi Siamo Completa" },
  { value: "contatti_page", label: "📧 Pagina Contatti Completa" },
  { value: "contact", label: "📋 Contatti (Dati Generici)" },
  { value: "footer", label: "🔖 Footer (Tutte le Pagine)" },
];

export default function TextEditor() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState("hero");
  const [contents, setContents] = useState<TextContent[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadContents();
  }, [selectedSection]);

  const loadContents = async () => {
    setLoading(true);
    console.log("Loading contents for section:", selectedSection);

    try {
      const url = `/api/admin/content/texts?section=${selectedSection}`;
      console.log("Fetching from:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Received data:", data);

      let normalizedContents: TextContent[] = [];
      let contentMap: { [key: string]: string } = {};

      // Caso A: { contents: [{ key, value, label }, ...] } (services, footer, ecc.)
      if (
        data &&
        Array.isArray(data.contents) &&
        data.contents.length > 0 &&
        typeof data.contents[0].key === "string"
      ) {
        normalizedContents = data.contents;
        normalizedContents.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setContents(normalizedContents);
      }
      // Caso B: { contents: [ { slide1_title: "...", ... } ] } (hero, header)
      else if (
        data &&
        Array.isArray(data.contents) &&
        data.contents.length > 0 &&
        typeof data.contents[0] === "object"
      ) {
        const flatObj = data.contents[0];
        normalizedContents = Object.entries(flatObj).map(([key, value]) => ({
          key,
          value: typeof value === "string" ? value : "",
          label: key,
          section: selectedSection,
        }));
        normalizedContents.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setContents(normalizedContents);
      }
      // Caso C: data è direttamente un array di { key, value, ... } (header, cta, ecc.)
      else if (Array.isArray(data)) {
        normalizedContents = data;
        normalizedContents.forEach((item) => {
          if (item.key) contentMap[item.key] = item.value;
        });
        setContents(normalizedContents);
      }
      // Caso D: oggetto piatto { slide1_title: '...', ... } (non usato qui, ma per sicurezza)
      else if (data && typeof data === "object") {
        normalizedContents = Object.entries(data).map(([key, value]) => ({
          key,
          value: typeof value === "string" ? value : "",
          label: key,
          section: selectedSection,
        }));
        normalizedContents.forEach((item) => {
          contentMap[item.key] = item.value;
        });
        setContents(normalizedContents);
      } else {
        console.error(
          `useContent: "${selectedSection}" -> unsupported data format:`,
          data
        );
        setContents([]);
      }

      console.log(
        `useContent: Final mapped content for "${selectedSection}":`,
        contentMap
      );
      form.setFieldsValue(contentMap);
    } catch (error) {
      console.error("Load error details:", error);
      message.error(
        `Errore: ${
          error instanceof Error ? error.message : "Errore sconosciuto"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content/texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: selectedSection,
          contents: values,
        }),
      });

      if (response.ok) {
        message.success("Contenuti salvati con successo! Clicca su Ricarica tra 20 - 30 secondi...");
        // Attendi 10 secondi per la propagazione del blob su Vercel
        setTimeout(() => {
          loadContents();
        }, 10000);
      } else {
        message.error("Errore nel salvataggio");
      }
    } catch (error) {
      message.error("Errore di connessione");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card
        title={
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Gestione Testi del Sito</h2>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: 14,
                color: "#666",
                fontWeight: "normal",
              }}
            >
              Modifica tutti i contenuti testuali del sito. Ogni modifica sarà
              immediatamente visibile dopo il salvataggio.
            </p>
          </div>
        }
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={loadContents}
            loading={loading}
          >
            Ricarica
          </Button>
        }
      >
        <div className={styles.sectionSelector}>
          <label>Seleziona Sezione da Modificare:</label>
          <Select
            value={selectedSection}
            onChange={setSelectedSection}
            style={{ width: "100%", maxWidth: 400 }}
            size="large"
          >
            {sections.map((section) => (
              <Option key={section.value} value={section.value}>
                {section.label}
              </Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" tip="Caricamento contenuti..." />
          </div>
        ) : contents.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nessun contenuto disponibile per questa sezione</p>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className={styles.form}
          >
            {contents.map((item) => (
              <Form.Item
                key={item.key}
                name={item.key}
                label={<strong>{item.label}</strong>}
                rules={[{ required: true, message: "Campo obbligatorio" }]}
              >
                {item.key &&
                (item.key.includes("description") ||
                  item.key.includes("desc") ||
                  item.key.includes("text") ||
                  item.key.includes("subtitle")) ? (
                  <TextArea
                    rows={4}
                    placeholder={item.label}
                    showCount
                    maxLength={500}
                  />
                ) : (
                  <Input
                    placeholder={item.label}
                    showCount={!!(item.key && item.key.includes("title"))}
                    maxLength={
                      item.key && item.key.includes("title") ? 100 : undefined
                    }
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={saving}
                size="large"
                block
              >
                💾 Salva Tutte le Modifiche
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}
