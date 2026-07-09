import type { Articulo, Block, Locale } from './articulos'

/** Convierte un bloque de contenido a Markdown. */
function blockToMarkdown(block: Block, locale: Locale): string {
  switch (block.type) {
    case 'heading':
      return `## ${block.emoji ? block.emoji + ' ' : ''}${block.text[locale]}`
    case 'paragraph':
      return block.text[locale]
    case 'list':
      return block.items.map((it) => `- ${it[locale]}`).join('\n')
    case 'cards':
      return block.items.map((c) => `- **${c.title[locale]}** — ${c.body[locale]}`).join('\n')
    case 'callout': {
      const lines: string[] = []
      if (block.title) lines.push(`> **${block.title[locale]}**`)
      block.items.forEach((it) => lines.push(`> ${it[locale]}`))
      return lines.join('\n')
    }
    case 'table': {
      const head = `| ${block.headers.map((h) => h[locale]).join(' | ')} |`
      const sep = `| ${block.headers.map(() => '---').join(' | ')} |`
      const rows = block.rows.map((r) => `| ${r.map((c) => c[locale]).join(' | ')} |`)
      return [head, sep, ...rows].join('\n')
    }
    case 'code': {
      const code = typeof block.text === 'string' ? block.text : block.text[locale]
      return '```\n' + code + '\n```'
    }
    default:
      return ''
  }
}

/** Genera el contenido Markdown completo de un artículo. */
export function articuloToMarkdown(a: Articulo, locale: Locale): string {
  const t = (es: string, en: string) => (locale === 'es' ? es : en)
  const parts: string[] = []
  parts.push(`# ${a.emoji} ${a.title[locale]}`)
  parts.push('')
  parts.push(`_${a.description[locale]}_`)
  if (a.source) parts.push(`\n> ${a.source[locale]}`)
  parts.push('')
  a.blocks.forEach((b) => {
    parts.push(blockToMarkdown(b, locale))
    parts.push('')
  })
  parts.push('---')
  parts.push('')
  parts.push(`${t('Publicación original en LinkedIn', 'Original LinkedIn post')}: ${a.linkedin}`)
  parts.push('')
  parts.push(`${t('Por', 'By')} Fransa J. Aravena · Mujeres Testing Latam`)
  parts.push('')
  return parts.join('\n')
}
