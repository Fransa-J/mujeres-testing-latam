import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

// Política de seguridad de contenido: por defecto solo se confía en el propio
// origen. Los estilos/fuentes son self (Inter va autoalojada vía next/font) y se
// permite 'unsafe-inline' en scripts/estilos porque next-themes inyecta un script
// inline para fijar el tema antes de la hidratación. Los PDF se incrustan same-origin.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "object-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "connect-src 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Fuerza HTTPS durante 2 años, incluidos subdominios.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Evita que el sitio se incruste en iframes de terceros (clickjacking).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Impide que el navegador "adivine" tipos de archivo (MIME sniffing).
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // No filtra la URL completa hacia sitios externos.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Deshabilita APIs sensibles que este sitio no usa.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // oculta la cabecera "X-Powered-By: Next.js"
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default withNextIntl(nextConfig)
