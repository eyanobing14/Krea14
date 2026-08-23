# Guide Admin — Mon Portfolio

Comment gérer votre portfolio via le panel d'administration.

## Accès

Rendez-vous sur `/admin` depuis votre site. Aucun mot de passe n'est requis (c'est un CMS client-side).

## Principe de fonctionnement

Toutes les modifications sont sauvegardées dans le **localStorage** de votre navigateur. Cela signifie :

- ✅ Les données persistent entre vos visites
- ✅ Aucun backend nécessaire
- ⚠️ Les données sont liées au navigateur / appareil
- ⚠️ Vider le navigateur = perte des données (pensez à exporter !)

## Structure des onglets

### 1. Profil

Gérez vos informations personnelles :

| Champ | Description |
|---|---|
| **Nom** | Votre nom complet |
| **Titre** | Votre spécialité (ex: "Graphic Designer · UI/UX") |
| **Tagline** | Slogan court affiché sur la page d'accueil |
| **Bio** | Description détaillée (page À propos) |
| **Photo** | Upload d'une photo de profil (affichée sur About) |
| **Email** | Adresse de contact |
| **Localisation** | Ville, pays |
| **Disponibilité** | Statut actuel (ex: "Disponible pour freelance") |

**Action** : Cliquez sur "Sauvegarder le profil" après modification.

### 2. Case Studies

Gérez vos études de cas / projets.

#### Ajouter un projet
1. Cliquez sur "+ Ajouter un case study"
2. Un nouvel item apparaît (fermé par défaut)
3. Cliquez sur l'en-tête pour l'ouvrir
4. Remplissez les champs
5. Cliquez sur "Sauver"

#### Champs disponibles

| Champ | Obligatoire | Description |
|---|---|---|
| **Titre** | ✅ | Nom du projet (ex: "Branding — Lumière Café") |
| **Slug** | ✅ | URL unique (ex: "branding-lumiere") |
| **Catégorie** | ✅ | Catégorie pour les filtres (ex: "Branding · Design Graphique") |
| **Année** | ✅ | Année de réalisation |
| **Description** | ✅ | Résumé court du projet |
| **Défi** | - | Le problème à résoudre |
| **Solution** | - | Votre approche et résultats |
| **Résultats** | - | Un résultat par ligne (ex: "+40% de visibilité") |
| **Tags** | - | Tags séparés par virgule |
| **Couleur hero** | - | Couleur d'arrière-plan du thumbnail |
| **Flow / Étapes** | - | Le processus de travail, étape par étape |
| **Images** | - | Photos du projet (upload multi-fichiers) |

#### Gérer les flows (étapes)
Le flow montre votre processus de travail sur la page détail du projet.

- **Ajouter** : Cliquez sur "+ Ajouter une étape"
- **Modifier** : Éditez le texte dans l'input
- **Supprimer** : Cliquez sur le × à droite de l'étape
- **Réordonner** : Modifiez l'ordre en réorganisant les inputs (les numéros se mettent à jour)

#### Gérer les images
- **Ajouter** : Cliquez sur "+ Ajouter des images" → sélectionnez vos fichiers
- **Supprimer** : Cliquez sur le × sur la thumbnail
- Les images sont stockées en base64 dans le JSON exporté

#### Supprimer un projet
1. Cliquez sur "Supprimer" dans l'en-tête
2. Confirmez dans le modal

### 3. Services

Gérez la liste de vos services.

| Champ | Description |
|---|---|
| **Titre** | Nom du service (ex: "UI/UX Design") |
| **ID** | Identifiant unique (ex: "uiux") |
| **Description** | Description du service |

## Exporter les données

### Export JSON
1. Cliquez sur "Exporter JSON ↓" en haut de la page
2. Un fichier `portfolio.json` est téléchargé
3. Remplacez le fichier dans `public/data/portfolio.json`
4. Reconstruisez le site : `npm run build`

Le JSON exporté contient **toutes** les données y compris les images en base64.

### Réinitialiser
1. Cliquez sur "Réinitialiser" en haut de la page
2. Confirmez dans le modal
3. Les données reviennent aux valeurs par défaut du fichier JSON

## Bonnes pratiques

1. **Exportez régulièrement** — Le localStorage peut être vidé par le navigateur
2. **Utilisez des slugs propres** — Minuscules, tirets, sans espaces ni caractères spéciaux
3. **Catégories cohérentes** — La première partie avant le `·` est utilisée comme filtre (ex: "Branding · Design Graphique" → filtre "Branding")
4. **Images optimisées** — Les images en base64 alourdissent le JSON. Préférez des images < 500KB
5. **Flow = processus** — Les étapes du flow sont affichées sur la page détail. Décrivez votre démarche de travail
6. **Sauvegardez avant de quitter** — Les modifications non sauvegardées (bouton "Sauver") sont perdues

## Structure du JSON

```json
{
  "profile": {
    "name": "Votre Nom",
    "title": "Graphic Designer · UI/UX",
    "tagline": "...",
    "bio": "...",
    "photo": "data:image/... (base64)",
    "email": "...",
    "location": "...",
    "availability": "...",
    "socials": { "dribbble": "...", "behance": "...", "github": "...", "linkedin": "..." }
  },
  "services": [
    { "id": "uiux", "title": "UI/UX Design", "description": "...", "icon": "layout" }
  ],
  "caseStudies": [
    {
      "slug": "mon-projet",
      "title": "Mon Projet",
      "category": "UI/UX · Mobile",
      "year": "2025",
      "heroColor": "#1a1a1a",
      "description": "...",
      "challenge": "...",
      "solution": "...",
      "results": ["Résultat 1", "Résultat 2"],
      "flow": ["Étape 1", "Étape 2", "Étape 3"],
      "tags": ["UI/UX", "Mobile"],
      "images": ["data:image/... (base64)"]
    }
  ],
  "resources": []
}
```

## Raccourcis clavier

Aucun raccourci n'est implémenté pour le moment. Tout se fait via l'interface graphique.
