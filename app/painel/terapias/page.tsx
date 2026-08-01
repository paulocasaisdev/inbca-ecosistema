'use client'
// ============================================================
// INBCA - Módulo de Terapias & Psicoterapia Comunitária
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Brain, Sparkles, HeartPulse, Plus, Shield, UserCheck,
  Calendar, CheckCircle, Clock, Heart, Users
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaTerapias() {
  const [sessoes, setSessoes] = useState([
    { id: '1', assistido: 'Mariana Santos (14 anos)', modalidade: 'Psicologia Infantil / Adolescente', terapeuta: 'Dra. Camila Vasconcelos', data: '31/07/2026', hora: '14:00', status: 'Confirmado' },
    { id: '2', assistido: 'Sr. Raimundo Nonato (68 anos)', modalidade: 'Fisioterapia Reabilitadora', terapeuta: 'Dr. Lucas Mendes', data: '31/07/2026', hora: '15:00', status: 'Em Atendimento' },
    { id: '3', assistido: 'Grupo de Apoio a Mães', modalidade: 'Psicoterapia em Grupo', terapeuta: 'Dra. Camila Vasconcelos', data: '01/08/2026', hora: '10:00', status: 'Agendado' },
  ])

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5" />
              Saúde Mental & Reabilitação
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Atendimento Humanizado
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Terapias, Psicoterapia & Fisioterapia
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Acolhimento psicológico individual, psicoterapia em grupo e fisioterapia reabilitadora para a comunidade.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <Link
            href="/agendamento"
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agendar Sessão Terapêutica</span>
          </Link>
        </div>
      </div>

      {/* ── Métricas ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sessões do Mês</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">156</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">Psicologia & Fisio</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <Brain className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grupos Terapêuticos</p>
            <p className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">4</p>
            <p className="text-[11px] text-slate-500 mt-1">Rodas de conversa semanais</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fisioterapia Motora</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">48</p>
            <p className="text-[11px] text-slate-500 mt-1">Pacientes em reabilitação</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── 3 Modalidades Principais ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Psicologia Individual</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Escuta qualificada e acolhimento individualizado para crianças, adolescentes, adultos e idosos da comunidade.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Psicoterapia em Grupo</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Rodas de conversa temáticas, grupos de apoio para mães e cuidadores, fortalecendo vínculos comunitários.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Fisioterapia Reabilitadora</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Tratamento especializado para alívio de dores crônicas, recuperação pós-operatória e fortalecimento postural.
          </p>
        </div>
      </div>

      {/* ── Atendimentos Terapêuticos em Cards Responsivos (0 Rolagem) ── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Agenda de Atendimentos Terapêuticos
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {sessoes.map((s) => (
            <div
              key={s.id}
              className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-amber-200/80 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-300/80 text-amber-950 dark:text-amber-300 font-black text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>{s.data} às {s.hora}h</span>
                  </div>

                  <span className="text-[11px] font-black text-amber-950 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                    {s.modalidade}
                  </span>

                  <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border shadow-sm ${
                    s.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                    s.status === 'Em Atendimento' ? 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950 dark:text-blue-300 animate-pulse' :
                    'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {s.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{s.assistido}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Terapeuta Responsável: <span className="font-bold text-slate-800 dark:text-slate-200">{s.terapeuta}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
