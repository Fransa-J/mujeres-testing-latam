import { ImageResponse } from 'next/og'

export const alt = 'Mujeres Testing Latam · Comunidad de QA y Testing de Software'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Imagen de vista previa (Open Graph) generada con la identidad de MTL.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#0b0b0f',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 22, height: 22, borderRadius: 9999, background: '#C8006A' }} />
          <div style={{ fontSize: 26, letterSpacing: 6, color: '#C8006A' }}>
            COMUNIDAD LATINOAMERICANA
          </div>
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 28, lineHeight: 1.05 }}>
          Mujeres Testing Latam
        </div>
        <div style={{ fontSize: 38, color: '#a1a1aa', marginTop: 26 }}>
          Comunidad de QA y Testing de Software
        </div>
        <div style={{ fontSize: 28, color: '#71717a', marginTop: 40 }}>mujerestesting.com</div>
      </div>
    ),
    { ...size },
  )
}
