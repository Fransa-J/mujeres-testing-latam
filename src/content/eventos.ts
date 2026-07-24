// Agenda de eventos de testing en Latinoamérica.
// Contenido curado a mano: cada evento es un enlace + metadatos para filtrar
// y decidir; el botón lleva a la inscripción en la fuente original.
// Los logos se alojan localmente en /public/images/eventos.

export type Locale = 'es' | 'en'

export type Modalidad = 'online' | 'presencial' | 'hibrido'

export interface Evento {
  id: string
  nombre: string
  /** Fecha (inicio) en formato ISO 'YYYY-MM-DD'. */
  fecha: string
  /** Fecha de fin en ISO 'YYYY-MM-DD' para eventos de varios días. Opcional. */
  fechaFin?: string
  /** Hora y zona horaria, ej. '18:00 (GMT-3)'. Opcional. */
  hora?: string
  modalidad: Modalidad
  /** País del evento. */
  pais?: string
  /** Emoji de bandera del país. */
  bandera?: string
  /** Ciudad del evento. */
  ciudad?: string
  /** Quién organiza el evento. Opcional. */
  organizador?: string
  /** Enlace al sitio del organizador. Opcional. */
  organizadorUrl?: string
  /** Enlace para inscribirse / ver el evento. */
  url: string
  /** 'gratis' | 'pago'. */
  precio?: 'gratis' | 'pago'
  /** Etiquetas de clasificación, ej. ['Automation', 'IA']. */
  tags?: string[]
  /** Ruta del logo del evento en /public. Opcional. */
  logo?: string
  /** true si el logo es claro y necesita fondo oscuro para verse. */
  logoDark?: boolean
}

// ── Eventos reales de testing en Latinoamérica ──────────────────────────────
export const eventos: Evento[] = [
  {
    id: 'hands-on-testing',
    nombre: 'Hands on Testing',
    fecha: '2026-08-12',
    fechaFin: '2026-08-15',
    modalidad: 'hibrido',
    pais: 'México',
    bandera: '🇲🇽',
    ciudad: 'Guadalajara',
    organizador: 'QA Minds',
    organizadorUrl: 'https://qaminds.com/',
    url: 'https://handsontesting.com/',
    tags: ['Conferencia'],
    logo: '/images/eventos/hands-on-testing.png',
  },
  {
    id: 'testing-bolivia',
    nombre: 'Testing Day Bolivia',
    fecha: '2026-08-21',
    modalidad: 'presencial',
    pais: 'Bolivia',
    bandera: '🇧🇴',
    ciudad: 'Cochabamba',
    organizador: 'Testing Bolivia',
    organizadorUrl: 'https://testingbolivia.com/',
    url: 'https://testingbolivia.com/',
    precio: 'gratis',
    tags: ['Conferencia'],
    logo: '/images/eventos/testing-bolivia.png',
    logoDark: true,
  },
  {
    id: 'testing-chile',
    nombre: 'Testing Day Chile',
    fecha: '2026-08-27',
    fechaFin: '2026-08-28',
    modalidad: 'hibrido',
    pais: 'Chile',
    bandera: '🇨🇱',
    ciudad: 'Santiago',
    organizador: 'Testing en Chile',
    organizadorUrl: 'https://www.testingenchile.cl/',
    url: 'https://www.testingenchile.cl/testing-day-chile/',
    precio: 'pago',
    tags: ['Conferencia'],
    logo: '/images/eventos/testing-chile.png',
  },
  {
    id: 'testearla',
    nombre: 'Testear.la',
    fecha: '2026-09-09',
    fechaFin: '2026-09-10',
    modalidad: 'hibrido',
    pais: 'Argentina',
    bandera: '🇦🇷',
    ciudad: 'Buenos Aires',
    organizador: 'Crowdar',
    organizadorUrl: 'https://www.crowdar.com/',
    url: 'https://www.testear.la/',
    tags: ['Conferencia'],
    logo: '/images/eventos/testearla.png',
  },
  {
    id: 'testing-day-peru',
    nombre: 'Testing Day Perú',
    fecha: '2026-09-18',
    fechaFin: '2026-09-19',
    modalidad: 'hibrido',
    pais: 'Perú',
    bandera: '🇵🇪',
    ciudad: 'Lima',
    organizador: 'Testing Perú',
    url: 'https://testingperu.com/',
    precio: 'gratis',
    tags: ['Conferencia'],
    logo: '/images/eventos/testing-day-peru.svg',
    logoDark: true,
  },
  {
    id: 'quality-sense',
    nombre: 'Quality Sense Conf',
    fecha: '2026-10-13',
    modalidad: 'hibrido',
    pais: 'Uruguay',
    bandera: '🇺🇾',
    ciudad: 'Montevideo',
    organizador: 'Abstracta',
    organizadorUrl: 'https://abstracta.us/es/',
    url: 'https://qualitysenseconf.com/',
    precio: 'gratis',
    tags: ['Conferencia'],
    logo: '/images/eventos/quality-sense.png',
    logoDark: true,
  },
  {
    id: 'testing-venezuela',
    nombre: 'Testing Venezuela',
    fecha: '2026-11-24',
    fechaFin: '2026-11-28',
    modalidad: 'presencial',
    pais: 'Venezuela',
    bandera: '🇻🇪',
    organizador: 'Testing Capítulo Venezuela',
    organizadorUrl: 'https://testingcapitulovenezuela.club/',
    url: 'https://testingcapitulovenezuela.club/',
    tags: ['Conferencia'],
    logo: '/images/eventos/testing-venezuela.png',
    logoDark: true,
  },
]

/** Devuelve los eventos ordenados por fecha ascendente (próximos primero). */
export function eventosOrdenados(): Evento[] {
  return [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha))
}
