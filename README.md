# EL.IT SRL - Sito Web Replica

Replica fedele del sito elit-srl.it utilizzando Next.js 14, TypeScript e Ant Design.

## 🚀 Stack Tecnologico

- **Framework**: Next.js 14 (App Router)
- **Linguaggio**: TypeScript
- **UI Library**: Ant Design 5
- **Animazioni**: Framer Motion
- **Styling**: CSS Modules + CSS Variables

## 📦 Installazione

```bash
# Installa dipendenze
npm install

# Avvia development server
npm run dev

# Build per produzione
npm run build

# Avvia produzione
npm start
```

## 📂 Struttura Progetto

```
testedil/
├── src/
│   ├── app/                  # Pages (App Router)
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── chi-siamo/       # Chi Siamo page
│   │   ├── servizi/         # Servizi page
│   │   ├── contatti/        # Contatti page
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   ├── home/            # Homepage components
│   │   ├── common/          # Shared components
│   │   └── providers/       # Context providers
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles & variables
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── package.json
```

## 🎨 Personalizzazione

### Colori Brand
Modifica in `src/styles/variables.css`:
```css
:root {
  --color-primary: #TUO_COLORE;
  --color-secondary: #TUO_COLORE;
}
```

### Logo
Sostituisci in `public/logo.svg` o `public/logo.png`

## 📝 Todo List

- [ ] Analizzare elit-srl.it originale
- [ ] Estrarre colori brand esatti
- [ ] Replicare animazioni
- [ ] Aggiungere contenuti reali
- [ ] Ottimizzare immagini
- [ ] SEO optimization
- [ ] Testing responsive
- [ ] Deploy production

## 🎥 Video Reference

*In attesa dei video del sito originale per replicare le animazioni*

## 📞 Contatti

Per domande: info@elit-srl.it
