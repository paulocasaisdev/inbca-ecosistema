# Arquitetura e Regras de Negócio

Este documento descreve as decisões de arquitetura e as regras de negócio embutidas no Banco de Dados (Prisma) e nas lógicas do Ecossistema INBCA.

## 1. Divisão Organizacional do Banco de Dados
A modelagem do Prisma reflete a estrutura física e social da ONG.

- **Assistência Social & Famílias:**
  Toda pessoa registrada é um `Morador`. Moradores são agrupados em uma `Familia`. A família detém a classificação de `vulnerabilidade` (BAIXO, MEDIO, ALTO, EXTREMO) e o `codigoCadBCA` que unifica os cadastros. 
  *Regra:* O impacto financeiro e social é medido por Família, não apenas por indivíduo.

- **Núcleo de Saúde & SUS:**
  Um `Agendamento` é o gatilho principal. Ele une um `Morador` a um `Especialista`. Caso a consulta aconteça, gera-se um `Prontuario` que registra a conduta e os sinais vitais. Se for Prática Integrativa (Acupuntura, Reiki), gera-se um `RegistroPICS`.

- **Núcleo de Esportes:**
  Baseado no modelo de `Turma` (Ex: Karatê Seg/Qua). Os moradores possuem uma `MatriculaTurma` (que controla a pendência de atestado médico). A assiduidade é gerada pelas entidades de `Frequencia`.

## 2. Regra de Validação do CNS (Cartão SUS)
O algoritmo oficial do Ministério da Saúde foi implementado na camada utilitária. 
O CNS possui 15 dígitos. Para cartões que começam com 1, 2, 7, 8 ou 9, aplica-se o cálculo de **Módulo 11**, onde a soma ponderada dos dígitos de 1 a 15 deve resultar em um múltiplo de 11. 
*Objetivo:* Evitar falhas de digitação na recepção, assegurando que o dado cruzado futuramente com o e-SUS seja válido.

## 3. Segurança e Auditoria de Prontuários
Os registros na tabela `Prontuario` recebem a carimbo de data (`dataAtendimento`) no momento da criação. Seguindo normas médicas (CFM), dados assinados em prontuários eletrônicos não devem ser apagados. Futuramente, deve-se implementar "Soft Delete" ou anexos retificadores, ao invés de usar exclusões SQL do tipo `DELETE`.

## 4. Integrações Futuras Previstas
- **e-SUS / SISAB:** O campo `encaminhamentoSUS` no Prontuário foi desenhado para facilitar a exportação de dados estatísticos (Produção Ambulatorial) para os sistemas da Prefeitura/Estado, o que auxilia na captação de emendas parlamentares e convênios governamentais.
- **Relatório de Impacto:** O cruzamento das tabelas `Frequencia` (Esportes) + `NivelRisco` (Família) + `Prontuario` (Saúde) permitirá medir como o acesso ao esporte está reduzindo queixas clínicas em populações de Alta Vulnerabilidade.
