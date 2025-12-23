import { put, list, del } from "@vercel/blob";

export interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
  };
  about: {
    title: string;
    description: string;
    features: string[];
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
  gallery: Array<{
    id: string;
    image: string;
    caption: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    text: string;
    rating: number;
  }>;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
}

const CONTENT_BLOB_PATH = "data/content.json";
const IMAGES_CONFIG_BLOB_PATH = "data/images-config.json";

// Leggi il content.json dal Blob
export async function getContent(): Promise<ContentData> {
  try {
    console.log("Fetching content from Blob...");
    // NON passare token, lo legge automaticamente
    const { blobs } = await list({
      prefix: CONTENT_BLOB_PATH,
      limit: 1,
    });

    if (blobs.length === 0) {
      console.log("No content found, creating default...");
      const defaultContent = getDefaultContent();
      await saveContent(defaultContent);
      return defaultContent;
    }

    console.log("Content blob found:", blobs[0].url);
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading content from Blob:", error);
    return getDefaultContent();
  }
}

// Salva il content.json sul Blob
export async function saveContent(content: ContentData): Promise<void> {
  try {
    console.log("Saving content to Blob...");

    // Elimina TUTTI i vecchi file con lo stesso prefix
    const { blobs } = await list({
      prefix: "data/content", // ← Cambiato per trovare tutti i file content
    });

    console.log(`Found ${blobs.length} old content files to delete`);

    for (const blob of blobs) {
      console.log("Deleting old blob:", blob.pathname);
      await del(blob.url);
    }

    // Salva il nuovo contenuto
    const result = await put(
      CONTENT_BLOB_PATH,
      JSON.stringify(content, null, 2),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false, // ← Impedisce di aggiungere suffisso random
      }
    );

    console.log("Content saved successfully:", result.url);
  } catch (error) {
    console.error("Error saving content to Blob:", error);
    throw new Error(`Failed to save content: ${error}`);
  }
}

// Leggi images-config.json dal Blob
export async function getImagesConfig() {
  try {
    console.log("Fetching images config from Blob...");
    const { blobs } = await list({
      prefix: IMAGES_CONFIG_BLOB_PATH,
      limit: 1,
    });

    if (blobs.length === 0) {
      console.log("No images config found, creating default...");
      const defaultConfig = getDefaultImagesConfig();
      await saveImagesConfig(defaultConfig);
      return defaultConfig;
    }

    console.log("Images config blob found:", blobs[0].url);
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading images config from Blob:", error);
    return getDefaultImagesConfig();
  }
}
// Leggi text-config.json dal Blob
export async function getTextConfig() {
  try {
    console.log("Fetching text config from Blob...");
    const { blobs } = await list({
      prefix: CONTENT_BLOB_PATH,
      limit: 1,
    });

    if (blobs.length === 0) {
      console.log("No text config found, creating default...");
      const defaultConfig = getDefaultTextConfig();
      await saveTextConfig(defaultConfig);
      return defaultConfig;
    }

    console.log("Text config blob found:", blobs[0].url);
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading txt config from Blob:", error);
    return getDefaultTextConfig();
  }
}
// Salva text-config.json sul Blob

export async function saveTextConfig(config: any): Promise<void> {
  try {
    const { blobs } = await list({
      prefix: CONTENT_BLOB_PATH, // ← Cambiato per trovare tutti i config
    });
    console.log(`Found ${blobs.length} old config files to delete`);

    for (const blob of blobs) {
      console.log("Deleting old config blob:", blob.pathname);
      await del(blob.url);
    }

    const result = await put(
      CONTENT_BLOB_PATH,
      JSON.stringify(config, null, 2),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false, // ← Impedisce di aggiungere suffisso random
      }
    );

    console.log("Images config saved successfully:", result.url);
  } catch (error) {
    console.error("Error saving images config to Blob:", error);
    throw new Error(`Failed to save images config: ${error}`);
  }
}
// Salva images-config.json sul Blob
export async function saveImagesConfig(config: any): Promise<void> {
  try {
    console.log("Saving images config to Blob...");

    // Elimina TUTTI i vecchi file config
    const { blobs } = await list({
      prefix: "data/images-config", // ← Cambiato per trovare tutti i config
    });

    console.log(`Found ${blobs.length} old config files to delete`);

    for (const blob of blobs) {
      console.log("Deleting old config blob:", blob.pathname);
      await del(blob.url);
    }

    const result = await put(
      IMAGES_CONFIG_BLOB_PATH,
      JSON.stringify(config, null, 2),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false, // ← Impedisce di aggiungere suffisso random
      }
    );

    console.log("Images config saved successfully:", result.url);
  } catch (error) {
    console.error("Error saving images config to Blob:", error);
    throw new Error(`Failed to save images config: ${error}`);
  }
}

