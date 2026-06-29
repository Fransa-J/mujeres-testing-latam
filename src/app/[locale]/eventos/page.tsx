import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react'

const upcomingEvents = [
  {
    id: 1,
    title: 'Meetup MTL — Buenos Aires',
    date: 'Agosto 2, 2025',
    time: '18:00 ART',
    location: 'Buenos Aires, Argentina',
    flag: '🇦🇷',
    modality: 'Presencial',
    capacity: 40,
    description: 'Charlas relámpago sobre testing manual y cierre de networking.',
  },
  {
    id: 2,
    title: 'Webinar: Automatización desde cero',
    date: 'Agosto 15, 2025',
    time: '19:00 CLT',
    location: 'Online — toda Latam',
    flag: '🌎',
    modality: 'Online',
    capacity: 200,
    description: 'Introducción práctica a Cypress para testers que nunca automatizaron.',
  },
  {
    id: 3,
    title: 'Meetup MTL — Ciudad de México',
    date: 'Septiembre 10, 2025',
    time: '17:00 CST',
    location: 'Ciudad de México, México',
    flag: '🇲🇽',
    modality: 'Presencial',
    capacity: 35,
    description: 'Panel de mujeres líderes en QA y sesión de preguntas abiertas.',
  },
]

export default function Eventos({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations('eventos')

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Agenda</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <h2 className="text-lg font-medium mb-6">{t('upcoming')}</h2>
      <div className="grid gap-4 mb-16">
        {upcomingEvents.map((ev) => (
          <div key={ev.id} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {ev.modality}
                  </span>
                  <span className="text-lg">{ev.flag}</span>
                </div>
                <h3 className="font-medium text-base mb-2">{ev.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">{ev.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {ev.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {ev.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {ev.location}</span>
                  <span className="flex items-center gap-1.5"><Users size={12} /> {ev.capacity} lugares</span>
                </div>
              </div>
              <div className="shrink-0">
                <button className="px-5 py-2.5 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors flex items-center gap-2">
                  {t('register')} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
        <h3 className="font-medium mb-2">¿Querés organizar un evento en tu ciudad?</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Escribinos y te ayudamos a organizarlo bajo el paraguas de MTL.</p>
        <a
          href={`/${locale}/contacto`}
          className="inline-block px-5 py-2.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Proponer evento
        </a>
      </div>
    </div>
  )
}
