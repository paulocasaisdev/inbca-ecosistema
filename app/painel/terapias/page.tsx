'use client'

import React from 'react'
import Link from 'next/link'
import { Brain, Sparkles, HeartPulse, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaTerapias() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Saúde Mental & Reabilitação</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Terapias, Psicoterapia & Fisioterapia
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Acompanhamento profissional contínuo para o bem-estar da comunidade na Casinha Amarela.
          </p>
        </div>

        <Link href="/agendamento" className="botao-primario text-xs">
          <Plus className="w-4 h-4" />
          <span>Agendar Sessão Terapêutica</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cartao-destaque space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-amber-200">Psicologia Individual</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">Escuta qualificada e acolhimento para crianças, adolescentes e adultos.</p>
        </div>

        <div className="cartao-destaque space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-amber-200">Psicoterapia em Grupo</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">Rodas de conversa e grupos de apoio comunitário semanais.</p>
        </div>

        <div className="cartao-destaque space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-amber-200">Fisioterapia Reabilitadora</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">Tratamento para alívio de dores, reabilitação motora e postural.</p>
        </div>
      </div>
    </div>
  )
}
