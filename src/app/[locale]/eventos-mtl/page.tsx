import { setRequestLocale } from 'next-intl/server'
import { Calendar, Globe, Sparkles, ArrowUpRight } from 'lucide-react'

type Locale = 'es' | 'en'

const ui = {
  kicker: { es: 'Comunidad', en: 'Community' },
  title: { es: 'Eventos de Mujeres Testing Latam', en: 'Mujeres Testing Latam Events' },
  description: {
    es: 'Charlas, mentorías y encuentros organizados por la comunidad, online y presenciales en distintos países.',
    en: 'Talks, mentorships and meetups organized by the community, online and in person across countries.',
  },
  soon: { es: 'Próximamente', en: 'Coming soon' },
  dateLabel: { es: 'Fecha', en: 'Date' },
  modalityLabel: { es: 'Modalidad', en: 'Format' },
  tbd: { es: 'Por definir', en: 'To be defined' },
  detailsTbd: { es: 'Detalles por definir', en: 'Details to be defined' },
  ask: {
    es: '¿Quieres inscribirte o hacer preguntas? Escríbenos',
    en: 'Want to sign up or ask questions? Write to us',
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

type MtlEvento = {
  id: string
  nombre: { es: string; en: string }
  detailsTbd?: boolean
  showAsk?: boolean
}

const eventos: MtlEvento[] = [
  {
    id: 'taller-ia-testing',
    nombre: {
      es: 'Taller participativo de IA aplicada al Testing',
      en: 'Hands-on Workshop: AI applied to Testing',
    },
    showAsk: true,
  },
  {
    id: 'networking-testing',
    nombre: { es: 'Networking en Testing', en: 'Testing Networking' },
    detailsTbd: true,
  },
]

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = { es: 'Eventos de la comunidad', en: 'Community events' }
  const description = {
    es: 'Charlas, talleres y encuentros organizados por Mujeres Testing Latam.',
    en: 'Talks, workshops and meetups organized by Mujeres Testing Latam.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/eventos-mtl`, languages: { es: '/es/eventos-mtl', en: '/en/eventos-mtl' } },
  }
}

export default function EventosMTL({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const l = locale as Locale

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{ui.kicker[l]}</p>
        <h1 className="text-4xl font-medium mb-4">{ui.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{ui.description[l]}</p>
      </div>

      <div className="flex flex-col gap-4 mb-16">
        {eventos.map((ev) => (
          <div
            key={ev.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#C8006A]/10 text-[#C8006A] font-medium">
                <Sparkles size={12} /> {ui.soon[l]}
              </span>
            </div>

            <h3 className="font-medium text-lg mb-3">{ev.nombre[l]}</h3>

            {ev.detailsTbd ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{ui.detailsTbd[l]}</p>
            ) : (
              <div className="flex flex-col gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-zinc-400" /> {ui.dateLabel[l]}: {ui.tbd[l]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe size={13} className="text-zinc-400" /> {ui.modalityLabel[l]}: {ui.tbd[l]}
                </span>
              </div>
            )}

            {ev.showAsk && (
              <a
                href={`/${locale}/contacto`}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
              >
                {ui.ask[l]} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* CTA: proponer evento */}
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
