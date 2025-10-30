import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFarm, setSelectedFarm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Récupérer les paramètres d'URL au chargement
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, selectedFarm, allProducts])

  const fetchData = async () => {
    try {
      const { getAll } = await import('../utils/api')
      const productsData = await getAll('products')
      const categoriesData = await getAll('categories')
      const farmsData = await getAll('farms')
      
      setAllProducts(productsData)
      setProducts(productsData)
      setCategories(categoriesData)
      setFarms(farmsData)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...allProducts]

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(product => String(product.category) === String(selectedCategory))
    }

    // Filtre par farm
    if (selectedFarm) {
      filtered = filtered.filter(product => String(product.farm) === String(selectedFarm))
    }

    // Trier pour mettre GAZ SÉLECTION en premier
    filtered.sort((a, b) => {
      // Trouver les noms des farms pour les comparer
      const farmA = farms.find(f => String(f.id) === String(a.farm))?.name || ''
      const farmB = farms.find(f => String(f.id) === String(b.farm))?.name || ''
      
      // Si A est GAZ SÉLECTION et B ne l'est pas, A vient en premier
      if (farmA.includes('GAZ SÉLECTION') && !farmB.includes('GAZ SÉLECTION')) {
        return -1
      }
      // Si B est GAZ SÉLECTION et A ne l'est pas, B vient en premier
      if (farmB.includes('GAZ SÉLECTION') && !farmA.includes('GAZ SÉLECTION')) {
        return 1
      }
      // Sinon, garder l'ordre original
      return 0
    })

    setProducts(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedFarm('')
  }

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-theme text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-bg">
      <Header />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 flex flex-col items-center"
          >
            <div className="inline-block bg-black/90 backdrop-blur-xl rounded-full px-16 py-10 border-2 border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-3 text-white">
                Notre Boutique
              </h1>
              <p className="text-lg text-gray-300">
                Découvrez notre sélection de produits choisis avec amour
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="max-w-3xl mx-auto w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full px-6 py-4 pr-24 bg-slate-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <span>🔍</span>
                  <span className="hidden md:inline">Filtres</span>
                </button>
              </div>

              {/* Filtres déroulants */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-slate-900/50 border border-gray-700 rounded-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtre catégorie */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Catégorie</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Toutes les catégories</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Filtre farm */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Farm</label>
                      <select
                        value={selectedFarm}
                        onChange={(e) => setSelectedFarm(e.target.value)}
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Toutes les farms</option>
                        {farms.map((farm) => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bouton réinitialiser */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </div>

                  {/* Résumé des filtres */}
                  {(searchTerm || selectedCategory || selectedFarm) && (
                    <div className="mt-3 text-sm text-gray-400">
                      {products.length} produit(s) trouvé(s)
                      {searchTerm && ` pour "${searchTerm}"`}
                      {selectedCategory && ` dans ${selectedCategory}`}
                      {selectedFarm && ` de ${selectedFarm}`}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Aucun produit disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  categories={categories}
                  farms={farms}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product, index, categories, farms }) => {
  // Trouver les noms de catégorie et farm (convertir en string pour la comparaison)
  const categoryName = categories.find(c => String(c.id) === String(product.category))?.name || product.category
  const farmName = farms.find(f => String(f.id) === String(product.farm))?.name || product.farm
  
  // Construire le tableau de médias - PHOTO EN PREMIER pour affichage carte
  const allMedias = []
  if (product.photo && product.photo.trim()) allMedias.push(product.photo)
  if (product.image && product.image.trim()) allMedias.push(product.image)
  if (product.video && product.video.trim()) allMedias.push(product.video)
  
  // Vérifier aussi dans medias si c'est un tableau
  if (product.medias && Array.isArray(product.medias)) {
    product.medias.forEach(media => {
      if (media && media.trim() && !allMedias.includes(media)) {
        allMedias.push(media)
      }
    })
  }
  
  // Afficher le premier média disponible (photo en priorité)
  const displayImage = allMedias[0] || product.photo || product.image || product.video
  const basePrice = product.variants?.[0]?.price || product.price
  
  // Fonction pour détecter si c'est une vidéo
  const isVideo = (url) => {
    if (!url) return false
    const videoExtensions = ['.mp4', '.webm', '.mov', '.MOV', '.avi', '.mkv']
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.startsWith('data:video')
  }
  
  // Fonction pour détecter si c'est un iframe Cloudflare Stream
  const isCloudflareStreamIframe = (url) => {
    if (!url) return false
    return url.includes('cloudflarestream.com') && url.includes('iframe')
  }
  
  console.log('ProductCard:', product.name, 'AllMedias:', allMedias, 'DisplayImage:', displayImage, 'IsVideo:', isVideo(displayImage))
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="neon-border rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm group cursor-pointer"
    >
      {/* Image ou Vidéo */}
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 md:h-64 overflow-hidden bg-slate-800">
        {displayImage ? (
          isCloudflareStreamIframe(displayImage) ? (
            <iframe
              src={displayImage}
              className="w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              style={{ border: 'none' }}
            />
          ) : isVideo(displayImage) ? (
            <video
              src={displayImage}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              onError={(e) => console.error('Erreur vidéo:', displayImage, e)}
              onLoadStart={() => console.log('Chargement vidéo:', displayImage)}
            />
          ) : (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => console.error('Erreur image:', displayImage, e)}
              onLoad={() => console.log('Image chargée:', displayImage)}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🎁
          </div>
        )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-theme-heading mb-2 group-hover:text-gradient transition-all line-clamp-2">
          {product.name}
        </h3>
        <p className="text-theme-secondary text-xs md:text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Catégorie et Farm */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3">
          {categoryName && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-theme-secondary text-xs">
              🏷️ {categoryName}
            </span>
          )}
          {farmName && (
            <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-theme-secondary text-xs">
              🌾 {farmName}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-2">
          {product.variants && product.variants.length > 1 && (
            <p className="text-xs md:text-sm text-theme-secondary">
              {product.variants.length} options
            </p>
          )}
          <Link to={`/products/${product.id}`} className="ml-auto">
            <button className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-white to-gray-200 rounded-lg text-black font-semibold hover:from-gray-200 hover:to-gray-400 transition-all text-sm md:text-base">
              Voir
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Products
