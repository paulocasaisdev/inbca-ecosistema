// ============================================================
// INBCA - Instituto Nilson Bispo Casinha Amarela
// Layout do Painel Administrativo
// ============================================================

import React from 'react'
import { BarraLateralINBC } from '@/componentes/layout/BarraLateralINBC'

export default function LayoutPainel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fffdf5] dark:bg-slate-950 flex transition-colors">
      <BarraLateralINBC />
      <div className="flex-1 pl-72 transition-all duration-300">
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
