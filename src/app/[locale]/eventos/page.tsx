import { setRequestLocale } from 'next-intl/server'
import { Calendar, Clock, MapPin, Globe, Users, ArrowUpRight, Ticket } from 'lucide-react'
import { eventosOrdenados, type Modalidad } from '@/content/eventos'

type Locale = 'es' | 'en'

const ui = {
  kicker: { es: 'Agenda', en: 'Agenda' },
  title: { es: 'Eventos de Testing en Latinoamérica', en: 'Testing Events in Latin America' },
  description: {
    es: 'Una agenda curada de charlas, meetups, talleres y conferencias de testing en la región. Encuentra tu próximo evento y súmate.',
    en: 'A curated agenda of testing talks, meetups, workshops and conferences across the region. Find your next event and join in.',
  },
  sample: {
    es: 'Vista previa con eventos de ejemplo. Pronto se reemplazan por eventos reales.',
    en: 'Preview with sample events. Real events coming soon.',
  },
  register: { es: 'Inscribirme', en: 'Register' },
  free: { es: 'Gratis', en: 'Free' },
  paid: { es: 'De pago', en: 'Paid' },
  online: { es: 'Online', en: 'Online' },
  presencial: { es: 'Presencial', en: 'In person' },
  hibrido: { es: 'Híbrido', en: 'Hybrid' },
  organizes: { es: 'Organiza', en: 'Organized by' },
  ctaTitle: { es: '¿Organizas un evento de testing?', en: 'Organizing a testing event?' },
  ctaDesc: {
    es: 'Escríbenos y lo sumamos a la agenda para darle visibilidad en toda la comunidad.',
    en: 'Write to us and we’ll add it to the agenda to give it visibility across the community.',
  },
  ctaBtn: { es: 'Proponer evento', en: 'Submit an event' },
}

const modalidadLabel: Record<Modalidad, keyof typeof ui> = {
  online: 'online',
  presencial: 'presencial',
  hibrido: 'hibrido',
}

function formatFecha(iso: string, locale: Locale) {
  const d = new Date(iso + 'T00:00:00')
  const full = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
  const day = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', { day: '2-digit' }).format(d)
  const month = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', { month: 'short' })
    .format(d)
    .replace('.', '')
  return { full, day, month }
}

export default function Eventos({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const l = locale as Locale
  const eventos = eventosOrdenados()

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{ui.kicker[l]}</p>
        <h1 className="text-4xl font-medium mb-4">{ui.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{ui.description[l]}</p>
      </div>

      {/* Aviso de maqueta (quitar cuando haya eventos reales) */}
      <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-amber-600 dark:text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {ui.sample[l]}
      </div>

      <div className="flex flex-col gap-4 mb-16">
        {eventos.map((ev) => {
          const f = formatFecha(ev.fecha, l)
          const isOnline = ev.modalidad === 'online'
          return (
            <div
              key={ev.id}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-colors hover:border-[#C8006A]/40"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Chip de fecha */}
                <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-0 sm:w-20 shrink-0 rounded-xl bg-[#C8006A]/10 border border-[#C8006A]/20 px-4 py-3 sm:py-4 text-[#C8006A]">
                  <span className="text-2xl font-semibold leading-none">{f.day}</span>
                  <span className="text-xs font-medium uppercase tracking-wide">{f.month}</span>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                        isOnline
                          ? 'bg-[#C8006A]/10 text-[#C8006A]'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {isOnline ? <Globe size={12} /> : <MapPin size={12} />}
                      {ui[modalidadLabel[ev.modalidad]][l]}
                    </span>
                    {ev.precio && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        <Ticket size={12} /> {ev.precio === 'gratis' ? ui.free[l] : ui.paid[l]}
                      </span>
                    )}
                    {ev.tags?.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-medium text-lg mb-1 group-hover:text-[#C8006A] transition-colors">
                    {ev.nombre}
                  </h3>
                  {ev.descripcion && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                      {ev.descripcion[l]}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {f.full}
                    </span>
                    {ev.hora && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {ev.hora}
                      </span>
                    )}
                    {(ev.ciudad || ev.pais) && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} /> {ev.bandera ? ev.bandera + ' ' : ''}
                        {[ev.ciudad, ev.pais].filter(Boolean).join(', ')}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Users size={12} /> {ui.organizes[l]}: {ev.organizador}
                    </span>
                  </div>
                </div>

                {/* Acción */}
                <div className="shrink-0 flex sm:flex-col items-start sm:items-end justify-end">
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8006A] text-white text-sm font-medium hover:bg-[#a80059] transition-colors"
                  >
                    {ui.register[l]} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
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
