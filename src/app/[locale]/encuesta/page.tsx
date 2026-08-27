import { setRequestLocale } from 'next-intl/server'
import SurveyIA from '@/components/SurveyIA'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = {
    es: 'Mujeres Testing e Inteligencia Artificial',
    en: 'Mujeres Testing and Artificial Intelligence',
  }
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
  const l = locale === 'en' ? 'en' : 'es'

  const t = {
    kicker: { es: 'Encuesta', en: 'Survey' },
    title: {
      es: 'Mujeres Testing e Inteligencia Artificial',
      en: 'Mujeres Testing and Artificial Intelligence',
    },
    intro: {
      es: 'Queremos conocer cómo vives la IA en tu día a día: cómo la usas, qué sientes, qué te preocupa y qué te gustaría aprender. Son pocas preguntas y tus respuestas son anónimas.',
      en: 'We want to know how you experience AI day to day: how you use it, how you feel, what worries you and what you would like to learn. It is just a few questions and your answers are anonymous.',
    },
    incentive: {
      es: 'Al responder, contribuyes a comprender cómo nos está afectando el uso de estas nuevas herramientas. Cuando terminemos el análisis, publicaremos los resultados y podrás participar en un proceso de mentoring de Inteligencia Artificial aplicada al Testing, para resolver dudas, aprender más y aplicarla en tus procesos de la mejor forma posible.',
      en: 'By answering, you help us understand how the use of these new tools is affecting us. When we finish the analysis, we will publish the results and you will be able to join a mentoring process on Artificial Intelligence applied to Testing, to resolve doubts, learn more and apply it in your work in the best possible way.',
    },
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{t.kicker[l]}</p>
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{t.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.intro[l]}</p>
        <div className="mt-5 rounded-xl border border-[#C8006A]/20 bg-[#C8006A]/5 p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.incentive[l]} <span className="align-middle">🩷</span>
          </p>
        </div>
      </div>

      <SurveyIA locale={locale} />
    </div>
  )
}
