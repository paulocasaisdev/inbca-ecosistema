-- CreateEnum
CREATE TYPE "NivelRisco" AS ENUM ('BAIXO', 'MEDIO', 'ALTO', 'EXTREMO');

-- CreateEnum
CREATE TYPE "EspecialidadeType" AS ENUM ('MEDICINA_GERAL', 'PEDIATRIA', 'PSICOLOGIA', 'PSICOTERAPIA', 'FISIOTERAPIA', 'EXAME_LABORATORIAL', 'EXAME_IMAGEM', 'KARATE', 'CAPOEIRA', 'BOXE', 'KICKBOXING', 'ZUMBA');

-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'REALIZADO', 'CANCELADO', 'FALTOU');

-- CreateTable
CREATE TABLE "Familia" (
    "id" TEXT NOT NULL,
    "codigoCadBCA" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL DEFAULT 'Comunidade',
    "rendaFamiliar" DECIMAL(10,2),
    "vulnerabilidade" "NivelRisco" NOT NULL DEFAULT 'MEDIO',
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Morador" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cns" TEXT,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "genero" TEXT,
    "familiaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Morador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialista" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "registroProf" TEXT NOT NULL,
    "especialidade" "EspecialidadeType" NOT NULL,

    CONSTRAINT "Especialista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL,
    "codigoCodigo" TEXT NOT NULL,
    "moradorId" TEXT NOT NULL,
    "especialistaId" TEXT,
    "tipoServico" "EspecialidadeType" NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',
    "origemUBS" BOOLEAN NOT NULL DEFAULT false,
    "ubsOrigemNome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prontuario" (
    "id" TEXT NOT NULL,
    "agendamentoId" TEXT NOT NULL,
    "moradorId" TEXT NOT NULL,
    "especialistaId" TEXT NOT NULL,
    "pressaoArterial" TEXT,
    "glicemia" INTEGER,
    "peso" DECIMAL(5,2),
    "altura" DECIMAL(3,2),
    "anamnese" TEXT NOT NULL,
    "diagnostico" TEXT,
    "prescricao" TEXT,
    "encaminhamentoSUS" TEXT,
    "dataAtendimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroPICS" (
    "id" TEXT NOT NULL,
    "moradorId" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "dataSessao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistroPICS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "modalidade" "EspecialidadeType" NOT NULL,
    "instrutorId" TEXT NOT NULL,
    "diasSemana" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "capacidadeMax" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatriculaTurma" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "moradorId" TEXT NOT NULL,
    "atestadoMedico" BOOLEAN NOT NULL DEFAULT false,
    "dataMatricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatriculaTurma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequencia" (
    "id" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "dataAula" TIMESTAMP(3) NOT NULL,
    "presentesIds" TEXT[],

    CONSTRAINT "Frequencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Familia_codigoCadBCA_key" ON "Familia"("codigoCadBCA");

-- CreateIndex
CREATE UNIQUE INDEX "Morador_cpf_key" ON "Morador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_codigoCodigo_key" ON "Agendamento"("codigoCodigo");

-- AddForeignKey
ALTER TABLE "Morador" ADD CONSTRAINT "Morador_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "Morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_especialistaId_fkey" FOREIGN KEY ("especialistaId") REFERENCES "Especialista"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "Morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuario" ADD CONSTRAINT "Prontuario_especialistaId_fkey" FOREIGN KEY ("especialistaId") REFERENCES "Especialista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroPICS" ADD CONSTRAINT "RegistroPICS_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "Morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Especialista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatriculaTurma" ADD CONSTRAINT "MatriculaTurma_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatriculaTurma" ADD CONSTRAINT "MatriculaTurma_moradorId_fkey" FOREIGN KEY ("moradorId") REFERENCES "Morador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequencia" ADD CONSTRAINT "Frequencia_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
