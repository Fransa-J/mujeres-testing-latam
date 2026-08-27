import { setRequestLocale } from 'next-intl/server'
import SurveyIA from '@/components/SurveyIA'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = { es: 'Encuesta: Mujeres, testing e IA', en: 'Survey: Women, testing and AI' }
  const description = {
    es: 'Cuéntanos cómo vives la Inteligencia Artificial en tu trabajo de testing: usos, emociones, miedos y qué te gustaría aprender.',
    en: 'Tell us how you experience AI in your testing work: uses, emotions, fears and what you’d like to learn.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/encuesta`, languages: { es: '/es/encuesta', en: '/en/encuesta' } },
  }
}

export default function EncuestaPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Encuesta</p>
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">
          Las mujeres del testing y la Inteligencia Artificial 🤖
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Queremos conocer cómo vives la IA en tu día a día: cómo la usas, qué sientes, qué te preocupa y
          qué te gustaría aprender. Son pocas preguntas y tus respuestas son anónimas. 💛
        </p>
      </div>

      <SurveyIA />
    </div>
  )
}
