'use client'
// ============================================================
// INBCA - Módulo de Assistência Social & Famílias
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState, useEffect } from 'react'
import {
  HeartHandshake, Users, Plus, Search, CheckCircle,
  FileText, Home, Shield, Heart, Gift
} from 'lucide-react'
import { toast } from 'sonner'
import { buscarMoradores, cadastrarMorador } from '../../../servicos/moradores'
import { Morador } from '../../../tipos'

export default function PaginaAssistencialSocial() {
  const [busca, setBusca] = useState('')
  const [moradores, setMoradores] = useState<Morador[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      try {
        const dados = await buscarMoradores()
        setMoradores(dados)
      } catch (err) {
        console.error(err)
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  // Filtrar moradores na busca
  const filtrados = moradores.filter(
    m =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.bairro.toLowerCase().includes(busca.toLowerCase()) ||
      m.beneficiosAtivos.some(b => b.toLowerCase().includes(busca.toLowerCase()))
  )

  async function handleNovoCadastro() {
    toast.promise(
      cadastrarMorador({
        nome: 'Nova Família Acolhida ' + (moradores.length + 1),
        cpf: '000.000.000-00',
        telefone: '(71) 99999-0000',
        numeroCartaoSus: '000.0000.0000.00',
        bairro: 'Bairro da Paz',
        endereco: 'Rua Principal, S/N',
        numeroDependentes: 2,
        beneficiosAtivos: ['Distribuição Alimentar'],
        status: 'ativo',
      }),
      {
        loading: 'Cadastrando família...',
        success: (nova) => {
          setMoradores(prev => [nova, ...prev])
          return 'Família cadastrada com sucesso na Assistência Social!'
        },
        error: 'Erro ao cadastrar.',
      }
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header Estilo Casinha Amarela ────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-slate-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              Desenvolvimento Social
            </span>
            <span className="bg-white/30 text-slate-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              Acolhimento Comunitário
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Assistência Social & Famílias Acolhidas
          </h1>
          <p className="text-slate-900 text-sm mt-1.5 font-medium leading-relaxed">
            Instituto Nilson Bispo Casinha Amarela — Cadastro social de moradores, acompanhamento de famílias vulneráveis e apoio alimentar.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <button
            onClick={handleNovoCadastro}
            className="px-5 py-3 bg-slate-950 text-amber-300 hover:bg-slate-900 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Nova Família</span>
          </button>
        </div>
      </div>

      {/* ── Métricas ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Famílias Cadastradas</p>
            <p className="text-2xl font-black text-slate-900 dark:text-amber-300 mt-1">{moradores.length + 477}</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">Acompanhadas no INBCA</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cestas Entregues Mês</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">120</p>
            <p className="text-[11px] text-slate-500 mt-1">Doações distribuídas</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Gift className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitas Domiciliares</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">35</p>
            <p className="text-[11px] text-slate-500 mt-1">Agentes comunitários</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ── Famílias Cadastradas em Cards Responsivos (0 Rolagem) ────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              Cadastro de Famílias e Beneficiários
            </h2>
          </div>

          {/* Campo de Busca */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome, benefício..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-amber-50/50 dark:bg-slate-800 text-xs rounded-xl border border-amber-200/70 dark:border-amber-900/40 outline-none focus:border-amber-500 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtrados.map((f) => (
            <div
              key={f.id}
              className="p-5 bg-amber-50/40 dark:bg-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-black text-amber-950 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                    {f.beneficiosAtivos.join(' & ')}
                  </span>
                  <span className="text-[11px] font-black px-3 py-0.5 rounded-full border bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 shadow-sm">
                    {f.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{f.nome}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Dependentes: <span className="font-bold text-slate-800 dark:text-slate-200">{f.numeroDependentes} pessoas</span> | Bairro: <span className="font-bold text-slate-800 dark:text-slate-200">{f.bairro}</span>
                </p>
              </div>

              <div className="flex items-center justify-end border-t sm:border-t-0 border-amber-100 dark:border-amber-900/30 pt-3 sm:pt-0">
                <button
                  onClick={() => toast.info(`Abre prontuário social de ${f.nome}`)}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 dark:bg-slate-800 dark:text-amber-300 font-black text-xs rounded-xl transition-all shadow-sm hover:scale-105"
                >
                  Ver Histórico
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
