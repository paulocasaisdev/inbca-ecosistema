'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Users, Calendar, WifiOff, Wifi, AlertTriangle } from "lucide-react";

const ALUNOS_MOCK = [
  { id: '1', nome: 'Lucas Oliveira', atestado: true, diasAtestado: 30 },
  { id: '2', nome: 'Beatriz Santos', atestado: true, diasAtestado: 380 }, // Vencido (> 12 meses)
  { id: '3', nome: 'Gabriel Souza', atestado: false, diasAtestado: 0 },
  { id: '4', nome: 'Ana Clara Lima', atestado: true, diasAtestado: 200 },
];

export default function ChamadaPresencaPage() {
  const [presencas, setPresencas] = useState<Record<string, boolean>>({});
  const [isOffline, setIsOffline] = useState(false);
  const [pendingSync, setPendingSync] = useState(false);

  useEffect(() => {
    // Restaurar do localStorage (Offline-first approach)
    const saved = localStorage.getItem('chamada_pendente');
    if (saved) {
      setPresencas(JSON.parse(saved));
      setPendingSync(true);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Se voltar online e tiver dados pendentes, sincronizar (simulação)
    if (!isOffline && pendingSync) {
      setTimeout(() => {
        alert("Sincronização Automática: A conexão voltou e as presenças foram gravadas no servidor oficial!");
        localStorage.removeItem('chamada_pendente');
        setPendingSync(false);
      }, 1000);
    }
  }, [isOffline, pendingSync]);

  const togglePresenca = (id: string, status: boolean) => {
    setPresencas(prev => {
      const newSt = { ...prev, [id]: status };
      // Salva localmente a cada mudança para não perder dados caso feche a aba sem internet
      localStorage.setItem('chamada_pendente', JSON.stringify(newSt));
      setPendingSync(true);
      return newSt;
    });
  };

  const handleSalvar = () => {
    if (isOffline) {
      alert("Você está sem internet! A chamada foi salva no seu dispositivo e será sincronizada automaticamente quando o Wi-Fi/4G voltar.");
    } else {
      alert("Chamada salva diretamente no banco de dados!");
      localStorage.removeItem('chamada_pendente');
      setPendingSync(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4 bg-slate-50 min-h-screen pb-20">
      
      {/* Aviso de Modo Offline */}
      {isOffline && (
        <div className="bg-red-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-md animate-pulse">
          <WifiOff className="w-5 h-5" /> Sem Internet - Modo Offline Ativo
        </div>
      )}
      {!isOffline && pendingSync && (
        <div className="bg-amber-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-md">
          <Wifi className="w-5 h-5" /> Sincronizando dados pendentes...
        </div>
      )}

      <Card className="border-sports-500 shadow-md">
        <CardHeader className="bg-sports-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5" /> Chamada: Karatê Infantil
            </CardTitle>
            <span className="text-xs bg-sports-700 px-2 py-1 rounded">Seg / Qua</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-sports-100 mt-1">
            <Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('pt-BR')}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 space-y-3">
          {ALUNOS_MOCK.map((aluno) => {
            const isPresente = presencas[aluno.id] === true;
            const isAusente = presencas[aluno.id] === false;
            const atestadoVencido = aluno.atestado && aluno.diasAtestado > 365;

            return (
              <div 
                key={aluno.id}
                className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm"
              >
                <div>
                  <div className="font-bold text-slate-800 text-sm">{aluno.nome}</div>
                  
                  {/* Regra de Negócio: Atestados */}
                  {!aluno.atestado && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 mt-1 w-max">
                      <AlertTriangle className="w-3 h-3" /> Atestado Pendente
                    </span>
                  )}
                  {atestadoVencido && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-1 mt-1 w-max">
                      <AlertTriangle className="w-3 h-3" /> Atestado Vencido (+12m)
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => togglePresenca(aluno.id, true)}
                    className={`p-2 rounded-lg transition-all ${
                      isPresente ? 'bg-health-600 text-white shadow ring-2 ring-health-300 ring-offset-1' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => togglePresenca(aluno.id, false)}
                    className={`p-2 rounded-lg transition-all ${
                      isAusente ? 'bg-red-600 text-white shadow ring-2 ring-red-300 ring-offset-1' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}

          <Button 
            onClick={handleSalvar}
            className="w-full mt-4 bg-sports-600 hover:bg-sports-700 text-white font-bold h-12"
          >
            Salvar Presença da Turma
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
