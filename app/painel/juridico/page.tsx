'use client'
// ============================================================
// INBCA - Módulo de Assistência Jurídica Comunitária (Ajustado)
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import { useState } from 'react'
import {
  Scale, Shield, FileText, CheckCircle2, Search,
  Copy, Send, Lock, Eye, BookOpen, Users,
  Calendar, Home, Check, Plus, AlertCircle, Printer, Filter, ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'

// ─── Tipos e Dados de Atendimento ───────────────────────────

interface AtendimentoJuridico {
  id: string
  assistidoNome: string
  cpf: string
  bairro: string
  area: 'BPC/LOAS' | 'Direito de Família' | 'Consumidor' | 'Trabalhista' | 'Documentação Civil'
  advogadoVoluntario: string
  dataAtendimento: string
  status: 'Agendado' | 'Em Andamento' | 'Concluído' | 'Encaminhado à Defensoria'
  observacoes: string
}

const ATENDIMENTOS_INICIAIS: AtendimentoJuridico[] = [
  {
    id: 'JUR-001',
    assistidoNome: 'Maria das Graças Silva',
    cpf: '123.456.789-00',
    bairro: 'Casinha Amarela',
    area: 'BPC/LOAS',
    advogadoVoluntario: 'Dra. Patricia Lima (OAB/BA)',
    dataAtendimento: '02/08/2026',
    status: 'Agendado',
    observacoes: 'Orientação para pedido de Benefício de Prestação Continuada para idoso de 67 anos.'
  },
  {
    id: 'JUR-002',
    assistidoNome: 'João Pedro de Oliveira',
    cpf: '987.654.321-11',
    bairro: 'Vila Esperança',
    area: 'Direito de Família',
    advogadoVoluntario: 'Dr. Roberto Alves (OAB/BA)',
    dataAtendimento: '02/08/2026',
    status: 'Em Andamento',
    observacoes: 'Orientação e elaboração de minuta para acordo amigável de pensão alimentícia.'
  },
  {
    id: 'JUR-003',
    assistidoNome: 'Ana Paula Costa',
    cpf: '456.789.123-22',
    bairro: 'Casinha Amarela',
    area: 'Documentação Civil',
    advogadoVoluntario: 'Dra. Patricia Lima (OAB/BA)',
    dataAtendimento: '25/07/2026',
    status: 'Concluído',
    observacoes: 'Emissão de declaração de hipossuficiência para gratuidade da 2ª via da Certidão de Nascimento.'
  }
]

// ─── Modelos de Documentos Populares ────────────────────────

interface DocumentoPopular {
  id: string
  titulo: string
  categoria: 'gratuidade' | 'familia' | 'inss' | 'procuracao'
  descricao: string
  conteudo: string
}

const MODELOS_DOCUMENTOS: DocumentoPopular[] = [
  {
    id: 'doc-hipossuficiencia',
    titulo: 'Declaração de Hipossuficiência (Baixa Renda / Gratuidade)',
    categoria: 'gratuidade',
    descricao: 'Declaração de falta de recursos financeiros para obter isenção de taxas cartorárias ou judiciais.',
    conteudo: `DECLARAÇÃO DE HIPOSSUFICIÊNCIA FINANCEIRA

Eu, [NOME DO ASSISTIDO], nacionalidade brasileiro(a), estado civil [ESTADO CIVIL], residente e domiciliado(a) na Rua [ENDEREÇO], Bairro [BAIRRO], portador(a) do RG nº [RG] e inscrito(a) no CPF sob o nº [CPF].

DECLARO, sob as penas da lei, para fins de concessão de gratuidade de justiça e isenção de emolumentos cartorários, nos termos do artigo 98 e seguintes da Lei nº 13.105/2015 (Código de Processo Civil) e da Constituição Federal, que NÃO POSSUO condições financeiras de arcar com custas, taxas ou emolumentos sem prejuízo do sustento próprio e de minha família.

Por ser a expressão da verdade, firmo a presente declaração.

Atendido no Instituto Nilson Bispo Casinha Amarela (INBCA).

[CIDADE/UF], [DATA DE HOJE].

__________________________________________
Assinatura do Declarante`
  },
  {
    id: 'doc-procuracao',
    titulo: 'Procuração Ad Judicia para Advocacia Voluntária',
    categoria: 'procuracao',
    descricao: 'Procuração padrão para representação em pleitos administrativos perante o INSS ou Defensoria Pública.',
    conteudo: `PROCURAÇÃO AD JUDICIA E ET EXTRA

OUTORGANTE: [NOME DO ASSISTIDO], CPF nº [CPF], RG nº [RG], residente no bairro [BAIRRO].

OUTORGADO: Dr(a). [NOME DO ADVOGADO VOLUNTÁRIO], inscrito(a) na OAB/[UF] nº [NÚMERO OAB], com atuação comunitária voluntária junto ao Instituto Nilson Bispo Casinha Amarela (INBCA).

PODERES: Pelo presente instrumento, o(a) Outorgante concede ao(à) Outorgado(a) amplos poderes para o foro em geral e os especiais para representar perante órgãos públicos, INSS, cartórios de registro civil e órgãos de assistência social, visando a defesa dos direitos do(a) assistido(a).

[CIDADE/UF], [DATA DE HOJE].

__________________________________________
Assinatura do Outorgante`
  },
  {
    id: 'doc-declaracao-residencia',
    titulo: 'Declaração de Residência Comunitária INBCA',
    categoria: 'gratuidade',
    descricao: 'Declaração emitida pela associação comprovando a moradia da família na comunidade.',
    conteudo: `DECLARAÇÃO DE RESIDÊNCIA E VÍNCULO COMUNITÁRIO

O INSTITUTO NILSON BISPO CASINHA AMARELA (INBCA), entidade comunitária de assistência social, declara para os devidos fins que o(a) Sr(a). [NOME DO ASSISTIDO], inscrito(a) no CPF sob o nº [CPF], reside comprovadamente na comunidade [NOME DO BAIRRO], no endereço [ENDEREÇO].

A presente declaração é emitida a pedido do interessado para fins de comprovação junto a órgãos de assistência social, escolas e rede pública de saúde.

[CIDADE/UF], [DATA DE HOJE].

__________________________________________
Coordenação de Assistência Social - INBCA`
  }
]

// ─── Guias de Direitos da Comunidade ──────────────────────────

const GUIAS_DIREITOS = [
  {
    titulo: 'Como solicitar o BPC/LOAS (Benefício de Prestação Continuada)',
    resumo: 'Requisitos para idosos a partir de 65 anos ou Pessoas com Deficiência (PCD) baixa renda receberem 1 salário mínimo mensal do INSS.',
    passos: ['Estar inscrito no CadÚnico atualizado', 'Comprovar renda familiar por pessoa menor que 1/4 do salário mínimo', 'Agendar avaliação médica/social no INSS']
  },
  {
    titulo: 'Pensão Alimentícia e Acordo Amigável de Guarda',
    resumo: 'Direitos da criança, dever de ambos os pais e como formalizar acordo sem custos através do plantão jurídico da Casinha Amarela.',
    passos: ['Reunir certidão de nascimento do filho', 'Comprovante de residência e renda dos pais', 'Agendar atendimento no plantão de mediação']
  },
  {
    titulo: 'Direito à Gratuidade de Certidões e Documentos Civis',
    resumo: 'Isenção legal para emissão da 2ª via de Certidão de Nascimento, Casamento e Óbito para famílias de baixa renda.',
    passos: ['Solicitar declaração de hipossuficiência no INBCA', 'Encaminhar requerimento ao Cartório de Registro Civil']
  }
]

export default function PaginaJuridicoINBCA() {
  const [abaAtiva, setAbaAtiva] = useState<'triagem' | 'orientacoes' | 'modelos' | 'plantao'>('triagem')
  const [atendimentos, setAtendimentos] = useState<AtendimentoJuridico[]>(ATENDIMENTOS_INICIAIS)
  const [buscaPlantao, setBuscaPlantao] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [docSelecionado, setDocSelecionado] = useState<DocumentoPopular | null>(null)

  // Formulário de triagem de novo assistido
  const [nomeAssistido, setNomeAssistido] = useState('')
  const [cpf, setCpf] = useState('')
  const [bairro, setBairro] = useState('')
  const [areaSelecionada, setAreaSelecionada] = useState<AtendimentoJuridico['area']>('BPC/LOAS')
  const [observacoes, setObservacoes] = useState('')

  // Modal Gerador de Documento Personalizado
  const [modalGerador, setModalGerador] = useState(false)
  const [genNome, setGenNome] = useState('')
  const [genCPF, setGenCPF] = useState('')
  const [genRG, setGenRG] = useState('')
  const [genEndereco, setGenEndereco] = useState('')

  const cadastrarAtendimento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nomeAssistido || !cpf) {
      toast.error('Preencha o nome e CPF do assistido.')
      return
    }

    const novo: AtendimentoJuridico = {
      id: `JUR-00${atendimentos.length + 1}`,
      assistidoNome: nomeAssistido,
      cpf,
      bairro: bairro || 'Casinha Amarela',
      area: areaSelecionada,
      advogadoVoluntario: 'Dra. Patricia Lima (OAB/BA)',
      dataAtendimento: new Date().toLocaleDateString('pt-BR'),
      status: 'Agendado',
      observacoes: observacoes || 'Triagem inicial realizada no balcão da Casinha Amarela.'
    }

    setAtendimentos([novo, ...atendimentos])
    setNomeAssistido('')
    setCpf('')
    setBairro('')
    setObservacoes('')
    toast.success('Atendimento jurídico comunitário agendado com sucesso!')
    setAbaAtiva('plantao')
  }

  const alternarStatusAtendimento = (id: string, novoStatus: AtendimentoJuridico['status']) => {
    setAtendimentos(prev =>
      prev.map(a => (a.id === id ? { ...a, status: novoStatus } : a))
    )
    toast.success(`Status do atendimento ${id} alterado para "${novoStatus}".`)
  }

  const copiarTexto = (texto: string) => {
    navigator.clipboard.writeText(texto)
    toast.success('Texto copiado para a área de transferência!')
  }

  const imprimirDocumento = () => {
    window.print()
  }

  const atendimentosFiltrados = atendimentos.filter(a => {
    const combinaBusca = a.assistidoNome.toLowerCase().includes(buscaPlantao.toLowerCase()) ||
      a.cpf.includes(buscaPlantao) ||
      a.bairro.toLowerCase().includes(buscaPlantao.toLowerCase())
    const combinaStatus = filtroStatus === 'todos' || a.status === filtroStatus
    return combinaBusca && combinaStatus
  })

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              Direitos da Comunidade
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Orientação 100% Gratuita
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Assistência Jurídica Comunitária
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Apoio jurídico voluntário, orientação sobre BPC/LOAS, auxílio familiar e defesa dos direitos dos moradores.
          </p>
        </div>

        {/* Card de Ação Rápida */}
        <div className="relative z-10 bg-slate-950/90 text-white p-4 rounded-2xl border border-amber-400/30 flex flex-col justify-between min-w-[240px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">Gerador de Documentos</p>
              <p className="text-xs text-slate-300">Declaração de Hipossuficiência</p>
            </div>
          </div>
          <button
            onClick={() => setModalGerador(true)}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Preencher Declaração Rápida
          </button>
        </div>
      </div>

      {/* ── Cards de Métricas ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fila do Plantão</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">{atendimentos.filter(a => a.status === 'Agendado').length}</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">Moradores aguardando</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">BPC / LOAS</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">87</p>
            <p className="text-[11px] text-slate-500 mt-1">Benefícios auxiliados</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gratuidade de Certidões</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">124</p>
            <p className="text-[11px] text-slate-500 mt-1">Declarações emitidas</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Advogados Parceiros</p>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">8</p>
            <p className="text-[11px] text-slate-500 mt-1">Voluntários na Casinha</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── Navegação por Abas ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-amber-200/70 dark:border-amber-900/40 overflow-x-auto pb-1">
        {[
          { id: 'triagem', rotulo: 'Triagem & Agendamento', icone: Plus },
          { id: 'plantao', rotulo: 'Fila de Atendimento do Plantão', icone: Calendar },
          { id: 'orientacoes', rotulo: 'Guia de Direitos Sociais', icone: BookOpen },
          { id: 'modelos', rotulo: 'Declarações & Modelos Populares', icone: FileText },
        ].map(aba => {
          const Icone = aba.icone
          const ativa = abaAtiva === aba.id
          return (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id as any)}
              className={`
                flex items-center gap-2 px-4 py-3 text-xs font-black border-b-2 transition-all whitespace-nowrap uppercase tracking-wider
                ${ativa
                  ? 'border-amber-500 text-amber-700 dark:text-amber-300'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }
              `}
            >
              <Icone className={`w-4 h-4 ${ativa ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
              {aba.rotulo}
            </button>
          )
        })}
      </div>

      {/* ── Aba 1: Triagem de Novo Assistido ───────────────────────── */}
      {abaAtiva === 'triagem' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Nova Triagem Jurídica Comunitária</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Cadastre o morador para o plantão de orientação jurídica gratuita da Casinha Amarela</p>
            </div>
          </div>

          <form onSubmit={cadastrarAtendimento} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome Completo do Assistido *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria das Graças Silva"
                  value={nomeAssistido}
                  onChange={e => setNomeAssistido(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  CPF *
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Bairro / Comunidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Casinha Amarela / Vila Esperança"
                  value={bairro}
                  onChange={e => setBairro(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Área do Direito / Assunto *
                </label>
                <select
                  value={areaSelecionada}
                  onChange={e => setAreaSelecionada(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                >
                  <option value="BPC/LOAS">BPC / LOAS (Benefício INSS)</option>
                  <option value="Direito de Família">Direito de Família (Pensão / Guarda)</option>
                  <option value="Documentação Civil">Documentação Civil (Gratuidade de 2ª via)</option>
                  <option value="Consumidor">Consumidor (Cobranças / Direitos)</option>
                  <option value="Trabalhista">Trabalhista / Rescisão</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Resumo da Necessidade do Assistido
              </label>
              <textarea
                rows={3}
                placeholder="Descreva brevemente a dúvida ou problema do morador para direcionamento ao advogado voluntário..."
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                className="w-full p-4 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm rounded-xl shadow-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Agendar Atendimento no Plantão Jurídico
            </button>
          </form>
        </div>
      )}

      {/* ── Aba 2: Fila de Atendimento do Plantão ───────────────────── */}
      {abaAtiva === 'plantao' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
          {/* Filtros e Busca */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome do assistido, CPF ou bairro..."
                value={buscaPlantao}
                onChange={e => setBuscaPlantao(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              {['todos', 'Agendado', 'Em Andamento', 'Concluído'].map(st => (
                <button
                  key={st}
                  onClick={() => setFiltroStatus(st)}
                  className={`px-3.5 h-8 min-w-[90px] text-center text-[11px] font-black rounded-full transition-all capitalize shadow-xs ${
                    filtroStatus === st
                      ? 'bg-amber-400 text-slate-950 border border-amber-500 shadow-sm'
                      : 'bg-amber-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-amber-200/60 dark:border-amber-900/40 hover:bg-amber-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {atendimentosFiltrados.length > 0 ? (
              atendimentosFiltrados.map(item => (
                <div
                  key={item.id}
                  className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-amber-400 transition-all shadow-sm"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-amber-900 dark:text-amber-300 bg-amber-200/80 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-300/80">
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">• {item.area}</span>
                      <span className={`badge-status ${
                        item.status === 'Concluído' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' :
                        item.status === 'Em Andamento' ? 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800' :
                        'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{item.assistidoNome}</h3>
                    <p className="text-xs text-slate-500 font-medium">CPF: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.cpf}</span> | Bairro: {item.bairro}</p>
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium bg-white dark:bg-slate-900 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40 leading-relaxed">
                      "{item.observacoes}"
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3 min-w-[210px] border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider">Advogado Voluntário</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.advogadoVoluntario}</span>
                      <span className="text-[11px] text-amber-700 dark:text-amber-400 font-bold block mt-0.5">Data: {item.dataAtendimento}</span>
                    </div>

                    {/* Mudar Status Padronizado */}
                    <div className="flex items-center gap-2">
                      {item.status !== 'Concluído' && (
                        <button
                          onClick={() => alternarStatusAtendimento(item.id, 'Concluído')}
                          className="w-28 h-9 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-sm transition-transform hover:scale-105 flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <Check className="w-3.5 h-3.5 flex-shrink-0" /> Concluir
                        </button>
                      )}
                      {item.status === 'Agendado' && (
                        <button
                          onClick={() => alternarStatusAtendimento(item.id, 'Em Andamento')}
                          className="w-28 h-9 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs rounded-xl shadow-sm transition-transform hover:scale-105 flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          Iniciar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold">Nenhum atendimento encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Aba 3: Guia de Direitos Sociais ─────────────────────────── */}
      {abaAtiva === 'orientacoes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIAS_DIREITOS.map((guia, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base leading-snug mb-2">
                  {guia.titulo}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {guia.resumo}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Passos Principais:</p>
                  {guia.passos.map((passo, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <span>{passo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toast.info('Orientação detalhada disponível no plantão da Casinha Amarela.')}
                className="w-full py-2 bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-xl hover:bg-amber-100 transition-colors"
              >
                Ver Orientações Completas
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Aba 4: Declarações & Modelos Populares ─────────────────── */}
      {abaAtiva === 'modelos' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MODELOS_DOCUMENTOS.map(doc => (
              <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    {doc.categoria}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mt-3 mb-2 leading-snug">
                    {doc.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {doc.descricao}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-amber-100 dark:border-amber-900/40">
                  <button
                    onClick={() => setDocSelecionado(doc)}
                    className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Visualizar Modelo
                  </button>
                  <button
                    onClick={() => copiarTexto(doc.conteudo)}
                    className="p-2 text-slate-600 bg-amber-100 dark:bg-slate-800 rounded-xl hover:bg-amber-200 transition-colors"
                    title="Copiar texto do documento"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal de Visualização de Documento ───────────────────────── */}
      {docSelecionado && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-amber-300 dark:border-amber-900 overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-6 border-b border-amber-100 dark:border-amber-900/40 flex items-center justify-between bg-amber-50/50 dark:bg-slate-800/50">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400">
                  INBCA • {docSelecionado.categoria}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-slate-100">{docSelecionado.titulo}</h3>
              </div>
              <button
                onClick={() => setDocSelecionado(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-amber-50/20 dark:bg-slate-950 border-b border-amber-100 dark:border-amber-900/40">
              {docSelecionado.conteudo}
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 flex items-center justify-end gap-3">
              <button
                onClick={imprimirDocumento}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir
              </button>
              <button
                onClick={() => {
                  copiarTexto(docSelecionado.conteudo)
                  setDocSelecionado(null)
                }}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
              >
                <Copy className="w-4 h-4" />
                Copiar Texto do Documento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Gerador de Declaração Personalizada ───────────────── */}
      {modalGerador && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-amber-300 dark:border-amber-900 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 dark:border-amber-900/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-amber-300">Preenchimento de Declaração</h3>
              </div>
              <button onClick={() => setModalGerador(false)} className="text-slate-400 hover:text-slate-800">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Nome do Assistido</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={genNome}
                  onChange={e => setGenNome(e.target.value)}
                  className="w-full px-3.5 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={genCPF}
                    onChange={e => setGenCPF(e.target.value)}
                    className="w-full px-3.5 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">RG</label>
                  <input
                    type="text"
                    placeholder="00.000.000-00"
                    value={genRG}
                    onChange={e => setGenRG(e.target.value)}
                    className="w-full px-3.5 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Endereço / Bairro</label>
                <input
                  type="text"
                  placeholder="Rua, número, bairro"
                  value={genEndereco}
                  onChange={e => setGenEndereco(e.target.value)}
                  className="w-full px-3.5 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200 dark:border-amber-900/40 outline-none text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              onClick={() => {
                const docFormatado: DocumentoPopular = {
                  id: 'gen-hipo',
                  titulo: `Declaração de Hipossuficiência - ${genNome || 'Assistido'}`,
                  categoria: 'gratuidade',
                  descricao: 'Gerada para pedido de gratuidade de 2ª via de certidões ou emolumentos cartorários.',
                  conteudo: `DECLARAÇÃO DE HIPOSSUFICIÊNCIA FINANCEIRA

Eu, ${genNome || '[NOME DO ASSISTIDO]'}, portador(a) do RG nº ${genRG || '[RG]'} e inscrito(a) no CPF sob o nº ${genCPF || '[CPF]'}, residente na ${genEndereco || '[ENDEREÇO]'}.

DECLARO, sob as penas da lei, para fins de concessão de gratuidade de justiça e isenção de emolumentos cartorários, que NÃO POSSUO condições financeiras de arcar com custas ou taxas sem prejuízo do sustento próprio e de minha família.

Atendido pelo Instituto Nilson Bispo Casinha Amarela (INBCA).

Data: ${new Date().toLocaleDateString('pt-BR')}

__________________________________________
Assinatura do Declarante`
                }
                setDocSelecionado(docFormatado)
                setModalGerador(false)
              }}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Visualizar Documento Preenchido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
