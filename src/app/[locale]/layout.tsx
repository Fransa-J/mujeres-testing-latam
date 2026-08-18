import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

const locales = ['es', 'en']

export const metadata = {
  metadataBase: new URL('https://mujerestesting.com'),
  verification: {
    google: 'zbPjw1rLNPjn-YHjqRxX0dnnK6J7S2wZIMosudxp4NE',
  },
  title: {
    default: 'Mujeres Testing Latam | Comunidad de QA y Testing de Software',
    template: '%s · Mujeres Testing Latam',
  },
  description:
    'Comunidad latinoamericana de mujeres en QA e Ingeniería de Calidad de Software (Testing). Conocimiento gratuito, eventos y mentoría para iniciar, avanzar y crecer.',
  keywords: [
    'Mujeres Testing Latam',
    'QA',
    'Quality Assurance',
    'testing de software',
    'ingeniería de calidad de software',
    'comunidad de testing',
    'mujeres en tecnología',
    'Latinoamérica',
  ],
  icons: {
    icon: '/images/mtl-logo.png',
    apple: '/images/mtl-logo.png',
  },
  openGraph: {
    title: 'Mujeres Testing Latam',
    description:
      'Comunidad latinoamericana de mujeres en QA e Ingeniería de Calidad de Software (Testing). Conocimiento, eventos y mentoría.',
    url: 'https://mujerestesting.com',
    siteName: 'Mujeres Testing Latam',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mujeres Testing Latam',
    description:
      'Comunidad latinoamericana de mujeres en QA e Ingeniería de Calidad de Software (Testing). Conocimiento, eventos y mentoría.',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Datos estructurados de la organización (ayuda a Google a entender qué es MTL).
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mujeres Testing Latam',
  alternateName: 'MTL',
  url: 'https://mujerestesting.com',
  logo: 'https://mujerestesting.com/images/mtl-logo.png',
  description:
    'Comunidad latinoamericana para que más mujeres inicien, avancen y prosperen en el testing de software.',
  email: 'mujerestesting@gmail.com',
  sameAs: ['https://www.linkedin.com/company/mujeres-testing-latam/'],
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
