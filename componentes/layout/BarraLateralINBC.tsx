'use client'
// ============================================================
// INBCA - Barra Lateral & Header Responsivo Mobile
// Instituto Nilson Bispo Casinha Amarela
// ============================================================

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Calendar, Stethoscope, Brain, Dumbbell,
  HeartHandshake, Gift, ChevronLeft, Sun, Moon, Home,
  LogOut, Bell, Sparkles, Users, Scale, Settings, Menu, X, BarChart3, History
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

interface BarraLateralProps {
  userRole?: string
  userName?: string
}

interface ItemNavegacao {
  rotulo: string
  href: string
  icone: React.ElementType
  badge?: string
  roles?: string[]
}

const ALL_ROLES = ['ADMIN', 'RECEPCAO', 'MEDICO', 'ASSISTENTE_SOCIAL', 'INSTRUTOR']

const itensNavegacao: ItemNavegacao[] = [
  { rotulo: 'Painel Geral',           href: '/painel',                     icone: LayoutDashboard, roles: ALL_ROLES },
  { rotulo: 'Agenda Interna',         href: '/painel/agenda',              icone: Calendar, badge: 'Grade', roles: ALL_ROLES },
  { rotulo: 'Clínica & Exames',       href: '/painel/clinica',             icone: Stethoscope, badge: 'Hoje', roles: ['ADMIN', 'RECEPCAO', 'MEDICO'] },
  { rotulo: 'Terapias & Psicoterapia',href: '/painel/terapias',            icone: Brain, roles: ['ADMIN', 'RECEPCAO', 'MEDICO', 'ASSISTENTE_SOCIAL'] },
  { rotulo: 'Esportes & Saúde',       href: '/painel/esportes-terapias',   icone: Dumbbell, badge: 'Saúde & Lutas', roles: ['ADMIN', 'RECEPCAO', 'INSTRUTOR'] },
  { rotulo: 'Assistência & Famílias', href: '/painel/social',              icone: HeartHandshake, roles: ['ADMIN', 'RECEPCAO', 'ASSISTENTE_SOCIAL'] },
  { rotulo: 'Assistência Jurídica',   href: '/painel/juridico',            icone: Scale, badge: 'Gratuito', roles: ['ADMIN', 'RECEPCAO'] },
  { rotulo: 'Equipe & Perfis',        href: '/painel/usuarios',            icone: Users, badge: '6 Categorias', roles: ['ADMIN'] },
  { rotulo: 'Voluntários & Doações',  href: '/painel/voluntarios',         icone: Gift, roles: ['ADMIN', 'RECEPCAO'] },
  { rotulo: 'Relatórios & Dados',     href: '/painel/relatorios',          icone: BarChart3, badge: 'Indicadores', roles: ['ADMIN'] },
  { rotulo: 'Logs de Auditoria',      href: '/painel/auditoria',           icone: History, badge: 'Segurança', roles: ['ADMIN'] },
  { rotulo: 'Configurações',          href: '/painel/configuracoes',       icone: Settings, roles: ['ADMIN'] },
]

export function BarraLateralINBC({ userRole = 'RECEPCAO', userName = 'Usuário' }: BarraLateralProps) {
  const caminho = usePathname()
  const roteador = useRouter()
  const [recolhida, setRecolhida] = useState(false)
  const [abertoMobile, setAbertoMobile] = useState(false)
  const { theme, setTheme } = useTheme()
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  // Fechar gaveta no mobile ao mudar de página
  useEffect(() => {
    setAbertoMobile(false)
  }, [caminho])

  return (
    <>
      {/* ── Top Bar Fixo para Mobile (Screens < lg) ──────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-200/80 dark:border-amber-900/40 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/painel" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xs">
            <Home className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 dark:text-amber-300 leading-tight">INBCA</h1>
            <p className="text-[9px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              Casinha Amarela
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {montado && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-500 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors"
              title="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
            </button>
          )}

          <button
            onClick={() => setAbertoMobile(!abertoMobile)}
            className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold transition-transform hover:scale-105"
            aria-label="Abrir Menu"
          >
            {abertoMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── Backdrop Overlay no Mobile ───────────────────────────── */}
      {abertoMobile && (
        <div
          onClick={() => setAbertoMobile(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* ── Aside Principal (Off-canvas no Mobile, Pinned no Desktop) ── */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-amber-200/70 dark:border-amber-900/40 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-xl
          ${recolhida ? 'lg:w-20' : 'lg:w-72'}
          ${abertoMobile ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Cabeçalho da Barra Lateral */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-amber-100 dark:border-amber-900/40">
          {(!recolhida || abertoMobile) && (
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
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
                title="Alternar Tema"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-600" />}
              </button>
            )}

            <button
              onClick={() => setRecolhida(!recolhida)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${recolhida ? 'rotate-180' : ''}`} />
            </button>

            {/* Fechar gaveta no mobile */}
            <button
              onClick={() => setAbertoMobile(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {itensNavegacao.filter(item => item.roles?.includes(userRole)).map((item) => {
            const ativo = item.href === '/painel'
              ? caminho === '/painel'
              : caminho === item.href || caminho.startsWith(item.href + '/')
            const Icone = item.icone

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 group relative
                  ${ativo
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800/60 hover:text-amber-950 dark:hover:text-amber-300 font-bold'
                  }
                  ${recolhida && !abertoMobile ? 'justify-center mx-1 px-0' : ''}
                `}
                title={recolhida && !abertoMobile ? item.rotulo : undefined}
              >
                <Icone className={`w-5 h-5 flex-shrink-0 ${ativo ? 'text-slate-950' : 'text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform'}`} />
                {(!recolhida || abertoMobile) && (
                  <span className="text-xs font-bold tracking-tight">{item.rotulo}</span>
                )}

                {(!recolhida || abertoMobile) && item.badge && (
                  <span className={`ml-auto text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${ativo ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-300'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Rodapé da Barra Lateral */}
        <div className="p-3 border-t border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-slate-950/40 space-y-2">
          
          {(!recolhida || abertoMobile) && (
            <div className="px-3 mb-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-900 flex items-center justify-center text-amber-800 dark:text-amber-200 font-bold text-xs">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{userName}</span>
                <span className="text-[10px] text-slate-500 uppercase">{userRole}</span>
              </div>
            </div>
          )}

          <Link
            href="/"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors
              ${recolhida && !abertoMobile ? 'justify-center' : ''}
            `}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            {(!recolhida || abertoMobile) && <span>Ver Portal Público</span>}
          </Link>

          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signOut()
              roteador.push('/login')
              roteador.refresh()
            }}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors
              ${recolhida && !abertoMobile ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            {(!recolhida || abertoMobile) && <span>Sair do Painel</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
