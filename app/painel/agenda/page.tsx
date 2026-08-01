'use client'
// ============================================================
// INBCA - Grade Diária de Atendimentos & Agenda Interna
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar as CalendarIcon, Clock, User, Phone,
  Stethoscope, Activity, Dumbbell, Brain, Plus,
  CheckCircle, XCircle, AlertCircle, Filter, Search,
  ChevronLeft, ChevronRight, Send, UserCheck, Shield
} from 'lucide-react'
import { toast } from 'sonner'

interface AgendamentoInterno {
  id: string
  codigo: string
  paciente: string
  telefone: string
  categoria: 'clinica' | 'exames' | 'terapias' | 'esportes'
  servico: string
  profissional: string
  data: string
  horario: string
  status: 'agendado' | 'em_atendimento' | 'concluido' | 'faltou' | 'cancelado'
  observacoes?: string
}

export default function PaginaAgendaInterna() {
  const [dataSelecionada, setDataSelecionada] = useState<string>(new Date().toISOString().split('T')[0])
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [busca, setBusca] = useState('')
  const [exibirModalNovo, setExibirModalNovo] = useState(false)

  // Form novo agendamento interno
  const [novoPaciente, setNovoPaciente] = useState('')
  const [novoTelefone, setNovoTelefone] = useState('')
  const [novaCat, setNovaCat] = useState<'clinica' | 'exames' | 'terapias' | 'esportes'>('clinica')
  const [novoServico, setNovoServico] = useState('')
  const [novoProfissional, setNovoProfissional] = useState('Dra. Vanessa Lima (Médica)')
  const [novoHorario, setNovoHorario] = useState('09:00')

  const agendamentosIniciais: AgendamentoInterno[] = [
    {
      id: '1',
      codigo: 'INBCA-482910',
      paciente: 'Maria Raimunda Souza',
      telefone: '(71) 99888-1234',
      categoria: 'clinica',
      servico: 'Clínico Geral - Consulta Comunitária',
      profissional: 'Dra. Vanessa Lima (Médica)',
      data: new Date().toISOString().split('T')[0],
      horario: '08:00',
      status: 'concluido',
      observacoes: 'Paciente encaminhada para exame de glicemia em jejum.',
    },
    {
      id: '2',
      codigo: 'INBCA-910283',
      paciente: 'João Pedro Oliveira (10 anos)',
      telefone: '(71) 99777-5566',
      categoria: 'esportes',
      servico: 'Karatê Inclusivo (Turma A)',
      profissional: 'Mestre Carlos (Instrutor)',
      data: new Date().toISOString().split('T')[0],
      horario: '09:00',
      status: 'em_atendimento',
    },
    {
      id: '3',
      codigo: 'INBCA-334190',
      paciente: 'Ana Clara Santos',
      telefone: '(71) 99666-4433',
      categoria: 'exames',
      servico: 'Exames de Sangue / Glicemia / Colesterol',
      profissional: 'Téc. Marcos Vinícius (Laboratório)',
      data: new Date().toISOString().split('T')[0],
      horario: '09:30',
      status: 'agendado',
    },
    {
      id: '4',
      codigo: 'INBCA-771204',
      paciente: 'Marcos Vinícius Silva',
      telefone: '(71) 99555-2211',
      categoria: 'terapias',
      servico: 'Fisioterapia Motora e Reabilitação',
      profissional: 'Dr. Lucas Mendes (Fisioterapeuta)',
      data: new Date().toISOString().split('T')[0],
      horario: '10:15',
      status: 'agendado',
    },
    {
      id: '5',
      codigo: 'INBCA-551920',
      paciente: 'Grupo Terceira Idade (15 alunos)',
      telefone: '(71) 99444-8899',
      categoria: 'esportes',
      servico: 'Zumba & Ginástica Comunitária',
      profissional: 'Prof.ª Fernanda (Instrutora)',
      data: new Date().toISOString().split('T')[0],
      horario: '11:00',
      status: 'agendado',
    },
  ]

  const [listaAgendamentos, setListaAgendamentos] = useState<AgendamentoInterno[]>(agendamentosIniciais)

  const filtrados = listaAgendamentos.filter((a) => {
    const atendeCategoria = filtroCategoria === 'todas' || a.categoria === filtroCategoria
    const atendeBusca =
      a.paciente.toLowerCase().includes(busca.toLowerCase()) ||
      a.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      a.servico.toLowerCase().includes(busca.toLowerCase()) ||
      a.profissional.toLowerCase().includes(busca.toLowerCase())
    return atendeCategoria && atendeBusca
  })

  function alterarStatus(id: string, novoStatus: AgendamentoInterno['status']) {
    setListaAgendamentos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: novoStatus } : item))
    )
    toast.success('Status da agenda atualizado com sucesso!')
  }

  function enviarLembreteWhatsApp(agendamento: AgendamentoInterno) {
    toast.info(`Lembrete via WhatsApp enviado para ${agendamento.paciente} (${agendamento.telefone})!`)
  }

  function salvarNovoAgendamento(e: React.FormEvent) {
    e.preventDefault()
    if (!novoPaciente || !novoServico) {
      toast.error('Preencha o nome do paciente e o serviço!')
      return
    }

    const novo: AgendamentoInterno = {
      id: Date.now().toString(),
      codigo: 'INBCA-' + Math.floor(100000 + Math.random() * 900000),
      paciente: novoPaciente,
      telefone: novoTelefone || '(71) 99999-0000',
      categoria: novaCat,
      servico: novoServico,
      profissional: novoProfissional,
      data: dataSelecionada,
      horario: novoHorario,
      status: 'agendado',
    }

    setListaAgendamentos([novo, ...listaAgendamentos])
    toast.success(`Agendamento criado para ${novo.paciente} às ${novo.horario}h!`)
    setExibirModalNovo(false)
    setNovoPaciente('')
    setNovoTelefone('')
    setNovoServico('')
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <CalendarIcon className="w-3.5 h-3.5" />
              Agenda Integrada INBCA
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Grade do Balcão & Profissionais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Grade Diária de Atendimentos
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Gerenciamento interno de horários para médicos, enfermeiros, terapeutas e instrutores.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => setExibirModalNovo(!exibirModalNovo)}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agendamento Rápido</span>
          </button>
        </div>
      </div>

      {/* ── Modal / Card Formulário Interno ──────────────────────────── */}
      {exibirModalNovo && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-3">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" />
              <h2 className="font-extrabold text-slate-900 dark:text-amber-300 text-base">
                Marcar Atendimento Direto na Agenda Interna
              </h2>
            </div>
            <button
              onClick={() => setExibirModalNovo(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={salvarNovoAgendamento} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Paciente / Aluno *</label>
              <input
                type="text"
                placeholder="Nome completo do paciente"
                value={novoPaciente}
                onChange={(e) => setNovoPaciente(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Telefone / WhatsApp *</label>
              <input
                type="text"
                placeholder="(71) 90000-0000"
                value={novoTelefone}
                onChange={(e) => setNovoTelefone(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Categoria do Serviço</label>
              <select
                value={novaCat}
                onChange={(e) => setNovaCat(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
              >
                <option value="clinica">🩺 Clínica Médica</option>
                <option value="exames">🔬 Exames Laboratoriais/Imagem</option>
                <option value="terapias">🧠 Terapias & Fisioterapia</option>
                <option value="esportes">🥋 Esportes & Lutas (Karatê/Zumba/Boxe)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Serviço / Atendimento *</label>
              <input
                type="text"
                placeholder="Ex: Clínico Geral ou Karatê"
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Profissional Responsável</label>
              <select
                value={novoProfissional}
                onChange={(e) => setNovoProfissional(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
              >
                <option value="Dra. Vanessa Lima (Médica)">Dra. Vanessa Lima (Médica)</option>
                <option value="Dra. Camila Vasconcelos (Psicóloga)">Dra. Camila Vasconcelos (Psicóloga)</option>
                <option value="Dr. Lucas Mendes (Fisioterapeuta)">Dr. Lucas Mendes (Fisioterapeuta)</option>
                <option value="Mestre Carlos (Karatê)">Mestre Carlos (Karatê)</option>
                <option value="Prof.ª Fernanda (Zumba)">Prof.ª Fernanda (Zumba)</option>
                <option value="Prof. Ricardo (Boxe)">Prof. Ricardo (Boxe)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Horário da Agenda</label>
              <select
                value={novoHorario}
                onChange={(e) => setNovoHorario(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100 font-medium cursor-pointer"
              >
                <option value="08:00">08:00h</option>
                <option value="09:00">09:00h</option>
                <option value="10:00">10:00h</option>
                <option value="11:00">11:00h</option>
                <option value="14:00">14:00h</option>
                <option value="15:00">15:00h</option>
                <option value="16:00">16:00h</option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setExibirModalNovo(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancelar
              </button>
              <button type="submit" className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md">
                Confirmar Agendamento Interno
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Controles da Agenda (Filtros & Data Totalmente Alinhados) ───── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-3 w-full">
          {/* Navegador de Data Alinhado */}
          <div className="flex items-center gap-2 bg-amber-50/80 dark:bg-slate-800 p-1 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 flex-shrink-0">
            <button
              onClick={() => {
                const d = new Date(dataSelecionada)
                d.setDate(d.getDate() - 1)
                setDataSelecionada(d.toISOString().split('T')[0])
              }}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-amber-300 hover:bg-amber-100 shadow-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2.5 font-extrabold text-xs text-slate-900 dark:text-slate-100 whitespace-nowrap">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Data: {dataSelecionada}</span>
            </div>
            <button
              onClick={() => {
                const d = new Date(dataSelecionada)
                d.setDate(d.getDate() + 1)
                setDataSelecionada(d.toISOString().split('T')[0])
              }}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-amber-300 hover:bg-amber-100 shadow-xs transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filtros por Categoria Alinhados */}
          <div className="flex items-center gap-1.5 flex-wrap xl:flex-nowrap justify-center">
            <button
              onClick={() => setFiltroCategoria('todas')}
              className={`px-3.5 h-8 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                filtroCategoria === 'todas'
                  ? 'bg-amber-400 text-slate-950 shadow-xs border border-amber-500'
                  : 'bg-amber-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
              }`}
            >
              Todos os Serviços
            </button>
            <button
              onClick={() => setFiltroCategoria('clinica')}
              className={`px-3.5 h-8 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filtroCategoria === 'clinica'
                  ? 'bg-amber-400 text-slate-950 shadow-xs border border-amber-500'
                  : 'bg-amber-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Clínica</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('exames')}
              className={`px-3.5 h-8 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filtroCategoria === 'exames'
                  ? 'bg-amber-400 text-slate-950 shadow-xs border border-amber-500'
                  : 'bg-amber-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Exames</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('terapias')}
              className={`px-3.5 h-8 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filtroCategoria === 'terapias'
                  ? 'bg-amber-400 text-slate-950 shadow-xs border border-amber-500'
                  : 'bg-amber-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
              }`}
            >
              <Brain className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Terapias</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('esportes')}
              className={`px-3.5 h-8 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filtroCategoria === 'esportes'
                  ? 'bg-amber-400 text-slate-950 shadow-xs border border-amber-500'
                  : 'bg-amber-50/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-amber-100'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Esportes & Saúde</span>
            </button>
          </div>

          {/* Campo de Busca Alinhado */}
          <div className="relative w-full xl:w-64 flex-shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, código..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
            />
          </div>
        </div>

        {/* Grade da Agenda em Cards Responsivos (0 Rolagem) */}
        <div className="space-y-3">
          {filtrados.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-amber-200/80 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-300/80 text-amber-950 dark:text-amber-300 font-black text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>{item.horario}h</span>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-500 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/40">
                    {item.codigo}
                  </span>

                  <span className={`text-[11px] font-black px-3 py-0.5 rounded-full border shadow-sm ${
                    item.status === 'agendado' ? 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300' :
                    item.status === 'em_atendimento' ? 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950 dark:text-blue-300 animate-pulse' :
                    item.status === 'concluido' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                    'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
                  }`}>
                    {item.status === 'agendado' ? 'Agendado' : item.status === 'em_atendimento' ? 'Em Atendimento' : item.status === 'concluido' ? 'Concluído ✓' : item.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{item.paciente}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Serviço: <span className="font-bold text-slate-800 dark:text-slate-200">{item.servico}</span> | Profissional: <span className="font-bold text-slate-800 dark:text-slate-200">{item.profissional}</span> | Fone: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.telefone}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0 justify-end">
                <button
                  onClick={() => alterarStatus(item.id, 'em_atendimento')}
                  className="px-3.5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-950 dark:bg-blue-950 dark:text-blue-300 text-xs font-black transition-all shadow-sm hover:scale-105"
                  title="Iniciar Atendimento"
                >
                  Chamar
                </button>
                <button
                  onClick={() => alterarStatus(item.id, 'concluido')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black transition-all shadow-sm hover:scale-105"
                  title="Concluir Atendimento"
                >
                  Concluir
                </button>
                <button
                  onClick={() => enviarLembreteWhatsApp(item)}
                  className="p-2 rounded-xl bg-green-100 hover:bg-green-200 text-green-950 dark:bg-green-950 dark:text-green-300 transition-all shadow-sm hover:scale-105"
                  title="Enviar Lembrete WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
