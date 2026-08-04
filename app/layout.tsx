// ============================================================
// INBCA - Instituto Nilson Bispo Casinha Amarela
// Layout Raiz da Aplicação
// ============================================================

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ProvedorTema } from '@/componentes/tema/ProvedorTema'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | INBCA Casinha Amarela',
    default: 'INBCA - Instituto Nilson Bispo Casinha Amarela',
  },
  description: 'Associação Comunitária com clínica médica, exames, terapias, psicoterapias e esportes inclusivos (Karatê, Zumba, Capoeira, Boxe, Kickboxing).',
  keywords: ['INBCA', 'Casinha Amarela', 'Nilson Bispo', 'clínica médica comunitária', 'exames', 'fisioterapia', 'psicologia', 'karatê', 'zumba', 'capoeira', 'boxe', 'kickboxing'],
  authors: [{ name: 'Instituto Nilson Bispo' }],
  manifest: '/manifest.json',
}

export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#fffdf5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ProvedorTema attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ProvedorTema>
      </body>
    </html>
  )
}
