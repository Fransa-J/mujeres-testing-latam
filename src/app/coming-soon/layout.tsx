import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' })

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="dark">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
