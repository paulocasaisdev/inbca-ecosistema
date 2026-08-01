'use client'
// ============================================================
// INBCA - Categorias e Perfis de Profissionais (Equipe)
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState } from 'react'
import {
  Users, UserPlus, ShieldCheck, Stethoscope, Search,
  Filter, CheckCircle, Mail, Phone, FileText, BadgeCheck,
  Building, Shield, UserX, UserCheck
} from 'lucide-react'
import { toast } from 'sonner'
import { CategoriaUsuario, CATEGORIAS_CONFIG, UsuarioINBCA } from '@/tipos/usuario'

export default function PaginaUsuariosEquipe() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas')
  const [busca, setBusca] = useState('')
  const [exibirFormulario, setExibirFormulario] = useState(false)

  // Novo usuário form state
  const [novoNome, setNovoNome] = useState('')
  const [novoEmail, setNovoEmail] = useState('')
  const [novaCategoria, setNovaCategoria] = useState<CategoriaUsuario>('medico')
  const [novoRegistro, setNovoRegistro] = useState('')
  const [novaFuncao, setNovaFuncao] = useState('')
  const [novoTelefone, setNovoTelefone] = useState('')

  const usuariosMock: UsuarioINBCA[] = [
    {
      id: '1',
      nome: 'Dr. Paulo Roberto Casais',
      email: 'paulo.casais@inbca.org',
      cpf: '000.111.222-33',
      categoria: 'administrador',
      registroProfissional: 'ADM-001',
      especialidadeOuFuncao: 'Diretor Geral & Coordenação do INBCA',
      telefone: '(71) 99999-0001',
      status: 'ativo',
      dataCadastro: '2026-01-10',
    },
    {
      id: '2',
      nome: 'Dra. Vanessa Lima',
      email: 'vanessa.lima@inbca.org',
      cpf: '123.456.789-00',
      categoria: 'medico',
      registroProfissional: 'CRM/BA 24510',
      especialidadeOuFuncao: 'Clínica Geral & Atendimento Comunitário',
      telefone: '(71) 99888-1122',
      status: 'ativo',
      dataCadastro: '2026-02-01',
    },
    {
      id: '3',
      nome: 'Dra. Camila Vasconcelos',
      email: 'camila.psico@inbca.org',
      cpf: '321.654.987-11',
      categoria: 'psicologo',
      registroProfissional: 'CRP/BA 12458',
      especialidadeOuFuncao: 'Psicologia Clínica & Saúde Mental',
      telefone: '(71) 99777-3344',
      status: 'ativo',
      dataCadastro: '2026-02-15',
    },
    {
      id: '4',
      nome: 'Dr. Lucas Mendes',
      email: 'lucas.fisio@inbca.org',
      cpf: '456.789.123-44',
      categoria: 'terapeuta_fisioterapeuta',
      registroProfissional: 'CREFITO/BA 98765-F',
      especialidadeOuFuncao: 'Fisioterapia Motora & Reabilitação',
      telefone: '(71) 99666-5566',
      status: 'ativo',
      dataCadastro: '2026-03-01',
    },
    {
      id: '5',
      nome: 'Ag. Carla Raimunda de Jesus',
      email: 'carla.atendimento@inbca.org',
      cpf: '789.123.456-55',
      categoria: 'atendente_agente',
      registroProfissional: 'AG-8841',
      especialidadeOuFuncao: 'Marcação de Consultas, Exames & Recepção',
      telefone: '(71) 99555-7788',
      status: 'ativo',
      dataCadastro: '2026-03-10',
    },
    {
      id: '6',
      nome: 'Mestre Carlos Eduardo',
      email: 'carlos.karate@inbca.org',
      cpf: '654.321.987-88',
      categoria: 'instrutor',
      registroProfissional: 'CREF/BA 01245-G',
      especialidadeOuFuncao: 'Instrutor de Karatê Inclusivo',
      telefone: '(71) 99444-9900',
      status: 'ativo',
      dataCadastro: '2026-03-15',
    },
    {
      id: '7',
      nome: 'Prof.ª Fernanda Oliveira',
      email: 'fernanda.zumba@inbca.org',
      cpf: '987.654.321-99',
      categoria: 'instrutor',
      registroProfissional: 'CREF/BA 03412-G',
      especialidadeOuFuncao: 'Instrutora de Zumba & Ginástica Comunitária',
      telefone: '(71) 99333-1122',
      status: 'ativo',
      dataCadastro: '2026-03-20',
    },
  ]

  const [listaUsuarios, setListaUsuarios] = useState<UsuarioINBCA[]>(usuariosMock)

  const usuariosFiltrados = listaUsuarios.filter((u) => {
    const atendeCategoria = categoriaFiltro === 'todas' || u.categoria === categoriaFiltro
    const atendeBusca =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase()) ||
      u.especialidadeOuFuncao.toLowerCase().includes(busca.toLowerCase()) ||
      (u.registroProfissional && u.registroProfissional.toLowerCase().includes(busca.toLowerCase()))
    return atendeCategoria && atendeBusca
  })

  function cadastrarUsuario(e: React.FormEvent) {
    e.preventDefault()
    if (!novoNome || !novoEmail) {
      toast.error('Preencha pelo menos Nome e E-mail!')
      return
    }

    const novo: UsuarioINBCA = {
      id: Date.now().toString(),
      nome: novoNome,
      email: novoEmail,
      cpf: '000.000.000-00',
      categoria: novaCategoria,
      registroProfissional: novoRegistro || 'INBCA-CAD',
      especialidadeOuFuncao: novaFuncao || CATEGORIAS_CONFIG[novaCategoria].rotulo,
      telefone: novoTelefone || '(71) 99999-0000',
      status: 'ativo',
      dataCadastro: new Date().toISOString().split('T')[0],
    }

    setListaUsuarios([novo, ...listaUsuarios])
    toast.success(`Usuário ${novo.nome} cadastrado com sucesso como ${CATEGORIAS_CONFIG[novaCategoria].rotulo}!`)
    setExibirFormulario(false)
    setNovoNome('')
    setNovoEmail('')
    setNovoRegistro('')
    setNovaFuncao('')
    setNovoTelefone('')
  }

  function alternarStatusUsuario(id: string) {
    let nome = ''
    let novoStatus: UsuarioINBCA['status'] = 'ativo'
    setListaUsuarios(prev =>
      prev.map(u => {
        if (u.id === id) {
          nome = u.nome
          novoStatus = u.status === 'ativo' ? 'inativo' : 'ativo'
          return { ...u, status: novoStatus }
        }
        return u
      })
    )
    toast.success(`Profissional ${nome} foi ${novoStatus === 'ativo' ? 'ativado' : 'desativado'} com sucesso!`)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Equipe & Permissões
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Matriz de Controle de Acesso
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Profissionais & Níveis de Permissão
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Gestão de Administradores, Atendentes, Médicos, Psicólogos, Instrutores e Terapeutas.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={() => setExibirFormulario(!exibirFormulario)}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>{exibirFormulario ? 'Cancelar' : 'Cadastrar Profissional'}</span>
          </button>
        </div>
      </div>

      {/* Formulário de Cadastro Rápido de Profissional */}
      {exibirFormulario && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-100 dark:border-amber-900/40 pb-3">
            <UserPlus className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-300 text-base">
              Cadastrar Novo Profissional no INBCA
            </h2>
          </div>

          <form onSubmit={cadastrarUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="rotulo-campo">Nome Completo *</label>
              <input
                type="text"
                placeholder="Ex: Dra. Juliana Costa"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="campo-input"
                required
              />
            </div>

            <div>
              <label className="rotulo-campo">E-mail Institucional *</label>
              <input
                type="email"
                placeholder="nome@inbca.org"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                className="campo-input"
                required
              />
            </div>

            <div>
              <label className="rotulo-campo">Categoria do Usuário *</label>
              <select
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value as CategoriaUsuario)}
                className="campo-input cursor-pointer"
              >
                <option value="administrador">👑 Administrador (Acesso Total)</option>
                <option value="atendente_agente">🤝 Atendente / Agente (Marcação de Consultas e Exames)</option>
                <option value="medico">🩺 Médico(a) (Dados e Frequências Específicos)</option>
                <option value="psicologo">🧠 Psicólogo(a) (Dados e Frequências Específicos)</option>
                <option value="instrutor">🥋 Instrutor(a) (Dados e Frequências Específicos)</option>
                <option value="terapeuta_fisioterapeuta">🌿 Terapeuta / Fisioterapeuta (Prontuários Específicos)</option>
                <option value="enfermeiro">💉 Enfermeiro(a) (Triagem e Sinais Vitais)</option>
                <option value="tecnico">🔬 Técnico(a) (Exames e Laboratório)</option>
              </select>
            </div>

            <div>
              <label className="rotulo-campo">Registro Profissional (CRM, COREN, CREF, CRP, etc.)</label>
              <input
                type="text"
                placeholder="Ex: CRM/BA 12345"
                value={novoRegistro}
                onChange={(e) => setNovoRegistro(e.target.value)}
                className="campo-input"
              />
            </div>

            <div>
              <label className="rotulo-campo">Especialidade / Função Principal</label>
              <input
                type="text"
                placeholder="Ex: Odontologia Comunitária"
                value={novaFuncao}
                onChange={(e) => setNovaFuncao(e.target.value)}
                className="campo-input"
              />
            </div>

            <div>
              <label className="rotulo-campo">Telefone / WhatsApp</label>
              <input
                type="text"
                placeholder="(71) 90000-0000"
                value={novoTelefone}
                onChange={(e) => setNovoTelefone(e.target.value)}
                className="campo-input"
              />
            </div>

            <div className="md:col-span-3 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setExibirFormulario(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancelar
              </button>
              <button type="submit" className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md">
                Salvar Cadastro de Profissional
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards de Resumo por Categoria */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {(Object.keys(CATEGORIAS_CONFIG) as CategoriaUsuario[]).map((cat) => {
          const config = CATEGORIAS_CONFIG[cat]
          const qtd = listaUsuarios.filter((u) => u.categoria === cat).length
          const selecionado = categoriaFiltro === cat

          return (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(selecionado ? 'todas' : cat)}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                selecionado
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md scale-105 font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-amber-200/80 dark:border-amber-900/40 hover:bg-amber-50'
              }`}
            >
              <div className="text-xl mb-1">{config.icone}</div>
              <span className="text-xs font-bold leading-tight line-clamp-1">{config.rotulo}</span>
              <span className="text-[10px] opacity-80 mt-1 font-extrabold">{qtd} cadastrados</span>
            </button>
          )
        })}
      </div>

      {/* Lista de Usuários Responsiva (0 Rolagem Lateral) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Profissionais & Permissões de Acesso ({usuariosFiltrados.length})
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, CRM, e-mail..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Lista de Profissionais em Cards Responsivos */}
        <div className="space-y-3">
          {usuariosFiltrados.map((user) => {
            const config = CATEGORIAS_CONFIG[user.categoria]
            return (
              <div
                key={user.id}
                className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black border shadow-sm ${config.cor}`}>
                      <span>{config.icone}</span>
                      <span>{config.rotulo}</span>
                    </span>

                    <span className="text-[11px] font-black text-amber-950 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-300/80">
                      {config.escopoAcesso}
                    </span>

                    {user.registroProfissional && (
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/40">
                        {user.registroProfissional}
                      </span>
                    )}

                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md border shadow-xs ${
                      user.status === 'ativo'
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {user.status === 'ativo' ? '🟢 Ativo' : '🔴 Inativo'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{user.nome}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Função: <span className="font-bold text-slate-800 dark:text-slate-200">{user.especialidadeOuFuncao}</span> | E-mail: <span className="font-mono text-slate-700 dark:text-slate-300">{user.email}</span> | Fone: <span className="font-mono text-slate-700 dark:text-slate-300">{user.telefone}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t md:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 md:pt-0 justify-end">
                  <button
                    onClick={() => toast.info(`Nível de acesso: ${config.escopoAcesso}`)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-amber-950 dark:text-amber-300 font-black text-xs transition-all shadow-sm hover:scale-105"
                  >
                    Ver Escopo
                  </button>
                  {user.status === 'ativo' ? (
                    <button
                      onClick={() => alternarStatusUsuario(user.id)}
                      className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950/80 dark:text-red-300 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Desativar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alternarStatusUsuario(user.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300 font-black text-xs transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Ativar</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
