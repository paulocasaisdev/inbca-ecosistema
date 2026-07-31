'use client'

import React, { useState } from 'react'
import {
  Dumbbell,
  Users,
  Calendar,
  Clock,
  Plus,
  CheckCircle,
  Award,
  Sparkles,
  UserCheck,
  Search
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
    { id: 'psicologia', nome: 'Psicologia Individual', icone: 'Sparkles', categoria: 'Saúde Mental', alunos: 60, dias: 'Segunda a Quinta', horario: '09:00 às 17:00', mestre: 'Dra. Márcia' },
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
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Esportes Inclusivos & Terapias</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Karatê, Zumba, Capoeira, Boxe, Kickboxing & Terapias
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Gestão de turmas esportivas, chamadas de frequência e projetos comunitários da Casinha Amarela.
          </p>
        </div>

        <button
          onClick={() => toast.info('Formulário de inscrição de novo aluno/atleta')}
          className="botao-primario text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Matricular Novo Aluno</span>
        </button>
      </div>

      {/* Grid de Modalidades Oferecidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modalidades.map((mod) => (
          <div key={mod.id} className="cartao-amarelo flex flex-col justify-between hover:border-amber-400 transition-all">
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

      {/* Chamada de Frequência e Alunos */}
      <div className="cartao-amarelo space-y-4">
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
              className="campo-input text-xs py-2 cursor-pointer"
            >
              <option value="todas">Todas as Modalidades</option>
              {modalidades.map((m) => (
                <option key={m.id} value={m.nome}>{m.nome}</option>
              ))}
            </select>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome do aluno..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                className="campo-input pl-10 text-xs py-2"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Alunos e Chamada */}
        <div className="overflow-x-auto">
          <table className="tabela-padrao">
            <thead>
              <tr>
                <th>Aluno / Praticante</th>
                <th>Modalidade / Turma</th>
                <th>Responsável / Fone</th>
                <th>Presença Hoje</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td className="font-bold text-slate-900 dark:text-slate-100">{aluno.nome}</td>
                  <td>
                    <span className="badge bg-amber-100 text-amber-900 border border-amber-300">
                      {aluno.modalidade}
                    </span>
                  </td>
                  <td className="text-xs text-slate-500">{aluno.responsavel}</td>
                  <td>
                    {aluno.presencaHoje ? (
                      <span className="badge bg-emerald-100 text-emerald-800">Presente ✓</span>
                    ) : (
                      <span className="badge bg-amber-50 text-amber-700">Pendente</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => alternarPresenca(aluno.id)}
                      className="botao-secundario text-xs py-1 px-3"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>{aluno.presencaHoje ? 'Remover' : 'Marcar Presença'}</span>
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
