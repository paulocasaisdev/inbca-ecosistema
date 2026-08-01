'use client'
// ============================================================
// INBCA - Rastreabilidade & Logs de Auditoria do Sistema
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import {
  History, Search, ShieldAlert, CheckCircle, AlertTriangle,
  Printer, ArrowDownToLine, RefreshCw, Filter, Eye, AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaAuditoria() {
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'sucesso' | 'alerta' | 'negado'>('todos')

  const logs = [
    { usuario: 'Dra. Vanessa Lima (Médica)', acao: 'Acessou o Prontuário Clínico', alvo: 'Maria Raimunda de Souza', status: 'sucesso', data: '2026-08-01 09:12:45', ip: '186.230.12.91' },
    { usuario: 'Ag. Carla Raimunda de Jesus (Atendente)', acao: 'Agendou Nova Consulta', alvo: 'Ana Clara Santos', status: 'sucesso', data: '2026-08-01 08:34:11', ip: '186.230.12.93' },
    { usuario: 'Dr. Paulo Roberto Casais (Administrador)', acao: 'Realizou Backup do Banco de Dados', alvo: 'Backup Completo', status: 'sucesso', data: '2026-07-31 23:10:04', ip: '186.230.12.10' },
    { usuario: 'Ag. Carla Raimunda de Jesus (Atendente)', acao: 'Tentou acessar Prontuário Médico (Bloqueado)', alvo: 'Luciana Ferreira', status: 'negado', data: '2026-07-31 16:45:12', ip: '186.230.12.93' },
    { usuario: 'Dra. Camila Vasconcelos (Psicóloga)', acao: 'Alterou ficha de acompanhamento', alvo: 'José Carlos dos Santos', status: 'alerta', data: '2026-07-31 14:15:33', ip: '187.12.90.111' },
    { usuario: 'Dr. Lucas Mendes (Fisioterapeuta)', acao: 'Consultou Ficha de Reabilitação', alvo: 'Luciana Ferreira da Silva', status: 'sucesso', data: '2026-07-31 11:30:22', ip: '186.230.12.50' },
    { usuario: 'Mestre Carlos (Instrutor)', acao: 'Registrou Chamada / Frequência de Zumba', alvo: 'Aula Geral Zumba', status: 'sucesso', data: '2026-07-31 10:00:00', ip: '186.230.12.44' },
    { usuario: 'Admin Central (Sistema)', acao: 'Sincronização E-SUS efetuada', alvo: 'Integração CADSUS', status: 'sucesso', data: '2026-07-31 02:00:00', ip: '127.0.0.1' },
    { usuario: 'Ag. Carla Raimunda de Jesus (Atendente)', acao: 'Tentou acessar Aba de Auditoria (Bloqueado)', alvo: 'Logs de Auditoria', status: 'negado', data: '2026-07-30 18:22:15', ip: '186.230.12.93' },
  ]

  const filtrados = logs.filter(log => {
    const atendeStatus = filtroStatus === 'todos' || log.status === filtroStatus
    const termo = busca.toLowerCase()
    const atendeBusca =
      log.usuario.toLowerCase().includes(termo) ||
      log.acao.toLowerCase().includes(termo) ||
      log.alvo.toLowerCase().includes(termo) ||
      log.ip.includes(termo)
    return atendeStatus && atendeBusca
  })

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              Segurança & Rastreabilidade
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Conformidade LGPD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Logs de Auditoria do Sistema
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Histórico contínuo e imutável de acessos a prontuários, agendamentos e cadastros do ecossistema.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => toast.success('Relatório de auditoria exportado com sucesso!')}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>Exportar Logs (CSV)</span>
          </button>
        </div>
      </div>

      {/* ── Métricas Rápidas ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total de Acessos Hoje</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">1.432</p>
            <p className="text-[11px] text-slate-500 mt-1">Registros consolidados</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acessos a Prontuários</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">84</p>
            <p className="text-[11px] text-slate-500 mt-1">Médicos/Psicólogos logados</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Acessos Negados (Alertas)</p>
            <p className="text-2xl font-black text-rose-600 dark:text-rose-450 mt-1">2</p>
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold mt-1">Bloqueios de permissão</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ── Tabela de Auditoria e Filtros ─────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-100 dark:border-amber-900/40">
          
          {/* Status Tab Filters */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200/70 dark:border-amber-900/40 w-full sm:w-auto">
            <button
              onClick={() => setFiltroStatus('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroStatus === 'todos' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todos os Eventos
            </button>
            <button
              onClick={() => setFiltroStatus('sucesso')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroStatus === 'sucesso' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sucesso
            </button>
            <button
              onClick={() => setFiltroStatus('alerta')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroStatus === 'alerta' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Alertas
            </button>
            <button
              onClick={() => setFiltroStatus('negado')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroStatus === 'negado' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Bloqueados/Negados
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por usuário, IP, ação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Audit Log list */}
        <div className="space-y-3">
          {filtrados.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500 text-xs font-bold">Nenhum evento de auditoria correspondente aos filtros.</p>
            </div>
          ) : (
            filtrados.map((log, idx) => (
              <div
                key={idx}
                className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900 dark:text-slate-150 text-base">{log.usuario}</span>
                    <span className="text-xs font-mono font-bold text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-900/40">
                      IP: {log.ip}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-black border shadow-xs ${
                      log.status === 'sucesso' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                      log.status === 'negado' ? 'bg-rose-100 text-rose-950 border-rose-300 dark:bg-rose-950 dark:text-rose-300 font-bold' :
                      'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {log.status === 'sucesso' ? '🟢 Autorizado' : log.status === 'negado' ? '🔴 Bloqueado' : '🟡 Modificação'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-350">
                    Ação: <span className="font-extrabold text-slate-800 dark:text-slate-200">{log.acao}</span> | Objeto Alvo: <span className="font-extrabold text-slate-800 dark:text-slate-200">{log.alvo}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{log.data}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
