import { setRequestLocale } from 'next-intl/server'
import { Calendar, Globe, Sparkles, ArrowUpRight, Coffee, Users } from 'lucide-react'

type Locale = 'es' | 'en'

const ui = {
  kicker: { es: 'Comunidad', en: 'Community' },
  title: { es: 'Eventos de Mujeres Testing Latam', en: 'Mujeres Testing Latam Events' },
  description: {
    es: 'Charlas, mentorías y encuentros organizados por la comunidad, online y presenciales en distintos países.',
    en: 'Talks, mentorships and meetups organized by the community, online and in person across countries.',
  },
  juntaTag: { es: 'Queremos conocerte · Chile', en: 'We want to meet you · Chile' },
  juntaTitle: { es: 'Primera junta de mujeres en testing - Chile', en: 'First women-in-testing meetup - Chile' },
  juntaDesc: {
    es: 'Estamos explorando un primer encuentro presencial en Santiago de Chile. Cuéntanos si te interesaría participar: nos ayuda a saber cuántas somos y a organizarlo.',
    en: 'We are exploring a first in-person meetup in Santiago, Chile. Tell us if you would be interested: it helps us know how many we are and organize it.',
  },
  juntaBtn: { es: 'Me interesa, quiero contarles', en: "I'm interested, let me tell you" },
  featured: { es: 'Inscripciones abiertas', en: 'Registrations open' },
  featuredTitle: { es: 'Encuentro presencial: un café entre mujeres del testing', en: 'In-person meetup: a coffee among women in testing' },
  featuredDesc: {
    es: 'Un espacio cercano y seguro para conocernos, compartir experiencias laborales y crear comunidad. Grupo reducido de 15 personas · cada una paga lo que consume.',
    en: 'A close, safe space to meet, share work experiences and build community. Small group of 15 · each pays for what she consumes.',
  },
  featuredSpots: { es: 'Cupos limitados (15)', en: 'Limited spots (15)' },
  featuredBtn: { es: 'Quiero inscribirme', en: 'I want to sign up' },
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

      {/* Evento destacado: primera junta en Chile (sondeo de interés) */}
      <div className="rounded-2xl border border-[#C8006A]/30 bg-gradient-to-br from-[#C8006A]/10 to-transparent p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#C8006A] text-white font-medium">
            <Users size={12} /> {ui.juntaTag[l]}
          </span>
        </div>
        <h3 className="font-medium text-xl mb-2">{ui.juntaTitle[l]}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 max-w-2xl">{ui.juntaDesc[l]}</p>
        <a
          href={`/${locale}/junta-chile`}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
        >
          {ui.juntaBtn[l]} <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Evento destacado: encuentro presencial con inscripción */}
      <div className="rounded-2xl border border-[#C8006A]/30 bg-gradient-to-br from-[#C8006A]/10 to-transparent p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#C8006A] text-white font-medium">
            <Coffee size={12} /> {ui.featured[l]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[#C8006A]/10 text-[#C8006A] font-medium">
            <Users size={12} /> {ui.featuredSpots[l]}
          </span>
        </div>
        <h3 className="font-medium text-xl mb-2">{ui.featuredTitle[l]}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 max-w-2xl">{ui.featuredDesc[l]}</p>
        <a
          href={`/${locale}/encuentro`}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
        >
          {ui.featuredBtn[l]} <ArrowUpRight size={14} />
        </a>
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
