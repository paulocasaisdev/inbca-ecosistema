// ============================================================
// INBCA - Serviço de Automações & Motor de Mensagens
// Integrado com banco de dados Supabase e suporte a fallback
// ============================================================

import { AutomacaoSocial } from '../tipos'
import { supabase } from '../lib/supabase'

let automacoesMemoria: AutomacaoSocial[] = [
  {
    id: '1',
    nome: 'Lembrete de Consulta 24h',
    eventoGatilho: 'lembrete_24h',
    ativa: true,
    mensagemTemplate: 'Olá, {nome}! Lembramos que sua consulta com o(a) {especialista} está marcada para amanhã, {data} às {hora} na Casinha Amarela do INBCA. Se não puder comparecer, nos avise para liberarmos a vaga!',
    criadoEm: new Date().toISOString(),
  },
  {
    id: '2',
    nome: 'Confirmação de Agendamento',
    eventoGatilho: 'agendamento_criado',
    ativa: true,
    mensagemTemplate: 'Olá, {nome}! Seu agendamento de {tipo} ({detalhe}) foi confirmado para o dia {data} às {hora} na Casinha Amarela. Seja bem-vindo!',
    criadoEm: new Date().toISOString(),
  },
]

export async function buscarAutomacoes(): Promise<AutomacaoSocial[]> {
  try {
    const { data, error } = await supabase.from('automacoes_sociais').select('*').order('nome', { ascending: true })
    if (error) throw error
    
    return (data || []).map((a: any) => ({
      id: a.id,
      nome: a.nome,
      eventoGatilho: a.evento_gatilho,
      ativa: a.ativa,
      mensagemTemplate: a.mensagem_template,
      criadoEm: a.criado_em,
    }))
  } catch (err) {
    console.warn('Usando fallback em memória para automações:', err)
    return automacoesMemoria
  }
}

export async function dispararMensagemSimulada(
  moradorNome: string,
  evento: AutomacaoSocial['eventoGatilho'],
  dadosExtras: Record<string, string>
): Promise<string> {
  const lista = await buscarAutomacoes()
  const automacao = lista.find(a => a.eventoGatilho === evento && a.ativa)
  if (!automacao) return 'Nenhuma automação ativa para este evento.'
  
  let msg = automacao.mensagemTemplate
    .replace('{nome}', moradorNome)
    .replace('{tipo}', dadosExtras.tipo || '')
    .replace('{detalhe}', dadosExtras.detalhe || '')
    .replace('{especialista}', dadosExtras.especialista || '')
    .replace('{data}', dadosExtras.data || '')
    .replace('{hora}', dadosExtras.hora || '')
    
  return msg
}
