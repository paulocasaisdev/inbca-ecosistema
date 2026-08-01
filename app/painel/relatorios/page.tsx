'use client'
// ============================================================
// INBCA - Módulo de Relatórios & Indicadores de Impacto
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import {
  BarChart3, Download, Printer, Calendar, Filter, FileText,
  Stethoscope, Brain, Dumbbell, HeartHandshake, Scale, Users,
  CheckCircle2, TrendingUp, Sparkles, Shield, ArrowUpRight, PieChart
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaRelatorios() {
  const [periodo, setPeriodo] = useState('julho_2026')
  const [filtroModulo, setFiltroModulo] = useState('todos')

  const estatisticasGerais = [
    { titulo: 'Total de Atendimentos', valor: '1.240', variacao: '+18% vs mês anterior', icone: BarChart3, cor: 'bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-300' },
    { titulo: 'Consultas & Exames', valor: '531', variacao: '42.8% do total', icone: Stethoscope, cor: 'bg-blue-100 text-blue-950 dark:bg-blue-950 dark:text-blue-300' },
    { titulo: 'Terapias & Psicoterapia', valor: '204', variacao: '16.4% do total', icone: Brain, cor: 'bg-purple-100 text-purple-950 dark:bg-purple-950 dark:text-purple-300' },
    { titulo: 'Praticantes Esportes & Lutas', valor: '420', variacao: '33.8% do total', icone: Dumbbell, cor: 'bg-yellow-100 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-300' },
    { titulo: 'Orientação Jurídica & BPC', valor: '85', variacao: '6.8% do total', icone: Scale, cor: 'bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300' },
  ]

  const relatoriosDisponiveis = [
    {
      id: '1',
      titulo: 'Relatório Mensal de Consultas & Exames Médicos',
      categoria: 'Clínica Médica',
      dataGeracao: '31/07/2026',
      formato: 'PDF / Excel',
      registros: '531 atendimentos',
      descricao: 'Demonstrativo completo de consultas com clínicos gerais, especialistas e exames laboratoriais/ultrassom prestados à comunidade.',
    },
    {
      id: '2',
      titulo: 'Frequência de Alunos em Esportes & Artes Marciais',
      categoria: 'Esportes & Saúde',
      dataGeracao: '31/07/2026',
      formato: 'PDF / Excel',
      registros: '420 praticantes',
      descricao: 'Chamada de frequência diária das turmas de Karatê Inclusivo, Zumba, Capoeira, Boxe e Kickboxing.',
    },
    {
      id: '3',
      titulo: 'Acompanhamento de Sessões Terapêuticas & Fisioterapia',
      categoria: 'Terapias',
      dataGeracao: '31/07/2026',
      formato: 'PDF / Excel',
      registros: '204 sessões',
      descricao: 'Atendimentos de psicologia clínica individual, psicoterapia em grupo e fisioterapia motora reabilitadora.',
    },
    {
      id: '4',
      titulo: 'Fila do Plantão Jurídico & Declarações Emitidas',
      categoria: 'Assistência Jurídica',
      dataGeracao: '31/07/2026',
      formato: 'PDF / Word',
      registros: '85 assistidos',
      descricao: 'Orientações jurídicas de BPC/LOAS, direito de família e declarações de hipossuficiência comunitária.',
    },
    {
      id: '5',
      titulo: 'Cadastro de Famílias Acolhidas & Entregas de Cestas',
      categoria: 'Assistência Social',
      dataGeracao: '31/07/2026',
      formato: 'PDF / Excel',
      registros: '480 famílias',
      descricao: 'Demonstrativo de doações distribuídas, visitas domiciliares comunitárias e cadastros sociais ativos.',
    },
  ]

  function exportarRelatorio(nome: string, tipo: 'pdf' | 'excel' | 'imprimir') {
    if (tipo === 'imprimir') {
      window.print()
    } else {
      toast.success(`Exportando ${nome} em formato ${tipo.toUpperCase()}... Download iniciado!`)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              Indicadores de Impacto Social
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Transparência Comunitária
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Relatórios & Métrica de Atendimentos
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Emissão de relatórios consolidados de consultas, exames, esportes, terapias e assistência jurídica.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => exportarRelatorio('Relatório Geral INBCA', 'imprimir')}
            className="px-4 py-3 bg-white text-slate-950 hover:bg-amber-50 font-black text-xs rounded-2xl shadow-md transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-amber-700" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={() => exportarRelatorio('Relatório Geral INBCA', 'pdf')}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Exportar PDF Consolidador</span>
          </button>
        </div>
      </div>

      {/* ── Cards de Métricas e Indicadores ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {estatisticasGerais.map((est, i) => {
          const Icone = est.icone
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">{est.titulo}</span>
                <div className={`p-2 rounded-xl ${est.cor}`}>
                  <Icone className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-amber-300">{est.valor}</p>
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{est.variacao}</span>
              </p>
            </div>
          )
        })}
      </div>

      {/* ── Barra de Progresso Visual por Serviço ──────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Distribuição de Atendimentos por Área no INBCA
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">Total: 1.240 Atendimentos</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-extrabold mb-1">
              <span className="text-slate-900 dark:text-slate-100">🩺 Clínica Médica & Exames</span>
              <span className="text-amber-700 dark:text-amber-400">531 (42.8%)</span>
            </div>
            <div className="w-full h-3 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '42.8%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-extrabold mb-1">
              <span className="text-slate-900 dark:text-slate-100">🥋 Esportes & Saúde Comunitária</span>
              <span className="text-yellow-600 dark:text-yellow-400">420 (33.8%)</span>
            </div>
            <div className="w-full h-3 bg-yellow-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '33.8%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-extrabold mb-1">
              <span className="text-slate-900 dark:text-slate-100">🧠 Terapias & Psicoterapia</span>
              <span className="text-purple-600 dark:text-purple-400">204 (16.4%)</span>
            </div>
            <div className="w-full h-3 bg-purple-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '16.4%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-extrabold mb-1">
              <span className="text-slate-900 dark:text-slate-100">⚖️ Assistência Jurídica & BPC/LOAS</span>
              <span className="text-emerald-600 dark:text-emerald-400">85 (6.8%)</span>
            </div>
            <div className="w-full h-3 bg-emerald-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '6.8%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lista de Relatórios Disponíveis (0 Rolagem) ──────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Relatórios Prontos para Emissão & Exportação
            </h2>
          </div>

          {/* Filtro de Período */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-3 py-1.5 bg-amber-50/50 dark:bg-slate-800 text-xs font-bold rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              <option value="julho_2026">Julho / 2026 (Mês Atual)</option>
              <option value="junho_2026">Junho / 2026</option>
              <option value="ano_2026">Consolidado Ano 2026</option>
            </select>
          </div>
        </div>

        {/* Lista de Relatórios em Cards Responsivos */}
        <div className="space-y-3">
          {relatoriosDisponiveis.map((rel) => (
            <div
              key={rel.id}
              className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge-categoria bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 font-black">
                    {rel.categoria}
                  </span>
                  <span className="badge-status bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 font-bold">
                    {rel.registros}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Atualizado: {rel.dataGeracao}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{rel.titulo}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{rel.descricao}</p>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0 justify-end">
                <button
                  onClick={() => exportarRelatorio(rel.titulo, 'excel')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => exportarRelatorio(rel.titulo, 'pdf')}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
