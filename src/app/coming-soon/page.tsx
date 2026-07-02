import { Linkedin } from 'lucide-react'

export const metadata = {
  title: 'Muy pronto · Mujeres Testing Latam',
  description: 'Estamos construyendo algo especial. Muy pronto en línea.',
}

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Resplandor de fondo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#C8006A]/20 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#C8006A] flex items-center justify-center font-semibold text-lg">
            MTL
          </div>
          <span className="text-lg font-medium tracking-tight">Mujeres Testing Latam</span>
        </div>

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8006A]/40 bg-[#C8006A]/10 text-xs font-medium text-[#C8006A]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C8006A] animate-pulse" />
          Muy pronto · Coming soon
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-medium leading-tight">
            Estamos construyendo
            <br />
            algo especial
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            Un espacio amoroso, seguro y de calidad para que más mujeres inicien, avancen y prosperen
            en el camino del testing. Estamos afinando los últimos detalles.
          </p>
          <p className="text-sm text-zinc-500">
            We&apos;re putting the finishing touches on our new home. We&apos;ll be live soon!
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://www.linkedin.com/company/mujeres-testing-latam/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C8006A] hover:border-[#C8006A]/40 transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="text-xs text-zinc-600 pt-4">
          © {new Date().getFullYear()} Mujeres Testing Latam
        </p>
      </div>
    </main>
  )
}
