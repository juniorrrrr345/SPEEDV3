#!/bin/bash

# 🚀 Script de Déploiement SPEEDV3
# Ce script contient toutes les commandes nécessaires pour déployer SPEEDV3
# ⚠️ Exécutez ces commandes UNE PAR UNE et suivez les instructions

echo "=================================================="
echo "🚀 DÉPLOIEMENT DE SPEEDV3"
echo "=================================================="
echo ""

# ============================================
# ÉTAPE 1 : Authentification Cloudflare
# ============================================
echo "📌 ÉTAPE 1 : Connexion à Cloudflare"
echo "Commande : npx wrangler login"
echo "➡️ Un navigateur va s'ouvrir pour l'authentification"
echo ""
read -p "Appuyez sur Entrée pour continuer..."
# npx wrangler login

# ============================================
# ÉTAPE 2 : Création de la Base D1
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 2 : Création de la Base de Données D1"
echo "=================================================="
echo "Commande : npx wrangler d1 create SPEEDV3"
echo ""
echo "⚠️ IMPORTANT : Copiez le 'database_id' qui s'affichera !"
echo "Il ressemble à : xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npx wrangler d1 create SPEEDV3

echo ""
echo "🔧 ACTION REQUISE :"
echo "1. Copiez le database_id qui s'est affiché ci-dessus"
echo "2. Éditez le fichier wrangler.toml"
echo "3. Ligne 9 : Remplacez VOTRE-DATABASE-ID-ICI par le vrai ID"
echo ""
read -p "✅ Une fois fait, appuyez sur Entrée..."

# ============================================
# ÉTAPE 3 : Création du Bucket R2
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 3 : Création du Bucket R2"
echo "=================================================="
echo "Commande : npx wrangler r2 bucket create SPEEDV3"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npx wrangler r2 bucket create SPEEDV3

echo ""
echo "🔧 ACTION REQUISE :"
echo "1. Allez sur https://dash.cloudflare.com"
echo "2. Cliquez sur R2 → SPEEDV3"
echo "3. Settings → Public Access → Activer"
echo "4. Copiez l'URL publique (format: https://pub-XXXXXXXXX.r2.dev/)"
echo ""
read -p "✅ Une fois l'URL copiée, appuyez sur Entrée..."

echo ""
echo "🔧 ACTION REQUISE :"
echo "1. Éditez le fichier worker/index.js"
echo "2. Ligne 732 : Remplacez VOTRE-URL-R2 par l'URL que vous avez copiée"
echo "   Exemple : https://pub-abc123.r2.dev/"
echo ""
read -p "✅ Une fois fait, appuyez sur Entrée..."

# ============================================
# ÉTAPE 4 : Configuration des Secrets
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 4 : Configuration des Secrets"
echo "=================================================="
echo ""
echo "Configuration du nom d'utilisateur admin..."
echo "Commande : npx wrangler secret put DEFAULT_ADMIN_USERNAME"
echo "Valeur à saisir : admin"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npx wrangler secret put DEFAULT_ADMIN_USERNAME

echo ""
echo "Configuration du mot de passe admin..."
echo "Commande : npx wrangler secret put DEFAULT_ADMIN_PASSWORD"
echo "Valeur suggérée : SpeedV3Admin123"
echo "⚠️ Ou choisissez votre propre mot de passe sécurisé"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npx wrangler secret put DEFAULT_ADMIN_PASSWORD

# ============================================
# ÉTAPE 5 : Déploiement du Worker
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 5 : Déploiement du Worker"
echo "=================================================="
echo "Commande : npx wrangler deploy"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npx wrangler deploy

echo ""
echo "🔧 ACTION REQUISE :"
echo "1. Notez l'URL du worker qui s'est affichée"
echo "   Format : https://speedv3-worker.calitek-junior.workers.dev"
echo "2. Éditez le fichier .env.local"
echo "3. Remplacez VOTRE-USERNAME par votre vrai nom d'utilisateur"
echo ""
read -p "✅ Une fois fait, appuyez sur Entrée..."

# ============================================
# ÉTAPE 6 : Initialisation de la Base
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 6 : Initialisation de la Base de Données"
echo "=================================================="
echo ""
read -p "Entrez l'URL complète de votre worker : " WORKER_URL
echo ""
echo "Exécution de : curl ${WORKER_URL}/api/init"
echo ""
# curl ${WORKER_URL}/api/init

