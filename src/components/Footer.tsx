'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Linkedin, Instagram, Heart } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C8006A] flex items-center justify-center text-white text-xs font-medium">
                MTL
              </div>
              <span className="font-medium text-sm">Mujeres Testing Latam</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
              {t('made_with')} <Heart size={10} className="inline text-[#C8006A]" />
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/mujeres-testing-latam/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-zinc-400 hover:text-[#C8006A] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-zinc-400 hover:text-[#C8006A] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Mujeres Testing Latam · {t('rights')}
          </p>
          <p className="text-xs text-zinc-400">mujerestesting.com</p>
        </div>
      </div>
    </footer>
  )
}
