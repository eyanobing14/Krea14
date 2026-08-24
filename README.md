# Krea14 — Portfolio

Site portfolio professionnel pour designer graphique, UI/UX, développement frontend et logo design.

## Stack technique

| Technologie | Rôle |
|---|---|
| **Astro** | Framework SSG — génération statique, islands architecture |
| **Tailwind CSS** | Styling utility-first, design system monochrome |
| **GSAP** | Animations scroll, parallax, text reveals |
| **TypeScript** | Type safety, détection d'erreurs au build |
| **localStorage** | CMS sans backend via admin |
| **JSON** | `public/data/portfolio.json` comme source de vérité |

## Structure

```
├── public/data/portfolio.json    # Données (profil, case studies, services, légal)
├── src/
│   ├── components/
│   │   ├── Header.astro          # Nav responsive + menu mobile + toggle FR/EN
│   │   ├── Footer.astro          # Footer avec liens légal
│   │   ├── ImpactSection.astro   # Dropdowns illustrés (impact)
│   │   ├── ThinkingStyles.astro  # Dropdowns illustrés (façons de penser)
│   │   ├── OrbitalSkills.astro   # Système orbital animé
│   │   └── ThemeToggle.astro     # Toggle dark/light
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro           # Accueil (hero, work, services, orbital, CTA)
│   │   ├── about.astro           # Bio, marquee, impact, thinking, orbital, CTA
│   │   ├── work/index.astro      # Liste projets avec filtres catégorie/sous-catégorie
│   │   ├── work/[slug].astro     # Détail case study
│   │   ├── contact.astro         # Formulaire contact
│   │   ├── admin.astro           # Panel admin (CRUD sans backend)
│   │   └── legal/                # Pages légales
│   │       ├── privacy.astro
│   │       └── terms.astro
│   ├── translations.ts           # Dictionnaire FR→EN (120+ entrées)
│   └── styles/global.css
```

## Fonctionnalités

### Design
- Thème dark/light avec tokens CSS
- Curseur custom Awwwards-style (dot + ring + glow)
- Typographie : Space Grotesk + JetBrains Mono
- Palette monochrome noir/blanc/gris

### Internationalisation (FR/EN)
- Toggle FR/EN dans la nav (desktop + mobile)
- `data-fr`/`data-en` sur les éléments dynamiques
- TreeWalker qui traduit tous les nœuds texte
- 120+ traductions dans `src/translations.ts`

### Pages
- **Accueil** : hero scroll, featured work, services animés, orbital, CTA
- **Work** : filtres catégorie/sous-catégorie, hover overlay
- **Détail** : défi, solution, flow/étapes, résultats
- **About** : photo, marquee, dropdowns illustrés, orbital
- **Contact** : formulaire avec type/budget
- **Admin** : profil, case studies, services, légal, WhatsApp
- **Légal** : confidentialité + CGV (personnalisables)

### Admin (`/admin`)
- Profil : nom, titre, bio, email, WhatsApp (sélecteur pays)
- Case Studies : CRUD avec catégories/sous-catégories
- Services : CRUD
- Legal : édition CGV + confidentialité + tarifs
- Export JSON

## Démarrage

```bash
bun install
bun run dev
```

Le site est accessible sur `http://localhost:4323`.

## Déploiement

```bash
bun run build
```

Le dossier `dist/` contient les fichiers statiques prêts à déployer.
