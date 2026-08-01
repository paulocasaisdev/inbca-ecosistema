// ============================================================
// INBCA - Entidades e Tipos TypeScript do Sistema
// ============================================================

export * from './usuario'

// ─── Morador / Beneficiário da Casinha Amarela ───────────────
export interface Morador {
  id: string
  nome: string
  cpf: string
  telefone: string
  email?: string
  dataNascimento?: string
  numeroCartaoSus: string
  bairro: string
  endereco: string
  numeroDependentes: number
  beneficiosAtivos: string[] // ex: ['Cesta Básica', 'Atendimento Médico']
  status: 'ativo' | 'inativo'
  criadoEm: string
  atualizadoEm: string
}

// ─── Voluntário (Médico, Psicólogo, Advogado, Instrutor) ──────
export interface Voluntario {
  id: string
  nome: string
  categoria: 'medico' | 'psicologo' | 'instrutor' | 'terapeuta_fisioterapeuta' | 'enfermeiro' | 'advogado'
  registroProfissional?: string // CRM, COREN, CRP, CREF, OAB, etc.
  especialidadeOuFuncao: string
  telefone: string
  email: string
  corAgenda: string // para marcar na grade visual
  duracaoAtendimentoMinutos: number
  ativo: boolean
  horariosTrabalho: {
    segunda?: { inicio: string; fim: string; ativo: boolean }
    terca?: { inicio: string; fim: string; ativo: boolean }
    quarta?: { inicio: string; fim: string; ativo: boolean }
    quinta?: { inicio: string; fim: string; ativo: boolean }
    sexta?: { inicio: string; fim: string; ativo: boolean }
    sabado?: { inicio: string; fim: string; ativo: boolean }
  }
  criadoEm: string
}

// ─── Agendamento Social (Consultas, Exames, Aulas) ────────────
export interface AgendamentoSocial {
  id: string
  moradorId: string
  moradorNome: string
  moradorSus: string
  tipo: 'Consulta' | 'Exame' | 'Terapia' | 'Esporte'
  modalidadeOuEspecialidade: string // ex: 'Clínico Geral', 'Ultrassom', 'Karatê'
  voluntarioId: string
  voluntarioNome: string
  data: string // YYYY-MM-DD
  hora: string // HH:MM
  status: 'confirmado' | 'agendado' | 'realizado' | 'cancelado' | 'faltou'
  observacoes?: string
  criadoEm: string
}

// ─── Item da Fila de Espera / Plantão ─────────────────────────
export interface ItemFilaEspera {
  id: string
  moradorId: string
  moradorNome: string
  moradorTelefone: string
  tipoServico: 'Consulta' | 'Exame' | 'Terapia' | 'Esporte'
  modalidadeOuEspecialidade: string
  prioridade: number // 1 = Baixa, 2 = Média, 3 = Alta (Emergencial/Social)
  status: 'aguardando' | 'notificado' | 'encaixado' | 'desistiu'
  observacoes?: string
  criadoEm: string
}

// ─── Automação de WhatsApp e Alertas do INBCA ──────────────────
export interface AutomacaoSocial {
  id: string
  nome: string
  eventoGatilho: 'agendamento_criado' | 'lembrete_24h' | 'vaga_liberada' | 'comunicado_geral'
  ativa: boolean
  mensagemTemplate: string
  criadoEm: string
}
