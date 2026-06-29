import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { FileText, Download, Eye } from 'lucide-react'

const resources = [
  {
    id: 1,
    title: 'Introducción al Testing de Software',
    description: 'Conceptos fundamentales para empezar desde cero en el mundo del testing.',
    category: 'Fundamentos',
    file: '/pdfs/intro-testing.pdf',
  },
  {
    id: 2,
    title: 'Testing Manual: guía práctica',
    description: 'Aprende a diseñar casos de prueba, reportar bugs y trabajar con herramientas básicas.',
    category: 'Manual',
    file: '/pdfs/testing-manual.pdf',
  },
  {
    id: 3,
    title: 'Automatización para principiantes',
    description: 'Primeros pasos en automatización: herramientas, lenguajes y frameworks más usados.',
    category: 'Automatización',
    file: '/pdfs/automatizacion.pdf',
  },
]

const categories = ['Todos', 'Fundamentos', 'Manual', 'Automatización', 'Metodologías', 'Soft skills']

export default function Conocimiento({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations('conocimiento')

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Recursos</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-xs border transition-colors ${
              i === 0
                ? 'bg-[#C8006A] text-white border-[#C8006A]'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-[#C8006A] hover:text-[#C8006A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <div key={r.id} className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#C8006A]/10 border border-[#C8006A]/20 flex items-center justify-center shrink-0">
                <FileText size={18} className="text-[#C8006A]" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                {r.category}
              </span>
            </div>
            <div>
              <h3 className="font-medium mb-1.5 text-sm">{r.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{r.description}</p>
            </div>
            <div className="flex gap-2 mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <a
                href={r.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors"
              >
                <Eye size={13} /> {t('view')}
              </a>
              <a
                href={r.file}
                download
                className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#C8006A] transition-colors ml-4"
              >
                <Download size={13} /> {t('download')}
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-400 text-center mt-12">
        Próximamente más recursos. ¿Querés contribuir?{' '}
        <a href={`/${locale}/contacto`} className="text-[#C8006A] hover:underline">Escribinos.</a>
      </p>
    </div>
  )
}
