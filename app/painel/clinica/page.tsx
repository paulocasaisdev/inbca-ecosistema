'use client'

import React, { useState } from 'react'
import {
  Stethoscope,
  Activity,
  Plus,
  Search,
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Filter,
  UserCheck,
  HeartPulse
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaClinicaExames() {
  const [busca, setBusca] = useState('')
  const [filtroTab, setFiltroTab] = useState<'todos' | 'consultas' | 'exames'>('todos')

  const agendamentos = [
    { id: '1', paciente: 'Maria Raimunda Souza', sus: '700.1234.5678.90', tipo: 'Consulta', especialidade: 'Clínico Geral', medico: 'Dra. Vanessa Lima', data: '2026-07-31', hora: '08:30', status: 'confirmado' },
    { id: '2', paciente: 'Ana Clara Santos', sus: '890.4321.8765.12', tipo: 'Exame', especialidade: 'Exame de Sangue / Glicemia', medico: 'Dr. Roberto Cruz', data: '2026-07-31', hora: '09:30', status: 'agendado' },
    { id: '3', paciente: 'Carlos Eduardo Ramos', sus: '654.9876.1234.55', tipo: 'Exame', especialidade: 'Ultrassonografia Abdominal', medico: 'Dra. Heloísa Castro', data: '2026-07-31', hora: '10:00', status: 'agendado' },
    { id: '4', paciente: 'Luciana Ferreira', sus: '321.6549.8700.11', tipo: 'Consulta', especialidade: 'Pediatria (Acompanhamento)', medico: 'Dr. Marcos Antônio', data: '2026-07-31', hora: '11:15', status: 'realizado' },
    { id: '5', paciente: 'José Francisco da Silva', sus: '111.2223.3344.55', tipo: 'Consulta', especialidade: 'Oftalmologia (Refração)', medico: 'Dra. Camila Duarte', data: '2026-08-01', hora: '14:00', status: 'agendado' },
  ]

  const filtrados = agendamentos.filter((a) => {
    const atendeFiltroTab =
      filtroTab === 'todos' ||
      (filtroTab === 'consultas' && a.tipo === 'Consulta') ||
      (filtroTab === 'exames' && a.tipo === 'Exame')
    const atendeBusca =
      a.paciente.toLowerCase().includes(busca.toLowerCase()) ||
      a.especialidade.toLowerCase().includes(busca.toLowerCase()) ||
      a.sus.includes(busca)
    return atendeFiltroTab && atendeBusca
  })

  function marcarComoRealizado(id: string) {
    toast.success('Atendimento/Exame marcado como concluído na Casinha Amarela!')
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Gestão Médica Comunitária</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Consultas Médicas & Realização de Exames
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Controle de prontuários, agendamentos médicos e triagem na Casinha Amarela.
          </p>
        </div>

        <button
          onClick={() => toast.info('Abre o formulário rápido de agendamento médico')}
          className="botao-primario text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Marcar Nova Consulta/Exame</span>
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="cartao-amarelo space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-amber-100/70 dark:bg-slate-900 rounded-xl border border-amber-200">
            <button
              onClick={() => setFiltroTab('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'todos' ? 'bg-amber-500 text-slate-950 shadow-soft' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Todos os Atendimentos
            </button>
            <button
              onClick={() => setFiltroTab('consultas')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'consultas' ? 'bg-amber-500 text-slate-950 shadow-soft' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Consultas Médicas
            </button>
            <button
              onClick={() => setFiltroTab('exames')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroTab === 'exames' ? 'bg-amber-500 text-slate-950 shadow-soft' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Exames Laboratoriais/Imagem
            </button>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, SUS..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="campo-input pl-10 text-xs py-2"
            />
          </div>
        </div>

        {/* Tabela de Atendimentos */}
        <div className="overflow-x-auto">
          <table className="tabela-padrao">
            <thead>
              <tr>
                <th>Data / Hora</th>
                <th>Paciente</th>
                <th>Cartão SUS</th>
                <th>Tipo & Especialidade</th>
                <th>Profissional</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((item) => (
                <tr key={item.id}>
                  <td className="font-extrabold text-amber-700 dark:text-amber-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.hora}h</span>
                    </div>
                  </td>
                  <td className="font-bold text-slate-900 dark:text-slate-100">{item.paciente}</td>
                  <td className="text-xs text-slate-500 font-mono">{item.sus}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.tipo === 'Consulta' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {item.tipo === 'Consulta' ? <Stethoscope className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                      {item.especialidade}
                    </span>
                  </td>
                  <td className="text-xs">{item.medico}</td>
                  <td>
                    {item.status === 'confirmado' && <span className="badge bg-emerald-100 text-emerald-800">Confirmado</span>}
                    {item.status === 'agendado' && <span className="badge bg-amber-100 text-amber-800">Agendado</span>}
                    {item.status === 'realizado' && <span className="badge bg-slate-200 text-slate-700">Concluído</span>}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => marcarComoRealizado(item.id)}
                        className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                        title="Marcar Concluído"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.info(`Abre prontuário de ${item.paciente}`)}
                        className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                        title="Ver Prontuário"
                      >
                        <FileText className="w-4 h-4" />
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
