/**
 * Upload vers Cloudflare R2 via Worker API
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://speedv3-worker.calitek-junior.workers.dev'
export const R2_PUBLIC_URL = 'https://pub-d57130a1bf584539ae011440013f40ad.r2.dev'

export const uploadToR2 = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    throw error
  }
}

export const getR2Url = (filename) => {
  if (!filename) return null
  if (filename.startsWith('http')) {
    return filename
  }
  // Nettoyer le filename s'il contient déjà l'URL
  const cleanFilename = filename.replace(/https?:\/\/[^\/]+\//, '')
  return `${R2_PUBLIC_URL}/${cleanFilename}`
}

// Fonction pour valider si une URL de média est accessible
export const validateMediaUrl = async (url) => {
  if (!url) return false
  try {
    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
    return true // En mode no-cors, on suppose que c'est accessible
  } catch (error) {
    console.warn('URL de média non accessible:', url, error)
    return false
  }
}

export const deleteFromR2 = async (filename) => {
  // Pour l'instant, on ne supprime pas les fichiers
  console.log('Suppression du fichier:', filename)
  return true
}
