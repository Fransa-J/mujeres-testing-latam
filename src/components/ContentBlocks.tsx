import { Info, AlertTriangle, Lightbulb } from 'lucide-react'
import type { Block, Locale } from '@/content/articulos'

const calloutStyles = {
  info: { icon: Info, cls: 'border-[#C8006A]/30 bg-[#C8006A]/5' },
  warning: { icon: AlertTriangle, cls: 'border-amber-500/30 bg-amber-500/5' },
  tip: { icon: Lightbulb, cls: 'border-emerald-500/30 bg-emerald-500/5' },
}

export default function ContentBlocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={i} className="flex items-center gap-2.5 text-xl font-medium mt-10 pt-2 scroll-mt-24">
                {block.emoji && (
                  <span aria-hidden className="text-2xl leading-none">{block.emoji}</span>
                )}
                <span>{block.text[locale]}</span>
              </h2>
            )

          case 'paragraph':
            return (
              <p key={i} className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {block.text[locale]}
              </p>
            )

          case 'list':
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8006A]" />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            )

          case 'cards':
            return (
              <div key={i} className="grid sm:grid-cols-2 gap-3">
                {block.items.map((card, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
                  >
                    <h3 className="font-medium text-sm mb-1.5 text-[#C8006A]">{card.title[locale]}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{card.body[locale]}</p>
                  </div>
                ))}
              </div>
            )

          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                      {block.headers.map((h, j) => (
                        <th key={j} className="text-left font-medium px-4 py-3 text-zinc-700 dark:text-zinc-200">
                          {h[locale]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-300">
                            {cell[locale]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'callout': {
            const variant = block.variant ?? 'info'
            const { icon: Icon, cls } = calloutStyles[variant]
            return (
              <div key={i} className={`rounded-xl border p-5 ${cls}`}>
                <div className="flex gap-3">
                  <Icon size={18} className="shrink-0 mt-0.5 text-[#C8006A]" />
                  <div className="space-y-2">
                    {block.title && (
                      <p className="font-medium text-sm">{block.title[locale]}</p>
                    )}
                    {block.items.map((item, j) => (
                      <p key={j} className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item[locale]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          case 'code':
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                <code>{typeof block.text === 'string' ? block.text : block.text[locale]}</code>
              </pre>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
