'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { prontuarioSchema, ProntuarioFormData } from '@/utils/schemas';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Save, Printer, Stethoscope } from "lucide-react";
import dynamic from 'next/dynamic';
import { ReceituarioDoc } from '@/components/pdf/ReceituarioPDF';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false, loading: () => <Button disabled variant="outline" className="gap-2 text-slate-600"><Printer className="w-4 h-4 animate-spin" /> Gerando PDF...</Button> }
);

export default function ProntuarioMedicoPage() {
  const form = useForm<ProntuarioFormData>({
    resolver: zodResolver(prontuarioSchema),
    defaultValues: {
      pressaoArterial: '',
      glicemia: undefined,
      peso: undefined,
      altura: undefined,
      anamnese: '',
      diagnostico: '',
      prescricao: '',
      encaminhamentoSUS: ''
    }
  });

  const onSubmit = (data: ProntuarioFormData) => {
    console.log("Prontuário Salvo:", data);
    // Enviar dados para API (Server Actions)
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Stethoscope className="text-health-600" /> Prontuário Médico Eletrônico (PEP)
          </h1>
          <p className="text-xs text-slate-500">INBCA - Atenção Primária & Terapias Integrativas</p>
        </div>
        <div className="flex gap-2">
          <PDFDownloadLink 
            document={
              <ReceituarioDoc 
                pacienteNome="Maria da Silva Santos" 
                cns="702 4019 8231 0004" 
                prescricao={form.watch("prescricao") || ""} 
                data={new Date().toLocaleDateString('pt-BR')} 
              />
            } 
            fileName="Receita_INBCA_MariaSilva.pdf"
          >
            {({ blob, url, loading, error }) => (
              <Button variant="outline" className="gap-2 text-slate-600" disabled={loading}>
                <Printer className="w-4 h-4" /> {loading ? 'Carregando...' : 'Imprimir Receita'}
              </Button>
            )}
          </PDFDownloadLink>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            className="bg-health-600 hover:bg-health-700 text-white gap-2"
          >
            <Save className="w-4 h-4" /> Salvar Atendimento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-slate-200">
          <CardHeader className="bg-slate-100">
            <CardTitle className="text-sm font-bold text-slate-700">Identificação do Paciente</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">NOME</span>
              <strong className="text-slate-800">Maria da Silva Santos</strong>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">CARTÃO SUS (CNS)</span>
              <span className="font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                702 4019 8231 0004
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">DATA NASCIMENTO</span>
              <span>14/08/1982</span>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 block">CÓDIGO CADBCA</span>
              <span className="font-mono text-inbca-700 font-bold">CAD-2026-0042</span>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader className="py-3 bg-slate-50">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-600">Sinais Vitais & Triagem</CardTitle>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="pressaoArterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-600">PA (mmHg)</FormLabel>
                        <FormControl>
                          <Input placeholder="120/80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="glicemia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-600">Glicemia (mg/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="95" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="peso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-600">Peso (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="68.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="altura"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-slate-600">Altura (m)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="1.65" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="anamnese"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Anamnese / Queixa Principal</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Descreva os sintomas, histórico recente e observações..." className="h-24" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prescricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Conduta Médica & Prescrição</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Medicamentos receitados, orientações clínicas..." className="h-24" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="encaminhamentoSUS"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Encaminhamento para Rede SUS / Especialidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Encaminhado para Cardiólogo via USF de referência..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
