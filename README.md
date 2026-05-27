# MedAnatomy — Clinical Anatomy Study Platform

A comprehensive, medically accurate anatomy study application for medical school students. Covers cranial nerves (CN I–XII), muscles (OIAN + clinical), brachial plexus, mnemonics, MCQ quiz, flashcards, and full-text search.

---

## Features

| Module | Details |
|---|---|
| **Cranial Nerves** | All 12 CNs with fiber types, nuclei, ganglia, foramina, functions, clinical correlations, mnemonics, embryology, and test methods |
| **Muscles** | 20+ muscles across all regions with full OIAN, nerve roots, blood supply, clinical notes, and special tests |
| **Flashcards** | 3D flip card mode with deck filtering and known/review tracking |
| **Quiz** | 12 high-yield MCQs with full explanations and score tracking |
| **Mnemonics** | 15+ curated memory aids across all anatomy topics |
| **Search** | Full-text search across all content |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally (no Supabase needed)

```bash
npm run dev
```

The app works completely offline with local data files. Supabase is optional.

### 3. Build for production

```bash
npm run build
```

---

## Supabase Integration (Optional)

The app includes a complete Supabase migration for persistent user progress tracking and server-side data.

### Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations in order:
   ```
   supabase/01_schema.sql   — Tables, indexes, RLS policies
   supabase/02_seed_data.sql — All anatomy content
   ```
3. Copy `.env.example` to `.env` and fill in your keys:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart the dev server.

When Supabase is connected, the app can store user progress (flashcard known/review status, quiz scores) per authenticated user.

---

## Project Structure

```
medanatomy/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── supabaseClient.js
│   ├── styles/
│   │   └── index.css          — Full design system (dark clinical theme)
│   ├── data/
│   │   ├── cranialNerves.js   — CN I–XII comprehensive data
│   │   ├── muscles.js         — Muscles with OIAN + clinical
│   │   └── mnemonics.js       — Mnemonics + quiz questions
│   └── components/
│       ├── Sidebar.jsx
│       ├── Dashboard.jsx
│       ├── CranialNervesView.jsx
│       ├── MusclesView.jsx
│       ├── FlashcardMode.jsx
│       ├── QuizMode.jsx
│       ├── MnemonicsView.jsx
│       └── SearchView.jsx
└── supabase/
    ├── 01_schema.sql          — Database schema + RLS
    └── 02_seed_data.sql       — All content as SQL inserts
```

---

## Data Coverage

### Cranial Nerves (CN I–XII)
Every nerve includes:
- Fiber type classification (GSE, GVE, SVE, GSA, GVA, SSA, SVA)
- All nuclei and ganglia
- Skull exit foramina
- Origin and full peripheral distribution
- Complete function list
- 2–8 clinical correlations per nerve (lesion presentations, special syndromes)
- Mnemonic
- Embryological origin
- Clinical testing method

**High-yield clinical points included:**
- CN III pupil rule (surgical vs medical palsy)
- CN IV Bielschowsky tilt test
- CN VI as false localizing sign
- CN VII lesion localization schema (above/below chorda tympani, geniculate ganglion)
- CN VIII HINTS exam, Weber/Rinne
- CN IX glossopharyngeal neuralgia, carotid sinus syndrome
- CN X RLN palsy (left vs right course), uvula deviation rule
- CN XI neck dissection complications
- CN XII LMN vs UMN tongue deviation

### Muscles
Each entry includes:
- Precise origin and insertion
- All actions
- Nerve + root values
- Blood supply
- Clinical correlations (injury, tests, syndromes)
- Special clinical tests (named)

**Regions covered:** Rotator cuff, arm, shoulder, gluteal, hip flexors, thigh, leg, neck, thorax, abdomen

### Mnemonics
Categories: Cranial Nerves, Shoulder, Wrist, Elbow, Hip, Brachial Plexus, Lower Limb, Thorax, Abdomen, Head and Neck, Upper Limb, Spinal Cord

### Quiz (MCQ)
12 questions covering: CN III palsy, CN VII localization, Erb's palsy, AIN syndrome, Trendelenburg, Wallenberg, Brown-Séquard, RLN anatomy, chest drain VAN rule, suprascapular nerve entrapment, axillary nerve injury, DJ flexure.

---

## Tech Stack

- **React 18** + **Vite 5**
- **@supabase/supabase-js** ^2.39.0
- **lucide-react** ^0.383.0
- Fonts: DM Serif Display, DM Mono, Instrument Sans (Google Fonts)

---

## Design

Dark clinical precision theme:
- Background: deep navy (`#0a0f1e`)
- Accent: surgical teal (`#00d4a8`)
- Typography: serif headings, monospace labels
- 3D CSS flashcard flip animation
- Responsive sidebar (collapsible)
