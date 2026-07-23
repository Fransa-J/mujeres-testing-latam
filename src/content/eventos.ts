// Agenda de eventos de testing en Latinoamérica.
// Contenido curado a mano: cada evento es un enlace + metadatos para filtrar
// y decidir; el botón lleva a la inscripción en la fuente original.
//
// NOTA: los eventos de abajo son DATOS DE EJEMPLO (maqueta). Se reemplazan por
// los eventos reales cuando estén disponibles.

export type Locale = 'es' | 'en'

export type Modalidad = 'online' | 'presencial' | 'hibrido'

export interface Evento {
  id: string
  nombre: string
  /** Fecha en formato ISO 'YYYY-MM-DD'. */
  fecha: string
  /** Hora y zona horaria, ej. '18:00 (GMT-3)'. Opcional. */
  hora?: string
  modalidad: Modalidad
  /** País del evento (para presencial/híbrido). */
  pais?: string
  /** Emoji de bandera del país. */
  bandera?: string
  /** Ciudad del evento (para presencial/híbrido). */
  ciudad?: string
  /** Quién organiza el evento. */
  organizador: string
  /** Enlace para inscribirse / ver el evento. */
  url: string
  /** 'gratis' | 'pago'. */
  precio?: 'gratis' | 'pago'
  /** Etiquetas de clasificación, ej. ['Automation', 'IA']. */
  tags?: string[]
  /** Descripción breve, bilingüe. */
  descripcion?: { es: string; en: string }
}

// ── Datos de ejemplo (reemplazar por eventos reales) ────────────────────────
export const eventos: Evento[] = [
  {
    id: 'meetup-qa-ia',
    nombre: 'Meetup: Testing con Inteligencia Artificial',
    fecha: '2026-08-14',
    hora: '19:00 (GMT-3)',
    modalidad: 'online',
    organizador: 'Comunidad QA Latam',
    url: 'https://www.linkedin.com/company/mujeres-testing-latam/',
    precio: 'gratis',
    tags: ['IA', 'Automation'],
    descripcion: {
      es: 'Charla práctica sobre cómo usar IA para generar y mantener casos de prueba.',
      en: 'A hands-on talk on using AI to generate and maintain test cases.',
    },
  },
  {
    id: 'workshop-playwright',
    nombre: 'Workshop: Playwright desde cero',
    fecha: '2026-08-28',
    hora: '18:00 (GMT-4)',
    modalidad: 'online',
    organizador: 'Mujeres Testing Latam',
    url: 'https://www.linkedin.com/company/mujeres-testing-latam/',
    precio: 'gratis',
    tags: ['Automation', 'Playwright'],
    descripcion: {
      es: 'Taller introductorio para automatizar tus primeras pruebas E2E con Playwright.',
      en: 'Intro workshop to automate your first E2E tests with Playwright.',
    },
  },
  {
    id: 'automation-summit',
    nombre: 'Automation Summit Latam 2026',
    fecha: '2026-09-05',
    hora: '09:00 (GMT-3)',
    modalidad: 'presencial',
    pais: 'Argentina',
    bandera: '🇦🇷',
    ciudad: 'Buenos Aires',
    organizador: 'Testing Latam',
    url: 'https://www.linkedin.com/company/mujeres-testing-latam/',
    precio: 'pago',
    tags: ['Automation', 'Performance', 'Networking'],
    descripcion: {
      es: 'Conferencia regional con charlas, talleres y espacios de networking sobre automatización.',
      en: 'Regional conference with talks, workshops and networking around automation.',
    },
  },
  {
    id: 'webinar-mcp',
    nombre: 'Webinar: Testing de MCP e IA',
    fecha: '2026-09-20',
    hora: '17:00 (GMT-5)',
    modalidad: 'online',
    organizador: 'Comunidad QA Latam',
    url: 'https://www.linkedin.com/company/mujeres-testing-latam/',
    precio: 'gratis',
    tags: ['IA', 'MCP'],
    descripcion: {
      es: 'Cómo abordar el testing de integraciones con modelos de IA y protocolos MCP.',
      en: 'How to approach testing of AI model integrations and MCP protocols.',
    },
  },
  {
    id: 'cafe-qa-mexico',
    nombre: 'Café QA México',
    fecha: '2026-10-02',
    hora: '10:00 (GMT-6)',
    modalidad: 'presencial',
    pais: 'México',
    bandera: '🇲🇽',
    ciudad: 'Ciudad de México',
    organizador: 'QA Community MX',
    url: 'https://www.linkedin.com/company/mujeres-testing-latam/',
    precio: 'gratis',
    tags: ['Manual', 'Networking'],
    descripcion: {
      es: 'Encuentro presencial para compartir experiencias y hacer networking entre testers.',
      en: 'In-person meetup to share experiences and network among testers.',
    },
  },
]

/** Devuelve los eventos ordenados por fecha ascendente (próximos primero). */
export function eventosOrdenados(): Evento[] {
  return [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha))
}
