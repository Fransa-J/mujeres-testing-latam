'use client'

import { useState } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { Linkedin, ArrowRight } from 'lucide-react'
import { articulos, categories, type Locale } from '@/content/articulos'

const ui = {
  all: { es: 'Todos', en: 'All' },
  read: { es: 'Leer artículo', en: 'Read article' },
  linkedin: { es: 'LinkedIn', en: 'LinkedIn' },
}

export default function ConocimientoList({ locale }: { locale: Locale }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? articulos : articulos.filter((a) => a.category === active)
  const catLabel = (key: string) => categories.find((c) => c.key === key)?.label[locale] ?? key

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive('all')}
          className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
            active === 'all'
              ? 'bg-[#C8006A] text-white border-[#C8006A]'
              : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-[#C8006A] hover:text-[#C8006A]'
          }`}
        >
          {ui.all[locale]}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
              active === cat.key
                ? 'bg-[#C8006A] text-white border-[#C8006A]'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-[#C8006A] hover:text-[#C8006A]'
            }`}
          >
            {cat.label[locale]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <div
            key={a.slug}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4 transition-colors hover:border-[#C8006A]/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#C8006A]/10 border border-[#C8006A]/20 flex items-center justify-center shrink-0 text-xl">
                <span aria-hidden>{a.emoji}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                {catLabel(a.category)}
              </span>
            </div>
            <Link href={`/${locale}/conocimiento/${a.slug}`} className="flex-1">
              <h3 className="font-medium mb-1.5 text-sm group-hover:text-[#C8006A] transition-colors">{a.title[locale]}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{a.description[locale]}</p>
            </Link>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Link
                href={`/${locale}/conocimiento/${a.slug}`}
                className="flex items-center gap-1.5 text-xs font-medium text-[#C8006A] hover:gap-2.5 transition-all"
              >
                {ui.read[locale]} <ArrowRight size={13} />
              </Link>
              <a
                href={a.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('linkedin_post_click', { slug: a.slug })}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#C8006A] transition-colors"
              >
                <Linkedin size={13} /> {ui.linkedin[locale]}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
