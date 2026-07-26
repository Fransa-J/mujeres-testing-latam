import type { MetadataRoute } from 'next'
import { articulos } from '@/content/articulos'

const BASE = 'https://mujerestesting.com'

// Rutas públicas (sin /blog, que está oculto). Se generan para es y en con
// enlaces hreflang para que Google entienda ambos idiomas.
const staticPaths = ['', '/comunidad', '/conocimiento', '/eventos', '/eventos-mtl', '/contacto']

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...articulos.map((a) => `/conocimiento/${a.slug}`)]
  const now = new Date()

  return paths.map((p) => ({
    url: `${BASE}/es${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : p.startsWith('/conocimiento/') ? 0.8 : 0.7,
    alternates: {
      languages: {
        es: `${BASE}/es${p}`,
        en: `${BASE}/en${p}`,
      },
    },
  }))
}
