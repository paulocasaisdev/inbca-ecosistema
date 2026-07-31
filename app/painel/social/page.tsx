'use client'

import React from 'react'
import {
  HeartHandshake,
  Users,
  Plus,
  Search,
  CheckCircle,
  FileText,
  Home
} from 'lucide-react'
import { toast } from 'sonner'

export default function PaginaAssistencialSocial() {
  const familias = [
    { id: '1', chefe: 'Dona Maria Raimunda de Souza', dependentes: 4, bairro: 'Casinha Amarela', beneficio: 'Atendimento Médico & Cesta Básica', status: 'Ativo' },
    { id: '2', chefe: 'José Carlos dos Santos', dependentes: 3, bairro: 'Comunidade Nilson Bispo', beneficio: 'Karatê & Exames Periódicos', status: 'Ativo' },
    { id: '3', chefe: 'Luciana Ferreira da Silva', dependentes: 5, bairro: 'Alto do Amparo', beneficio: 'Pediatria & Psicoterapia', status: 'Ativo' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="badge-amarelo mb-2">Assistência Social & Beneficiários</div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
            Famílias Cadastradas no INBCA
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Acompanhamento social e cadastro de moradores da Casinha Amarela.
          </p>
        </div>

        <button
          onClick={() => toast.info('Formulário de cadastro social de nova família')}
          className="botao-primario text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Família</span>
        </button>
      </div>

      <div className="cartao-amarelo space-y-4">
        <div className="overflow-x-auto">
          <table className="tabela-padrao">
            <thead>
              <tr>
                <th>Chefe de Família</th>
                <th>Dependentes</th>
                <th>Bairro</th>
                <th>Programas Vinculados</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {familias.map((f) => (
                <tr key={f.id}>
                  <td className="font-bold text-slate-900 dark:text-slate-100">{f.chefe}</td>
                  <td>{f.dependentes} pessoas</td>
                  <td className="text-xs">{f.bairro}</td>
                  <td>
                    <span className="badge bg-amber-100 text-amber-900">{f.beneficio}</span>
                  </td>
                  <td><span className="badge bg-emerald-100 text-emerald-800">{f.status}</span></td>
                  <td>
                    <button onClick={() => toast.info(`Abre prontuário social de ${f.chefe}`)} className="botao-secundario text-xs py-1 px-3">
                      Ver Histórico
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
