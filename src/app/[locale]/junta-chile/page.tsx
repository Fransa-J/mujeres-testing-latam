import { setRequestLocale } from 'next-intl/server'
import JuntaChile from './JuntaChile'

type Lang = 'es' | 'en'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = {
    es: 'Primera junta de mujeres en testing - Chile',
    en: 'First women-in-testing meetup - Chile',
  }
  const description = {
    es: 'Queremos saber cuántas mujeres del testing estarían interesadas en un encuentro presencial en Santiago de Chile. Cuéntanos y sé parte.',
    en: 'We want to know how many women in testing would be interested in an in-person meetup in Santiago, Chile. Tell us and be part of it.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/junta-chile`, languages: { es: '/es/junta-chile', en: '/en/junta-chile' } },
  }
}

const t = {
  kicker: { es: 'Comunidad · Chile', en: 'Community · Chile' },
  title: {
    es: 'Primera junta de mujeres en testing 🇨🇱',
    en: 'First women-in-testing meetup 🇨🇱',
  },
  intro: {
    es: 'Estamos explorando la idea de un primer encuentro presencial en Santiago de Chile para conocernos, compartir experiencias y crear comunidad. Antes de organizarlo, queremos saber cuántas estarían interesadas. Cuéntanos con estas preguntas. 💛',
    en: 'We are exploring the idea of a first in-person meetup in Santiago, Chile to meet, share experiences and build community. Before organizing it, we want to know how many would be interested. Tell us with these questions. 💛',
  },
}

export default function JuntaChilePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const l = locale as Lang

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{t.kicker[l]}</p>
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{t.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.intro[l]}</p>
      </div>

      <JuntaChile locale={locale} />
    </div>
  )
}
