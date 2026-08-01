// ============================================================
// INBCA - Categorias e Perfis de Usuários
// ============================================================

export type CategoriaUsuario =
  | 'administrador'
  | 'atendente_agente'
  | 'medico'
  | 'psicologo'
  | 'instrutor'
  | 'terapeuta_fisioterapeuta'
  | 'enfermeiro'
  | 'tecnico'

export interface UsuarioINBCA {
  id: string
  nome: string
  email: string
  cpf: string
  categoria: CategoriaUsuario
  registroProfissional?: string // CRM, COREN, CREF, CRP, CBO, etc.
  especialidadeOuFuncao: string
  telefone: string
  status: 'ativo' | 'inativo' | 'pendente'
  nivelAcessoDescricao?: string
  avatarUrl?: string
  dataCadastro: string
}

export const CATEGORIAS_CONFIG: Record<
  CategoriaUsuario,
  { rotulo: string; descricao: string; escopoAcesso: string; cor: string; icone: string }
> = {
  administrador: {
    rotulo: 'Administrador',
    descricao: 'Gestão total do ecossistema INBCA, relatórios e permissões.',
    escopoAcesso: 'Acesso Total ao Sistema',
    cor: 'bg-purple-100 text-purple-900 border-purple-300',
    icone: '👑',
  },
  atendente_agente: {
    rotulo: 'Atendente / Agente',
    descricao: 'Marcação de consultas, agendamento de exames e cadastro de moradores.',
    escopoAcesso: 'Marcação de Consultas e Exames',
    cor: 'bg-blue-100 text-blue-900 border-blue-300',
    icone: '🤝',
  },
  medico: {
    rotulo: 'Médico(a)',
    descricao: 'Consultas comunitárias e acompanhamento dos assistidos.',
    escopoAcesso: 'Dados e Frequências Específicos dos Assistidos',
    cor: 'bg-amber-100 text-amber-900 border-amber-300',
    icone: '🩺',
  },
  psicologo: {
    rotulo: 'Psicólogo(a)',
    descricao: 'Atendimentos de saúde mental e acompanhamento de frequências.',
    escopoAcesso: 'Dados e Frequências Específicos dos Assistidos',
    cor: 'bg-teal-100 text-teal-900 border-teal-300',
    icone: '🧠',
  },
  instrutor: {
    rotulo: 'Instrutor(a)',
    descricao: 'Aulas de Karatê, Zumba, Capoeira, Boxe e Kickboxing.',
    escopoAcesso: 'Dados e Frequências Específicos dos Assistidos',
    cor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    icone: '🥋',
  },
  terapeuta_fisioterapeuta: {
    rotulo: 'Terapeuta / Fisioterapeuta',
    descricao: 'Reabilitação motora e terapias integrativas.',
    escopoAcesso: 'Prontuários Específicos dos Assistidos',
    cor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icone: '🌿',
  },
  enfermeiro: {
    rotulo: 'Enfermeiro(a)',
    descricao: 'Triagem, aferição de sinais vitais e vacinação.',
    escopoAcesso: 'Triagem e Sinais Vitais dos Assistidos',
    cor: 'bg-rose-100 text-rose-900 border-rose-300',
    icone: '💉',
  },
  tecnico: {
    rotulo: 'Técnico(a) de Enfermagem/Lab',
    descricao: 'Coleta de exames laboratoriais e apoio a procedimentos.',
    escopoAcesso: 'Coleta e Registros de Exames',
    cor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    icone: '🔬',
  },
}
