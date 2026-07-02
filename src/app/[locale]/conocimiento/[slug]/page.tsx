import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import ContentBlocks from '@/components/ContentBlocks'
import TrackedLink from '@/components/TrackedLink'
import { articulos, getArticulo, categories, type Locale } from '@/content/articulos'

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }))
}

const ui = {
  back: { es: 'Volver a Conocimiento', en: 'Back to Knowledge' },
  download: { es: 'Descargar PDF', en: 'Download PDF' },
  pdfTitle: { es: 'Documento original', en: 'Original document' },
  pdfNote: {
    es: 'Puedes ver el PDF completo aquí o descargarlo para guardarlo.',
    en: 'You can view the full PDF here or download it to keep.',
  },
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

  return (
    <article className="animate-fade-in max-w-3xl mx-auto px-6 py-16">
      <Link
        href={`/${locale}/conocimiento`}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors mb-10"
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
        <h1 className="text-3xl sm:text-4xl font-medium leading-tight mb-4">{a.title[l]}</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">{a.description[l]}</p>
        {a.source && (
          <p className="text-xs text-zinc-400 mt-4 italic">{a.source[l]}</p>
        )}
      </header>

      <ContentBlocks blocks={a.blocks} locale={l} />

      <section className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C8006A]/10 border border-[#C8006A]/20 flex items-center justify-center shrink-0">
              <FileText size={18} className="text-[#C8006A]" />
            </div>
            <div>
              <p className="font-medium text-sm">{ui.pdfTitle[l]}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{ui.pdfNote[l]}</p>
            </div>
          </div>
          <TrackedLink
            event="pdf_download"
            eventData={{ slug: a.slug }}
            href={a.pdf}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
          >
            <Download size={15} /> {ui.download[l]}
          </TrackedLink>
        </div>
        <object
          data={a.pdf}
          type="application/pdf"
          className="w-full h-[600px] rounded-xl border border-zinc-200 dark:border-zinc-800"
        >
          <iframe src={a.pdf} className="w-full h-[600px] rounded-xl" title={a.title[l]} />
        </object>
      </section>
    </article>
  )
}
