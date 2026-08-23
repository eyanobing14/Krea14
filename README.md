# Portfolio — Mon Portfolio

Site portfolio personnel pour un graphic designer, UI/UX designer, frontend developer et logo designer.

## Stack technique

| Technologie | Rôle | Pourquoi |
|---|---|---|
| **Astro** | Framework SSG | Génération statique ultra-rapide, zero JS par défaut, islands architecture pour l'interactivité au besoin |
| **Tailwind CSS v4** | Styling | Utility-first, design system monochrome cohérent, purge automatique |
| **GSAP** | Animations | ScrollTrigger, animations fluides, parallax, text reveals — performance supérieure aux animations CSS |
| **TypeScript** | Langage | Type safety, meilleure DX, détection d'erreurs au build |
| **localStorage** | CMS sans backend | Les données du portfolio (case studies, profil, services) sont éditable via un admin et persistées dans le navigateur |
| **JSON** | Data layer | Fichier `public/data/portfolio.json` comme source de vérité, exportable depuis l'admin |

## Structure du projet

```
├── public/
│   └── data/
│       └── portfolio.json      # Données du portfolio (projet, études de cas, services)
├── src/
│   ├── components/
│   │   ├── Header.astro        # Navigation responsive + burger mobile
│   │   ├── Footer.astro        # Footer minimaliste
│   │   ├── ThemeToggle.astro   # Toggle dark/light (multi-instances)
│   │   ├── LiquidCursor.astro  # Curseur custom Awwwards-style (dot + ring + glow)
│   │   ├── GSAPSetup.astro     # Orchestrateur d'animations GSAP
│   │   ├── ScrollReveal.astro  # Fallback IntersectionObserver
│   │   ├── CharacterSplit.astro
│   │   └── Marquee.astro       # Bande défilante GSAP
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal (head, cursor, GSAP, theme)
│   ├── pages/
│   │   ├── index.astro         # Accueil (hero scroll horizontal, featured work, services)
│   │   ├── work/
│   │   │   ├── index.astro     # Liste des projets avec filtres par catégorie
│   │   │   └── [slug].astro    # Détail d'un case study (défi → flow → résultats)
│   │   ├── about.astro         # Bio, services, photo de profil
│   │   ├── contact.astro       # Formulaire de contact
│   │   └── admin.astro         # Panel d'administration (CRUD sans backend)
│   └── styles/
│       └── global.css          # Design system monochrome + tokens dark/light + admin CSS
```

## Fonctionnalités

### Design
- **Thème dark/light** avec tokens CSS et transition fluide
- **Curseur custom** Awwwards-style : dot (8px) + ring (44px) + glow blob (300px)
  - Le glow change de couleur selon le thème (blanc sur dark, noir sur light)
  - Effet magnétique au hover sur les éléments interactifs
- **Typographie** : Space Grotesk (display/body) + JetBrains Mono (code/labels)
- **Palette monochrome** : noir, blanc, gris — aucun couleur

### Animations GSAP
- Hero texte défilant horizontal (marquee CSS infini)
- Scroll reveals (fade up, slide left/right, scale, stagger)
- Parallax sur les backgrounds
- Counter animations sur les métriques
- Code block clip reveals

### Admin (`/admin`)
- **Profil** : nom, titre, bio, email, photo de profil (upload base64)
- **Case Studies** : CRUD complet avec flows/étapes, images, tags, couleurs
- **Services** : CRUD simple
- **Filtres** : catégories auto-extraites des données
- **Export JSON** : télécharge le fichier mis à jour
- **Modals** : confirmation de suppression avec backdrop blur
- **localStorage** : persistance sans backend, reset possible

### Pages
- **Accueil** : hero avec texte scrollant, projets featured, services, CTA
- **Work** : grille avec filtres par catégorie + hover overlay
- **Détail case study** : défi, solution, flow/étapes, résultats
- **About** : bio, photo, services, réseaux sociaux
- **Contact** : formulaire avec type de projet et budget

## Démarrage

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:4323`.

## Déploiement

```bash
npm run build
```

Le dossier `dist/` contient les fichiers statiques prêts à déployer (Vercel, Netlify, GitHub Pages, etc.).
