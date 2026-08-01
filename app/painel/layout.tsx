// ============================================================
// INBCA - Instituto Nilson Bispo Casinha Amarela
// Layout do Painel Administrativo (Responsivo)
// ============================================================

import React from 'react'
import { BarraLateralINBC } from '@/componentes/layout/BarraLateralINBC'

export default function LayoutPainel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fffdf5] dark:bg-slate-950 flex flex-col lg:flex-row transition-colors overflow-x-hidden">
      <BarraLateralINBC />
      <div className="flex-1 w-full pt-16 lg:pt-0 lg:pl-72 transition-all duration-300 overflow-x-hidden">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
