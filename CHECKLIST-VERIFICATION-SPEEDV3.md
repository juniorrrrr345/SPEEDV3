# ✅ Checklist de Vérification SPEEDV3

Utilisez cette checklist pour vous assurer que votre instance SPEEDV3 est correctement configurée.

---

## 📋 PHASE 1 : Configuration Initiale

### Git et Dépôt
- [ ] Dépôt cloné depuis THEGD33V3
- [ ] Remote configuré vers `https://github.com/juniorrrrr345/speedv3.git`
- [ ] Fichier `.gitignore` mis à jour (inclut `.dev.vars` et `.env.local`)

### Fichiers de Configuration
- [ ] `wrangler.toml` : `name = "SPEEDV3"`
- [ ] `wrangler.toml` : `database_name = "SPEEDV3"`
- [ ] `wrangler.toml` : `database_id` mis à jour avec le vrai ID
- [ ] `wrangler.toml` : `bucket_name = "SPEEDV3"`
- [ ] `worker/index.js` : URL R2 mise à jour (ligne 732)
- [ ] `.dev.vars` : Identifiants admin configurés
- [ ] `.env.local` : URL du worker configurée

---

## 📋 PHASE 2 : Infrastructure Cloudflare

### Authentification
- [ ] Connexion Cloudflare réussie : `npx wrangler login`
- [ ] Vérification : `npx wrangler whoami` affiche votre compte

### Base de Données D1
- [ ] Base créée : `npx wrangler d1 create SPEEDV3`
- [ ] `database_id` copié et mis dans `wrangler.toml`
- [ ] Vérification : `npx wrangler d1 list` affiche SPEEDV3

### Bucket R2
- [ ] Bucket créé : `npx wrangler r2 bucket create SPEEDV3`
- [ ] Vérification : `npx wrangler r2 bucket list` affiche SPEEDV3
- [ ] Accès public activé sur le dashboard Cloudflare
- [ ] URL publique notée (format: `https://pub-XXXXX.r2.dev/`)
- [ ] URL mise à jour dans `worker/index.js` ligne 732

### Secrets de Production
- [ ] `DEFAULT_ADMIN_USERNAME` configuré
- [ ] `DEFAULT_ADMIN_PASSWORD` configuré
- [ ] Vérification : `npx wrangler secret list` affiche les 2 secrets

---

## 📋 PHASE 3 : Déploiement

### Worker Cloudflare
- [ ] Worker déployé : `npx wrangler deploy`
- [ ] Pas d'erreurs dans le déploiement
- [ ] URL du worker notée (ex: `https://SPEEDV3.username.workers.dev`)
- [ ] Test du worker : `curl https://SPEEDV3.username.workers.dev` retourne une réponse

### Initialisation de la Base
- [ ] Base initialisée : `curl https://SPEEDV3.username.workers.dev/api/init`
- [ ] Réponse obtenue : `{"success":true,"message":"Database initialized"}`
- [ ] Tables créées (vérifiable via dashboard Cloudflare D1)

### Test du Worker
- [ ] Endpoint `/api/health` accessible
- [ ] Endpoint `/api/settings` retourne une réponse
- [ ] Upload d'image test fonctionne (via `/api/upload`)

---

## 📋 PHASE 4 : Frontend

### Configuration Locale
- [ ] `npm install` exécuté sans erreurs
- [ ] `.env.local` contient la bonne URL du worker
- [ ] `npm run dev` démarre sans erreurs
- [ ] Site accessible sur `http://localhost:5173`
- [ ] Pas d'erreurs dans la console du navigateur

### Test des Pages
- [ ] Page d'accueil s'affiche correctement
- [ ] Page `/products` accessible
- [ ] Page `/contact` accessible
- [ ] Page `/admin/login` accessible

---

## 📋 PHASE 5 : GitHub

### Push du Code
- [ ] Tous les fichiers ajoutés : `git add .`
- [ ] Commit créé : `git commit -m "Configuration initiale SPEEDV3"`
- [ ] Push réussi : `git push -u origin main`
- [ ] Dépôt visible sur GitHub : `https://github.com/juniorrrrr345/speedv3`
- [ ] Fichiers `.dev.vars` et `.env.local` ne sont PAS sur GitHub

---

## 📋 PHASE 6 : Vercel

### Configuration Vercel
- [ ] Projet créé sur Vercel
- [ ] Dépôt GitHub importé (`juniorrrrr345/speedv3`)
- [ ] Variable d'environnement ajoutée :
  - Clé : `VITE_API_URL`
  - Valeur : `https://SPEEDV3.username.workers.dev`
  - Environnements : ✅ Production, ✅ Preview, ✅ Development

### Déploiement
- [ ] Build réussi (aucune erreur)
- [ ] Déploiement terminé
- [ ] URL Vercel notée (ex: `https://speedv3.vercel.app`)
- [ ] Site accessible publiquement

### Test du Site en Production
- [ ] Page d'accueil s'affiche
- [ ] Pas d'erreurs 404
- [ ] Console du navigateur sans erreurs critiques
- [ ] Les images se chargent (logo, etc.)

---

## 📋 PHASE 7 : Administration

