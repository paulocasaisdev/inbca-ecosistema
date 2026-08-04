import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

export default function ProntuarioSocialPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-inbca-600" /> Prontuário Social da Família
          </h1>
          <p className="text-sm text-slate-500">Gestão de Vulnerabilidade e Assistência Comunitária</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-sm text-slate-500 flex justify-between">
              Extrema Vulnerabilidade <AlertTriangle className="w-4 h-4 text-red-500" />
            </CardTitle>
            <p className="text-3xl font-bold text-slate-800">12 Famílias</p>
          </CardHeader>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-sm text-slate-500 flex justify-between">
              Alta Vulnerabilidade <TrendingDown className="w-4 h-4 text-amber-500" />
            </CardTitle>
            <p className="text-3xl font-bold text-slate-800">45 Famílias</p>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-sm text-slate-500 flex justify-between">
              Assistidas no Mês <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </CardTitle>
            <p className="text-3xl font-bold text-slate-800">28 Famílias</p>
          </CardHeader>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-white border-b border-slate-100">
          <CardTitle className="text-lg">Fila de Prioridade (Mutirão de Cestas Básicas)</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-medium">Código CadBCA</th>
                <th className="p-4 font-medium">Chefe de Família</th>
                <th className="p-4 font-medium">Membros</th>
                <th className="p-4 font-medium">Renda Per Capita</th>
                <th className="p-4 font-medium">Risco</th>
                <th className="p-4 font-medium">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-700">CAD-2026-0042</td>
                <td className="p-4">Maria da Silva Santos</td>
                <td className="p-4">5</td>
                <td className="p-4 text-red-600 font-bold">R$ 120,00</td>
                <td className="p-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">EXTREMO</span></td>
                <td className="p-4"><button className="text-inbca-600 font-bold hover:underline">Ver Prontuário</button></td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-700">CAD-2026-0105</td>
                <td className="p-4">José Pereira Almeida</td>
                <td className="p-4">3</td>
                <td className="p-4 text-amber-600 font-bold">R$ 350,00</td>
                <td className="p-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">ALTO</span></td>
                <td className="p-4"><button className="text-inbca-600 font-bold hover:underline">Ver Prontuário</button></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