// Upload di un'immagine sul Blob
export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    console.log(
      "Uploading image:",
      file.name,
      "size:",
      file.size,
      "type:",
      file.type
    );

    if (!file || file.size === 0) {
      throw new Error("File is empty or invalid");
    }

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${folder}/${timestamp}-${sanitizedName}`;

    console.log("Upload filename:", filename);

    const blob = await put(filename, file, {
      access: "public",
    });

    console.log("Image uploaded successfully:", blob.url);
    return blob.url;
  } catch (error) {
    console.error("Error uploading image to Blob:", error);
    throw new Error(`Failed to upload image: ${error}`);
  }
}

// Elimina un'immagine dal Blob
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    console.log("[blob-storage] Deleting image:", imageUrl);

    if (!imageUrl) {
      throw new Error("URL immagine vuoto");
    }

    await del(imageUrl);

    console.log("[blob-storage] Image deleted successfully");
  } catch (error: any) {
    console.error("[blob-storage] Error deleting image:", error);
    // Non lanciare errore se l'eliminazione fallisce (l'immagine potrebbe non esistere)
    if (error.message && !error.message.includes("not found")) {
      throw error;
    }
  }
}

function getDefaultContent(): ContentData {
  return {
    hero: {
      title: "Abbigliamento e Calzature Firmate",
      subtitle: "Outlet Nola e Baiano: moda firmata per tutti",
      cta: "Chiama Ora",
      image:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
    },
    about: {
      title: "Chi Siamo - San Giulio Nocerino",
      description:
        "Leader nell'abbigliamento e calzature firmate all'ingrosso. Con sedi a Nola e Baiano, offriamo le migliori marche a prezzi outlet per privati e rivenditori.",
      features: [
        "Stock selezionati di abbigliamento firmato uomo, donna e bambino",
        "Calzature di marca a prezzi outlet vantaggiosi",
        "Forniture all'ingrosso per negozi e rivenditori",
        "Due punti vendita: Nola e Baiano",
      ],
    },
    services: [
      {
        id: "service1",
        title: "Outlet Moda Firmata",
        description:
          "Abbigliamento firmato per uomo, donna e bambino a prezzi outlet. Le migliori marche sempre disponibili.",
        image:
          "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
        link: "#outlet",
      },
      {
        id: "service2",
        title: "Stock Shoes - Ingrosso Calzature",
        description:
          "Calzature di marca per negozi e rivenditori. Stock selezionati e prezzi competitivi.",
        image:
          "https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg",
        link: "#ingrosso",
      },
      {
        id: "service3",
        title: "Forniture per Rivenditori",
        description:
          "Stock di abbigliamento e calzature per outlet, negozi e rivenditori. Qualità garantita.",
        image:
          "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
        link: "#rivenditori",
      },
      {
        id: "service4",
        title: "Abiti Cerimonia",
        description:
          "Collezione elegante per cerimonie e occasioni speciali. Uomo, donna e bambino.",
        image:
          "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
        link: "#cerimonia",
      },
    ],
    gallery: [
      {
        id: "gallery1",
        image:
          "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
        caption: "Il nostro store di Nola",
      },
      {
        id: "gallery2",
        image:
          "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg",
        caption: "Abbigliamento firmato",
      },
      {
        id: "gallery3",
        image:
          "https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg",
        caption: "Calzature di marca",
      },
    ],
    testimonials: [
      {
        id: "test1",
        name: "Giovanni R.",
        text: "Ottimi prezzi e qualità eccellente. Punto di riferimento per l'abbigliamento firmato!",
        rating: 5,
      },
      {
        id: "test2",
        name: "Maria L.",
        text: "Fornitore affidabile per il mio negozio. Stock sempre aggiornati e prezzi competitivi.",
        rating: 5,
      },
      {
        id: "test3",
        name: "Antonio C.",
        text: "Le migliori calzature di marca a prezzi outlet. Consigliatissimo!",
        rating: 5,
      },
    ],
    contact: {
      email: "info@sangiulionocerino.it",
      phone: "081 393 1794",
      address:
        "Via Paolo Borsellino, 15 - 80035 Nola (NA) | Via Nazionale, 123 - Baiano (AV)",
      hours: "Lunedì – Sabato: 9:00 – 13:00 | 16:00 – 20:30",
    },
  };
}
function getDefaultTextConfig() {
  return {
    header: [
      { key: "logo_text", value: "Queen Bees", label: "Testo Logo" },
      { key: "menu_home", value: "Home", label: "Menu - Home" },
      { key: "menu_chisiamo", value: "Chi Siamo", label: "Menu - Chi Siamo" },
      { key: "menu_servizi", value: "Servizi", label: "Menu - Servizi" },
      { key: "menu_contatti", value: "Contatti", label: "Menu - Contatti" },
      { key: "header_phone", value: "0813931794", label: "Telefono Header" },
      {
        key: "header_email",
        value: "info@queenbeesnola.com",
        label: "Email Header",
      },
    ],
    hero: [
      // Slide 1
      {
        key: "slide1_title",
        value: "Abbigliamento e Calzature Firmate",
        label: "Slide 1 - Titolo",
      },
      {
        key: "slide1_subtitle",
        value: "Outlet Nola e Baiano: moda firmata per tutti",
        label: "Slide 1 - Sottotitolo",
      },

      // Slide 2
      {
        key: "slide2_title",
        value: "Stock Shoes Outlet",
        label: "Slide 2 - Titolo",
      },
      {
        key: "slide2_subtitle",
        value: "Ingrosso scarpe e abbigliamento per negozi",
        label: "Slide 2 - Sottotitolo",
      },

      // Slide 3
      {
        key: "slide3_title",
        value: "Forniture per Rivenditori",
        label: "Slide 3 - Titolo",
      },
      {
        key: "slide3_subtitle",
        value: "Stock selezionati di qualità per negozi e outlet",
        label: "Slide 3 - Sottotitolo",
      },

      // Dati generali
      { key: "phone", value: "0813931794", label: "Numero di Telefono" },
      {
        key: "schedule",
        value: "Lunedì – Sabato: 9:00 – 13:00 | 16:00 – 20:30",
        label: "Orari",
      },
      {
        key: "cta_primary",
        value: "Chiama Ora",
        label: "Testo Bottone Primario",
      },
      {
        key: "cta_secondary",
        value: "Richiedi Preventivo",
        label: "Testo Bottone Secondario",
      },
    ],
    stats: [
      { key: "years_title", value: "Anni di Esperienza", label: "Titolo Anni" },
      { key: "years_value", value: "20", label: "Numero Anni" },
      {
        key: "projects_title",
        value: "Clienti Soddisfatti",
        label: "Titolo Progetti",
      },
      { key: "projects_value", value: "1000+", label: "Numero Progetti" },
      {
        key: "team_title",
        value: "Professionisti Qualificati",
        label: "Titolo Team",
      },
      { key: "team_value", value: "10", label: "Numero Persone" },
      {
        key: "satisfaction_title",
        value: "Clienti Soddisfatti",
        label: "Titolo Soddisfazione",
      },
      { key: "satisfaction_value", value: "98", label: "Percentuale" },
    ],
    services: [
      { key: "badge", value: "I NOSTRI SERVIZI", label: "Badge Superiore" },
      {
        key: "section_title",
        value: "Soluzioni Complete per Ogni Esigenza",
        label: "Titolo Sezione",
      },
      {
        key: "section_subtitle",
        value:
          "Da oltre 20 anni offriamo abbigliamento e calzature firmate, forniture per negozi e servizi B2B",
        label: "Sottotitolo",
      },
      {
        key: "service1_title",
        value: "Outlet Moda",
        label: "Servizio 1 - Titolo",
      },
      {
        key: "service1_desc",
        value:
          "Abbigliamento e calzature firmate a prezzi outlet per uomo e donna.",
        label: "Servizio 1 - Descrizione",
      },
      {
        key: "service2_title",
        value: "Stock Shoes Outlet",
        label: "Servizio 2 - Titolo",
      },
      {
        key: "service2_desc",
        value:
          "Ingrosso scarpe e abbigliamento per negozi, boutique e rivenditori.",
        label: "Servizio 2 - Descrizione",
      },
      {
        key: "service3_title",
        value: "Forniture per Rivenditori",
        label: "Servizio 3 - Titolo",
      },
      {
        key: "service3_desc",
        value:
          "Stock selezionati di qualità per negozi e outlet in tutta Italia.",
        label: "Servizio 3 - Descrizione",
      },
      {
        key: "service4_title",
        value: "Abbigliamento Cerimonia",
        label: "Servizio 4 - Titolo",
      },
      {
        key: "service4_desc",
        value: "Abiti da cerimonia e accessori per ogni occasione.",
        label: "Servizio 4 - Descrizione",
      },
    ],
    about: [
      { key: "title", value: "Chi Siamo", label: "Titolo" },
      {
        key: "description",
        value:
          "Da oltre 20 anni, Queen Bees è il punto di riferimento a Nola e Baiano per chi cerca abbigliamento e calzature firmate a prezzi outlet. Con due store fisici e una selezione costante dei migliori brand, offriamo capi e accessori per uomo e donna, inclusi abiti da cerimonia e forniture in stock per rivenditori.",
        label: "Descrizione",
      },
      {
        key: "feature1",
        value: "Oltre 20 anni di esperienza nel settore",
        label: "Caratteristica 1",
      },
      {
        key: "feature2",
        value: "Personale qualificato e attento alle esigenze",
        label: "Caratteristica 2",
      },
      {
        key: "feature3",
        value: "Qualità, stile e convenienza",
        label: "Caratteristica 3",
      },
      {
        key: "feature4",
        value: "Assistenza personalizzata",
        label: "Caratteristica 4",
      },
      {
        key: "feature5",
        value: "Preventivi gratuiti e trasparenti",
        label: "Caratteristica 5",
      },
      {
        key: "feature6",
        value: "Garanzia su tutti i prodotti",
        label: "Caratteristica 6",
      },
    ],
    testimonials: [
      {
        key: "section_title",
        value: "Cosa Dicono i Nostri Clienti",
        label: "Titolo Sezione",
      },
      {
        key: "section_subtitle",
        value: "La soddisfazione dei clienti è la nostra priorità",
        label: "Sottotitolo",
      },
      {
        key: "test1_name",
        value: "Marco Rossi",
        label: "Testimonianza 1 - Nome",
      },
      {
        key: "test1_role",
        value: "Cliente Outlet",
        label: "Testimonianza 1 - Ruolo",
      },
      {
        key: "test1_text",
        value:
          "Servizio eccellente, personale qualificato e puntuale. Hanno realizzato l'outlet della mia nuova attività in tempi record.",
        label: "Testimonianza 1 - Testo",
      },
      {
        key: "test2_name",
        value: "Laura Bianchi",
        label: "Testimonianza 2 - Nome",
      },
      {
        key: "test2_role",
        value: "Rivenditore",
        label: "Testimonianza 2 - Ruolo",
      },
      {
        key: "test2_text",
        value:
          "Professionisti seri e competenti. Ci hanno fornito stock selezionati di qualità per il nostro negozio e siamo estremamente soddisfatti.",
        label: "Testimonianza 2 - Testo",
      },
      {
        key: "test3_name",
        value: "Giuseppe Verdi",
        label: "Testimonianza 3 - Nome",
      },
      {
        key: "test3_role",
        value: "Amministratore Condominio",
        label: "Testimonianza 3 - Ruolo",
      },
      {
        key: "test3_text",
        value:
          "Ottimo rapporto qualità-prezzo. Hanno risolto problematiche complesse con grande professionalità.",
        label: "Testimonianza 3 - Testo",
      },
    ],
    cta: [
      { key: "title", value: "Hai bisogno di un preventivo?", label: "Titolo" },
      {
        key: "subtitle",
        value:
          "Contattaci oggi stesso per una consulenza gratuita e senza impegno",
        label: "Sottotitolo",
      },
      {
        key: "button_phone",
        value: "Chiama Ora",
        label: "Testo Bottone Telefono",
      },
      {
        key: "button_contact",
        value: "Invia Richiesta",
        label: "Testo Bottone Contatto",
      },
    ],
    contact: [
      { key: "title", value: "Contattaci", label: "Titolo" },
      {
        key: "address",
        value:
          "Via Giuseppe Lippiello, 31, 83022 Baiano AV | Via Variante 7/BIS 112, 80035 Nola NA",
        label: "Indirizzo",
      },
      { key: "email", value: "info@queenbeesnola.com", label: "Email" },
    ],
    footer: [
      // Colonna 1 - Info Azienda
      { key: "company_name", value: "Queen Bees", label: "Nome Azienda" },
      {
        key: "company_description",
        value:
          "Abbigliamento e calzature firmate a prezzi outlet, forniture per negozi e servizi B2B.",
        label: "Descrizione Azienda",
      },

      // Colonna 2 - Link Rapidi (titoli)
      { key: "links_title", value: "Link Rapidi", label: "Titolo Link Rapidi" },
      { key: "link1_text", value: "Home", label: "Link 1 - Testo" },
      { key: "link2_text", value: "Servizi", label: "Link 2 - Testo" },
      { key: "link3_text", value: "Chi Siamo", label: "Link 3 - Testo" },
      { key: "link4_text", value: "Contatti", label: "Link 4 - Testo" },

      // Colonna 3 - Servizi
      {
        key: "services_title",
        value: "I Nostri Servizi",
        label: "Titolo Servizi",
      },
      {
        key: "service1_text",
        value: "Outlet Moda",
        label: "Servizio 1 - Testo",
      },
      {
        key: "service2_text",
        value: "Stock Shoes Outlet",
        label: "Servizio 2 - Testo",
      },
      {
        key: "service3_text",
        value: "Forniture per Rivenditori",
        label: "Servizio 3 - Testo",
      },
      {
        key: "service4_text",
        value: "Abbigliamento Cerimonia",
        label: "Servizio 4 - Testo",
      },

      // Colonna 4 - Contatti
      { key: "contacts_title", value: "Contatti", label: "Titolo Contatti" },
      { key: "phone", value: "0813931794", label: "Numero di Telefono" },
      { key: "email", value: "info@queenbeesnola.com", label: "Email" },
      {
        key: "address",
        value:
          "Via Giuseppe Lippiello, 31, 83022 Baiano AV | Via Variante 7/BIS 112, 80035 Nola NA",
        label: "Indirizzo Completo",
      },

      // Social Media
      {
        key: "facebook",
        value: "https://facebook.com/queenbeesnola",
        label: "Link Facebook (opzionale)",
      },
      {
        key: "instagram",
        value: "https://instagram.com/queenbeesnola",
        label: "Link Instagram (opzionale)",
      },
      { key: "linkedin", value: "", label: "Link LinkedIn (opzionale)" },

      // Copyright
      {
        key: "copyright",
        value: "© 2025 Queen Bees - Tutti i diritti riservati",
        label: "Testo Copyright",
      },
    ],
    servizi_page: [
      { key: "page_title", value: "I Nostri Servizi", label: "Titolo Pagina" },
      {
        key: "page_subtitle",
        value: "Soluzioni professionali per ogni esigenza",
        label: "Sottotitolo Pagina",
      },

      // Outlet Moda
      {
        key: "elettrici_title",
        value: "Outlet Moda",
        label: "Outlet - Titolo",
      },
      {
        key: "elettrici_intro",
        value:
          "Abbigliamento e calzature firmate a prezzi outlet per uomo e donna.",
        label: "Outlet - Introduzione",
      },
      {
        key: "elettrici_feat1",
        value: "Abbigliamento e calzature firmate",
        label: "Outlet - Caratteristica 1",
      },
      {
        key: "elettrici_feat2",
        value: "Prezzi vantaggiosi",
        label: "Outlet - Caratteristica 2",
      },
      {
        key: "elettrici_feat3",
        value: "Ampia selezione",
        label: "Outlet - Caratteristica 3",
      },
      {
        key: "elettrici_feat4",
        value: "Assistenza personalizzata",
        label: "Outlet - Caratteristica 4",
      },

      // Stock Shoes Outlet
      {
        key: "domotica_title",
        value: "Stock Shoes Outlet",
        label: "Stock Shoes - Titolo",
      },
      {
        key: "domotica_intro",
        value:
          "Ingrosso scarpe e abbigliamento per negozi, boutique e rivenditori.",
        label: "Stock Shoes - Introduzione",
      },
      {
        key: "domotica_feat1",
        value: "Stock selezionati di qualità",
        label: "Stock Shoes - Caratteristica 1",
      },
      {
        key: "domotica_feat2",
        value: "Condizioni vantaggiose",
        label: "Stock Shoes - Caratteristica 2",
      },
      {
        key: "domotica_feat3",
        value: "Disponibilità costante",
        label: "Stock Shoes - Caratteristica 3",
      },
      {
        key: "domotica_feat4",
        value: "Aggiornamenti continui",
        label: "Stock Shoes - Caratteristica 4",
      },

      // Forniture per Rivenditori
      {
        key: "rinnovabili_title",
        value: "Forniture per Rivenditori",
        label: "Forniture - Titolo",
      },
      {
        key: "rinnovabili_intro",
        value:
          "Stock selezionati di qualità per negozi e outlet in tutta Italia.",
        label: "Forniture - Introduzione",
      },
      {
        key: "rinnovabili_feat1",
        value: "Prodotti firmati e attuali",
        label: "Forniture - Caratteristica 1",
      },
      {
        key: "rinnovabili_feat2",
        value: "Condizioni vantaggiose",
        label: "Forniture - Caratteristica 2",
      },
      {
        key: "rinnovabili_feat3",
        value: "Aggiornamenti continui",
        label: "Forniture - Caratteristica 3",
      },
      {
        key: "rinnovabili_feat4",
        value: "Assistenza personalizzata",
        label: "Forniture - Caratteristica 4",
      },

      // Abbigliamento Cerimonia
      {
        key: "manutenzione_title",
        value: "Abbigliamento Cerimonia",
        label: "Cerimonia - Titolo",
      },
      {
        key: "manutenzione_intro",
        value: "Abiti da cerimonia e accessori per ogni occasione.",
        label: "Cerimonia - Introduzione",
      },
      {
        key: "manutenzione_feat1",
        value: "Ampia selezione di abiti",
        label: "Cerimonia - Caratteristica 1",
      },
      {
        key: "manutenzione_feat2",
        value: "Accessori per ogni occasione",
        label: "Cerimonia - Caratteristica 2",
      },
      {
        key: "manutenzione_feat3",
        value: "Assistenza personalizzata",
        label: "Cerimonia - Caratteristica 3",
      },
      {
        key: "manutenzione_feat4",
        value: "Prezzi vantaggiosi",
        label: "Cerimonia - Caratteristica 4",
      },
    ],
    chi_siamo_page: [
      // Hero Section
      {
        key: "hero_title",
        value: "Chi Siamo",
        label: "Hero - Titolo Principale",
      },
      {
        key: "hero_subtitle",
        value: "La nostra storia, i nostri valori",
        label: "Hero - Sottotitolo",
      },

      // Storia Azienda
      {
        key: "storia_title",
        value: "La Nostra Storia",
        label: "Storia - Titolo",
      },
      {
        key: "storia_text",
        value:
          "Da oltre 20 anni, Queen Bees è il punto di riferimento a Nola e Baiano per chi cerca abbigliamento e calzature firmate a prezzi outlet. Con due store fisici e una selezione costante dei migliori brand, offriamo capi e accessori per uomo e donna, inclusi abiti da cerimonia e forniture in stock per rivenditori.",
        label: "Storia - Testo",
      },

      // Mission
      {
        key: "mission_title",
        value: "La Nostra Mission",
        label: "Mission - Titolo",
      },
      {
        key: "mission_text",
        value:
          "Fornire soluzioni innovative e di qualità nel campo dell'abbigliamento e calzature firmate, garantendo stile, convenienza e soddisfazione del cliente.",
        label: "Mission - Testo",
      },

      // Vision
      {
        key: "vision_title",
        value: "La Nostra Vision",
        label: "Vision - Titolo",
      },
      {
        key: "vision_text",
        value:
          "Essere leader nel settore dell'outlet moda e delle forniture per negozi, innovando costantemente per offrire prodotti all'avanguardia che migliorano la qualità della vita.",
        label: "Vision - Testo",
      },

      // Valori (6 valori)
      {
        key: "valori_title",
        value: "I Nostri Valori",
        label: "Valori - Titolo Sezione",
      },
      { key: "valore1_title", value: "Qualità", label: "Valore 1 - Titolo" },
      {
        key: "valore1_desc",
        value: "Utilizziamo solo prodotti firmati e di prima scelta",
        label: "Valore 1 - Descrizione",
      },
      {
        key: "valore2_title",
        value: "Professionalità",
        label: "Valore 2 - Titolo",
      },
      {
        key: "valore2_desc",
        value: "Personale qualificato e costantemente aggiornato",
        label: "Valore 2 - Descrizione",
      },
      {
        key: "valore3_title",
        value: "Innovazione",
        label: "Valore 3 - Titolo",
      },
      {
        key: "valore3_desc",
        value: "Sempre al passo con le ultime tendenze",
        label: "Valore 3 - Descrizione",
      },
      { key: "valore4_title", value: "Sicurezza", label: "Valore 4 - Titolo" },
      {
        key: "valore4_desc",
        value: "Tutti i prodotti sono garantiti e certificati",
        label: "Valore 4 - Descrizione",
      },
      {
        key: "valore5_title",
        value: "Sostenibilità",
        label: "Valore 5 - Titolo",
      },
      {
        key: "valore5_desc",
        value: "Attenzione all'ambiente e alle forniture sostenibili",
        label: "Valore 5 - Descrizione",
      },
      {
        key: "valore6_title",
        value: "Trasparenza",
        label: "Valore 6 - Titolo",
      },
      {
        key: "valore6_desc",
        value: "Preventivi chiari e dettagliati, senza sorprese",
        label: "Valore 6 - Descrizione",
      },

      // Team
      { key: "team_title", value: "Il Nostro Team", label: "Team - Titolo" },
      {
        key: "team_subtitle",
        value: "Professionisti esperti al tuo servizio",
        label: "Team - Sottotitolo",
      },
      {
        key: "team_text",
        value:
          "Il nostro team è composto da addetti alle vendite, esperti di moda, tecnici specializzati e personale amministrativo sempre pronto ad assisterti.",
        label: "Team - Testo Introduttivo",
      },

      // Certificazioni
      {
        key: "cert_title",
        value: "Certificazioni e Riconoscimenti",
        label: "Certificazioni - Titolo",
      },
      {
        key: "cert1",
        value: "Certificazione Qualità",
        label: "Certificazione 1",
      },
      { key: "cert2", value: "Registro Imprese", label: "Certificazione 2" },
      {
        key: "cert3",
        value: "Qualifica Forniture B2B",
        label: "Certificazione 3",
      },
      {
        key: "cert4",
        value: "Assicurazione RC Professionale",
        label: "Certificazione 4",
      },

      // CTA Finale
      {
        key: "cta_title",
        value: "Vuoi saperne di più?",
        label: "CTA - Titolo",
      },
      {
        key: "cta_text",
        value:
          "Contattaci per ricevere maggiori informazioni sui nostri servizi",
        label: "CTA - Testo",
      },
      { key: "cta_button", value: "Contattaci", label: "CTA - Testo Bottone" },
    ],
    contatti_page: [
      // Hero Section
      {
        key: "hero_title",
        value: "Contattaci",
        label: "Hero - Titolo Principale",
      },
      {
        key: "hero_subtitle",
        value: "Siamo a tua disposizione per qualsiasi informazione",
        label: "Hero - Sottotitolo",
      },

      // Info Contatti
      {
        key: "info_title",
        value: "Informazioni di Contatto",
        label: "Info - Titolo Sezione",
      },
      {
        key: "address_title",
        value: "Sede Operativa",
        label: "Indirizzo - Titolo",
      },
      {
        key: "address",
        value:
          "Via Giuseppe Lippiello, 31, 83022 Baiano AV | Via Variante 7/BIS 112, 80035 Nola NA",
        label: "Indirizzo Completo",
      },
      { key: "phone_title", value: "Telefono", label: "Telefono - Titolo" },
      { key: "phone", value: "0813931794", label: "Numero di Telefono" },
      { key: "mobile", value: "0813626176", label: "Cellulare" },
      { key: "email_title", value: "Email", label: "Email - Titolo" },
      {
        key: "email",
        value: "info@queenbeesnola.com",
        label: "Email Principale",
      },
      {
        key: "email_support",
        value: "supporto@queenbeesnola.com",
        label: "Email Supporto",
      },

      // Orari
      {
        key: "hours_title",
        value: "Orari di Apertura",
        label: "Orari - Titolo",
      },
      {
        key: "hours_weekdays",
        value: "Lunedì – Sabato: 9:00 – 13:00 | 16:00 – 20:30",
        label: "Orari Feriali",
      },
      {
        key: "hours_saturday",
        value: "Sabato: 9:00 – 13:00 | 16:00 – 20:30",
        label: "Orari Sabato",
      },
      {
        key: "hours_sunday",
        value: "Domenica: Chiuso",
        label: "Orari Domenica",
      },
      {
        key: "hours_emergency",
        value: "Assistenza telefonica disponibile",
        label: "Emergenze",
      },

      // Form Contatti
      {
        key: "form_title",
        value: "Invia una Richiesta",
        label: "Form - Titolo",
      },
      {
        key: "form_subtitle",
        value: "Compila il form e ti ricontatteremo al più presto",
        label: "Form - Sottotitolo",
      },
      { key: "form_name", value: "Nome e Cognome", label: "Form - Label Nome" },
      { key: "form_email", value: "Email", label: "Form - Label Email" },
      { key: "form_phone", value: "Telefono", label: "Form - Label Telefono" },
      { key: "form_subject", value: "Oggetto", label: "Form - Label Oggetto" },
      {
        key: "form_message",
        value: "Messaggio",
        label: "Form - Label Messaggio",
      },
      {
        key: "form_button",
        value: "Invia Richiesta",
        label: "Form - Testo Bottone",
      },
      {
        key: "form_success",
        value: "Messaggio inviato con successo! Ti ricontatteremo presto.",
        label: "Form - Messaggio Successo",
      },

      // FAQ
      { key: "faq_title", value: "Domande Frequenti", label: "FAQ - Titolo" },
      {
        key: "faq1_q",
        value: "Quanto costa un preventivo?",
        label: "FAQ 1 - Domanda",
      },
      {
        key: "faq1_a",
        value:
          "I preventivi sono gratuiti e senza impegno. Contattaci per riceverne uno personalizzato.",
        label: "FAQ 1 - Risposta",
      },
      { key: "faq2_q", value: "Quali zone coprite?", label: "FAQ 2 - Domanda" },
      {
        key: "faq2_a",
        value:
          "Operiamo principalmente su Nola, Baiano e provincia, ma valutiamo richieste anche per zone limitrofe.",
        label: "FAQ 2 - Risposta",
      },
      {
        key: "faq3_q",
        value: "Avete un servizio di emergenza?",
        label: "FAQ 3 - Domanda",
      },
      {
        key: "faq3_a",
        value:
          "Sì, offriamo un servizio di assistenza telefonica per emergenze.",
        label: "FAQ 3 - Risposta",
      },
      {
        key: "faq4_q",
        value: "Rilasciate certificazioni?",
        label: "FAQ 4 - Domanda",
      },
      {
        key: "faq4_a",
        value: "Sì, tutti i nostri prodotti sono certificati e garantiti.",
        label: "FAQ 4 - Risposta",
      },
    ],
  };
}
function getDefaultImagesConfig() {
  return {
    hero: {
      slide1:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg", // Moda uomo/donna
      slide2:
        "https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg", // Scarpe outlet
      slide3:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg", // Stock abbigliamento
    },
    about: {
      main: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg", // Team lavoro
    },
    services: {
      service1:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg", // Outlet moda
      service2:
        "https://images.pexels.com/photos/1045523/pexels-photo-1045523.jpeg", // Stock Shoes
      service3:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg", // Forniture rivenditori
      service4:
        "https://images.pexels.com/photos/11541986/pexels-photo-11541986.jpeg", // Abiti cerimonia
    },
    logo: {
      main: "/uploads/logo/logo.png", // Logo personalizzato, da inserire
      favicon: "/uploads/logo/favicon.png", // Favicon personalizzato
    },
    chisiamo: {
      storia:
        "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg", // Storia azienda
      team: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg", // Team
    },
  };
}
