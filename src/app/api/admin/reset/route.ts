import { NextResponse } from 'next/server';
import { saveContent, saveImagesConfig } from '@/lib/blob-storage';
import { list, del } from '@vercel/blob';
import { defaultConfig } from 'next/dist/server/config-shared';

export async function POST() {
  try {
    console.log('[POST /api/admin/reset] Resetting Blob storage...');

    // ELIMINA TUTTO il content.json esistente
    const { blobs } = await list({ prefix: 'data/content' });
    for (const blob of blobs) {
      console.log('[POST /api/admin/reset] Deleting:', blob.pathname);
      await del(blob.url);
    }

    const defaultContent = {
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

    await saveContent(defaultContent as any);

    console.log('[POST /api/admin/reset] Reset completed!');

    return NextResponse.json({
      success: true,
      message: 'Blob storage reset successfully! ✅',
      data: defaultContent
    });
  } catch (error: any) {
    console.error('[POST /api/admin/reset] Error:', error);
    return NextResponse.json(
      { error: 'Reset failed', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
