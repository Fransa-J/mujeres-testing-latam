'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navKeys = ['inicio', 'comunidad', 'conocimiento', 'blog', 'eventos', 'contacto'] as const

const navHrefs: Record<typeof navKeys[number], string> = {
  inicio: '/',
  comunidad: '/comunidad',
  conocimiento: '/conocimiento',
  blog: '/blog',
  eventos: '/eventos',
  contacto: '/contacto',
}

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const otherLocale = locale === 'es' ? 'en' : 'es'
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const isActive = (href: string) => {
    const full = `/${locale}${href === '/' ? '' : href}`
    return pathname === full || (href !== '/' && pathname.startsWith(full))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#C8006A] flex items-center justify-center text-white text-xs font-medium">
            MTL
          </div>
          <span className="font-medium text-sm hidden sm:block">Mujeres Testing Latam</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}${navHrefs[key] === '/' ? '' : navHrefs[key]}`}
              className={`text-sm transition-colors ${
                isActive(navHrefs[key])
                  ? 'text-[#C8006A] font-medium'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-700 overflow-hidden text-xs">
            <Link
              href={`/${locale}${pathname.replace(`/${locale}`, '')}`}
              className={`px-3 py-1.5 transition-colors ${
                locale === 'es'
                  ? 'bg-[#C8006A] text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              ES
            </Link>
            <Link
              href={switchPath}
              className={`px-3 py-1.5 transition-colors ${
                locale === 'en'
                  ? 'bg-[#C8006A] text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              EN
            </Link>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          <button
            className="lg:hidden p-2 rounded-md text-zinc-500 dark:text-zinc-400"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 flex flex-col gap-4">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}${navHrefs[key] === '/' ? '' : navHrefs[key]}`}
              onClick={() => setOpen(false)}
              className={`text-sm transition-colors ${
                isActive(navHrefs[key])
                  ? 'text-[#C8006A] font-medium'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
