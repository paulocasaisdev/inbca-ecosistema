'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Stethoscope,
  Brain,
  Dumbbell,
  HeartHandshake,
  Gift,
  ChevronLeft,
  Sun,
  Moon,
  Home,
  LogOut,
  Bell,
  Sparkles,
  Users
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface ItemNavegacao {
  rotulo: string
  href: string
  icone: React.ElementType
  badge?: string
}

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: 'Painel Geral',           href: '/painel',                     icone: LayoutDashboard },
  { rotulo: 'Clínica & Exames',       href: '/painel/clinica',             icone: Stethoscope, badge: 'Hoje' },
  { rotulo: 'Terapias & Psicoterapia',href: '/painel/terapias',            icone: Brain },
  { rotulo: 'Esportes & Lutas',       href: '/painel/esportes-terapias',   icone: Dumbbell, badge: 'Karate/Zumba' },
  { rotulo: 'Assistência & Famílias', href: '/painel/social',              icone: HeartHandshake },
  { rotulo: 'Equipe & Perfis',        href: '/painel/usuarios',            icone: Users, badge: '6 Categorias' },
  { rotulo: 'Voluntários & Doações',  href: '/painel/voluntarios',         icone: Gift },
]

export function BarraLateralINBC() {
  const caminho = usePathname()
  const roteador = useRouter()
  const [recolhida, setRecolhida] = useState(false)
  const { theme, setTheme } = useTheme()
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  return (
    <aside
      className={`
        flex flex-col h-screen bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-amber-200/70 dark:border-amber-900/40 text-slate-700 dark:text-slate-200 transition-all duration-300
        ${recolhida ? 'w-20' : 'w-72'}
        fixed left-0 top-0 z-30 shadow-glass
      `}
    >
      {/* Cabeçalho da Barra Lateral com a Casinha Amarela */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-amber-100 dark:border-amber-900/40">
        {!recolhida && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Home className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 dark:text-amber-300 leading-tight">INBCA</h1>
              <p className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                Casinha Amarela
              </p>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-1 ml-auto">
          {montado && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
            </button>
          )}

          <button
            onClick={() => setRecolhida(!recolhida)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${recolhida ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {itensNavegacao.map((item) => {
          const ativo = item.href === '/painel'
            ? caminho === '/painel'
            : caminho === item.href || caminho.startsWith(item.href + '/')
          const Icone = item.icone

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${ativo
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow-soft'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800/60 hover:text-amber-900 dark:hover:text-amber-300'
                }
                ${recolhida ? 'justify-center mx-1' : ''}
              `}
              title={recolhida ? item.rotulo : undefined}
            >
              <Icone className={`w-5 h-5 flex-shrink-0 ${ativo ? 'text-slate-950' : 'text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform'}`} />
              {!recolhida && (
                <span className="text-xs font-bold tracking-tight">{item.rotulo}</span>
              )}

              {!recolhida && item.badge && (
                <span className={`ml-auto text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${ativo ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé da Barra Lateral */}
      <div className="p-3 border-t border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-slate-950/40 space-y-2">
        <Link
          href="/"
          className={`
            flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors
            ${recolhida ? 'justify-center' : ''}
          `}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          {!recolhida && <span>Ver Portal Público</span>}
        </Link>

        <button
          onClick={() => roteador.push('/')}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors
            ${recolhida ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          {!recolhida && <span>Sair do Painel</span>}
        </button>
      </div>
    </aside>
  )
}
