import { setRequestLocale } from 'next-intl/server'
import ContactForm from './ContactForm'

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const l = locale === 'en' ? 'en' : 'es'
  const title = { es: 'Contacto', en: 'Contact' }
  const description = {
    es: 'Escríbenos para sumarte, proponer eventos, colaboraciones o resolver dudas.',
    en: 'Write to us to join, propose events, collaborations or ask questions.',
  }
  return {
    title: title[l],
    description: description[l],
    alternates: { canonical: `/${l}/contacto`, languages: { es: '/es/contacto', en: '/en/contacto' } },
  }
}

export default function Contacto({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return <ContactForm locale={locale} />
}
