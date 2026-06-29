import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { BookOpen, PenLine, CalendarDays, ArrowRight } from 'lucide-react'

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations()

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 text-[#C8006A] text-xs font-medium tracking-widest uppercase mb-6">
            <span className="w-6 h-px bg-[#C8006A]" />
            {t('hero.tag')}
          </div>
          <h1 className="text-5xl md:text-6xl font-medium leading-tight mb-6">
            {t('hero.title1')}<br />
            {t('hero.title2')}{' '}
            <em className="not-italic text-[#C8006A]">{t('hero.title3')}</em>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href={`/${locale}/comunidad`}
              className="px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors"
            >
              {t('hero.cta_primary')}
            </Link>
            <Link
              href={`/${locale}/conocimiento`}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors border-b border-zinc-300 dark:border-zinc-600 pb-0.5"
            >
              {t('hero.cta_secondary')}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex gap-8 mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-2xl font-medium">2K<span className="text-[#C8006A]">+</span></p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('hero.stat_members')}</p>
            </div>
            <div>
              <p className="text-2xl font-medium">18<span className="text-[#C8006A]">+</span></p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('hero.stat_countries')}</p>
            </div>
            <div>
              <p className="text-2xl font-medium">100<span className="text-[#C8006A]">%</span></p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('hero.stat_free')}</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" />
            <div className="absolute inset-8 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#C8006A]/10 border border-[#C8006A]/30 flex items-center justify-center">
                <span className="text-4xl font-medium text-[#C8006A]">MTL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">
            {t('features.tag')}
          </p>
          <h2 className="text-3xl font-medium">{t('features.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-[#C8006A]/20 bg-[#C8006A]/5 dark:bg-[#C8006A]/10">
            <div className="w-10 h-10 rounded-lg bg-[#C8006A]/10 border border-[#C8006A]/20 flex items-center justify-center mb-5">
              <BookOpen size={18} className="text-[#C8006A]" />
            </div>
            <h3 className="font-medium mb-2">{t('features.card1_title')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t('features.card1_desc')}</p>
            <Link href={`/${locale}/conocimiento`} className="mt-4 flex items-center gap-1 text-xs text-[#C8006A] hover:gap-2 transition-all">
              Explorar <ArrowRight size={12} />
            </Link>
          </div>

          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5">
              <PenLine size={18} className="text-[#C8006A]" />
            </div>
            <h3 className="font-medium mb-2">{t('features.card2_title')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t('features.card2_desc')}</p>
            <Link href={`/${locale}/blog`} className="mt-4 flex items-center gap-1 text-xs text-[#C8006A] hover:gap-2 transition-all">
              Leer <ArrowRight size={12} />
            </Link>
          </div>

          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5">
              <CalendarDays size={18} className="text-[#C8006A]" />
            </div>
            <h3 className="font-medium mb-2">{t('features.card3_title')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t('features.card3_desc')}</p>
            <Link href={`/${locale}/eventos`} className="mt-4 flex items-center gap-1 text-xs text-[#C8006A] hover:gap-2 transition-all">
              Ver eventos <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-medium text-white mb-2">¿Lista para empezar?</h2>
            <p className="text-zinc-400 text-sm">Únete a más de 2.000 mujeres que ya están transformando su carrera.</p>
          </div>
          <a
            href="https://www.linkedin.com/company/mujeres-testing-latam/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors flex items-center gap-2"
          >
            Seguirnos en LinkedIn <ArrowRight size={14} />
          </a>
        </div>
      </section>

    </div>
  )
}
