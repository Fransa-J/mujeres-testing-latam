'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

type NavItem =
  | { key: string; href: string }
  | { key: string; children: { key: string; href: string }[] }

// 'blog' se oculta del menú temporalmente hasta que haya artículos publicados.
const navItems: NavItem[] = [
  { key: 'inicio', href: '/' },
  { key: 'comunidad', href: '/comunidad' },
  { key: 'conocimiento', href: '/conocimiento' },
  {
    key: 'eventos',
    children: [
      { key: 'eventos_latam', href: '/eventos' },
      { key: 'eventos_mtl', href: '/eventos-mtl' },
    ],
  },
  { key: 'contacto', href: '/contacto' },
]

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Ruta sin prefijo de idioma (siempre empieza con /es o /en)
  const pathWithoutLocale = pathname.replace(/^\/(es|en)/, '')
  const esPath = `/es${pathWithoutLocale}` || '/es'
  const enPath = `/en${pathWithoutLocale}` || '/en'

  const isActive = (href: string) => {
    const full = `/${locale}${href === '/' ? '' : href}`
    return pathname === full || (href !== '/' && pathname.startsWith(full))
  }
  const isGroupActive = (item: NavItem) =>
    'children' in item && item.children.some((c) => isActive(c.href))

  const linkHref = (href: string) => `/${locale}${href === '/' ? '' : href}`

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <img
            src="/images/mtl-logo.png"
            alt="Mujeres Testing Latam"
            className="h-9 w-auto"
          />
          <span className="font-medium text-sm hidden sm:block">Mujeres Testing Latam</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) =>
            'children' in item ? (
              <div key={item.key} className="relative group">
                <button
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    isGroupActive(item)
                      ? 'text-[#C8006A] font-medium'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {t(item.key)}
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                {/* pt-2 crea un puente para que el menú no se cierre al mover el cursor */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block group-focus-within:block">
                  <div className="min-w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg p-1.5">
                    {item.children.map((c) => (
                      <Link
                        key={c.key}
                        href={linkHref(c.href)}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(c.href)
                            ? 'text-[#C8006A] font-medium bg-[#C8006A]/5'
                            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                        }`}
                      >
                        {t(c.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={linkHref(item.href)}
                className={`text-sm transition-colors ${
                  isActive(item.href)
                    ? 'text-[#C8006A] font-medium'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-700 overflow-hidden text-xs">
            <Link
              href={esPath}
              className={`px-3 py-1.5 transition-colors ${
                locale === 'es'
                  ? 'bg-[#C8006A] text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              ES
            </Link>
            <Link
              href={enPath}
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
          {navItems.map((item) =>
            'children' in item ? (
              <div key={item.key} className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {t(item.key)}
                </span>
                {item.children.map((c) => (
                  <Link
                    key={c.key}
                    href={linkHref(c.href)}
                    onClick={() => setOpen(false)}
                    className={`text-sm pl-3 transition-colors ${
                      isActive(c.href)
                        ? 'text-[#C8006A] font-medium'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {t(c.key)}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.key}
                href={linkHref(item.href)}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  isActive(item.href)
                    ? 'text-[#C8006A] font-medium'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {t(item.key)}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  )
}
