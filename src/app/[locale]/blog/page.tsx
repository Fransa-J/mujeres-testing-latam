import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'Cómo empecé en el testing sin saber nada de tecnología',
    excerpt: 'Mi historia de reconversión profesional: de psicóloga a QA en 8 meses, sin experiencia previa en tecnología.',
    author: 'Valentina García',
    country: '🇦🇷 Argentina',
    date: 'Junio 2025',
    readTime: '5 min',
    category: 'Historia personal',
  },
  {
    id: 2,
    title: 'Las 5 herramientas que uso todos los días como QA',
    excerpt: 'Una lista práctica y honesta de las herramientas que realmente importan cuando arrancás en el mundo del testing.',
    author: 'Camila Rojas',
    country: '🇨🇱 Chile',
    date: 'Mayo 2025',
    readTime: '4 min',
    category: 'Herramientas',
  },
  {
    id: 3,
    title: 'Por qué el testing es una carrera para mujeres',
    excerpt: 'El pensamiento sistemático, la empatía y la atención al detalle: habilidades que traemos y que el testing valora.',
    author: 'Isabella Martínez',
    country: '🇨🇴 Colombia',
    date: 'Abril 2025',
    readTime: '6 min',
    category: 'Opinión',
  },
]

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = useTranslations('blog')

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Voces</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#C8006A]/30 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock size={10} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-medium text-lg mb-2 group-hover:text-[#C8006A] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">{post.author}</span>
                  <span>·</span>
                  <span>{post.country}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                <Link href={`/${locale}/blog/${post.id}`} className="flex items-center gap-1 text-xs text-[#C8006A] hover:gap-2 transition-all">
                  {t('read_more')} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
        <h3 className="font-medium mb-2">¿Querés escribir en el blog?</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Compartí tu historia, aprendizajes o perspectiva con toda la comunidad.</p>
        <Link
          href={`/${locale}/contacto`}
          className="inline-block px-5 py-2.5 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors"
        >
          Proponer un artículo
        </Link>
      </div>
    </div>
  )
}
