'use client'

import { track } from '@vercel/analytics'
import { Linkedin, FileDown, FileText } from 'lucide-react'
import { articuloToMarkdown } from '@/content/markdown'
import type { Articulo, Locale } from '@/content/articulos'

const ui = {
  linkedin: { es: 'Ver en LinkedIn', en: 'View on LinkedIn' },
  markdown: { es: 'Descargar Markdown', en: 'Download Markdown' },
  pdf: { es: 'Descargar PDF', en: 'Download PDF' },
}

export default function ArticleActions({ articulo, locale }: { articulo: Articulo; locale: Locale }) {
  const downloadMarkdown = () => {
    track('markdown_download', { slug: articulo.slug })
    const md = articuloToMarkdown(articulo, locale)
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${articulo.slug}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="no-print flex flex-wrap gap-3">
      {articulo.linkedin && (
        <a
          href={articulo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('linkedin_post_click', { slug: articulo.slug })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
        >
          <Linkedin size={15} /> {ui.linkedin[locale]}
        </a>
      )}
      {articulo.pdf && (
        <a
          href={articulo.pdf}
          download
          onClick={() => track('pdf_download', { slug: articulo.slug })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:border-[#C8006A] hover:text-[#C8006A] transition-colors"
        >
          <FileText size={15} /> {ui.pdf[locale]}
        </a>
      )}
      <button
        onClick={downloadMarkdown}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:border-[#C8006A] hover:text-[#C8006A] transition-colors"
      >
        <FileDown size={15} /> {ui.markdown[locale]}
      </button>
    </div>
  )
}
