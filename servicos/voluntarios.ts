// ============================================================
// INBCA - Serviço de Gestão de Voluntários & Escalas
// Integrado com banco de dados Supabase e suporte a fallback
// ============================================================

import { Voluntario } from '../tipos'
import { supabase } from '../lib/supabase'

let voluntariosMemoria: Voluntario[] = [
  {
    id: '1',
    nome: 'Dra. Vanessa Lima',
    categoria: 'medico',
    registroProfissional: 'CRM-BA 12345',
    especialidadeOuFuncao: 'Médica (Clínico Geral)',
    telefone: '(71) 98888-1111',
    email: 'vanessa.lima@inbca.org',
    corAgenda: '#FBBF24',
    duracaoAtendimentoMinutos: 30,
    ativo: true,
    horariosTrabalho: {
      segunda: { inicio: '08:00', fim: '12:00', ativo: true },
      quarta: { inicio: '08:00', fim: '12:00', ativo: true },
    },
    criadoEm: new Date().toISOString(),
  },
  {
    id: '2',
    nome: 'Dra. Camila Vasconcelos',
    categoria: 'psicologo',
    registroProfissional: 'CRP-BA 54321',
    especialidadeOuFuncao: 'Psicóloga Clínica',
    telefone: '(71) 98888-2222',
    email: 'camila.v@inbca.org',
    corAgenda: '#EC4899',
    duracaoAtendimentoMinutos: 45,
    ativo: true,
    horariosTrabalho: {
      terca: { inicio: '13:00', fim: '17:00', ativo: true },
      quinta: { inicio: '13:00', fim: '17:00', ativo: true },
    },
    criadoEm: new Date().toISOString(),
  },
]

export async function buscarVoluntarios(busca?: string): Promise<Voluntario[]> {
  try {
    let query = supabase.from('voluntarios').select('*').order('nome', { ascending: true })
    
    if (busca) {
      query = query.ilike('nome', `%${busca}%`)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    return (data || []).map((v: any) => ({
      id: v.id,
      nome: v.nome,
      categoria: v.categoria,
      registroProfissional: v.registro_profissional,
      especialidadeOuFuncao: v.especialidade_ou_funcao,
      telefone: v.telefone,
      email: v.email,
      corAgenda: v.cor_agenda,
      duracaoAtendimentoMinutos: v.duracao_atendimento_minutos,
      ativo: v.ativo,
      horariosTrabalho: v.horarios_trabalho || {},
      criadoEm: v.criado_em,
    }))
  } catch (err) {
    console.warn('Usando fallback em memória para voluntários:', err)
    if (!busca) return voluntariosMemoria
    const termo = busca.toLowerCase()
    return voluntariosMemoria.filter(
      v =>
        v.nome.toLowerCase().includes(termo) ||
        v.especialidadeOuFuncao.toLowerCase().includes(termo)
    )
  }
}

export async function cadastrarVoluntario(dados: Omit<Voluntario, 'id' | 'criadoEm'>): Promise<Voluntario> {
  try {
    const { data, error } = await supabase
      .from('voluntarios')
      .insert({
        nome: dados.nome,
        categoria: dados.categoria,
        registro_profissional: dados.registroProfissional,
        especialidade_ou_funcao: dados.especialidadeOuFuncao,
        telefone: dados.telefone,
        email: dados.email,
        cor_agenda: dados.corAgenda || '#FBBF24',
        duracao_atendimento_minutos: dados.duracaoAtendimentoMinutos,
        ativo: dados.ativo !== false,
        horarios_trabalho: dados.horariosTrabalho,
      })
      .select()
      .single()
      
    if (error) throw error
    
    return {
      id: data.id,
      nome: data.nome,
      categoria: data.categoria,
      registroProfissional: data.registro_profissional,
      especialidadeOuFuncao: data.especialidade_ou_funcao,
      telefone: data.telefone,
      email: data.email,
      corAgenda: data.cor_agenda,
      duracaoAtendimentoMinutos: data.duracao_atendimento_minutos,
      ativo: data.ativo,
      horariosTrabalho: data.horarios_trabalho || {},
      criadoEm: data.criado_em,
    }
  } catch (err) {
    console.warn('Cadastrando voluntário no fallback em memória:', err)
    const novo: Voluntario = {
      ...dados,
      id: String(voluntariosMemoria.length + 1),
      criadoEm: new Date().toISOString(),
    }
    voluntariosMemoria = [...voluntariosMemoria, novo]
    return novo
  }
}
