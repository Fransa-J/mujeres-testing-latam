import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

const locales = ['es', 'en']

export const metadata = {
  metadataBase: new URL('https://mujerestesting.com'),
  title: {
    default: 'Mujeres Testing Latam',
    template: '%s · Mujeres Testing Latam',
  },
  description:
    'Comunidad para que más mujeres inicien, avancen y prosperen en el camino del Testing.',
  icons: {
    icon: '/images/mtl-logo.png',
    apple: '/images/mtl-logo.png',
  },
  openGraph: {
    title: 'Mujeres Testing Latam',
    description:
      'Comunidad para que más mujeres inicien, avancen y prosperen en el camino del Testing.',
    url: 'https://mujerestesting.com',
    siteName: 'Mujeres Testing Latam',
    images: ['/images/mtl-logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mujeres Testing Latam',
    description:
      'Comunidad para que más mujeres inicien, avancen y prosperen en el camino del Testing.',
    images: ['/images/mtl-logo.png'],
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
