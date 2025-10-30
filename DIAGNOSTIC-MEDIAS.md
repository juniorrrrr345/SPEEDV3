# 🔍 Diagnostic des problèmes d'affichage des images et vidéos

## Problèmes identifiés et corrigés

### 1. ✅ URL R2 incohérente
**Problème**: Le worker utilisait une URL R2 différente (`pub-d57130a1bf584539ae011440013f40ad.r2.dev`) de celle du frontend (`pub-53af7ff6cf154e87af25e68525a4bf74.r2.dev`).

**Solution**: L'URL dans le worker a été corrigée pour correspondre à celle du frontend.

### 2. ✅ Gestion des erreurs améliorée
Des handlers d'erreur ont été ajoutés sur tous les éléments `<img>` et `<video>` pour:
- Logger les erreurs dans la console
- Masquer les éléments qui ne peuvent pas être chargés
- Afficher des messages d'erreur visuels

## Comment diagnostiquer un problème

### Étape 1: Vérifier la console du navigateur
1. Ouvrez les outils de développement (F12)
2. Allez dans l'onglet "Console"
3. Cherchez les erreurs commençant par:
   - `Erreur image:`
   - `Erreur vidéo:`
   - `Erreur image détail:`
   - `Erreur vidéo détail:`

### Étape 2: Vérifier l'URL du média
Dans la console, vous verrez l'URL complète. Vérifiez:
1. L'URL commence par `https://pub-53af7ff6cf154e87af25e68525a4bf74.r2.dev/`
2. L'URL contient bien un nom de fichier
3. Essayez d'ouvrir l'URL directement dans votre navigateur

### Étape 3: Vérifier les CORS
Si vous voyez une erreur CORS dans la console:
- Le bucket R2 doit être configuré pour être public
- Les CORS doivent être configurés pour autoriser les requêtes depuis votre domaine

### Étape 4: Vérifier que les fichiers existent
1. Connectez-vous à votre dashboard Cloudflare
2. Allez dans R2 > speedv3-media
3. Vérifiez que les fichiers listés dans la console existent bien dans le bucket

### Étape 5: Vérifier la base de données
1. Ouvrez la console du navigateur
2. Vérifiez les logs qui affichent les données du produit:
   ```javascript
   console.log('ProductDetail - Product data:', product)
   console.log('ProductDetail - Video:', product.video)
   console.log('ProductDetail - Photo:', product.photo)
   ```
3. Vérifiez que les champs `photo`, `video`, ou `image` contiennent bien des URLs valides

## Solutions possibles

### Si l'URL est incorrecte
1. Les fichiers ont peut-être été uploadés vers un autre bucket
2. Vérifiez l'URL publique de votre bucket R2 dans Cloudflare
3. Mettez à jour l'URL dans:
   - `worker/index.js` (ligne 732)
   - `src/utils/cloudflare.js` (ligne 6)

### Si l'URL est correcte mais le fichier ne charge pas
1. **Problème CORS**: Configurez les CORS sur votre bucket R2:
   - Dans Cloudflare, allez dans R2 > speedv3-media > Settings
   - Ajoutez une règle CORS qui autorise votre domaine

2. **Bucket privé**: Assurez-vous que votre bucket R2 est public ou que vous avez configuré un domaine R2.dev

3. **Fichier supprimé**: Le fichier a peut-être été supprimé du bucket

### Si le fichier n'existe pas dans la base de données
1. Ré-uploader le fichier depuis l'interface admin
2. Vérifier que l'upload retourne bien une URL valide
3. Vérifier que l'URL est bien sauvegardée dans la base de données

## Vérification rapide

Dans la console du navigateur, exécutez ce code pour vérifier tous les produits:

```javascript
const { getAll } = await import('./src/utils/api.js')
const products = await getAll('products')
products.forEach(p => {
  console.log(`Produit: ${p.name}`)
  console.log(`  Photo: ${p.photo || '❌ Manquante'}`)
  console.log(`  Vidéo: ${p.video || '❌ Manquante'}`)
  console.log(`  Image: ${p.image || '❌ Manquante'}`)
})
```

## Prochaines étapes recommandées

1. **Testez un upload**: Essayez d'uploader une nouvelle image/vidéo depuis l'interface admin
2. **Vérifiez l'URL retournée**: L'URL devrait commencer par `https://pub-53af7ff6cf154e87af25e68525a4bf74.r2.dev/`
3. **Vérifiez que ça fonctionne**: Ouvrez l'URL directement dans le navigateur
