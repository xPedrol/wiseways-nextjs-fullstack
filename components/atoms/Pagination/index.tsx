'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

export function Pagination() {
  const [active, setActive] = React.useState(1)

  const next = () => {
    if (active === 10) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <div className="flex items-center gap-4 max-md:text-xl">
      <button
        title="Página anterior"
        aria-label="Página anterior"
        onClick={prev}
        disabled={active === 1}
        className="border rounded-lg p-1"
      >
        <ArrowLeft size={18} />
      </button>
      <p>
        Página <strong>{active}</strong> de <strong>10</strong>
      </p>
      <button
        title="Próxima página"
        aria-label="Próxima página"
        onClick={next}
        disabled={active === 10}
        className="border rounded-lg p-1"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  )
}
