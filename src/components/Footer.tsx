'use client'

import { useTranslations } from 'next-intl'
import { Linkedin, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Bloque central: logo + eslogan + contacto */}
        <div className="flex flex-col items-center text-center gap-4">
          <img
            src="/images/mtl-logo.png"
            alt="Mujeres Testing Latam"
            className="h-20 w-auto"
          />
          <span className="font-medium">Mujeres Testing Latam</span>
          <p className="text-sm italic text-[#C8006A]">
            Creciendo juntas en el camino del Testing
          </p>

          <a
            href="mailto:mujerestesting@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors"
          >
            <Mail size={15} /> mujerestesting@gmail.com
          </a>

          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://www.linkedin.com/company/mujeres-testing-latam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C8006A] hover:border-[#C8006A]/40 transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://www.instagram.com/mujerestestinglatam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C8006A] hover:border-[#C8006A]/40 transition-colors"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>

        {/* Barra inferior: copyright a la izquierda, firma abajo a la derecha */}
        <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400 order-2 sm:order-1">
            © {new Date().getFullYear()} Mujeres Testing Latam · {t('rights')}
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400">
              {t('by')}
            </span>
            <img
              src="/images/firma-fransa.png"
              alt="Fransa J. Aravena"
              className="h-12 w-auto invert dark:invert-0 opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
