'use client'

import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  ShieldCheck,
  Stethoscope,
  Search,
  Filter,
  CheckCircle,
  Mail,
  Phone,
  FileText,
  BadgeCheck,
  Building
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
      nome: 'Enf.ª Juliana Montenegro',
      email: 'juliana.enfermagem@inbca.org',
      cpf: '321.654.987-11',
      categoria: 'enfermeiro',
      registroProfissional: 'COREN/BA 18452-ENF',
      especialidadeOuFuncao: 'Coordenação de Triagem & Vacinação',
      telefone: '(71) 99777-3344',
      status: 'ativo',
      dataCadastro: '2026-02-15',
    },
    {
      id: '4',
      nome: 'Téc. Marcos Vinícius Santos',
      email: 'marcos.tecnico@inbca.org',
      cpf: '456.789.123-44',
      categoria: 'tecnico',
      registroProfissional: 'COREN/BA 98765-TE',
      especialidadeOuFuncao: 'Coleta de Exames Laboratoriais & ECG',
      telefone: '(71) 99666-5566',
      status: 'ativo',
      dataCadastro: '2026-03-01',
    },
    {
      id: '5',
      nome: 'Ag. Carla Raimunda de Jesus',
      email: 'carla.social@inbca.org',
      cpf: '789.123.456-55',
      categoria: 'agente_social',
      registroProfissional: 'AS-8841',
      especialidadeOuFuncao: 'Visitas Domiciliares & Cadastro de Famílias',
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

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Equipe & Controle de Acesso</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Categorias de Usuários & Profissionais
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Gestão de Médicos, Enfermeiros, Técnicos, Agentes Sociais, Instrutores e Administradores do INBCA.
          </p>
        </div>

        <button
          onClick={() => setExibirFormulario(!exibirFormulario)}
          className="botao-primario text-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>{exibirFormulario ? 'Cancelar Cadastro' : 'Cadastrar Novo Profissional'}</span>
        </button>
      </div>

      {/* Formulário de Cadastro Rápido de Profissional */}
      {exibirFormulario && (
        <div className="cartao-destaque animate-slide-up space-y-4">
          <div className="flex items-center gap-2 border-b border-amber-300/40 pb-3">
            <UserPlus className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-amber-200 text-base">
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
                <option value="administrador">👑 Administrador</option>
                <option value="medico">🩺 Médico(a)</option>
                <option value="enfermeiro">💉 Enfermeiro(a)</option>
                <option value="tecnico">🔬 Técnico(a) de Enfermagem/Lab</option>
                <option value="agente_social">🤝 Agente Social / Comunitário</option>
                <option value="instrutor">🥋 Instrutor(a) / Terapeuta</option>
              </select>
            </div>

            <div>
              <label className="rotulo-campo">Registro Profissional (CRM, COREN, CREF, etc.)</label>
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
                className="botao-secundario text-xs"
              >
                Cancelar
              </button>
              <button type="submit" className="botao-primario text-xs">
                Salvar Cadastro de Profissional
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards de Resumo por Categoria */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-soft scale-105 font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-amber-200/60 hover:bg-amber-50'
              }`}
            >
              <div className="text-2xl mb-1">{config.icone}</div>
              <span className="text-xs font-bold leading-tight line-clamp-1">{config.rotulo}</span>
              <span className="text-[11px] opacity-80 mt-1 font-extrabold">{qtd} cadastrados</span>
            </button>
          )
        })}
      </div>

      {/* Tabela de Usuários */}
      <div className="cartao-amarelo space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Profissionais Registrados na Casinha Amarela ({usuariosFiltrados.length})
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, CRM, e-mail..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="campo-input pl-10 text-xs py-2"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="tabela-padrao">
            <thead>
              <tr>
                <th>Profissional / Nome</th>
                <th>Categoria</th>
                <th>Registro Profissional</th>
                <th>Especialidade / Função</th>
                <th>Contato</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((user) => {
                const config = CATEGORIAS_CONFIG[user.categoria]
                return (
                  <tr key={user.id}>
                    <td>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">{user.nome}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${config.cor}`}>
                        <span>{config.icone}</span>
                        <span>{config.rotulo}</span>
                      </span>
                    </td>
                    <td className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                      {user.registroProfissional || 'N/A'}
                    </td>
                    <td className="text-xs">{user.especialidadeOuFuncao}</td>
                    <td className="text-xs text-slate-500">{user.telefone}</td>
                    <td>
                      <span className="badge bg-emerald-100 text-emerald-800">Ativo</span>
                    </td>
                    <td>
                      <button
                        onClick={() => toast.info(`Abre opções de permissão para ${user.nome}`)}
                        className="botao-secundario text-xs py-1 px-3"
                      >
                        Permissões
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
