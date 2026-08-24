# Guide Admin — Krea14 Portfolio

Comment lancer le site et gérer votre portfolio via le panel d'administration.

---

## 🚀 Lancement du serveur

Le projet utilise **deux serveurs** qui tournent ensemble :

| Serveur | Port | Rôle |
|---|---|---|
| **Astro** (front-end) | `4321` | Le site vitrine, pages statiques |
| **Node API** (back-end) | `4200` | API pour admin, upload d'images, git |

### Commande unique (recommandée)

```bash
npm run dev:admin
```

Cela lance Astro + le serveur Node en parallèle via `concurrently`.

### Lancer séparément

```bash
# Terminal 1 — Site vitrine
npm run dev

# Terminal 2 — API admin (obligatoire pour l'admin)
npm run server
```

> ⚠️ **L'admin ne fonctionne pas sans le serveur Node.** Si vous voyez "Erreur" ou les données ne se sauvegardent pas, vérifiez que `server.js` tourne sur le port 4200.

### Construire pour la production

```bash
npm run build      # Génère le site dans /dist
npm run preview    # Prévisualise la version buildée
```

---

## 🔧 Fonctionnement

### Principe

L'admin (`/admin`) communique avec le serveur Node via des API REST :

| Endpoint | Méthode | Rôle |
|---|---|---|
| `/api/read-data` | POST | Lit `public/data/portfolio.json` |
| `/api/save-data` | POST | Écrit dans `portfolio.json` |
| `/api/reset-data` | POST | Recharge les données depuis le fichier |
| `/api/upload-image` | POST | Upload une image dans `public/assets/` |
| `/api/git-info` | POST | Info branche, remote, modifications |
| `/api/git-commit` | POST | `git add -A && git commit` |
| `/api/git-push` | POST | `git push origin <branche>` |

### Données

Toutes les données du portfolio sont dans un seul fichier : **`public/data/portfolio.json`**

- Les modifications via l'admin écrivent directement dans ce fichier
- Les images uploadées vont dans **`public/assets/`**
- Les images sont enregistrées en base64 dans le JSON exporté

---

## 📋 Onglets de l'admin

### 1. Profil

| Champ | Description |
|---|---|
| **Nom** | Votre nom complet |
| **Titre** | Spécialité (ex: "Graphic Designer · UI/UX") |
| **Tagline** | Slogan page d'accueil |
| **Bio** | Description (page À propos) |
| **Photo de profil** | Upload image (page À propos) |
| **Email** | Contact |
| **Localisation** | Pays / ville |
| **Disponibilité** | Statut actuel |
| **WhatsApp** | Numéro avec indicatif pays |

→ Cliquez sur **"Sauvegarder le profil"** après modification.

### 2. Case Studies (Projets)

#### Ajouter un projet
1. **"+ Ajouter un case study"** en bas de la liste
2. Cliquez sur l'en-tête pour ouvrir le formulaire
3. Remplissez les champs
4. **"Sauver"** pour valider

#### Champs

| Champ | Obligatoire | Description |
|---|---|---|
| **Titre** | ✅ | Nom du projet |
| **Slug** | ✅ | URL unique (minuscules, tirets) |
| **Catégorie** | ✅ | Catégorie principale pour filtres |
| **Sous-catégorie** | - | Sous-type (Flyer, Carrousel, Mobile…) |
| **Année** | ✅ | Année de réalisation |
| **Description** | ✅ | Résumé court |
| **Défi** | - | Le problème à résoudre |
| **Solution** | - | Votre approche |
| **Résultats** | - | Un par ligne |
| **Tags** | - | Séparés par virgule |
| **Couleur hero** | - | Fond du thumbnail |

#### Images (2 emplacements)

| Image | Format | Utilisation |
|---|---|---|
| **Thumbnail** | 4:3 | Cartes page d'accueil |
| **Hero** | 16:9 | Page Work + détail projet |

> Les images de galerie ont été retirées. Seuls Thumbnail et Hero sont nécessaires.

#### Flow (Étapes du processus)

Chaque étape contient :
- **Texte** : Description de l'étape (textarea)
- **Image optionnelle** : Photo d'illustration (bouton "Ajouter une image")
- **Bouton ×** : Supprimer l'étape

→ Le flow est affiché sur la page détail de chaque projet.

### 3. Services

| Champ | Description |
|---|---|
| **Titre** | Nom du service (ex: "UI/UX Design") |
| **ID** | Identifiant unique |
| **Description** | Description du service |

### 4. Légal

#### Informations légales
- Nom d'entreprise, email, juridiction, monnaie ($)
- Conditions de paiement, politique de remboursement

#### Grille tarifaire
Prix min/max par catégorie de service (Branding, UI/UX, Frontend, Logo, Autre, Taux horaire).

#### Contenu des pages légales
- Politique de confidentialité
- Conditions générales

---

## 🔀 Git intégré

L'admin intègre des boutons **Commit** et **Push** pour sauvegarder directement via Git.

### Commit
1. Cliquez sur **"Commit"**
2. Entrez le message de commit
3. Validez — les logs s'affichent en temps réel

### Push
1. Cliquez sur **"Push"**
2. Le commit est fait automatiquement puis le push suit
3. Les logs montrent les deux étapes

### Infos affichées
- Branche active
- Nombre de fichiers modifiés
- Remote configuré
- Utilisateur Git

---

## 📦 Exporter / Réinitialiser

| Action | Description |
|---|---|
| **Exporter** | Télécharge le `portfolio.json` complet |
| **Réinitialiser** | Recharge les données depuis le fichier disque |

---

## ⚡ Bonnes pratiques

1. **Slugs propres** — Minuscules, tirets, sans espaces ni accents
2. **Catégories** — La première partie avant `·` sert de filtre
3. **Images < 500KB** — Évitez d'alourdir le JSON
4. **Sauvegardez avant de quitter** — Le bouton "Sauver" est obligatoire
5. **Commit régulièrement** — Utilisez les boutons intégrés pour ne pas perdre de travail
6. **WhatsApp** — Le numéro complet est formaté automatiquement (ex: `25761729788`)

---

## 🛠 Dépannage

| Problème | Solution |
|---|---|
| Admin affiche "Erreur" | Vérifiez que `npm run server` tourne (port 4200) |
| Images non affichées | Vérifiez que les fichiers existent dans `public/assets/` |
| Données perdues | Utilisez "Réinitialiser" ou restaurez le `portfolio.json` |
| Push échoue | Vérifiez `git remote -v` et la connexion réseau |
| Site ne build pas | Lancez `npm run build` et vérifiez les erreurs |