### Connexion Admin
- [ ] URL admin accessible : `https://speedv3.vercel.app/admin/login`
- [ ] Connexion réussie avec :
  - Utilisateur : `admin`
  - Mot de passe : `SpeedV3Admin123`
- [ ] Redirection vers le dashboard admin

### Configuration de la Boutique

#### Settings (Paramètres)
- [ ] Nom de la boutique configuré
- [ ] Description configurée
- [ ] Logo uploadé (si disponible)
- [ ] Informations de contact renseignées

#### Socials (Réseaux Sociaux)
- [ ] Lien Facebook (si applicable)
- [ ] Lien Instagram (si applicable)
- [ ] Lien Twitter/X (si applicable)
- [ ] Autres liens sociaux

#### Categories
- [ ] Au moins 1 catégorie créée
- [ ] Nom et description définis
- [ ] Image de catégorie uploadée (optionnel)

#### Farms (Points de Vente)
- [ ] Au moins 1 farm créée
- [ ] Nom et localisation définis
- [ ] Coordonnées renseignées
- [ ] Image uploadée (optionnel)

#### Products
- [ ] Au moins 1 produit créé pour tester
- [ ] Nom, description, prix définis
- [ ] Catégorie associée
- [ ] Farm associée
- [ ] Images uploadées

---

## 📋 PHASE 8 : Tests Fonctionnels

### Frontend Public
- [ ] Liste des produits s'affiche
- [ ] Détail d'un produit s'affiche
- [ ] Images des produits se chargent depuis R2
- [ ] Filtres par catégorie fonctionnent
- [ ] Page de contact affiche les informations

### Upload d'Images
- [ ] Upload dans "Products" fonctionne
- [ ] Image visible après upload
- [ ] Image accessible via l'URL R2
- [ ] Pas d'erreurs CORS

### API Worker
- [ ] `/api/products` retourne la liste des produits
- [ ] `/api/categories` retourne les catégories
- [ ] `/api/farms` retourne les farms
- [ ] `/api/settings` retourne les paramètres

---

## 📋 PHASE 9 : Sécurité

### Vérifications de Sécurité
- [ ] `.dev.vars` dans `.gitignore`
- [ ] `.env.local` dans `.gitignore`
- [ ] Secrets Cloudflare configurés (pas de mots de passe en clair dans le code)
- [ ] Mot de passe admin changé (si nécessaire)
- [ ] Bucket R2 public seulement en lecture
- [ ] Pas de database_id ou secrets dans les fichiers publics GitHub

---

## 📋 PHASE 10 : Documentation

### Fichiers de Documentation
- [ ] `README-SPEEDV3.md` présent
- [ ] `GUIDE-DEPLOIEMENT-SPEEDV3.md` présent
- [ ] `COMMANDES-DEPLOIEMENT-SPEEDV3.sh` présent
- [ ] `CHECKLIST-VERIFICATION-SPEEDV3.md` présent

---

## 🎯 RÉCAPITULATIF FINAL

### URLs à Documenter
```
Dépôt GitHub : https://github.com/juniorrrrr345/speedv3
Worker API : https://SPEEDV3.[username].workers.dev
Bucket R2 : https://pub-[id].r2.dev/
Site Web : https://speedv3.vercel.app
Admin : https://speedv3.vercel.app/admin/login
```

### Identifiants
```
Admin Username : admin
Admin Password : SpeedV3Admin123
```

⚠️ **Changez le mot de passe admin après la première connexion !**

---

## ✅ Validation Finale

Une fois tous les points cochés ci-dessus :

- [ ] ✅ Configuration complète
- [ ] ✅ Infrastructure déployée
- [ ] ✅ Frontend fonctionnel
- [ ] ✅ Admin accessible
- [ ] ✅ Tests réussis
- [ ] ✅ Sécurité vérifiée

---

## 🆘 En Cas de Problème

Si vous rencontrez des problèmes :

1. **Consultez les logs :**
   - Cloudflare : Dashboard → Workers → SPEEDV3 → Logs
   - Vercel : Project → Deployments → View Function Logs

2. **Vérifiez les configurations :**
   - `wrangler.toml` : tous les IDs corrects ?
   - `worker/index.js` : URL R2 correcte ?
   - `.env.local` : URL worker correcte ?
   - Vercel : `VITE_API_URL` configurée ?

3. **Testez les composants individuellement :**
   ```bash
   # Test du worker
   curl https://SPEEDV3.[username].workers.dev/api/health
   
   # Test de l'upload R2
   curl https://pub-[id].r2.dev/test.jpg
   
   # Test de l'API
   curl https://SPEEDV3.[username].workers.dev/api/products
   ```

4. **Redéployez si nécessaire :**
   ```bash
   npx wrangler deploy
   # Puis redéployer sur Vercel via le dashboard
   ```

---

## 🎉 Félicitations !

Si toutes les cases sont cochées, votre instance **SPEEDV3** est entièrement opérationnelle ! 🚀

Vous pouvez maintenant :
- ✅ Ajouter vos produits
- ✅ Gérer vos commandes
- ✅ Personnaliser votre boutique
- ✅ Commencer à vendre !

**Bonne chance avec votre boutique SPEEDV3 ! 🛍️**
