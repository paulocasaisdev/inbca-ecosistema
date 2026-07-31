'use client'

import React from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  Activity,
  Dumbbell,
  Users,
  Calendar,
  Clock,
  Plus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
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
    { modalidade: 'Kickboxing Adaptado', alunos: 60, instrutor: 'Prof.º Amanda', dias: 'Seg e Sex' },
  ]

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Painel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Painel de Gestão Integrada</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Instituto Nilson Bispo - Casinha Amarela
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Acompanhamento em tempo real de consultas médicas, exames, terapias e turmas de esportes inclusivos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/agendamento" className="botao-primario text-xs">
            <Plus className="w-4 h-4" />
            <span>Novo Agendamento</span>
          </Link>
        </div>
      </div>

      {/* Cartões de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icone = m.icone
          return (
            <div key={i} className="cartao-amarelo flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{m.titulo}</span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.cor} text-slate-950 flex items-center justify-center font-bold shadow-soft`}>
                  <Icone className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-amber-300">{m.valor}</span>
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1">{m.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Grid Principal: Atendimentos do Dia & Turmas Esportivas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Atendimentos de Hoje (8 cols) */}
        <div className="lg:col-span-8 cartao-amarelo space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-3">
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

          <div className="overflow-x-auto">
            <table className="tabela-padrao">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Paciente / Aluno</th>
                  <th>Serviço / Atividade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {atendimentosHoje.map((at) => (
                  <tr key={at.id}>
                    <td className="font-extrabold text-amber-700 dark:text-amber-400">{at.horario}h</td>
                    <td className="font-bold text-slate-900 dark:text-slate-100">{at.paciente}</td>
                    <td className="text-xs">{at.servico}</td>
                    <td>
                      {at.status === 'confirmado' && <span className="badge bg-emerald-100 text-emerald-800">Confirmado</span>}
                      {at.status === 'em_atendimento' && <span className="badge bg-amber-200 text-amber-950 animate-pulse">Em Aula / Atendimento</span>}
                      {at.status === 'agendado' && <span className="badge bg-blue-100 text-blue-800">Agendado</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modalidades Esportivas Ativas (4 cols) */}
        <div className="lg:col-span-4 cartao-destaque space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-300/40 pb-3">
            <Dumbbell className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
              Modalidades Esportivas & Lutas
            </h2>
          </div>

          <div className="space-y-3">
            {modalidadesAtivas.map((mod, idx) => (
              <div key={idx} className="p-3 bg-white/90 dark:bg-slate-900 rounded-xl border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
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

          <Link href="/painel/esportes-terapias" className="botao-primario w-full text-xs py-2.5">
            Gerenciar Turmas de Lutas & Zumba
          </Link>
        </div>
      </div>
    </div>
  )
}
