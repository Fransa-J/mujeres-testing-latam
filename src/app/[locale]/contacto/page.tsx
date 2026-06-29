import { setRequestLocale } from 'next-intl/server'
import ContactForm from './ContactForm'

export default function Contacto({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return <ContactForm locale={locale} />
}
