import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
})

// Interruptor "Coming soon": si la variable de entorno COMING_SOON vale 'true',
// todo el tráfico público se redirige a /coming-soon. Así se puede mostrar el
// aviso en el dominio mientras se sigue editando el sitio. Para volver a publicar
// el sitio completo, basta con quitar la variable o ponerla en 'false' en Vercel.
const comingSoon = process.env.COMING_SOON === 'true'

export default function middleware(req: NextRequest) {
  if (comingSoon) {
    if (!req.nextUrl.pathname.startsWith('/coming-soon')) {
      return NextResponse.rewrite(new URL('/coming-soon', req.url))
    }
    return NextResponse.next()
  }
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
