// ============================================================
// INBCA - Instituto Nilson Bispo Casinha Amarela
// Layout do Painel Administrativo (Responsivo)
// ============================================================

import React from 'react'
import { BarraLateralINBC } from '@/componentes/layout/BarraLateralINBC'
import { createClient } from '@/utils/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function LayoutPainel({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const usuarioDB = await prisma.usuario.findUnique({
    where: { id: user.id }
  })

  const userRole = usuarioDB?.role || 'RECEPCAO'
  const userName = usuarioDB?.nome || 'Usuário'

  return (
    <div className="min-h-screen bg-[#fffdf5] dark:bg-slate-950 flex flex-col lg:flex-row transition-colors overflow-x-hidden">
      <BarraLateralINBC userRole={userRole} userName={userName} />
      <div className="flex-1 w-full pt-16 lg:pt-0 lg:pl-72 transition-all duration-300 overflow-x-hidden">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
