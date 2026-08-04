'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { agendamentoSchema, AgendamentoFormData } from '@/utils/schemas';
import { formatarCNS } from '@/utils/validations';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { CheckCircle2, HeartPulse, Dumbbell, ArrowRight, ArrowLeft, Download, Home, LayoutDashboard } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ComprovanteAgendamentoPDF } from '@/components/pdf/ComprovanteAgendamentoPDF';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false, loading: () => <Button disabled variant="outline" className="w-full mt-4"><Download className="w-4 h-4 mr-2 animate-spin" /> Preparando PDF...</Button> }
);

export default function AgendamentoPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const form = useForm<AgendamentoFormData>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      categoria: '',
      servico: '',
      nome: '',
      cpf: '',
      cns: '',
      origemUBS: false,
      ubsNome: ''
    },
    mode: "onChange"
  });

  const { watch, setValue, trigger } = form;
  const servicoAtual = watch("servico");
  const origemUBS = watch("origemUBS");

  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await trigger(["categoria", "servico"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger(["nome", "cpf", "cns", "origemUBS", "ubsNome"]);
      if (valid) {
        // Enviar para API aqui no futuro
        setStep(3);
      }
    }
  };

  return (
    <div className="min-h-screen bg-inbca-50 py-10 px-4 flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-xl border-inbca-100">
        <CardHeader className="bg-inbca-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-2">
            🏡 INBCA - Agendamento Comunitário
          </CardTitle>
          <p className="text-inbca-100 text-sm">
            Passo {step} de 3 - {step === 1 ? 'Selecione o Serviço' : step === 2 ? 'Identificação do Morador' : 'Confirmação'}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleNextStep)} className="space-y-6">
              
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Selecione o tipo de atendimento:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setValue('categoria', 'CLINICA');
                        setValue('servico', 'Consulta Médica');
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all border-gray-200 hover:border-inbca-500 hover:bg-inbca-50 cursor-pointer`}
                    >
                      <HeartPulse className="w-8 h-8 text-health-600" />
                      <div className="text-left">
                        <div className="font-bold text-gray-800">Clínica Médica</div>
                        <div className="text-xs text-gray-500">Consultas e Exames com Integração SUS</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setValue('categoria', 'ESPORTE');
                        setValue('servico', 'Karatê');
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all border-gray-200 hover:border-inbca-500 hover:bg-inbca-50 cursor-pointer`}
                    >
                      <Dumbbell className="w-8 h-8 text-sports-600" />
                      <div className="text-left">
                        <div className="font-bold text-gray-800">Esportes e Lutas</div>
                        <div className="text-xs text-gray-500">Karatê, Capoeira, Boxe, Zumba</div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="pt-4 flex justify-center">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => router.push('/')}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                    >
                      Cancelar e voltar ao site
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Maria da Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <Input placeholder="000.000.000-00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cns"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cartão SUS (CNS)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="700 0000 0000 0000" 
                              {...field} 
                              onChange={(e) => {
                                const formatado = formatarCNS(e.target.value);
                                field.onChange(formatado);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="origemUBS"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium text-amber-900 cursor-pointer">
                            Este agendamento é resultado de um encaminhamento de um Posto de Saúde / UBS da rede pública?
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {origemUBS && (
                    <FormField
                      control={form.control}
                      name="ubsNome"
                      render={({ field }) => (
                        <FormItem className="animate-in fade-in slide-in-from-top-2">
                          <FormLabel>Nome do Posto de Saúde / UBS</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: UBS Pituaçu / USF Bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleNextStep}
                      className="bg-inbca-600 hover:bg-inbca-700 text-white gap-2"
                    >
                      Finalizar Agendamento
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-6 space-y-4 animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-16 h-16 text-health-600 mx-auto animate-bounce" />
                  <h2 className="text-2xl font-bold text-gray-800">Agendamento Realizado!</h2>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm inline-block text-left w-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <QRCodeSVG value={`INBCA-${form.getValues("cpf")}`} size={100} />
                    </div>

                    <div className="text-xs text-gray-500 font-semibold tracking-wider">CÓDIGO DA CONSULTA</div>
                    <div className="text-2xl font-mono font-black text-inbca-700 mb-4">INBCA-{form.getValues("cpf")?.replace(/\D/g, '').slice(0, 6) || "123456"}</div>
                    
                    <div className="space-y-2 text-sm text-gray-700 relative z-10">
                      <p className="flex justify-between border-b border-gray-100 pb-2">
                        <strong className="text-gray-500">Paciente:</strong> 
                        <span className="font-medium">{form.getValues("nome")}</span>
                      </p>
                      <p className="flex justify-between border-b border-gray-100 pb-2">
                        <strong className="text-gray-500">Serviço:</strong> 
                        <span className="font-medium text-right">{form.getValues("servico")}</span>
                      </p>
                      {form.getValues("cns") && (
                        <p className="flex justify-between border-b border-gray-100 pb-2">
                          <strong className="text-gray-500">CNS:</strong> 
                          <span className="font-mono">{form.getValues("cns")}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">Apresente este código (ou o QR Code impresso no PDF) na recepção do Instituto no dia do atendimento.</p>
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <PDFDownloadLink 
                      document={
                        <ComprovanteAgendamentoPDF 
                          codigo={`INBCA-${form.getValues("cpf")?.replace(/\D/g, '').slice(0, 6) || "123456"}`}
                          pacienteNome={form.getValues("nome")}
                          servico={form.getValues("servico")}
                          dataGeracao={new Date().toLocaleDateString('pt-BR')}
                        />
                      } 
                      fileName={`Comprovante_INBCA_${form.getValues("nome").replace(/\s/g, '_')}.pdf`}
                    >
                      {({ loading }) => (
                        <Button type="button" className="w-full bg-inbca-600 hover:bg-inbca-700 text-white gap-2 font-bold" disabled={loading}>
                          <Download className="w-4 h-4" /> {loading ? 'Gerando Comprovante...' : 'Baixar Comprovante (PDF)'}
                        </Button>
                      )}
                    </PDFDownloadLink>
                    
                    <Button type="button" variant="outline" onClick={() => { form.reset(); setStep(1); }} className="w-full text-gray-600">
                      Agendar Outro Paciente
                    </Button>

                    <div className="flex gap-3 w-full mt-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="w-full text-xs text-gray-500 gap-1.5 hover:bg-gray-100" 
                        onClick={() => router.push('/')}
                      >
                        <Home className="w-4 h-4" /> Site
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="w-full text-xs text-gray-500 gap-1.5 hover:bg-gray-100" 
                        onClick={() => router.push('/painel')}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Painel Admin
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
