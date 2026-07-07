import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ContentBlocks from '@/components/ContentBlocks'
import ArticleActions from '@/components/ArticleActions'
import { articulos, getArticulo, categories, type Locale } from '@/content/articulos'

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }))
}

const ui = {
  back: { es: 'Volver a Conocimiento', en: 'Back to Knowledge' },
  actionsTitle: { es: 'Guarda o comparte este contenido', en: 'Save or share this content' },
  actionsNote: {
    es: 'Descárgalo en PDF o Markdown, o lee la publicación original en LinkedIn.',
    en: 'Download it as PDF or Markdown, or read the original post on LinkedIn.',
  },
  related: { es: 'Contenido relacionado', en: 'Related content' },
  author: { es: 'Por Fransa J. Aravena', en: 'By Fransa J. Aravena' },
}

export function generateMetadata({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const a = getArticulo(slug)
  if (!a) return {}
  const l = locale as Locale
  return { title: `${a.title[l]} · Mujeres Testing Latam`, description: a.description[l] }
}

export default function ArticuloPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale)
  const l = locale as Locale
  const a = getArticulo(slug)
  if (!a) notFound()

  const catLabel = categories.find((c) => c.key === a.category)?.label[l] ?? a.category
  const related = (a.related ?? []).map((s) => getArticulo(s)).filter(Boolean) as typeof articulos

  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/conocimiento`}
        className="no-print inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors mb-10"
      >
        <ArrowLeft size={15} /> {ui.back[l]}
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-[#C8006A]/10 text-[#C8006A] font-medium">{catLabel}</span>
          <span className="text-zinc-400">{a.date[l]}</span>
          <span className="text-zinc-400">·</span>
          <span className="text-zinc-400">{ui.author[l]}</span>
        </div>
        <h1 className="flex items-start gap-3 text-3xl sm:text-4xl font-medium leading-tight mb-4">
          <span aria-hidden className="text-3xl sm:text-4xl leading-none">{a.emoji}</span>
          <span>{a.title[l]}</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{a.description[l]}</p>
        {a.source && (
          <p className="text-xs text-zinc-400 mt-4 italic">{a.source[l]}</p>
        )}
      </header>

      <ContentBlocks blocks={a.blocks} locale={l} />

      {/* Acciones: LinkedIn + descargas */}
      <section className="no-print mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <p className="font-medium mb-1">{ui.actionsTitle[l]}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">{ui.actionsNote[l]}</p>
        <ArticleActions articulo={a} locale={l} />
      </section>

      {/* Contenido relacionado */}
      {related.length > 0 && (
        <section className="no-print mt-12">
          <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-4">{ui.related[l]}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${locale}/conocimiento/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-[#C8006A]/40 transition-colors"
              >
                <span aria-hidden className="text-2xl">{r.emoji}</span>
                <span className="flex-1 text-sm font-medium group-hover:text-[#C8006A] transition-colors">
                  {r.title[l]}
                </span>
                <ArrowRight size={15} className="text-zinc-400 group-hover:text-[#C8006A] transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
