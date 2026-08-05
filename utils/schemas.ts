import { z } from 'zod';
import { validarCNS } from './validations';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

export const agendamentoSchema = z.object({
  categoria: z.string().min(1, 'Selecione uma categoria'),
  servico: z.string().min(1, 'Selecione um serviço'),
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cpf: z.string().regex(cpfRegex, 'Formato de CPF inválido. Use 000.000.000-00'),
  cns: z.string()
    .min(15, 'O CNS deve ter no mínimo 15 caracteres')
    .refine((val) => {
      const clean = val.replace(/\D/g, '');
      if (clean.length === 0) return true; // Se for opcional na UI, deixamos passar ou não. Neste caso, é obrigatório na refatoração.
      return validarCNS(clean);
    }, { message: 'Cartão Nacional de Saúde (CNS) inválido' }),
  origemUBS: z.boolean(),
  ubsNome: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.origemUBS && (!data.ubsNome || data.ubsNome.trim().length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O nome da UBS é obrigatório se for um encaminhamento",
      path: ["ubsNome"],
    });
  }
});

export type AgendamentoFormData = z.infer<typeof agendamentoSchema>;

export const prontuarioSchema = z.object({
  pressaoArterial: z.string().optional(),
  glicemia: z.coerce.number().optional(),
  peso: z.coerce.number().optional(),
  altura: z.coerce.number().optional(),
  anamnese: z.string().min(10, 'A anamnese deve conter um descritivo maior (mínimo 10 caracteres)'),
  diagnostico: z.string().optional(),
  prescricao: z.string().optional(),
  encaminhamentoSUS: z.string().optional()
});

export type ProntuarioFormData = z.infer<typeof prontuarioSchema>;
