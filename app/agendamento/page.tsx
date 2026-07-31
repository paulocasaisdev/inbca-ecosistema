'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle,
  Stethoscope,
  Activity,
  Dumbbell,
  ArrowLeft,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaAgendamento() {
  const [categoria, setCategoria] = useState<'clinica' | 'exames' | 'terapias' | 'esportes'>('clinica')
  const [servicoSelecionado, setServicoSelecionado] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [nome, setNome] = useState('')
  const [documento, setDocumento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [bairro, setBairro] = useState('')
  const [concluido, setConcluido] = useState(false)
  const [codigoAgendamento, setCodigoAgendamento] = useState('')

  const opcoesPorCategoria = {
    clinica: [
      { id: 'clinico-geral', nome: 'Clínico Geral - Consulta Comunitária' },
      { id: 'pediatria', nome: 'Pediatria - Acompanhamento Infantil' },
      { id: 'oftalmologia', nome: 'Oftalmologia - Exame de Vista' },
      { id: 'odontologia', nome: 'Odontologia - Triagem e Limpeza' },
    ],
    exames: [
      { id: 'sangue-glicemia', nome: 'Exames de Sangue / Glicemia / Colesterol' },
      { id: 'ultrassom', nome: 'Ultrassonografia Geral' },
      { id: 'ecg', nome: 'Eletrocardiograma (ECG)' },
      { id: 'urina-fezes', nome: 'Sumário de Urina e Parasitológico' },
    ],
    terapias: [
      { id: 'psicologia', nome: 'Psicologia Individual' },
      { id: 'psicoterapia-grupo', nome: 'Psicoterapia em Grupo' },
      { id: 'fisioterapia-motora', nome: 'Fisioterapia Motora e Reabilitação' },
    ],
    esportes: [
      { id: 'karate', nome: 'Karatê Inclusivo (Infantil / Jovem / PNE)' },
      { id: 'zumba', nome: 'Zumba & Ginástica Comunitária' },
      { id: 'capoeira', nome: 'Capoeira Inclusiva' },
      { id: 'boxe', nome: 'Boxe para Saúde e Disciplina' },
      { id: 'kickboxing', nome: 'Kickboxing Adaptado' },
    ],
  }

  const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

  function submeterAgendamento(e: React.FormEvent) {
    e.preventDefault()
    if (!servicoSelecionado || !data || !horario || !nome || !telefone) {
      toast.error('Por favor, preencha todos os campos obrigatórios do agendamento!')
      return
    }

    const cod = 'INBCA-' + Math.floor(100000 + Math.random() * 900000)
    setCodigoAgendamento(cod)
    setConcluido(true)
    toast.success('Agendamento realizado com sucesso na Casinha Amarela!')
  }

  return (
    <div className="min-h-screen bg-[#fffdf5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white dark:bg-slate-900 border-b border-amber-200 dark:border-amber-900/40 px-4 lg:px-8 py-4 flex items-center justify-between shadow-soft">
        <Link href="/" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Portal INBCA</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-black text-amber-600 text-sm">INBCA Agendamentos</span>
        </div>
      </header>

      {/* Conteúdo Central */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
        {concluido ? (
          <div className="cartao-destaque text-center space-y-6 animate-scale-in py-12">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="badge-amarelo">Agendamento Confirmado!</span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
                Tudo certo para o seu atendimento
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Apresente o código abaixo na recepção da <strong>Casinha Amarela</strong> no dia marcado.
              </p>
            </div>

            <div className="p-4 bg-amber-100 dark:bg-amber-950/80 rounded-2xl border border-amber-300 dark:border-amber-700 max-w-xs mx-auto">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">Código de Agendamento</p>
              <p className="text-2xl font-black text-slate-900 dark:text-amber-200 tracking-wider mt-1">{codigoAgendamento}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200">
              <div>
                <span className="text-slate-400 font-bold block">Morador:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{nome}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Data e Horário:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{data} às {horario}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 font-bold block">Serviço Agendado:</span>
                <span className="font-bold text-amber-700 dark:text-amber-300">{servicoSelecionado}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setConcluido(false)
                  setServicoSelecionado('')
                  setData('')
                  setHorario('')
                }}
                className="botao-secundario text-xs"
              >
                Novo Agendamento
              </button>
              <Link href="/" className="botao-primario text-xs">
                Voltar à Página Principal
              </Link>
            </div>
          </div>
        ) : (
          <div className="cartao-amarelo space-y-6">
            <div className="space-y-2 border-b border-amber-100 dark:border-amber-900/40 pb-4">
              <div className="badge-amarelo">Atendimento Comunitário</div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Agende sua Consulta, Exame, Terapia ou Esporte
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Preencha os dados abaixo para reservar seu horário no Instituto Nilson Bispo Casinha Amarela.
              </p>
            </div>

            <form onSubmit={submeterAgendamento} className="space-y-6">
              {/* Seleção de Categoria */}
              <div>
                <label className="rotulo-campo">1. Selecione a Categoria do Atendimento:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => { setCategoria('clinica'); setServicoSelecionado('') }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      categoria === 'clinica'
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-soft'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <Stethoscope className="w-5 h-5" />
                    <span>Clínica Médica</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCategoria('exames'); setServicoSelecionado('') }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      categoria === 'exames'
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-soft'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <Activity className="w-5 h-5" />
                    <span>Exames</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCategoria('terapias'); setServicoSelecionado('') }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      categoria === 'terapias'
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-soft'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Terapias & Psico</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setCategoria('esportes'); setServicoSelecionado('') }}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      categoria === 'esportes'
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-soft'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <Dumbbell className="w-5 h-5" />
                    <span>Esportes & Lutas</span>
                  </button>
                </div>
              </div>

              {/* Seleção do Serviço Específico */}
              <div>
                <label className="rotulo-campo">2. Selecione a Modalidade ou Especialidade:</label>
                <select
                  value={servicoSelecionado}
                  onChange={(e) => setServicoSelecionado(e.target.value)}
                  className="campo-input cursor-pointer"
                  required
                >
                  <option value="">-- Escolha um serviço --</option>
                  {opcoesPorCategoria[categoria].map((op) => (
                    <option key={op.id} value={op.nome}>
                      {op.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="rotulo-campo flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>3. Data do Atendimento:</span>
                  </label>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="campo-input"
                    required
                  />
                </div>

                <div>
                  <label className="rotulo-campo flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>4. Horário Preferencial:</span>
                  </label>
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="campo-input cursor-pointer"
                    required
                  >
                    <option value="">-- Selecione o horário --</option>
                    {horariosDisponiveis.map((hr) => (
                      <option key={hr} value={hr}>
                        {hr}h
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dados do Morador */}
              <div className="space-y-4 pt-2 border-t border-amber-100 dark:border-amber-900/40">
                <h3 className="text-sm font-bold text-slate-800 dark:text-amber-300">5. Identificação do Paciente / Aluno</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="rotulo-campo">Nome Completo *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ex: Maria dos Santos"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="campo-input pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="rotulo-campo">CPF ou Cartão SUS *</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        className="campo-input pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="rotulo-campo">WhatsApp / Celular *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="(71) 90000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="campo-input pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="rotulo-campo">Bairro / Comunidade</label>
                    <input
                      type="text"
                      placeholder="Ex: Casinha Amarela / Nilson Bispo"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className="campo-input"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Finalização */}
              <button type="submit" className="botao-primario w-full py-4 text-base mt-4">
                <CheckCircle className="w-5 h-5" />
                <span>Confirmar Agendamento no INBCA</span>
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