echo ""
echo "✅ Réponse attendue : {\"success\":true,\"message\":\"Database initialized\"}"
echo ""
read -p "Appuyez sur Entrée pour continuer..."

# ============================================
# ÉTAPE 7 : Installation et Test Local
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 7 : Installation des Dépendances"
echo "=================================================="
echo "Commande : npm install"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# npm install

echo ""
echo "🧪 Test local disponible avec : npm run dev"
echo "Le site sera accessible sur http://localhost:5173"
echo ""
read -p "Voulez-vous tester en local maintenant ? (o/N) " TEST_LOCAL

if [ "$TEST_LOCAL" = "o" ] || [ "$TEST_LOCAL" = "O" ]; then
    echo "Lancement du serveur de développement..."
    echo "⚠️ Appuyez sur Ctrl+C pour arrêter"
    # npm run dev
fi

# ============================================
# ÉTAPE 8 : Push sur GitHub
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 8 : Push sur GitHub"
echo "=================================================="
echo ""
echo "Commandes :"
echo "  git add ."
echo "  git commit -m \"Configuration initiale SPEEDV3\""
echo "  git push -u origin main"
echo ""
read -p "Appuyez sur Entrée pour exécuter..."
# git add .
# git commit -m "Configuration initiale SPEEDV3"
# git push -u origin main

# ============================================
# ÉTAPE 9 : Déploiement Vercel
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 9 : Déploiement sur Vercel"
echo "=================================================="
echo ""
echo "🌐 Actions à faire sur https://vercel.com :"
echo ""
echo "1. Cliquez sur 'Add New Project'"
echo "2. Importez le dépôt : juniorrrrr345/speedv3"
echo "3. Configurez la variable d'environnement :"
echo "   - Clé : VITE_API_URL"
echo "   - Valeur : ${WORKER_URL}"
echo "   - ✅ Cochez : Production, Preview, Development"
echo "4. Cliquez sur 'Deploy'"
echo "5. Notez l'URL Vercel (ex: https://speedv3.vercel.app)"
echo ""
read -p "✅ Une fois le déploiement terminé, appuyez sur Entrée..."

# ============================================
# ÉTAPE 10 : Configuration Finale
# ============================================
echo ""
echo "=================================================="
echo "📌 ÉTAPE 10 : Configuration de la Boutique"
echo "=================================================="
echo ""
read -p "Entrez l'URL de votre site Vercel : " VERCEL_URL
echo ""
echo "🎉 Votre boutique est déployée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur ${VERCEL_URL}/admin/login"
echo "2. Connectez-vous avec :"
echo "   - Utilisateur : admin"
echo "   - Mot de passe : SpeedV3Admin123 (ou celui que vous avez choisi)"
echo "3. Configurez votre boutique :"
echo "   - ⚙️ Settings : Nom, description, etc."
echo "   - 👥 Socials : Réseaux sociaux"
echo "   - 📁 Categories : Catégories de produits"
echo "   - 🏪 Farms : Points de vente"
echo "   - 🛍️ Products : Vos produits"
echo ""

# ============================================
# RÉSUMÉ FINAL
# ============================================
echo ""
echo "=================================================="
echo "✅ RÉSUMÉ DE VOTRE INSTALLATION"
echo "=================================================="
echo ""
echo "📦 Dépôt GitHub : https://github.com/juniorrrrr345/speedv3.git"
echo "🔧 Worker Cloudflare : ${WORKER_URL}"
echo "🌐 Site Web : ${VERCEL_URL}"
echo "👤 Admin : ${VERCEL_URL}/admin/login"
echo ""
echo "🔐 Identifiants :"
echo "   Utilisateur : admin"
echo "   Mot de passe : SpeedV3Admin123"
echo ""
echo "=================================================="
echo "🎉 INSTALLATION TERMINÉE !"
echo "=================================================="
echo ""
echo "📖 Pour plus d'informations, consultez :"
echo "   - GUIDE-DEPLOIEMENT-SPEEDV3.md"
echo "   - README-SPEEDV3.md"
echo ""
echo "🆘 En cas de problème, vérifiez la section Support dans le README"
echo ""
echo "Bonne vente avec SPEEDV3 ! 🛍️"
echo ""
