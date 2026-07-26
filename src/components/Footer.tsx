'use client'

import { useTranslations } from 'next-intl'
import { track } from '@vercel/analytics'
import { Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Bloque central: logo + eslogan al lado + contacto */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <img
              src="/images/mtl-logo.png"
              alt="Mujeres Testing Latam"
              className="h-16 w-auto"
            />
            <p className="text-base italic text-[#C8006A] text-center sm:text-left sm:whitespace-nowrap">
              Creciendo juntas en el camino del Testing
            </p>
          </div>

          <div className="flex items-center gap-4 mt-1">
            <a
              href="mailto:mujerestesting@gmail.com"
              onClick={() => track('email_click')}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors"
            >
              <Mail size={13} /> mujerestesting@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/company/mujeres-testing-latam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => track('linkedin_click', { location: 'footer' })}
              className="text-zinc-400 hover:text-[#C8006A] transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Barra inferior: crédito a la comunidad */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-400">
            © {new Date().getFullYear()} Mujeres Testing Latam · {t('rights')}
          </p>
          <p className="text-[11px] text-zinc-400 mt-1">{t('made_by')}</p>
        </div>
      </div>
    </footer>
  )
}
