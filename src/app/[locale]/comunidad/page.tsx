import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Users, Globe, Heart, Sparkles } from 'lucide-react'

export default function Comunidad({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations('comunidad')

  const values = [
    { icon: Heart, title: 'Amor y respeto', desc: 'Un espacio donde todas son bienvenidas sin importar su nivel de experiencia.' },
    { icon: Sparkles, title: 'Desde cero', desc: 'No necesitás saber nada para empezar. Aquí te acompañamos desde el principio.' },
    { icon: Globe, title: 'Toda Latinoamérica', desc: 'Presencia en más de 18 países de habla hispana y portuguesa.' },
    { icon: Users, title: 'Comunidad activa', desc: 'Más de 2.000 mujeres compartiendo, aprendiendo y creciendo juntas.' },
  ]

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Quiénes somos</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-20">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <Icon size={20} className="text-[#C8006A] mb-4" />
            <h3 className="font-medium mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-10 text-center">
        <h2 className="text-2xl font-medium text-white mb-3">Sumate a la comunidad</h2>
        <p className="text-zinc-400 text-sm mb-6">Conectate con nosotras en LinkedIn y sé parte del movimiento.</p>
        <a
          href="https://www.linkedin.com/company/mujeres-testing-latam/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors"
        >
          Seguirnos en LinkedIn
        </a>
      </div>
    </div>
  )
}
