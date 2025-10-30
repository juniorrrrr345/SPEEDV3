# 🚀 SPEEDV3 - Instance E-Commerce

Bienvenue dans votre nouvelle instance e-commerce **SPEEDV3** !

## 📌 À Propos

Cette instance est une copie indépendante de THEGD33V3, configurée pour fonctionner de manière totalement isolée avec :
- ✅ Sa propre base de données Cloudflare D1
- ✅ Son propre bucket R2 pour les médias
- ✅ Son propre Worker Cloudflare
- ✅ Son propre déploiement Vercel

## 🎯 Démarrage Rapide

**📖 Consultez le guide complet de déploiement :** [`GUIDE-DEPLOIEMENT-SPEEDV3.md`](./GUIDE-DEPLOIEMENT-SPEEDV3.md)

### Résumé des Étapes

1. **Cloudflare :** Créer la base D1 et le bucket R2
2. **Configuration :** Mettre à jour les IDs dans les fichiers
3. **Secrets :** Configurer les mots de passe admin
4. **Déploiement :** Déployer le worker et le frontend
5. **Initialisation :** Créer les tables de base de données
6. **Administration :** Configurer votre boutique

## 🔧 Configuration Actuelle

### Fichiers Configurés

| Fichier | Status | Notes |
|---------|--------|-------|
| `wrangler.toml` | ⚠️ Partiellement | Nécessite `database_id` réel |
| `worker/index.js` | ⚠️ Partiellement | Nécessite URL R2 réelle |
| `.dev.vars` | ✅ Prêt | Identifiants admin configurés |
| `.env.local` | ⚠️ Partiellement | Nécessite URL worker réelle |
| `.gitignore` | ✅ Sécurisé | Fichiers sensibles exclus |

### Identifiants par Défaut

- **Utilisateur :** `admin`
- **Mot de passe :** `SpeedV3Admin123`

⚠️ **Changez ces identifiants après la première connexion !**

## 📂 Structure du Projet

```
/workspace/
├── worker/              # Cloudflare Worker (Backend API)
│   ├── index.js        # Point d'entrée du worker
│   └── schema.sql      # Schéma de base de données
├── src/                # Frontend React
│   ├── components/     # Composants UI
│   ├── pages/          # Pages de l'application
│   └── utils/          # Utilitaires (API, storage)
├── wrangler.toml       # Configuration Cloudflare
├── .dev.vars           # Variables de développement (secrets)
├── .env.local          # Configuration frontend
└── package.json        # Dépendances Node.js
```

## 🔗 URLs de Production (À Compléter)

| Service | URL | Statut |
|---------|-----|--------|
| **Worker API** | `https://SPEEDV3.[username].workers.dev` | ⏳ À déployer |
| **Site Web** | `https://speedv3.vercel.app` | ⏳ À déployer |
| **Admin** | `https://speedv3.vercel.app/admin/login` | ⏳ À déployer |
| **Bucket R2** | `https://pub-[id].r2.dev/` | ⏳ À créer |

## 🛠️ Commandes Utiles

### Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

### Cloudflare Worker

```bash
# Se connecter à Cloudflare
npx wrangler login

# Créer la base D1
npx wrangler d1 create SPEEDV3

# Créer le bucket R2
npx wrangler r2 bucket create SPEEDV3

# Déployer le worker
npx wrangler deploy

# Configurer les secrets
npx wrangler secret put DEFAULT_ADMIN_USERNAME
npx wrangler secret put DEFAULT_ADMIN_PASSWORD
```

### Initialisation de la Base

```bash
# Initialiser les tables (remplacez par votre URL worker)
curl https://SPEEDV3.[username].workers.dev/api/init
```

## 📋 Checklist de Configuration

- [ ] Authentification Cloudflare (`npx wrangler login`)
- [ ] Base D1 créée et `database_id` copié
- [ ] Bucket R2 créé et rendu public
- [ ] URL R2 copiée et mise dans `worker/index.js`
- [ ] `wrangler.toml` mis à jour avec le vrai `database_id`
- [ ] Secrets configurés pour la production
- [ ] Worker déployé avec succès
- [ ] Base de données initialisée (`/api/init`)
- [ ] `.env.local` mis à jour avec l'URL du worker
- [ ] Code poussé sur GitHub
- [ ] Variable `VITE_API_URL` configurée sur Vercel
- [ ] Site déployé sur Vercel
- [ ] Connexion admin testée
- [ ] Boutique configurée (nom, produits, etc.)

## 🆘 Support

### Problèmes Courants

**Worker ne se déploie pas :**
- Vérifiez que vous êtes connecté : `npx wrangler whoami`
- Vérifiez `wrangler.toml` pour les erreurs de syntaxe

**Base de données non trouvée :**
- Vérifiez que le `database_id` dans `wrangler.toml` est correct
- Créez la base si nécessaire : `npx wrangler d1 create SPEEDV3`

**Upload d'images ne fonctionne pas :**
- Vérifiez que le bucket R2 est public
- Vérifiez que l'URL dans `worker/index.js` ligne 732 est correcte

**Vercel affiche une erreur 404 :**
- Vérifiez que `VITE_API_URL` est configuré sur Vercel
- Vérifiez que le worker est déployé et accessible

### Documentation

- 📖 [Guide de Déploiement Complet](./GUIDE-DEPLOIEMENT-SPEEDV3.md)
- 🌐 [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- 🌐 [Documentation Cloudflare D1](https://developers.cloudflare.com/d1/)
- 🌐 [Documentation Cloudflare R2](https://developers.cloudflare.com/r2/)
- 🌐 [Documentation Vercel](https://vercel.com/docs)

## 🎉 Prochaines Étapes

1. ✅ **Complétez la configuration** en suivant le guide
2. ✅ **Déployez votre boutique** sur Cloudflare et Vercel
3. ✅ **Ajoutez vos produits** via le panel admin
4. ✅ **Personnalisez votre boutique** (nom, couleurs, réseaux sociaux)
5. ✅ **Testez les commandes** pour vérifier le bon fonctionnement

---

**Bonne chance avec votre boutique SPEEDV3 ! 🛍️**
