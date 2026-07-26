import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import ConocimientoList from '@/components/ConocimientoList'
import type { Locale } from '@/content/articulos'

const recursosLabel = { es: 'Recursos', en: 'Resources' }
const aiNote = {
  es: {
    a: 'Estos artículos fueron creados por mujeres organizadoras de la comunidad ',
    b: ', con apoyo de un asistente de Inteligencia Artificial para mejorar textos e imágenes ',
  },
  en: {
    a: 'These articles were created by women organizers of the community ',
    b: ', with support from an AI assistant to improve texts and images ',
  },
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = { es: 'Conocimiento', en: 'Knowledge' }
  const description = {
    es: 'Recursos gratuitos para aprender testing desde cero: fundamentos, automatización, API, IA, carrera y más.',
    en: 'Free resources to learn testing from scratch: fundamentals, automation, API, AI, career and more.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/conocimiento`, languages: { es: '/es/conocimiento', en: '/en/conocimiento' } },
  }
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
        <p className="text-sm italic text-zinc-400 mt-3 leading-relaxed">
          {aiNote[l].a}
          <span className="not-italic">😎</span>
          {aiNote[l].b}
          <span className="not-italic">🤖</span>
        </p>
      </div>

      <ConocimientoList locale={l} />
    </div>
  )
}
