import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import ConocimientoList from '@/components/ConocimientoList'
import type { Locale } from '@/content/articulos'

const recursosLabel = { es: 'Recursos', en: 'Resources' }
const contribute = {
  es: { text: '¿Quieres contribuir con un recurso?', link: 'Escríbenos.' },
  en: { text: 'Want to contribute a resource?', link: 'Write to us.' },
}

export default function Conocimiento({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations('conocimiento')
  const l = locale as Locale

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{recursosLabel[l]}</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <ConocimientoList locale={l} />

      <div className="text-center mt-16">
        <p className="text-xs text-zinc-400">{contribute[l].text}</p>
        <a
          href={`/${locale}/contacto`}
          className="inline-block mt-2 text-sm font-medium text-[#C8006A] hover:underline"
        >
          {contribute[l].link}
        </a>
      </div>
    </div>
  )
}
