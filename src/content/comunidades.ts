// Comunidades amigas: comunidades y eventos con los que Mujeres Testing Latam
// se ha asociado para apoyarse mutuamente. Agregar una nueva es sumar un objeto.

export type Comunidad = {
  id: string
  nombre: string
  descripcion: { es: string; en: string }
  url: string
  logo: string
  logoDark?: string
  pais?: string
  bandera?: string
}

export const comunidades: Comunidad[] = [
  {
    id: 'quality-sense-conf',
    nombre: 'Quality Sense Conf',
    descripcion: {
      es: 'Conferencia internacional de testing y calidad de software, desde Uruguay para toda la región.',
      en: 'International software testing and quality conference, from Uruguay for the whole region.',
    },
    url: 'https://qualitysenseconf.com/',
    logo: '/images/comunidades/quality-sense-conf.png',
    pais: 'Uruguay',
    bandera: '🇺🇾',
  },
]
