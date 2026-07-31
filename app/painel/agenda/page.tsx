'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Stethoscope,
  Activity,
  Dumbbell,
  Brain,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
  UserCheck
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
      profissional: 'Dra. Beatriz (Fisioterapeuta)',
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
    {
      id: '6',
      codigo: 'INBCA-882103',
      paciente: 'Seu Antônio Ramos (72 anos)',
      telefone: '(71) 99333-7766',
      categoria: 'clinica',
      servico: 'Oftalmologia - Exame de Vista',
      profissional: 'Dra. Camila Duarte (Oftalmo)',
      data: new Date().toISOString().split('T')[0],
      horario: '14:00',
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
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Agenda Interna da Equipe</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Grade Diária de Atendimentos INBCA
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Painel interno para Médicos, Enfermeiros, Técnicos, Agentes Sociais e Instrutores gerenciarem a fila de atendimento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/agendamento" className="botao-secundario text-xs">
            Ver Portal Público
          </Link>
          <button
            onClick={() => setExibirModalNovo(!exibirModalNovo)}
            className="botao-primario text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Agendamento Interno Rápido</span>
          </button>
        </div>
      </div>

      {/* Modal / Card Formulário Interno */}
      {exibirModalNovo && (
        <div className="cartao-destaque animate-slide-up space-y-4">
          <div className="flex items-center justify-between border-b border-amber-300/40 pb-3">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" />
              <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
                Marcar Atendimento Direto na Agenda Interna
              </h2>
            </div>
            <button
              onClick={() => setExibirModalNovo(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Fechar X
            </button>
          </div>

          <form onSubmit={salvarNovoAgendamento} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="rotulo-campo">Paciente / Aluno *</label>
              <input
                type="text"
                placeholder="Nome completo do paciente"
                value={novoPaciente}
                onChange={(e) => setNovoPaciente(e.target.value)}
                className="campo-input"
                required
              />
            </div>

            <div>
              <label className="rotulo-campo">Telefone / WhatsApp *</label>
              <input
                type="text"
                placeholder="(71) 90000-0000"
                value={novoTelefone}
                onChange={(e) => setNovoTelefone(e.target.value)}
                className="campo-input"
                required
              />
            </div>

            <div>
              <label className="rotulo-campo">Categoria do Serviço</label>
              <select
                value={novaCat}
                onChange={(e) => setNovaCat(e.target.value as any)}
                className="campo-input cursor-pointer"
              >
                <option value="clinica">🩺 Clínica Médica</option>
                <option value="exames">🔬 Exames Laboratoriais/Imagem</option>
                <option value="terapias">🧠 Terapias & Fisioterapia</option>
                <option value="esportes">🥋 Esportes & Lutas (Karatê/Zumba/Boxe)</option>
              </select>
            </div>

            <div>
              <label className="rotulo-campo">Serviço / Atendimento Específico *</label>
              <input
                type="text"
                placeholder="Ex: Clínico Geral ou Karatê"
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
                className="campo-input"
                required
              />
            </div>

            <div>
              <label className="rotulo-campo">Profissional Responsável</label>
              <select
                value={novoProfissional}
                onChange={(e) => setNovoProfissional(e.target.value)}
                className="campo-input cursor-pointer"
              >
                <option value="Dra. Vanessa Lima (Médica)">Dra. Vanessa Lima (Médica)</option>
                <option value="Enf.ª Juliana Montenegro (Enfermeira)">Enf.ª Juliana Montenegro (Enfermeira)</option>
                <option value="Téc. Marcos Vinícius (Laboratório)">Téc. Marcos Vinícius (Laboratório)</option>
                <option value="Mestre Carlos (Karatê)">Mestre Carlos (Karatê)</option>
                <option value="Prof.ª Fernanda (Zumba)">Prof.ª Fernanda (Zumba)</option>
                <option value="Prof. Ricardo (Boxe)">Prof. Ricardo (Boxe)</option>
                <option value="Dra. Beatriz (Fisioterapeuta)">Dra. Beatriz (Fisioterapeuta)</option>
              </select>
            </div>

            <div>
              <label className="rotulo-campo">Horário da Agenda</label>
              <select
                value={novoHorario}
                onChange={(e) => setNovoHorario(e.target.value)}
                className="campo-input cursor-pointer"
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
                className="botao-secundario text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="botao-primario text-xs">
                Confirmar Agendamento Interno
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Controles da Agenda (Filtros & Data) */}
      <div className="cartao-amarelo space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Navegador de Data */}
          <div className="flex items-center gap-3 bg-amber-50 dark:bg-slate-900 p-2 rounded-2xl border border-amber-200">
            <button
              onClick={() => {
                const d = new Date(dataSelecionada)
                d.setDate(d.getDate() - 1)
                setDataSelecionada(d.toISOString().split('T')[0])
              }}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-amber-100 shadow-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 font-extrabold text-sm text-slate-900 dark:text-slate-100">
              <CalendarIcon className="w-4 h-4 text-amber-600" />
              <span>Data: {dataSelecionada}</span>
            </div>
            <button
              onClick={() => {
                const d = new Date(dataSelecionada)
                d.setDate(d.getDate() + 1)
                setDataSelecionada(d.toISOString().split('T')[0])
              }}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-amber-300 hover:bg-amber-100 shadow-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filtros por Categoria */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFiltroCategoria('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filtroCategoria === 'todas'
                  ? 'bg-amber-500 text-slate-950 shadow-soft'
                  : 'bg-amber-100/60 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Todos os Serviços
            </button>
            <button
              onClick={() => setFiltroCategoria('clinica')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filtroCategoria === 'clinica'
                  ? 'bg-amber-500 text-slate-950 shadow-soft'
                  : 'bg-amber-100/60 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Clínica</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('exames')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filtroCategoria === 'exames'
                  ? 'bg-amber-500 text-slate-950 shadow-soft'
                  : 'bg-amber-100/60 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Exames</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('terapias')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filtroCategoria === 'terapias'
                  ? 'bg-amber-500 text-slate-950 shadow-soft'
                  : 'bg-amber-100/60 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Terapias</span>
            </button>
            <button
              onClick={() => setFiltroCategoria('esportes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filtroCategoria === 'esportes'
                  ? 'bg-amber-500 text-slate-950 shadow-soft'
                  : 'bg-amber-100/60 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Lutas & Zumba</span>
            </button>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, código..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="campo-input pl-10 text-xs py-2"
            />
          </div>
        </div>

        {/* Grade da Agenda Interna */}
        <div className="overflow-x-auto">
          <table className="tabela-padrao">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Código INBCA</th>
                <th>Paciente / Contato</th>
                <th>Serviço & Categoria</th>
                <th>Profissional Responsável</th>
                <th>Status Atual</th>
                <th>Ações Internas</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((item) => (
                <tr key={item.id}>
                  <td className="font-black text-amber-700 dark:text-amber-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.horario}h</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs font-bold text-slate-500">{item.codigo}</td>
                  <td>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.paciente}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{item.telefone}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-bold text-slate-800 dark:text-amber-200">
                      {item.servico}
                    </span>
                  </td>
                  <td className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {item.profissional}
                  </td>
                  <td>
                    {item.status === 'agendado' && <span className="badge bg-amber-100 text-amber-900 border border-amber-300">Agendado</span>}
                    {item.status === 'em_atendimento' && <span className="badge bg-blue-100 text-blue-900 border border-blue-300 animate-pulse">Em Atendimento</span>}
                    {item.status === 'concluido' && <span className="badge bg-emerald-100 text-emerald-900 border border-emerald-300">Concluído ✓</span>}
                    {item.status === 'faltou' && <span className="badge bg-orange-100 text-orange-900 border border-orange-300">Faltou</span>}
                    {item.status === 'cancelado' && <span className="badge bg-red-100 text-red-900 border border-red-300">Cancelado</span>}
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => alterarStatus(item.id, 'em_atendimento')}
                        className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold transition-colors"
                        title="Iniciar Atendimento"
                      >
                        Chamar
                      </button>
                      <button
                        onClick={() => alterarStatus(item.id, 'concluido')}
                        className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors"
                        title="Concluir Atendimento"
                      >
                        Concluir
                      </button>
                      <button
                        onClick={() => enviarLembreteWhatsApp(item)}
                        className="p-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
                        title="Enviar Lembrete WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
