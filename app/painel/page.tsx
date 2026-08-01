'use client'
// ============================================================
// INBCA - Painel de Gestão Integrada (Casinha Amarela)
// ============================================================

import React from 'react'
import Link from 'next/link'
import {
  Stethoscope, Activity, Dumbbell, Users, Calendar,
  Clock, Plus, ArrowUpRight, Sparkles, CheckCircle2,
  AlertCircle, Shield, Scale, Heart, Home, HeartHandshake, Gift
} from 'lucide-react'

export default function PaginaPainelGeral() {
  const metricas = [
    { titulo: 'Consultas no Mês', valor: '342', desc: '+18% em relação ao mês anterior', icone: Stethoscope, cor: 'from-amber-400 to-yellow-500' },
    { titulo: 'Exames Realizados', valor: '189', desc: 'Laboratoriais & Ultrassonografia', icone: Activity, cor: 'from-amber-500 to-amber-600' },
    { titulo: 'Praticantes Esportes/Lutas', valor: '420', desc: 'Karatê, Zumba, Capoeira, Boxe', icone: Dumbbell, cor: 'from-yellow-400 to-amber-500' },
    { titulo: 'Sessões Terapêuticas', valor: '156', desc: 'Psicologia & Fisioterapia', icone: Sparkles, cor: 'from-amber-600 to-yellow-600' },
  ]

  const atendimentosHoje = [
    { id: '1', paciente: 'Maria Raimunda Souza', servico: 'Clínico Geral - Consulta', horario: '08:30', tipo: 'clinica', status: 'confirmado' },
    { id: '2', paciente: 'João Pedro Oliveira (10 anos)', servico: 'Karatê Inclusivo (Turma A)', horario: '09:00', tipo: 'esporte', status: 'em_atendimento' },
    { id: '3', paciente: 'Ana Clara Santos', servico: 'Exame de Sangue / Glicemia', horario: '09:30', tipo: 'exame', status: 'agendado' },
    { id: '4', paciente: 'Marcos Vinícius Silva', servico: 'Fisioterapia Reabilitadora', horario: '10:15', tipo: 'terapia', status: 'agendado' },
    { id: '5', paciente: 'Grupo Terceira Idade', servico: 'Zumba & Ginástica Comunitária', horario: '11:00', tipo: 'esporte', status: 'agendado' },
  ]

  const modalidadesAtivas = [
    { modalidade: 'Karatê Inclusivo', alunos: 85, instrutor: 'Mestre Carlos', dias: 'Ter e Qui' },
    { modalidade: 'Zumba & Ginástica', alunos: 140, instrutora: 'Prof.ª Fernanda', dias: 'Seg e Quar' },
    { modalidade: 'Capoeira Comunitária', alunos: 65, instrutor: 'Mestre Bimba SP', dias: 'Sábados' },
    { modalidade: 'Boxe para Saúde', alunos: 70, instrutor: 'Prof. Ricardo', dias: 'Ter e Qui' },
    { modalidade: 'Kickboxing Adaptado', alunos: 60, instrutor: 'Prof.ª Amanda', dias: 'Seg e Sex' },
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              Casinha Amarela
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Gestão Comunitária Integrada
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Instituto Nilson Bispo Casinha Amarela
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Acompanhamento em tempo real de consultas médicas, exames, terapias, esportes inclusivos e assistência social.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <Link
            href="/agendamento"
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Agendamento</span>
          </Link>
        </div>
      </div>

      {/* ── Cartões de Métricas ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icone = m.icone
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{m.titulo}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">{m.valor}</p>
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1">{m.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.cor} text-slate-950 flex items-center justify-center font-bold shadow-soft`}>
                <Icone className="w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Grid Principal: Atendimentos do Dia & Turmas Esportivas ────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Atendimentos de Hoje em Cards Responsivos (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                Atendimentos Agendados para Hoje
              </h2>
            </div>
            <Link href="/painel/clinica" className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline">
              <span>Ver todos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {atendimentosHoje.map((at) => (
              <div key={at.id} className="p-4 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400 transition-all shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 bg-amber-200/80 dark:bg-amber-950 text-amber-950 dark:text-amber-300 font-black text-xs px-2.5 py-0.5 rounded-md border border-amber-300/80">
                      <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                      {at.horario}h
                    </span>
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border shadow-sm ${
                      at.status === 'confirmado' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                      at.status === 'em_atendimento' ? 'bg-amber-200 text-amber-950 border-amber-300 animate-pulse' :
                      'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {at.status === 'confirmado' ? 'Confirmado ✓' : at.status === 'em_atendimento' ? 'Em Aula / Atendimento' : 'Agendado'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{at.paciente}</h3>
                  <p className="text-xs text-slate-500 font-medium">{at.servico}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modalidades Esportivas Ativas (4 cols) */}
        <div className="lg:col-span-4 bg-amber-500/10 dark:bg-slate-900 rounded-3xl p-6 border border-amber-300/40 dark:border-amber-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-300/40 pb-3">
            <Dumbbell className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
              Modalidades Esportivas & Lutas
            </h2>
          </div>

          <div className="space-y-3">
            {modalidadesAtivas.map((mod, idx) => (
              <div key={idx} className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{mod.modalidade}</h3>
                  <p className="text-[10px] text-slate-500">{mod.dias}</p>
                </div>
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-full">
                  {mod.alunos} alunos
                </span>
              </div>
            ))}
          </div>

          <Link href="/painel/esportes-terapias" className="botao-primario w-full text-xs py-3 flex items-center justify-center gap-2">
            Gerenciar Turmas de Lutas & Zumba
          </Link>
        </div>
      </div>
    </div>
  )
}
