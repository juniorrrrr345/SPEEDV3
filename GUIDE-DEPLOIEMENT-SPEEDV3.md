# 🚀 Guide de Déploiement SPEEDV3

## ✅ Étapes Automatiques Complétées

Les fichiers suivants ont été configurés automatiquement :

- ✅ Dépôt cloné et remote configuré vers `https://github.com/juniorrrrr345/speedv3.git`
- ✅ `wrangler.toml` mis à jour avec les noms SPEEDV3
- ✅ `worker/index.js` préparé pour l'URL R2
- ✅ `.dev.vars` créé avec les identifiants admin par défaut
- ✅ `.env.local` créé avec le template d'API URL

---

## 🔴 ÉTAPES MANUELLES REQUISES

### 1️⃣ Connexion à Cloudflare et Création de la Base D1

```bash
# Se connecter à Cloudflare (nécessite un navigateur)
npx wrangler login

# Créer la base de données D1
npx wrangler d1 create SPEEDV3

# ⚠️ IMPORTANT : Copiez le database_id qui s'affiche !
# Il ressemble à : xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Action requise :**
Après avoir obtenu le `database_id`, éditez le fichier `wrangler.toml` :

```toml
# Ligne 9 : Remplacez VOTRE-DATABASE-ID-ICI par votre vrai database_id
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

---

### 2️⃣ Création du Bucket R2

```bash
# Créer le bucket R2
npx wrangler r2 bucket create SPEEDV3
```

**Configuration de l'accès public :**

1. Allez sur le dashboard Cloudflare : https://dash.cloudflare.com
2. Naviguez vers R2 → Votre bucket "SPEEDV3"
3. Cliquez sur "Settings" → "Public Access"
4. Activez l'accès public
5. **Copiez l'URL publique** qui ressemble à : `https://pub-XXXXXXXXX.r2.dev/`

**Action requise :**
Éditez le fichier `worker/index.js` ligne 732 :

```javascript
// Remplacez VOTRE-URL-R2 par votre vraie URL (sans le https://)
const url = `https://pub-XXXXXXXXX.r2.dev/${filename}`
```

---

### 3️⃣ Configuration des Secrets de Production

```bash
# Configurer le nom d'utilisateur admin
npx wrangler secret put DEFAULT_ADMIN_USERNAME
# Tapez : admin

# Configurer le mot de passe admin
npx wrangler secret put DEFAULT_ADMIN_PASSWORD
# Tapez : SpeedV3Admin123
# (ou choisissez votre propre mot de passe sécurisé)
```

---

### 4️⃣ Déploiement du Worker

```bash
# Déployer le worker sur Cloudflare
npx wrangler deploy

# ⚠️ IMPORTANT : Notez l'URL du worker qui s'affiche !
# Elle ressemble à : https://SPEEDV3.VOTRE-USERNAME.workers.dev
```

**Action requise :**
Éditez le fichier `.env.local` avec l'URL de votre worker :

```env
VITE_API_URL=https://SPEEDV3.VOTRE-USERNAME.workers.dev
```

---

### 5️⃣ Initialisation de la Base de Données

```bash
# Remplacez VOTRE-URL-WORKER par l'URL obtenue à l'étape précédente
curl https://SPEEDV3.VOTRE-USERNAME.workers.dev/api/init
```

**Réponse attendue :**
```json
{"success":true,"message":"Database initialized"}
```

---

### 6️⃣ Test en Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez votre navigateur sur `http://localhost:5173`

---

### 7️⃣ Déploiement sur Vercel

1. **Poussez le code sur GitHub :**
   ```bash
   git add .
   git commit -m "Configuration initiale SPEEDV3"
   git push -u origin main
   ```

2. **Sur Vercel :**
   - Allez sur https://vercel.com
   - Cliquez sur "Add New Project"
   - Importez le dépôt `speedv3`
   - **Configurez la variable d'environnement :**
     - Clé : `VITE_API_URL`
     - Valeur : `https://SPEEDV3.VOTRE-USERNAME.workers.dev`
     - ✅ Cochez : Production, Preview, Development
   - Cliquez sur "Deploy"

3. **Notez l'URL Vercel** qui ressemble à : `https://speedv3.vercel.app`

---

### 8️⃣ Configuration Initiale de la Boutique

1. Allez sur `https://votre-site.vercel.app/admin/login`
2. Connectez-vous avec :
   - **Utilisateur :** `admin`
   - **Mot de passe :** `SpeedV3Admin123` (ou celui que vous avez choisi)
3. Configurez :
   - ⚙️ **Settings** : Nom de la boutique, description, etc.
   - 👥 **Socials** : Liens réseaux sociaux
   - 📁 **Categories** : Catégories de produits
   - 🏪 **Farms** : Vos points de vente
   - 🛍️ **Products** : Vos produits

---

## 📋 Checklist Finale

- [ ] Base D1 créée et `database_id` copié dans `wrangler.toml`
- [ ] Bucket R2 créé et URL publique copiée dans `worker/index.js`
- [ ] Secrets configurés (`DEFAULT_ADMIN_USERNAME` et `DEFAULT_ADMIN_PASSWORD`)
- [ ] Worker déployé et URL notée
- [ ] `/api/init` appelé avec succès
- [ ] `.env.local` mis à jour avec l'URL du worker
- [ ] Code poussé sur GitHub
- [ ] Variable `VITE_API_URL` configurée sur Vercel
- [ ] Site Vercel déployé et accessible
- [ ] Connexion admin réussie
- [ ] Boutique configurée (nom, catégories, produits, etc.)

---

## 🔐 Identifiants par Défaut

**Admin :**
- Utilisateur : `admin`
- Mot de passe : `SpeedV3Admin123`

⚠️ **Changez ces identifiants après la première connexion !**

---

## 🆘 En Cas de Problème

### Worker ne se déploie pas
```bash
# Vérifiez votre authentification
npx wrangler whoami

# Vérifiez la configuration
cat wrangler.toml
```

### Base de données non initialisée
```bash
# Réessayez l'initialisation
curl -X POST https://SPEEDV3.VOTRE-USERNAME.workers.dev/api/init
```

### Vercel affiche une erreur
- Vérifiez que `VITE_API_URL` est bien configuré
- Vérifiez que le worker est déployé et accessible
- Regardez les logs Vercel pour plus de détails

---

## 📦 Résumé des URLs

| Service | URL | Statut |
|---------|-----|--------|
| GitHub | https://github.com/juniorrrrr345/speedv3.git | ✅ Configuré |
| Worker Cloudflare | https://SPEEDV3.VOTRE-USERNAME.workers.dev | ⏳ À déployer |
| R2 Bucket | https://pub-XXXXXXXXX.r2.dev/ | ⏳ À créer |
| Site Vercel | https://speedv3.vercel.app | ⏳ À déployer |

---

## 🎉 C'est Terminé !

Une fois toutes les étapes complétées, votre boutique SPEEDV3 sera :
- ✅ Complètement isolée de THEGD33V3
- ✅ Déployée sur Cloudflare Workers
- ✅ Accessible via Vercel
- ✅ Prête à recevoir vos produits et commandes

**Bonne vente ! 🛒**
