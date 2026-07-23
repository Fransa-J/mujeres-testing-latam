import { setRequestLocale } from 'next-intl/server'
import { CalendarClock } from 'lucide-react'

type Locale = 'es' | 'en'

const ui = {
  kicker: { es: 'Comunidad', en: 'Community' },
  title: { es: 'Eventos de Mujeres Testing Latam', en: 'Mujeres Testing Latam Events' },
  description: {
    es: 'Charlas, mentorías y encuentros organizados por la comunidad, online y presenciales en distintos países.',
    en: 'Talks, mentorships and meetups organized by the community, online and in person across countries.',
  },
  emptyTitle: { es: 'Aún no hay eventos', en: 'No events yet' },
  emptyDesc: {
    es: 'Por ahora no tenemos eventos propios agendados, pero muy pronto los tendremos. ¡Mantente atenta!',
    en: 'We don’t have our own events scheduled right now, but we’ll have them very soon. Stay tuned!',
  },
  ctaTitle: {
    es: '¿Quieres organizar un evento con MTL?',
    en: 'Would you like to organize an event with MTL?',
  },
  ctaDesc: {
    es: 'Escríbenos y te ayudamos a organizarlo bajo el paraguas de la comunidad.',
    en: 'Write to us and we’ll help you organize it under the community’s umbrella.',
  },
  ctaBtn: { es: 'Proponer evento', en: 'Propose an event' },
}

export default function EventosMTL({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const l = locale as Locale

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{ui.kicker[l]}</p>
        <h1 className="text-4xl font-medium mb-4">{ui.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{ui.description[l]}</p>
      </div>

      {/* Estado vacío: aún no hay eventos propios */}
      <div className="flex flex-col items-center text-center gap-4 p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mb-12">
        <span className="w-14 h-14 rounded-full bg-[#C8006A]/10 flex items-center justify-center">
          <CalendarClock size={26} className="text-[#C8006A]" />
        </span>
        <h2 className="text-xl font-medium">{ui.emptyTitle[l]}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">{ui.emptyDesc[l]}</p>
      </div>

      <div className="p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
        <h3 className="font-medium mb-2">{ui.ctaTitle[l]}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{ui.ctaDesc[l]}</p>
        <a
          href={`/${locale}/contacto`}
          className="inline-block px-5 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {ui.ctaBtn[l]}
        </a>
      </div>
    </div>
  )
}
