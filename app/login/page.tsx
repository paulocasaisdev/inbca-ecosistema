'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { logIn } from './actions'
import { Shield, Home, Loader2, Heart } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PaginaLogin() {
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(formData: FormData) {
    setCarregando(true)
    setErro('')
    
    const res = await logIn(formData)
    
    if (res?.error) {
      setErro(res.error)
      toast.error(res.error)
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdf5] flex flex-col justify-center items-center p-4">
      
      {/* Botão de Voltar */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link href="/">
          <Button variant="ghost" className="text-amber-800 hover:text-amber-900 hover:bg-amber-100">
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Site
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Shield className="w-24 h-24" />
          </div>
          <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
          <h1 className="text-2xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-amber-50">Instituto Nilson Bispo Casinha Amarela</p>
        </div>

        <div className="p-8">
          <form action={handleSubmit} className="space-y-6">
            
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                {erro}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-950 font-semibold">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@casinhaamarela.com.br"
                required
                className="w-full rounded-xl border-amber-200 focus-visible:ring-amber-500 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-950 font-semibold">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-xl border-amber-200 focus-visible:ring-amber-500 h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-md transition-all hover:scale-[1.02]"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-amber-700/60 max-w-sm">
        <p>Acesso restrito a colaboradores autorizados do Instituto.</p>
        <p className="mt-2">Todos os acessos são registrados e monitorados.</p>
      </div>

    </div>
  )
}
