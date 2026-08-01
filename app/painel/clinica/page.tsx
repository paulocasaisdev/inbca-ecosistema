'use client'
// ============================================================
// INBCA - Módulo de Clínica Médica & Exames Comunitários
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState, useEffect } from 'react'
import {
  Stethoscope, Activity, Plus, Search, CheckCircle,
  FileText, Calendar, Clock, Filter, UserCheck,
  HeartPulse, Shield, Check, Heart
} from 'lucide-react'
import { toast } from 'sonner'
import { buscarMoradores } from '../../../servicos/moradores'
import { AgendamentoSocial } from '../../../tipos'

export default function PaginaClinicaExames() {
  const [busca, setBusca] = useState('')
  const [filtroTab, setFiltroTab] = useState<'todos' | 'consultas' | 'exames'>('todos')
  const [carregando, setCarregando] = useState(false)
  const [agendamentos, setAgendamentos] = useState<AgendamentoSocial[]>([
    { id: '1', moradorId: '1', moradorNome: 'Maria Raimunda de Souza', moradorSus: '700.1234.5678.90', tipo: 'Consulta', modalidadeOuEspecialidade: 'Clínico Geral', voluntarioId: '1', voluntarioNome: 'Dra. Vanessa Lima', data: '2026-07-31', hora: '08:30', status: 'confirmado', criadoEm: '' },
    { id: '2', moradorId: '2', moradorNome: 'Ana Clara Santos', moradorSus: '890.4321.8765.12', tipo: 'Exame', modalidadeOuEspecialidade: 'Exame de Sangue / Glicemia', voluntarioId: '3', voluntarioNome: 'Dr. Roberto Cruz', data: '2026-07-31', hora: '09:30', status: 'agendado', criadoEm: '' },
    { id: '3', moradorId: '3', moradorNome: 'Carlos Eduardo Ramos', moradorSus: '654.9876.1234.55', tipo: 'Exame', modalidadeOuEspecialidade: 'Ultrassonografia Abdominal', voluntarioId: '3', voluntarioNome: 'Dra. Heloísa Castro', data: '2026-07-31', hora: '10:00', status: 'agendado', criadoEm: '' },
    { id: '4', moradorId: '1', moradorNome: 'Luciana Ferreira', moradorSus: '321.6549.8700.11', tipo: 'Consulta', modalidadeOuEspecialidade: 'Pediatria (Acompanhamento)', voluntarioId: '2', voluntarioNome: 'Dr. Marcos Antônio', data: '2026-07-31', hora: '11:15', status: 'realizado', criadoEm: '' },
    { id: '5', moradorId: '2', moradorNome: 'José Francisco da Silva', moradorSus: '111.2223.3344.55', tipo: 'Consulta', modalidadeOuEspecialidade: 'Oftalmologia (Refração)', voluntarioId: '2', voluntarioNome: 'Dra. Camila Duarte', data: '2026-08-01', hora: '14:00', status: 'agendado', criadoEm: '' },
  ])

  useEffect(() => {
    // Carregar moradores para garantir integracao de servicos
    async function carregarMoradores() {
      setCarregando(true)
      try {
        await buscarMoradores()
      } catch (err) {
        console.error(err)
      } finally {
        setCarregando(false)
      }
    }
    carregarMoradores()
  }, [])

  const filtrados = agendamentos.filter((a) => {
    const atendeFiltroTab =
      filtroTab === 'todos' ||
      (filtroTab === 'consultas' && a.tipo === 'Consulta') ||
      (filtroTab === 'exames' && a.tipo === 'Exame')
    const atendeBusca =
      a.moradorNome.toLowerCase().includes(busca.toLowerCase()) ||
      a.modalidadeOuEspecialidade.toLowerCase().includes(busca.toLowerCase()) ||
      a.moradorSus.includes(busca)
    return atendeFiltroTab && atendeBusca
  })

  function marcarComoRealizado(id: string) {
    setAgendamentos(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'realizado' } : a))
    )
    toast.success('Atendimento/Exame marcado como concluído na Casinha Amarela!')
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              Saúde Comunitária
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              100% Gratuito pelo SUS/INBCA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Clínica Médica & Exames Comunitários
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Consultas com clínicos gerais e especialistas, coleta de exames laboratoriais e ultrassom.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => toast.info('Abre o formulário rápido de agendamento médico')}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Marcar Consulta / Exame</span>
          </button>
        </div>
      </div>

      {/* ── Cards de Métricas ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultas Hoje</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">28</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">Agendadas na grade</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exames Agendados</p>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">14</p>
            <p className="text-[11px] text-slate-500 mt-1">Coletas laboratoriais</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Médicos Atendendo</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">6</p>
            <p className="text-[11px] text-slate-500 mt-1">Especialistas voluntários</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Atendidos Mês</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">342</p>
            <p className="text-[11px] text-slate-500 mt-1">Famílias contempladas</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <HeartPulse className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── Lista de Atendimentos Responsiva (0 Rolagem Lateral) ──── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-100 dark:border-amber-900/40">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200/70 dark:border-amber-900/40 w-full sm:w-auto">
            <button
              onClick={() => setFiltroTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'todos' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todos os Atendimentos
            </button>
            <button
              onClick={() => setFiltroTab('consultas')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'consultas' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Consultas Médicas
            </button>
            <button
              onClick={() => setFiltroTab('exames')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'exames' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Exames Laboratoriais/Imagem
            </button>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, SUS..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Lista de Atendimentos em Cards Responsivos */}
        <div className="space-y-3">
          {filtrados.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-amber-200/80 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-300/80 text-amber-950 dark:text-amber-300 font-black text-xs">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>{item.hora}h</span>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black border shadow-sm ${
                    item.tipo === 'Consulta'
                      ? 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-800'
                      : 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-800'
                  }`}>
                    {item.tipo === 'Consulta' ? <Stethoscope className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                    {item.modalidadeOuEspecialidade}
                  </span>

                  <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border shadow-sm ${
                    item.status === 'confirmado' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                    item.status === 'agendado' ? 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
                  }`}>
                    {item.status === 'confirmado' ? 'Confirmado ✓' : item.status === 'agendado' ? 'Agendado' : 'Concluído'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{item.moradorNome}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Cartão SUS: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.moradorSus}</span> | Profissional: <span className="font-bold text-slate-800 dark:text-slate-200">{item.voluntarioNome}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0 justify-end">
                <button
                  onClick={() => marcarComoRealizado(item.id)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Concluir</span>
                </button>
                <button
                  onClick={() => toast.info(`Abre prontuário de ${item.moradorNome}`)}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-amber-950 dark:text-amber-300 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Prontuário</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
