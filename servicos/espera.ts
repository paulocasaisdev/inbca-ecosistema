// ============================================================
// INBCA - Serviço de Fila de Espera & Plantão Comunitário
// Integrado com banco de dados Supabase e suporte a fallback
// ============================================================

import { ItemFilaEspera } from '../tipos'
import { supabase } from '../lib/supabase'

let filaEsperaMemoria: ItemFilaEspera[] = [
  {
    id: '1',
    moradorId: '1',
    moradorNome: 'Maria Raimunda de Souza',
    moradorTelefone: '(71) 98888-7766',
    tipoServico: 'Consulta',
    modalidadeOuEspecialidade: 'Oftalmologia',
    prioridade: 3,
    status: 'aguardando',
    observacoes: 'Paciente com alta pressão ocular, necessita de urgência.',
    criadoEm: new Date().toISOString(),
  },
]

export async function buscarFilaEspera(tipoServico?: string): Promise<ItemFilaEspera[]> {
  try {
    let query = supabase.from('fila_espera').select('*').order('prioridade', { ascending: false })
    
    if (tipoServico) {
      query = query.eq('tipo_servico', tipoServico)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    return (data || []).map((f: any) => ({
      id: f.id,
      moradorId: f.morador_id,
      moradorNome: f.morador_name || f.morador_nome,
      moradorTelefone: f.morador_telefone,
      tipoServico: f.tipo_servico,
      modalidadeOuEspecialidade: f.modalidade_ou_especialidade,
      prioridade: f.prioridade,
      status: f.status,
      observacoes: f.observacoes,
      criadoEm: f.criado_em,
    }))
  } catch (err) {
    console.warn('Usando fallback em memória para fila de espera:', err)
    if (!tipoServico) return filaEsperaMemoria
    return filaEsperaMemoria.filter(f => f.tipoServico === tipoServico)
  }
}

export async function adicionarFilaEspera(item: Omit<ItemFilaEspera, 'id' | 'status' | 'criadoEm'>): Promise<ItemFilaEspera> {
  try {
    const { data, error } = await supabase
      .from('fila_espera')
      .insert({
        morador_id: item.moradorId,
        morador_nome: item.moradorNome,
        morador_telefone: item.moradorTelefone,
        tipo_servico: item.tipoServico,
        modalidade_ou_especialidade: item.modalidadeOuEspecialidade,
        prioridade: item.prioridade,
        status: 'aguardando',
        observacoes: item.observacoes,
      })
      .select()
      .single()
      
    if (error) throw error
    
    return {
      id: data.id,
      moradorId: data.morador_id,
      moradorNome: data.morador_nome,
      moradorTelefone: data.morador_telefone,
      tipoServico: data.tipo_servico,
      modalidadeOuEspecialidade: data.modalidade_ou_especialidade,
      prioridade: data.prioridade,
      status: data.status,
      observacoes: data.observacoes,
      criadoEm: data.criado_em,
    }
  } catch (err) {
    console.warn('Adicionando na fila de espera em memória:', err)
    const novo: ItemFilaEspera = {
      ...item,
      id: String(filaEsperaMemoria.length + 1),
      status: 'aguardando',
      criadoEm: new Date().toISOString(),
    }
    filaEsperaMemoria = [...filaEsperaMemoria, novo]
    return novo
  }
}

export async function processarDesistênciaOuEncaixe(id: string, status: 'encaixado' | 'desistiu'): Promise<ItemFilaEspera> {
  try {
    const { data, error } = await supabase
      .from('fila_espera')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    
    return {
      id: data.id,
      moradorId: data.morador_id,
      moradorNome: data.morador_nome,
      moradorTelefone: data.morador_telefone,
      tipoServico: data.tipo_servico,
      modalidadeOuEspecialidade: data.modalidade_ou_especialidade,
      prioridade: data.prioridade,
      status: data.status,
      observacoes: data.observacoes,
      criadoEm: data.criado_em,
    }
  } catch (err) {
    console.warn('Atualizando fila de espera em memória:', err)
    let itemAtualizado: ItemFilaEspera | null = null
    filaEsperaMemoria = filaEsperaMemoria.map(f => {
      if (f.id === id) {
        itemAtualizado = { ...f, status }
        return itemAtualizado
      }
      return f
    })
    if (!itemAtualizado) throw new Error('Item da fila de espera não encontrado.')
    return itemAtualizado
  }
}
