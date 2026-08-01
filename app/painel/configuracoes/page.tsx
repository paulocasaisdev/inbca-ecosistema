'use client'
// ============================================================
// INBCA - Módulo de Configurações & Integrações do Sistema
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import { useState } from 'react'
import {
  Settings, Building, Phone, Mail, MapPin, Clock, Save,
  CheckCircle2, Bell, Shield, Lock, Smartphone, Globe,
  ToggleLeft, ToggleRight, Check, Heart, Stethoscope,
  Dumbbell, Scale, Brain, Users, RefreshCw, Zap, Key,
  Share2, Database, Link as LinkIcon, Radio, History
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaConfiguracoesINBCA() {
  const [abaAtiva, setAbaAtiva] = useState<'instituto' | 'modulos' | 'notificacoes' | 'integracoes' | 'seguranca' | 'auditoria'>('instituto')

  // Estado: Dados Institucionais
  const [nomeInstituto, setNomeInstituto] = useState('Instituto Nilson Bispo Casinha Amarela')
  const [sigla, setSigla] = useState('INBCA')
  const [cnpj, setCnpj] = useState('12.345.678/0001-90')
  const [telefone, setTelefone] = useState('(71) 3344-5566')
  const [whatsapp, setWhatsapp] = useState('(71) 98877-6655')
  const [email, setEmail] = useState('contato@casinhaamarelainbca.org.br')
  const [endereco, setEndereco] = useState('Rua Casinha Amarela, nº 100 - Bairro da Paz')
  const [cidadeUF, setCidadeUF] = useState('Salvador / BA')
  const [horarioFuncionamento, setHorarioFuncionamento] = useState('Segunda a Sexta: 07:00 às 18:00 | Sábado: 08:00 às 12:00')

  // Estado: Módulos Comunitários Habilitados
  const [modulos, setModulos] = useState({
    clinicaMedica: true,
    examesImagem: true,
    psicologiaTerapias: true,
    karate: true,
    zumba: true,
    capoeira: true,
    boxeKickboxing: true,
    assistenciaJuridica: true,
    doacoesCestas: true,
  })

  // Estado: Notificações
  const [notificacoes, setNotificacoes] = useState({
    lembreteWhatsApp: true,
    confirmacaoAgendamento: true,
    alertaCancelamento: true,
    comunicadosGerais: false,
  })

  // Estado: Integrações Ativas
  const [integracoes, setIntegracoes] = useState({
    whatsappApi: true,
    esusCadsus: true,
    portalWeb: true,
    backupNuvem: true,
    pushNotificacoes: true,
  })

  const salvarDadosInstituto = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Configurações institucionais do INBCA salvas com sucesso!')
  }

  const alternarModulo = (chave: keyof typeof modulos) => {
    setModulos(prev => {
      const novo = { ...prev, [chave]: !prev[chave] }
      toast.success(`Módulo ${chave} ${novo[chave] ? 'habilitado' : 'desabilitado'}!`)
      return novo
    })
  }

  const alternarNotificacao = (chave: keyof typeof notificacoes) => {
    setNotificacoes(prev => {
      const novo = { ...prev, [chave]: !prev[chave] }
      toast.success(`Preferência de notificação atualizada!`)
      return novo
    })
  }

  const alternarIntegracao = (chave: keyof typeof integracoes) => {
    setIntegracoes(prev => {
      const novo = { ...prev, [chave]: !prev[chave] }
      toast.success(`Integração ${chave} ${novo[chave] ? 'ativada' : 'desativada'}!`)
      return novo
    })
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <Settings className="w-3.5 h-3.5" />
              Parâmetros do Sistema
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              Gestão INBCA
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Configurações & Integrações
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Personalize os dados da associação, habilite módulos comunitários, gerencie integrações WhatsApp/E-SUS e configure os acessos da equipe.
          </p>
        </div>

        <div className="relative z-10 bg-slate-950/90 text-white p-4 rounded-2xl border border-amber-400/30 flex items-center gap-3 min-w-[220px]">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">Status do Sistema</p>
            <p className="text-xs font-bold text-emerald-400 mt-0.5">🟢 Integrações Ativas</p>
            <span className="text-[10px] text-slate-400 block mt-0.5">Versão 1.0.0</span>
          </div>
        </div>
      </div>

      {/* ── Navegação por Abas ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-amber-200/70 dark:border-amber-900/40 overflow-x-auto pb-1">
        {[
          { id: 'instituto', rotulo: 'Dados do Instituto', icone: Building },
          { id: 'modulos', rotulo: 'Serviços & Módulos Ativos', icone: Settings },
          { id: 'notificacoes', rotulo: 'WhatsApp & Comunicados', icone: Bell },
          { id: 'integracoes', rotulo: 'Integrações & APIs', icone: Globe },
          { id: 'seguranca', rotulo: 'Segurança & Permissões', icone: Lock },
          { id: 'auditoria', rotulo: 'Logs de Auditoria', icone: History },
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

      {/* ── Aba 1: Dados Institucionais do INBCA ────────────────────── */}
      {abaAtiva === 'instituto' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Cadastro da Associação Comunitária</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Informações oficiais exibidas nos comprovantes e no portal público do INBCA</p>
            </div>
          </div>

          <form onSubmit={salvarDadosInstituto} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome Oficial da Instituição
                </label>
                <input
                  type="text"
                  value={nomeInstituto}
                  onChange={e => setNomeInstituto(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Sigla / Abreviação
                </label>
                <input
                  type="text"
                  value={sigla}
                  onChange={e => setSigla(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={e => setCnpj(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Telefone Fixo
                </label>
                <input
                  type="text"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  WhatsApp de Atendimento
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Endereço da Sede (Casinha Amarela)
                </label>
                <input
                  type="text"
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Cidade / UF
                </label>
                <input
                  type="text"
                  value={cidadeUF}
                  onChange={e => setCidadeUF(e.target.value)}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Horário de Atendimento ao Público
              </label>
              <input
                type="text"
                value={horarioFuncionamento}
                onChange={e => setHorarioFuncionamento(e.target.value)}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-slate-800 text-sm rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100 font-medium"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações Institucionais
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Aba 2: Módulos & Serviços Comunitários ────────────────────── */}
      {abaAtiva === 'modulos' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Gerenciamento de Módulos e Serviços</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ative ou desative serviços que aparecem no painel e na grade de agendamentos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { chave: 'clinicaMedica', nome: 'Clínica Médica Comunitária', desc: 'Consultas com clínicos e especialistas', icone: Stethoscope },
              { chave: 'examesImagem', nome: 'Exames de Imagem & Laboratório', desc: 'Marcação de ultrassom e exames', icone: CheckCircle2 },
              { chave: 'psicologiaTerapias', nome: 'Psicologia & Terapias', desc: 'Atendimentos de saúde mental e fisioterapia', icone: Brain },
              { chave: 'karate', nome: 'Aulas de Karatê Inclusivo', desc: 'Turmas de arte marcial comunitária', icone: Dumbbell },
              { chave: 'zumba', nome: 'Aulas de Zumba & Ritmos', desc: 'Atividade física para moradores', icone: Dumbbell },
              { chave: 'capoeira', nome: 'Rodas & Aulas de Capoeira', desc: 'Prática cultural comunitária', icone: Dumbbell },
              { chave: 'boxeKickboxing', nome: 'Boxe & Kickboxing Comunitário', desc: 'Treinamento funcional e luta', icone: Dumbbell },
              { chave: 'assistenciaJuridica', nome: 'Assistência Jurídica Gratuita', desc: 'Orientação de direitos e BPC/LOAS', icone: Scale },
              { chave: 'doacoesCestas', nome: 'Distribuição de Cestas & Doações', desc: 'Ações sociais e famílias atendidas', icone: Heart },
            ].map(mod => {
              const Icone = mod.icone
              const ativo = modulos[mod.chave as keyof typeof modulos]
              return (
                <div
                  key={mod.chave}
                  onClick={() => alternarModulo(mod.chave as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    ativo
                      ? 'bg-amber-50/50 dark:bg-slate-800/80 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      ativo ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      <Icone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{mod.nome}</h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{mod.desc}</p>
                    </div>
                  </div>

                  <div className="text-amber-600 dark:text-amber-400">
                    {ativo ? <ToggleRight className="w-7 h-7 text-amber-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Aba 3: WhatsApp & Comunicados ───────────────────────────── */}
      {abaAtiva === 'notificacoes' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Automações de Notificação no WhatsApp</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Envio de lembretes e avisos automáticos para os moradores da comunidade</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { chave: 'confirmacaoAgendamento', titulo: 'Confirmação Automática de Agendamento', desc: 'Envia mensagem de confirmação instantânea assim que a consulta ou aula é marcada.' },
              { chave: 'lembreteWhatsApp', titulo: 'Lembrete Pré-Consulta (24h de antecedência)', desc: 'Relembra o morador sobre o horário da consulta médica ou exame no dia anterior.' },
              { chave: 'alertaCancelamento', titulo: 'Aviso de Desmarcação / Vaga na Fila', desc: 'Notifica moradores da lista de espera quando uma vaga for liberada.' },
              { chave: 'comunicadosGerais', titulo: 'Transmissão de Comunicados da Casinha Amarela', desc: 'Permite o envio de avisos de mutirão de saúde e eventos comunitários.' },
            ].map(item => {
              const ativo = notificacoes[item.chave as keyof typeof notificacoes]
              return (
                <div
                  key={item.chave}
                  onClick={() => alternarNotificacao(item.chave as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    ativo
                      ? 'bg-amber-50/50 dark:bg-slate-800/80 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.titulo}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                  {ativo ? <ToggleRight className="w-7 h-7 text-amber-500 flex-shrink-0" /> : <ToggleLeft className="w-7 h-7 text-slate-400 flex-shrink-0" />}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Aba 4: Integrações & APIs ────────────────────────────────── */}
      {abaAtiva === 'integracoes' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Central de Integrações & Conexões Externas</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Conecte o INBCA ao WhatsApp, E-SUS, Portal Público e Backup em Nuvem</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                chave: 'whatsappApi',
                nome: 'WhatsApp API / Evolution Client',
                desc: 'Disparo de confirmações e lembretes pré-consulta via WhatsApp Web.',
                icone: Smartphone,
                badge: '🟢 Conectado',
                statusCor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
              },
              {
                chave: 'esusCadsus',
                nome: 'Integração E-SUS / CADSUS',
                desc: 'Consulta automática do Cartão SUS e histórico vacinal dos moradorers.',
                icone: Stethoscope,
                badge: '🟢 Ativo',
                statusCor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
              },
              {
                chave: 'portalWeb',
                nome: 'Portal Público de Agendamento',
                desc: 'Recebe pré-agendamentos da comunidade em tempo real na grade diária.',
                icone: Globe,
                badge: '🟢 Ativo',
                statusCor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
              },
              {
                chave: 'backupNuvem',
                nome: 'Backup Google Cloud Drive',
                desc: 'Sincronização em nuvem de prontuários sociais e declarações de hipossuficiência.',
                icone: Database,
                badge: '🟢 Sincronizado',
                statusCor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
              },
              {
                chave: 'pushNotificacoes',
                nome: 'Notificações Push para Voluntários',
                desc: 'Alertas em tempo real para médicos, psicólogos e advogados sobre a fila de plantão.',
                icone: Zap,
                badge: '🟢 Ativo',
                statusCor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300',
              },
            ].map(item => {
              const Icone = item.icone
              const ativo = integracoes[item.chave as keyof typeof integracoes]
              return (
                <div
                  key={item.chave}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    ativo
                      ? 'bg-amber-50/50 dark:bg-slate-800/80 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        ativo ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}>
                        <Icone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.nome}</h4>
                        <span className={`inline-block mt-0.5 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${item.statusCor}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => alternarIntegracao(item.chave as any)}
                      className="text-amber-600 dark:text-amber-400"
                    >
                      {ativo ? <ToggleRight className="w-7 h-7 text-amber-500" /> : <ToggleLeft className="w-7 h-7 text-slate-400" />}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>

                  <div className="pt-2 border-t border-amber-100 dark:border-amber-900/30 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Status API: OK 200</span>
                    <button
                      onClick={() => toast.success(`Testando conexão com ${item.nome}... Sucesso!`)}
                      className="text-amber-700 dark:text-amber-400 font-bold hover:underline"
                    >
                      Testar Conexão
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Aba 5: Segurança & Permissões ───────────────────────────── */}
      {abaAtiva === 'seguranca' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Segurança & Controle de Acesso</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gerenciamento de políticas de acesso da equipe da Casinha Amarela</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-amber-900/40">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Backup Automático de Dados Sociais</h4>
              <p className="text-xs text-slate-500 mb-3">Último backup dos prontuários e assistidos realizado hoje às 04:00.</p>
              <button
                onClick={() => toast.success('Backup do banco de dados concluído!')}
                className="px-4 py-2 bg-slate-950 text-amber-300 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Realizar Backup Agora
              </button>
            </div>

            <div className="p-5 bg-amber-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 space-y-3">
              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                Matriz de Níveis de Permissão & Acesso
              </h4>
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 rounded-md">
                      👑 Administradores
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">• Acesso Total</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Administradores têm acesso total a todas as funções, relatórios, cadastros e configurações do sistema.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-md">
                      🤝 Atendentes / Agentes
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">• Consultas e Exames</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Atendentes e Agentes acessam a marcação de consultas e exames.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-md">
                      🩺 Médicos, 🧠 Psicólogos, 🥋 Instrutores
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">• Dados e Frequências</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Médicos e Psicólogos, Instrutores acessam apenas dados e frequências específicos dos assistidos.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md">
                      🌿 Terapeutas e Fisioterapeutas
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">• Prontuários Específicos</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Terapeutas e Fisioterapeutas acessam apenas prontuários específicos dos assistidos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Aba 6: Logs de Auditoria ────────────────────────────────── */}
      {abaAtiva === 'auditoria' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-sm max-w-4xl mx-auto space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-100 dark:border-amber-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-amber-300">Rastreabilidade & Logs de Auditoria</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Rastreamento de ações realizadas por profissionais no sistema INBCA</p>
              </div>
            </div>
            <button
              onClick={() => toast.success('Auditoria exportada para relatório em formato CSV!')}
              className="px-4 py-2 bg-slate-950 text-amber-300 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 whitespace-nowrap self-end sm:self-auto hover:scale-105 transition-transform"
            >
              Exportar Log (CSV)
            </button>
          </div>

          <div className="p-4 bg-amber-50/30 dark:bg-slate-800/40 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            📢 **Nota de Segurança**: Para conformidade com a **LGPD (Lei Geral de Proteção de Dados)**, toda consulta ou alteração nos prontuários de saúde e de assistência jurídica é registrada e não pode ser apagada por nenhum usuário do sistema.
          </div>

          {/* Lista de Eventos de Auditoria */}
          <div className="space-y-2.5">
            {[
              { usuario: 'Dra. Vanessa Lima (Médica)', acao: 'Acessou o Prontuário Clínico', alvo: 'Maria Raimunda de Souza', status: 'sucesso', data: '2026-08-01 09:12:45', ip: '186.230.12.91' },
              { usuario: 'Ag. Carla Raimunda de Jesus (Atendente)', acao: 'Agendou Nova Consulta', alvo: 'Ana Clara Santos', status: 'sucesso', data: '2026-08-01 08:34:11', ip: '186.230.12.93' },
              { usuario: 'Dr. Paulo Roberto Casais (Administrador)', acao: 'Realizou Backup do Banco de Dados', alvo: 'Backup Completo', status: 'sucesso', data: '2026-07-31 23:10:04', ip: '186.230.12.10' },
              { usuario: 'Ag. Carla Raimunda de Jesus (Atendente)', acao: 'Tentou acessar Prontuário Médico (Bloqueado)', alvo: 'Luciana Ferreira', status: 'negado', data: '2026-07-31 16:45:12', ip: '186.230.12.93' },
              { usuario: 'Dra. Camila Vasconcelos (Psicóloga)', acao: 'Alterou ficha de acompanhamento', alvo: 'José Carlos dos Santos', status: 'alerta', data: '2026-07-31 14:15:33', ip: '187.12.90.111' },
            ].map((log, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs hover:border-amber-200 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{log.usuario}</span>
                    <span className="text-slate-400 font-mono text-[10px]">IP: {log.ip}</span>
                  </div>
                  <p className="text-slate-500 font-medium">
                    Ação: <span className="font-bold text-slate-700 dark:text-slate-300">{log.acao}</span> | Alvo: <span className="font-bold text-slate-800 dark:text-slate-200">{log.alvo}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-between md:justify-end">
                  <span className="text-[11px] font-mono text-slate-450">{log.data}</span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black ${
                    log.status === 'sucesso' ? 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' :
                    log.status === 'negado' ? 'bg-rose-100 text-rose-950 border-rose-300 dark:bg-rose-950 dark:text-rose-300 animate-pulse font-bold' :
                    'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {log.status === 'sucesso' ? '🟢 Sucesso' : log.status === 'negado' ? '🔴 Negado' : '🟡 Alerta'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
