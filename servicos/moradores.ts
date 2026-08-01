// ============================================================
// INBCA - Serviço de Gestão de Moradores & Famílias
// Integrado com banco de dados Supabase e suporte a fallback
// ============================================================

import { Morador } from '../tipos'
import { supabase } from '../lib/supabase'

// Fallback em memória caso ocorra algum problema na conexão
let moradoresMemoria: Morador[] = [
  {
    id: '1',
    nome: 'Maria Raimunda de Souza',
    cpf: '123.456.789-00',
    telefone: '(71) 98888-7766',
    email: 'maria.raimunda@bairrodapaz.org',
    dataNascimento: '1965-05-14',
    numeroCartaoSus: '700.1234.5678.90',
    bairro: 'Bairro da Paz (Casinha Amarela)',
    endereco: 'Rua das Flores, nº 12',
    numeroDependentes: 4,
    beneficiosAtivos: ['Cesta Básica', 'Atendimento Médico'],
    status: 'ativo',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: '2',
    nome: 'José Carlos dos Santos',
    cpf: '987.654.321-11',
    telefone: '(71) 97777-6655',
    dataNascimento: '1978-09-22',
    numeroCartaoSus: '890.4321.8765.12',
    bairro: 'Comunidade Nilson Bispo',
    endereco: 'Travessa da Paz, nº 45',
    numeroDependentes: 3,
    beneficiosAtivos: ['Karatê Comunitário', 'Exames Periódicos'],
    status: 'ativo',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
]

export async function buscarMoradores(busca?: string): Promise<Morador[]> {
  try {
    let query = supabase.from('moradores').select('*').order('nome', { ascending: true })
    
    if (busca) {
      const termo = `%${busca}%`
      query = query.or(`nome.ilike.${termo},cpf.ilike.${termo},numero_cartao_sus.ilike.${termo},telefone.ilike.${termo}`)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    // Mapeamento de snake_case para camelCase
    return (data || []).map((m: any) => ({
      id: m.id,
      nome: m.nome,
      cpf: m.cpf,
      telefone: m.telefone,
      email: m.email,
      dataNascimento: m.data_nascimento,
      numeroCartaoSus: m.numero_cartao_sus,
      bairro: m.bairro,
      endereco: m.endereco,
      numeroDependentes: m.numero_dependentes,
      beneficiosAtivos: m.beneficios_ativos || [],
      status: m.status,
      criadoEm: m.criado_em,
      atualizadoEm: m.atualizado_em,
    }))
  } catch (err) {
    console.warn('Usando fallback em memória para moradores:', err)
    if (!busca) return moradoresMemoria
    const termo = busca.toLowerCase()
    return moradoresMemoria.filter(
      m =>
        m.nome.toLowerCase().includes(termo) ||
        m.cpf.includes(termo) ||
        m.numeroCartaoSus.includes(termo) ||
        m.telefone.includes(termo)
    )
  }
}

export async function cadastrarMorador(dados: Omit<Morador, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Morador> {
  try {
    const { data, error } = await supabase
      .from('moradores')
      .insert({
        nome: dados.nome,
        cpf: dados.cpf,
        telefone: dados.telefone,
        email: dados.email,
        data_nascimento: dados.dataNascimento || null,
        numero_cartao_sus: dados.numeroCartaoSus,
        bairro: dados.bairro,
        endereco: dados.endereco,
        numero_dependentes: dados.numeroDependentes,
        beneficios_ativos: dados.beneficiosAtivos,
        status: dados.status || 'ativo',
      })
      .select()
      .single()
      
    if (error) throw error
    
    return {
      id: data.id,
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email,
      dataNascimento: data.data_nascimento,
      numeroCartaoSus: data.numero_cartao_sus,
      bairro: data.bairro,
      endereco: data.endereco,
      numeroDependentes: data.numero_dependentes,
      beneficiosAtivos: data.beneficios_ativos || [],
      status: data.status,
      criadoEm: data.criado_em,
      atualizadoEm: data.atualizado_em,
    }
  } catch (err) {
    console.warn('Cadastrando no fallback em memória:', err)
    const novo: Morador = {
      ...dados,
      id: String(moradoresMemoria.length + 1),
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    }
    moradoresMemoria = [novo, ...moradoresMemoria]
    return novo
  }
}

export async function atualizarMorador(id: string, dados: Partial<Morador>): Promise<Morador> {
  try {
    const payload: any = {}
    if (dados.nome !== undefined) payload.nome = dados.nome
    if (dados.cpf !== undefined) payload.cpf = dados.cpf
    if (dados.telefone !== undefined) payload.telefone = dados.telefone
    if (dados.email !== undefined) payload.email = dados.email
    if (dados.dataNascimento !== undefined) payload.data_nascimento = dados.dataNascimento
    if (dados.numeroCartaoSus !== undefined) payload.numero_cartao_sus = dados.numeroCartaoSus
    if (dados.bairro !== undefined) payload.bairro = dados.bairro
    if (dados.endereco !== undefined) payload.endereco = dados.endereco
    if (dados.numeroDependentes !== undefined) payload.numero_dependentes = dados.numeroDependentes
    if (dados.beneficiosAtivos !== undefined) payload.beneficios_ativos = dados.beneficiosAtivos
    if (dados.status !== undefined) payload.status = dados.status

    const { data, error } = await supabase
      .from('moradores')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    
    return {
      id: data.id,
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email,
      dataNascimento: data.data_nascimento,
      numeroCartaoSus: data.numero_cartao_sus,
      bairro: data.bairro,
      endereco: data.endereco,
      numeroDependentes: data.numero_dependentes,
      beneficiosAtivos: data.beneficios_ativos || [],
      status: data.status,
      criadoEm: data.criado_em,
      atualizadoEm: data.atualizado_em,
    }
  } catch (err) {
    console.warn('Atualizando no fallback em memória:', err)
    let atualizado: Morador | null = null
    moradoresMemoria = moradoresMemoria.map(m => {
      if (m.id === id) {
        atualizado = {
          ...m,
          ...dados,
          atualizadoEm: new Date().toISOString(),
        }
        return atualizado
      }
      return m
    })
    if (!atualizado) throw new Error('Morador não encontrado')
    return atualizado
  }
}
