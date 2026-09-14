import { setRequestLocale } from 'next-intl/server'
import { Coffee, Users, Wallet, MapPin, Clock, Heart } from 'lucide-react'
import MeetupForm from './MeetupForm'

type Lang = 'es' | 'en'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = {
    es: 'Encuentro presencial de Mujeres Testing Latam',
    en: 'Mujeres Testing Latam in-person meetup',
  }
  const description = {
    es: 'Un café para conocernos entre mujeres del testing, compartir experiencias y crear comunidad. Cupos limitados: inscríbete.',
    en: 'A coffee to meet fellow women in testing, share experiences and build community. Limited spots: sign up.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/encuentro`, languages: { es: '/es/encuentro', en: '/en/encuentro' } },
  }
}

const t = {
  kicker: { es: 'Encuentro presencial', en: 'In-person meetup' },
  title: { es: 'Un café entre mujeres del testing', en: 'A coffee among women in testing' },
  intro: {
    es: 'Queremos crear un espacio cercano para conocernos, pasar un rato juntas y compartir nuestras experiencias laborales en el mundo del testing. Un momento íntimo, seguro y entre mujeres.',
    en: 'We want to create a close-knit space to meet, spend time together and share our work experiences in the testing world. An intimate, safe, women-only moment.',
  },
  details: [
    {
      icon: Users,
      title: { es: 'Grupo reducido', en: 'Small group' },
      desc: { es: 'Solo 15 lugares para que la conversación sea cercana y todas tengan espacio.', en: 'Only 15 spots so the conversation stays close and everyone has room.' },
    },
    {
      icon: Coffee,
      title: { es: 'En un café', en: 'At a café' },
      desc: { es: 'El lugar se confirmará pronto a las inscritas seleccionadas.', en: 'The venue will be confirmed soon to selected participants.' },
    },
    {
      icon: Clock,
      title: { es: 'Horario', en: 'Time' },
      desc: { es: 'Por definir: lo coordinaremos con las participantes.', en: 'To be defined: we will coordinate it with participants.' },
    },
    {
      icon: Wallet,
      title: { es: 'Cada una paga lo suyo', en: 'Each pays her own' },
      desc: { es: 'No contamos con fondos, así que cada quien paga lo que consume.', en: 'We have no funding, so each person pays for what she consumes.' },
    },
  ],
  note: {
    es: 'Como los cupos son limitados, las inscripciones se revisan una a una para cuidar que sea un espacio de confianza. Te escribiremos por correo para confirmarte.',
    en: 'Since spots are limited, registrations are reviewed one by one to keep it a trusted space. We will email you to confirm.',
  },
  formTitle: { es: 'Inscríbete', en: 'Sign up' },
}

export default function EncuentroPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const l = locale as Lang

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{t.kicker[l]}</p>
        <h1 className="text-3xl sm:text-4xl font-medium mb-4">{t.title[l]}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.intro[l]}</p>
      </div>

      {/* Detalles */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {t.details.map(({ icon: Icon, title, desc }) => (
          <div key={title.es} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <Icon size={18} className="text-[#C8006A] mb-3" />
            <h3 className="font-medium text-sm mb-1">{title[l]}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc[l]}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 rounded-2xl border border-[#C8006A]/20 bg-[#C8006A]/5 p-5 flex gap-3">
        <Heart size={18} className="text-[#C8006A] shrink-0 mt-0.5" />
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{t.note[l]}</p>
      </div>

      <h2 className="text-2xl font-medium mb-6 flex items-center gap-2">
        <MapPin size={22} className="text-[#C8006A]" /> {t.formTitle[l]}
      </h2>
      <MeetupForm locale={locale} />
    </div>
  )
}
