'use client'

import { useTranslations } from 'next-intl'
import { track } from '@vercel/analytics'
import { Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Izquierda: logo + frase · Derecha: email + LinkedIn en 2 líneas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/mtl-logo.png"
              alt="Mujeres Testing Latam"
              className="h-16 w-auto shrink-0"
            />
            <p className="text-base italic text-[#C8006A]">
              Creciendo juntas en el camino del Testing
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="mailto:mujerestesting@gmail.com"
              onClick={() => track('email_click')}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors"
            >
              <Mail size={14} /> mujerestesting@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/company/mujeres-testing-latam/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('linkedin_click', { location: 'footer' })}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Barra inferior: crédito a la comunidad */}
        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-400">
            {t('made_by')} © {new Date().getFullYear()} · {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
