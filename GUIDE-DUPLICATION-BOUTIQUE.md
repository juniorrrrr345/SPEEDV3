# 🚀 GUIDE COMPLET : DUPLIQUER LA BOUTIQUE

## 📋 PRÉPARATION

Avant de commencer, assurez-vous d'avoir :
- ✅ Un compte Cloudflare
- ✅ Un compte GitHub
- ✅ Un compte Vercel
- ✅ Node.js installé (v18 ou supérieur)
- ✅ L'accès au code source actuel

---

## ÉTAPE 1️⃣ : CRÉER UN NOUVEAU DÉPÔT GITHUB

### 1.1 Créer le dépôt
```bash
# Aller sur GitHub et créer un nouveau repository
# Nom suggéré : boutique-gd33-v2 (ou votre nom)
# Type : Private ou Public selon votre besoin
# NE PAS initialiser avec README, .gitignore ou license
```

### 1.2 Cloner le code actuel localement
```bash
# Si vous n'avez pas encore le code localement
git clone [URL_DU_REPO_ACTUEL]
cd [NOM_DU_DOSSIER]
```

### 1.3 Pousser vers le nouveau repository
```bash
# Ajouter le nouveau remote
git remote add nouveau https://github.com/VOTRE_USERNAME/NOUVEAU_NOM_REPO.git

# Pousser tout le code
git push nouveau main
# OU si vous êtes sur master :
git push nouveau master
```

---

## ÉTAPE 2️⃣ : CONFIGURER CLOUDFLARE D1 (BASE DE DONNÉES)

### 2.1 Installer Wrangler (si pas déjà fait)
```bash
npm install -g wrangler

# Se connecter à Cloudflare
wrangler login
```

### 2.2 Créer une nouvelle base de données D1
```bash
# Créer la base de données
wrangler d1 create boutique-gd33-v2

# ⚠️ IMPORTANT : Notez le database_id affiché !
# Exemple de sortie :
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2.3 Mettre à jour wrangler.toml
Ouvrez le fichier `wrangler.toml` et créez une nouvelle configuration :

```toml
name = "boutique-gd33-v2"  # Nouveau nom unique
main = "worker/index.js"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "production"

[[d1_databases]]
binding = "DB"
database_name = "boutique-gd33-v2"  # Nom de votre DB
database_id = "COLLEZ_ICI_LE_DATABASE_ID"  # ID de l'étape 2.2

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "boutique-gd33-v2-media"  # Nouveau nom pour R2
```

### 2.4 Créer les tables dans D1
```bash
# Exécuter le schéma de base de données
wrangler d1 execute boutique-gd33-v2 --file=worker/schema.sql

# Vérifier que les tables sont créées
wrangler d1 execute boutique-gd33-v2 --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## ÉTAPE 3️⃣ : CONFIGURER CLOUDFLARE R2 (STOCKAGE MÉDIAS)

### 3.1 Créer le bucket R2
```bash
# Créer le bucket pour les médias
wrangler r2 bucket create boutique-gd33-v2-media
```

### 3.2 Configurer le CORS pour R2
```bash
# Créer un fichier cors.json temporaire
cat > cors-config.json << 'EOF'
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
EOF

# Appliquer la configuration CORS
wrangler r2 bucket cors boutique-gd33-v2-media --config cors-config.json

# Supprimer le fichier temporaire
rm cors-config.json
```

---

## ÉTAPE 4️⃣ : DÉPLOYER LE WORKER CLOUDFLARE

### 4.1 Tester localement (optionnel)
```bash
# Tester le worker en local
wrangler dev
```

### 4.2 Déployer le Worker
```bash
# Déployer sur Cloudflare
wrangler deploy

# ⚠️ IMPORTANT : Notez l'URL du Worker !
# Exemple : https://boutique-gd33-v2.VOTRE_SUBDOMAIN.workers.dev
```

### 4.3 Récupérer l'URL du Worker
```bash
# Si vous avez oublié l'URL :
wrangler deployments list
```

---

## ÉTAPE 5️⃣ : CRÉER L'UTILISATEUR ADMIN

### 5.1 Générer le hash du mot de passe
```bash
# Installer bcryptjs si nécessaire
npm install bcryptjs

# Créer un script temporaire pour hasher le mot de passe
node -e "console.log(require('bcryptjs').hashSync('VotreMotDePasse123!', 10))"

# ⚠️ GARDEZ CE HASH PRÉCIEUSEMENT !
```

### 5.2 Insérer l'utilisateur admin
```bash
# Remplacez PASSWORD_HASH par le hash de l'étape 5.1
wrangler d1 execute boutique-gd33-v2 --command="
INSERT INTO users (username, password, role, created_at) 
VALUES ('admin', 'PASSWORD_HASH_ICI', 'admin', datetime('now'));"

# Vérifier que l'utilisateur est créé
wrangler d1 execute boutique-gd33-v2 --command="SELECT * FROM users;"
```

---

## ÉTAPE 6️⃣ : CONFIGURER LES SETTINGS INITIAUX

```bash
# Créer les paramètres par défaut
wrangler d1 execute boutique-gd33-v2 --command="
INSERT INTO settings (key, value) VALUES 
('siteName', 'Ma Boutique'),
('siteDescription', 'Boutique en ligne'),
('orderLink', 'https://wa.me/VOTRE_NUMERO'),
('orderButtonText', 'Commander sur WhatsApp'),
('maintenanceMode', 'false');"

# Vérifier
wrangler d1 execute boutique-gd33-v2 --command="SELECT * FROM settings;"
```

