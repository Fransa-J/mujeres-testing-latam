import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mujeres Testing Latam',
  description: 'Comunidad de mujeres en testing de software para Latinoamérica',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
