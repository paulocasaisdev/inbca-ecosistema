// ============================================================
// INBCA - Categorias e Perfis de Usuários
// ============================================================

export type CategoriaUsuario =
  | 'administrador'
  | 'medico'
  | 'enfermeiro'
  | 'tecnico'
  | 'agente_social'
  | 'instrutor'

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
  avatarUrl?: string
  dataCadastro: string
}

export const CATEGORIAS_CONFIG: Record<
  CategoriaUsuario,
  { rotulo: string; descricao: string; cor: string; icone: string }
> = {
  administrador: {
    rotulo: 'Administrador',
    descricao: 'Gestão total do ecossistema INBCA, relatórios e permissões.',
    cor: 'bg-purple-100 text-purple-900 border-purple-300',
    icone: '👑',
  },
  medico: {
    rotulo: 'Médico(a)',
    descricao: 'Consultas comunitárias, prescrições, atestados e prontuário médico.',
    cor: 'bg-amber-100 text-amber-900 border-amber-300',
    icone: '🩺',
  },
  enfermeiro: {
    rotulo: 'Enfermeiro(a)',
    descricao: 'Triagem, aferição de pressão/glicemia, vacinação e curativos.',
    cor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icone: '💉',
  },
  tecnico: {
    rotulo: 'Técnico(a) de Enfermagem/Laboratório',
    descricao: 'Coleta de exames de sangue/laboratoriais e apoio a procedimentos.',
    cor: 'bg-blue-100 text-blue-900 border-blue-300',
    icone: '🔬',
  },
  agente_social: {
    rotulo: 'Agente Social / Comunitário',
    descricao: 'Visitas às famílias, distribuição de cestas e acompanhamento social.',
    cor: 'bg-pink-100 text-pink-900 border-pink-300',
    icone: '🤝',
  },
  instrutor: {
    rotulo: 'Instrutor(a) / Terapeuta',
    descricao: 'Aulas de Karatê, Zumba, Capoeira, Boxe, Kickboxing, Fisioterapia e Psico.',
    cor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    icone: '🥋',
  },
}
