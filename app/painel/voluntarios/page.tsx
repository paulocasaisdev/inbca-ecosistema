'use client'
// ============================================================
// INBCA - Módulo de Voluntários & Campanhas de Doação
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React from 'react'
import { Gift, Heart, Plus, Users, Award, Shield, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaVoluntariosDoacoes() {
  const voluntarios = [
    { id: '1', nome: 'Dra. Vanessa Lima', funcao: 'Médica Voluntária (Clínica Geral)', atuacao: 'Terças-feiras' },
    { id: '2', nome: 'Mestre Carlos', funcao: 'Instrutor de Karatê Inclusivo', atuacao: 'Ter e Qui' },
    { id: '3', nome: 'Prof.ª Fernanda', funcao: 'Instrutora de Zumba', atuacao: 'Seg e Quar' },
    { id: '4', nome: 'Prof. Ricardo', funcao: 'Instrutor de Boxe', atuacao: 'Ter e Qui' },
    { id: '5', nome: 'Dra. Patricia Lima', funcao: 'Advogada Voluntária (Assistência Jurídica)', atuacao: 'Quintas-feiras' },
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              Rede de Solidariedade
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              Trabalho Voluntário & Doações
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Voluntários & Campanhas de Doação
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Médicos, advogados, instrutores e apoiadores que movem o ecossistema social.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => toast.info('Abre formulário de novo voluntário')}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Voluntário</span>
          </button>
        </div>
      </div>

      {/* ── Métricas ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voluntários Ativos</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">24</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">Profissionais e monitores</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Horas Doadas Mês</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">320h</p>
            <p className="text-[11px] text-slate-500 mt-1">Atendimentos comunitários</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campanhas Ativas</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">3</p>
            <p className="text-[11px] text-slate-500 mt-1">Arrecadação de materiais</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── Voluntários & Doações Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
          <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base border-b border-amber-100 dark:border-amber-900/40 pb-3">
            Quadro de Voluntários Ativos
          </h2>
          <div className="space-y-3">
            {voluntarios.map((v) => (
              <div key={v.id} className="p-3.5 bg-amber-50/60 dark:bg-slate-800 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{v.nome}</h3>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold mt-0.5">{v.funcao}</p>
                </div>
                <span className="badge-status bg-amber-200 text-amber-950 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700 min-w-[120px] text-center font-black">
                  {v.atuacao}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-500/10 dark:bg-slate-900 rounded-3xl p-6 border border-amber-300/40 dark:border-amber-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-300/40 pb-3">
            <Gift className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
              Campanhas de Arrecadação Ativas
            </h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-amber-900/40">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Kimonos e Equipamentos de Luta</p>
              <p className="text-slate-500 mt-1">Arrecadação de kimonos, luvas de boxe e sacos de pancada para a turma de Karatê e Kickboxing.</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-amber-900/40">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Insumos para Clínica Médica</p>
              <p className="text-slate-500 mt-1">Doação de luvas descartáveis, gesso, esfigmomanômetros e estojos de enfermagem.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