---

## ÉTAPE 7️⃣ : DÉPLOYER SUR VERCEL

### 7.1 Se connecter à Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Importez votre nouveau repository GitHub

### 7.2 Configurer les variables d'environnement
Dans les paramètres Vercel, ajoutez :

```
VITE_API_URL=https://boutique-gd33-v2.VOTRE_SUBDOMAIN.workers.dev
```

⚠️ **IMPORTANT** : Remplacez par l'URL de votre Worker (étape 4.2)

### 7.3 Configurer le Build
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 7.4 Déployer
Cliquez sur "Deploy" et attendez que le déploiement se termine.

---

## ÉTAPE 8️⃣ : CONFIGURER LE CORS DU WORKER

### 8.1 Vérifier le domaine Vercel
Notez votre URL Vercel : `https://VOTRE_APP.vercel.app`

### 8.2 Mettre à jour le Worker si nécessaire
Dans `worker/index.js`, vérifiez que le CORS accepte votre domaine :

```javascript
// Ligne environ 15-20
const allowedOrigins = [
  'http://localhost:5173',
  'https://VOTRE_APP.vercel.app',  // Ajoutez votre domaine
  // Autres domaines...
];
```

### 8.3 Redéployer si modifications
```bash
wrangler deploy
```

---

## ÉTAPE 9️⃣ : TESTER LA BOUTIQUE

### 9.1 Vérifier l'accès
1. Ouvrez `https://VOTRE_APP.vercel.app`
2. La page d'accueil doit s'afficher

### 9.2 Tester la connexion admin
1. Allez sur `https://VOTRE_APP.vercel.app/admin/login`
2. Connectez-vous avec :
   - Username : `admin`
   - Mot de passe : celui que vous avez utilisé à l'étape 5.1

### 9.3 Vérifier les API
```bash
# Tester l'endpoint de santé
curl https://boutique-gd33-v2.VOTRE_SUBDOMAIN.workers.dev/health

# Doit retourner : {"status":"ok"}
```

---

## ÉTAPE 🔟 : MIGRER LES DONNÉES (OPTIONNEL)

Si vous voulez copier les données de l'ancienne boutique :

### 10.1 Exporter les données de l'ancienne DB
```bash
# Remplacez NOM_ANCIENNE_DB par le nom de votre ancienne base
wrangler d1 export NOM_ANCIENNE_DB --output=export-ancienne-boutique.sql
```

### 10.2 Adapter et importer
⚠️ **ATTENTION** : Vérifiez que les IDs ne causent pas de conflits !

```bash
# Importer dans la nouvelle DB
wrangler d1 execute boutique-gd33-v2 --file=export-ancienne-boutique.sql
```

---

## ✅ CHECKLIST FINALE

Cochez chaque étape :

- [ ] ✅ Nouveau repository GitHub créé et code poussé
- [ ] ✅ Base de données D1 créée
- [ ] ✅ Tables créées dans D1
- [ ] ✅ Bucket R2 créé et CORS configuré
- [ ] ✅ Worker déployé et URL notée
- [ ] ✅ Utilisateur admin créé
- [ ] ✅ Settings initiaux configurés
- [ ] ✅ Application déployée sur Vercel
- [ ] ✅ Variable d'environnement VITE_API_URL configurée
- [ ] ✅ Connexion admin testée et fonctionnelle
- [ ] ✅ Upload d'images testé
- [ ] ✅ Création de produits testée

---

## 🆘 EN CAS DE PROBLÈME

### Problème : Le Worker ne répond pas
```bash
# Vérifier les logs
wrangler tail boutique-gd33-v2

# Vérifier le statut
wrangler deployments list
```

### Problème : CORS errors
- Vérifiez que l'URL Vercel est dans les origines autorisées du Worker
- Vérifiez que VITE_API_URL est correct dans Vercel

### Problème : Impossible de se connecter en admin
```bash
# Vérifier que l'utilisateur existe
wrangler d1 execute boutique-gd33-v2 --command="SELECT * FROM users;"

# Recréer l'utilisateur si nécessaire (voir étape 5)
```

### Problème : Les images ne s'uploadent pas
- Vérifiez que le bucket R2 existe
- Vérifiez la configuration CORS du bucket
- Vérifiez que le binding R2 est correct dans wrangler.toml

---

## 📞 INFORMATIONS IMPORTANTES À NOTER

**Notez ces informations dans un endroit sûr :**

1. **Database ID D1** : `____________________________`
2. **Bucket R2 Name** : `____________________________`
3. **Worker URL** : `____________________________`
4. **Vercel URL** : `____________________________`
5. **Username Admin** : `____________________________`
6. **Password Admin** : `____________________________`

---

## 🎉 PROCHAINES ÉTAPES

Une fois la boutique dupliquée :

1. 🎨 Personnaliser le design dans `/src/index.css`
2. 📱 Ajouter vos réseaux sociaux dans l'admin
3. 🏪 Créer vos catégories
4. 🌾 Ajouter vos farms
5. 📦 Ajouter vos produits
6. 🔗 Configurer le lien de commande WhatsApp
7. 🌐 (Optionnel) Configurer un domaine personnalisé sur Vercel

---

**Bon courage ! 🚀**

Si vous avez des questions à n'importe quelle étape, n'hésitez pas à demander !
