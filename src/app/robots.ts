import type { MetadataRoute } from 'next'

const BASE = 'https://mujerestesting.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/coming-soon',
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
