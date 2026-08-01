'use client'
// ============================================================
// INBCA - Módulo de Esportes Inclusivos & Lutas Comunitárias
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import {
  Dumbbell, Users, Calendar, Clock, Plus, CheckCircle,
  Award, Sparkles, UserCheck, Search, Shield, Trophy
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaEsportesTerapias() {
  const [modalidadeFiltro, setModalidadeFiltro] = useState<string>('todas')
  const [buscaAluno, setBuscaAluno] = useState('')

  const modalidades = [
    { id: 'karate', nome: 'Karatê Inclusivo', icone: '🥋', categoria: 'Esporte & Lutas', alunos: 85, dias: 'Terças e Quintas', horario: '09:00 e 14:00', mestre: 'Mestre Carlos' },
    { id: 'zumba', nome: 'Zumba & Ginástica', icone: '💃', categoria: 'Promoção da Saúde', alunos: 140, dias: 'Segundas e Quartas', horario: '08:00 e 17:00', mestre: 'Prof.ª Fernanda' },
    { id: 'capoeira', nome: 'Capoeira Comunitária', icone: '🪘', categoria: 'Cultura & Luta', alunos: 65, dias: 'Sábados', horario: '10:00', mestre: 'Mestre Bimba SP' },
    { id: 'boxe', nome: 'Boxe para Saúde', icone: '🥊', categoria: 'Condicionamento & Luta', alunos: 70, dias: 'Terças e Quintas', horario: '18:00', mestre: 'Prof. Ricardo' },
    { id: 'kickboxing', nome: 'Kickboxing Adaptado', icone: '🥇', categoria: 'Luta Inclusiva', alunos: 60, dias: 'Segundas e Sextas', horario: '19:00', mestre: 'Prof.ª Amanda' },
    { id: 'fisioterapia', nome: 'Fisioterapia Reabilitadora', icone: '🩺', categoria: 'Saúde & Terapias', alunos: 45, dias: 'Segunda a Sexta', horario: '08:00 às 16:00', mestre: 'Dra. Beatriz' },
    { id: 'psicoterapia', nome: 'Psicoterapia em Grupo', icone: '🧠', categoria: 'Saúde Mental', alunos: 50, dias: 'Quartas-feiras', horario: '15:00', mestre: 'Dr. Fernando' },
  ]

  const listaAlunos = [
    { id: '1', nome: 'João Pedro Oliveira (10 anos)', modalidade: 'Karatê Inclusivo', presencaHoje: true, responsavel: 'Carla Oliveira' },
    { id: '2', nome: 'Dona Neusa Santos (68 anos)', modalidade: 'Zumba & Ginástica', presencaHoje: true, responsavel: 'Própria' },
    { id: '3', nome: 'Gabriel Souza (15 anos)', modalidade: 'Boxe para Saúde', presencaHoje: false, responsavel: 'Marcos Souza' },
    { id: '4', nome: 'Mateus Lima (PNE)', modalidade: 'Capoeira Comunitária', presencaHoje: true, responsavel: 'Sandra Lima' },
    { id: '5', nome: 'Camila Rodriguez (22 anos)', modalidade: 'Kickboxing Adaptado', presencaHoje: true, responsavel: 'Própria' },
    { id: '6', nome: 'Seu Antônio Ramos (72 anos)', modalidade: 'Fisioterapia Reabilitadora', presencaHoje: true, responsavel: 'Própria' },
    { id: '7', nome: 'Juliana Barbosa (29 anos)', modalidade: 'Psicoterapia em Grupo', presencaHoje: true, responsavel: 'Própria' },
  ]

  const alunosFiltrados = listaAlunos.filter((aluno) => {
    const combinaModalidade = modalidadeFiltro === 'todas' || aluno.modalidade === modalidadeFiltro
    const combinaBusca = aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase())
    return combinaModalidade && combinaBusca
  })

  function alternarPresenca(id: string) {
    toast.success('Frequência do aluno atualizada com sucesso na Casinha Amarela!')
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5" />
              Esporte & Inclusão
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              Karatê, Zumba, Capoeira, Boxe & Kickboxing
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Esportes & Saúde Comunitária
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Inclusão social através do esporte, artes marciais adaptadas e ginástica comunitária.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => toast.info('Formulário de inscrição de novo aluno/atleta')}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Matricular Novo Aluno</span>
          </button>
        </div>
      </div>

      {/* ── Grid de Modalidades Oferecidas ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modalidades.map((mod) => (
          <div key={mod.id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{mod.icone}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
                  {mod.categoria}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm mb-1">{mod.nome}</h3>
              <p className="text-xs text-slate-500 font-medium mb-3">Instrutor: {mod.mestre}</p>
            </div>

            <div className="pt-3 border-t border-amber-100 dark:border-amber-900/40 text-xs space-y-1">
              <p className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{mod.dias} ({mod.horario})</span>
              </p>
              <div className="flex items-center justify-between font-bold text-amber-800 dark:text-amber-300 pt-1">
                <span>Total de Alunos:</span>
                <span className="text-sm font-black">{mod.alunos}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Chamada de Frequência e Alunos ──────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Chamada de Frequência dos Praticantes
            </h2>
            <p className="text-xs text-slate-500">
              Registre a presença diária nas aulas de Karatê, Zumba, Capoeira, Lutas e Fisioterapia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={modalidadeFiltro}
              onChange={(e) => setModalidadeFiltro(e.target.value)}
              className="px-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
            >
              <option value="todas">Todas as Modalidades</option>
              {modalidades.map((m) => (
                <option key={m.id} value={m.nome}>{m.nome}</option>
              ))}
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome do aluno..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Alunos e Chamada Padronizada */}
        <div className="overflow-x-auto rounded-2xl border border-amber-100 dark:border-amber-900/40">
          <table className="tabela-padrao w-full min-w-full">
            <thead>
              <tr>
                <th>Aluno / Praticante</th>
                <th className="text-center">Modalidade / Turma</th>
                <th>Responsável / Fone</th>
                <th className="text-center w-36">Presença Hoje</th>
                <th className="text-right w-44 pr-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id} className="group">
                  <td className="font-extrabold text-slate-900 dark:text-slate-100 text-sm py-4">{aluno.nome}</td>
                  <td className="py-4 text-center">
                    <span className="badge-categoria bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700 font-extrabold">
                      {aluno.modalidade}
                    </span>
                  </td>
                  <td className="text-xs font-semibold text-slate-600 dark:text-slate-400 py-4">{aluno.responsavel}</td>
                  <td className="py-4 text-center">
                    {aluno.presencaHoje ? (
                      <span className="badge-status bg-emerald-100 text-emerald-950 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">Presente ✓</span>
                    ) : (
                      <span className="badge-status bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">Pendente</span>
                    )}
                  </td>
                  <td className="py-4 text-right pr-6">
                    <button
                      onClick={() => alternarPresenca(aluno.id)}
                      className="ml-auto btn-acao-padrao bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-slate-800 dark:text-amber-300 font-black text-xs transition-all hover:scale-105"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
                      <span className="whitespace-nowrap">{aluno.presencaHoje ? 'Remover' : 'Marcar Presença'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
