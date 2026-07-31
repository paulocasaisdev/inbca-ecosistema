'use client'

import React from 'react'
import { Gift, Heart, Plus, Users, Award } from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaVoluntariosDoacoes() {
  const voluntarios = [
    { id: '1', nome: 'Dra. Vanessa Lima', funcao: 'Médica Voluntária (Clínica Geral)', atuacao: 'Terças-feiras' },
    { id: '2', nome: 'Mestre Carlos', funcao: 'Instrutor de Karatê Inclusivo', atuacao: 'Ter e Qui' },
    { id: '3', nome: 'Prof.ª Fernanda', funcao: 'Instrutora de Zumba', atuacao: 'Seg e Quar' },
    { id: '4', nome: 'Prof. Ricardo', funcao: 'Instrutor de Boxe', atuacao: 'Ter e Qui' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Voluntariado & Apoiadores</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Voluntários & Campanhas de Doação
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Profissionais e parceiros que tornam o Instituto Nilson Bispo uma realidade.
          </p>
        </div>

        <button onClick={() => toast.info('Abre formulário de novo voluntário')} className="botao-primario text-xs">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Voluntário</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cartao-amarelo space-y-4">
          <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base border-b border-amber-100 pb-2">
            Quadro de Voluntários Ativos
          </h2>
          <div className="space-y-3">
            {voluntarios.map((v) => (
              <div key={v.id} className="p-3 bg-amber-50/60 dark:bg-slate-900 rounded-xl border border-amber-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{v.nome}</h3>
                  <p className="text-[11px] text-amber-700 font-semibold">{v.funcao}</p>
                </div>
                <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full">{v.atuacao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cartao-destaque space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-300/40 pb-2">
            <Gift className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
              Campanhas de Arrecadação
            </h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200">
              <p className="font-bold text-slate-900 dark:text-slate-100">Equipamentos para Karatê e Lutas</p>
              <p className="text-slate-500">Arrecadação de kimonos, luvas e sacos de pancada.</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200">
              <p className="font-bold text-slate-900 dark:text-slate-100">Insumos para Clínica e Exames</p>
              <p className="text-slate-500">Doação de luvas descartáveis, esfigmomanômetros e estojos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
