'use client'

import React, { useState } from 'react'
import {
  Heart, Stethoscope, Dumbbell, Sparkles, Sun, Users, Activity,
  Smile, Scale, HeartHandshake, ShieldCheck, Brain, HeartPulse
} from 'lucide-react'

export function CasinhaAmarelaAnimada() {
  const [portaAberta, setPortaAberta] = useState(false)
  const [mensagemAtiva, setMensagemAtiva] = useState('Bem-vindo à Casinha Amarela do INBCA!')

  const estatisticas = [
    { icone: Stethoscope, titulo: 'Saúde & Exames', valor: '8.400+', cor: 'bg-amber-100 text-amber-800' },
    { icone: Brain, titulo: 'Psico & Fisioterapia', valor: '3.200+', cor: 'bg-yellow-100 text-yellow-900' },
    { icone: Dumbbell, titulo: 'Esportes & Saúde', valor: '2.500+', cor: 'bg-amber-200 text-amber-950' },
    { icone: HeartHandshake, titulo: 'Famílias & Jurídico', valor: '4.800+', cor: 'bg-yellow-200 text-yellow-900' },
  ]

  return (
    <div className="relative w-full max-w-2xl mx-auto py-10 flex flex-col items-center justify-center select-none">
      {/* Sol com Raios Giratórios no Fundo */}
      <div className="absolute -top-6 -right-6 w-36 h-36 opacity-30 pointer-events-none animate-sol-giro">
        <Sun className="w-full h-full text-amber-400" />
      </div>

      {/* ── 4 Badges Flutuantes Harmoniosos ao Redor da Casinha Amarela ── */}
      
      {/* 1. Saúde & Clínica (Topo Esquerda) */}
      <div className="absolute -top-2 left-0 md:left-2 animate-flutuar z-20">
        <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-amber-300/70 text-xs font-black text-amber-950 dark:text-amber-300">
          <Stethoscope className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Saúde & Clínica</span>
        </div>
      </div>

      {/* 2. Psico & Fisioterapia (Meio Esquerda) */}
      <div className="absolute top-1/3 -left-3 md:-left-10 animate-flutuar [animation-delay:1.2s] z-20">
        <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-amber-300/70 text-xs font-black text-amber-950 dark:text-amber-300">
          <Brain className="w-4 h-4 text-amber-600" />
          <span>Psico & Fisioterapia</span>
        </div>
      </div>

      {/* 3. Esportes & Saúde (Lado Direito - Na altura do Meio da Casa) */}
      <div className="absolute top-36 md:top-40 -right-2 md:-right-8 animate-flutuar [animation-delay:1.8s] z-20">
        <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-amber-300/70 text-xs font-black text-amber-950 dark:text-amber-300">
          <Dumbbell className="w-4 h-4 text-amber-600" />
          <span>Esportes & Saúde</span>
        </div>
      </div>

      {/* 4. Assistência Jurídica (Lado Direito - Logo abaixo do Meio da Casa) */}
      <div className="absolute top-56 md:top-60 -right-2 md:-right-8 animate-flutuar [animation-delay:0.6s] z-20">
        <div className="flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-amber-300/70 text-xs font-black text-amber-950 dark:text-amber-300">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>Assistência Jurídica</span>
        </div>
      </div>

      {/* Ilustração SVG Vetorial da Casinha Amarela Animada */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 filter drop-shadow-casinha transition-transform duration-300 hover:scale-105 my-4">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full cursor-pointer"
          onClick={() => {
            setPortaAberta(!portaAberta)
            setMensagemAtiva(
              portaAberta
                ? 'Portas abertas para cuidar da nossa comunidade!'
                : 'Bem-vindo ao Instituto Nilson Bispo Casinha Amarela!'
            )
          }}
        >
          <defs>
            {/* Gradientes da Casinha Amarela */}
            <linearGradient id="gradTelhado" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="gradParede" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>

            <linearGradient id="gradJanela" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>

            <filter id="glowJanela" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Fumaça Animada da Chaminé */}
          <g className="animate-fumaca">
            <circle cx="295" cy="80" r="10" fill="#FDE68A" opacity="0.6" />
            <circle cx="305" cy="60" r="14" fill="#FEF08A" opacity="0.4" />
            <circle cx="318" cy="38" r="18" fill="#FFFBEB" opacity="0.3" />
          </g>

          {/* Chaminé */}
          <rect x="275" y="110" width="30" height="55" fill="#B45309" rx="4" />
          <rect x="270" y="105" width="40" height="10" fill="#78350F" rx="3" />

          {/* Parede Principal da Casinha */}
          <rect x="80" y="170" width="240" height="180" rx="16" fill="url(#gradParede)" stroke="#D97706" strokeWidth="4" />

          {/* Telhado Dourado em Ângulo Acolhedor */}
          <polygon points="50,180 200,60 350,180" fill="url(#gradTelhado)" stroke="#B45309" strokeWidth="6" strokeLinejoin="round" />
          <polygon points="65,180 200,72 335,180" fill="#FBBF24" opacity="0.3" />

          {/* Placa do Instituto */}
          <rect x="125" y="185" width="150" height="28" fill="#78350F" rx="6" stroke="#FEF08A" strokeWidth="2" />
          <text x="200" y="204" textAnchor="middle" fill="#FFFBEB" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            INSTITUTO NILSON BISPO
          </text>

          {/* Janela Esquerda com Brilho Animado */}
          <g className="animate-janela-brilho">
            <rect x="110" y="225" width="55" height="55" rx="10" fill="url(#gradJanela)" stroke="#B45309" strokeWidth="3" filter="url(#glowJanela)" />
            <line x1="137.5" y1="225" x2="137.5" y2="280" stroke="#B45309" strokeWidth="2" />
            <line x1="110" y1="252.5" x2="165" y2="252.5" stroke="#B45309" strokeWidth="2" />
          </g>

          {/* Janela Direita com Brilho Animado */}
          <g className="animate-janela-brilho" style={{ animationDelay: '1.2s' }}>
            <rect x="235" y="225" width="55" height="55" rx="10" fill="url(#gradJanela)" stroke="#B45309" strokeWidth="3" filter="url(#glowJanela)" />
            <line x1="262.5" y1="225" x2="262.5" y2="280" stroke="#B45309" strokeWidth="2" />
            <line x1="235" y1="252.5" x2="290" y2="252.5" stroke="#B45309" strokeWidth="2" />
          </g>

          {/* Coração Comunitário Pulsante acima da Porta */}
          <g className="animate-coracao-pulso" transform="translate(200, 240)">
            <path d="M 0 -8 C -6 -16 -16 -8 -10 2 L 0 12 L 10 2 C 16 -8 6 -16 0 -8 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          </g>

          {/* Porta Acolhedora (Interativa) */}
          <rect x="175" y="260" width="50" height="90" rx="8" fill="#854D0E" stroke="#78350F" strokeWidth="3" />
          {portaAberta ? (
            <rect x="177" y="262" width="22" height="86" rx="6" fill="#FEF08A" opacity="0.9" />
          ) : (
            <circle cx="215" cy="305" r="4" fill="#FBBF24" />
          )}

          {/* Gramadinho com Flores em Volta */}
          <path d="M 40 350 Q 200 340 360 350 L 360 375 Q 200 380 40 375 Z" fill="#10B981" />
          <circle cx="70" cy="355" r="4" fill="#F59E0B" />
          <circle cx="110" cy="360" r="5" fill="#EF4444" />
          <circle cx="290" cy="358" r="4" fill="#3B82F6" />
          <circle cx="330" cy="354" r="5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Mensagem Interativa e Botão de Ação */}
      <div className="mt-4 text-center z-10 max-w-md">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300/60 text-amber-900 dark:text-amber-200 font-semibold text-sm shadow-sm transition-all duration-300">
          <Smile className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>{mensagemAtiva}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          (Clique na casinha para abrir/fechar a porta e ver o acolhimento!)
        </p>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6">
        {estatisticas.map((est, i) => {
          const Icone = est.icone
          return (
            <div
              key={i}
              className={`p-3.5 rounded-2xl ${est.cor} flex flex-col items-center text-center shadow-card border border-amber-200/50 transition-transform duration-200 hover:-translate-y-1`}
            >
              <Icone className="w-5 h-5 mb-1 opacity-90" />
              <span className="text-lg font-black tracking-tight">{est.valor}</span>
              <span className="text-[11px] font-medium opacity-80 leading-tight">{est.titulo}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
