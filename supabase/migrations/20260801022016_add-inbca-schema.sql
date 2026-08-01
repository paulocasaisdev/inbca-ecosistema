-- ============================================================
-- INBCA - Schema do Banco de Dados PostgreSQL
-- Instituto Nilson Bispo Casinha Amarela
-- ============================================================

-- ============================================================
-- TABELA: moradores
-- ============================================================
CREATE TABLE IF NOT EXISTS moradores (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              TEXT NOT NULL,
  cpf               TEXT UNIQUE NOT NULL,
  telefone          TEXT NOT NULL,
  email             TEXT,
  data_nascimento   DATE,
  numero_cartao_sus TEXT NOT NULL,
  bairro            TEXT NOT NULL,
  endereco          TEXT NOT NULL,
  numero_dependentes INT DEFAULT 0,
  beneficios_ativos TEXT[] DEFAULT '{}',
  status            TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: voluntarios
-- ============================================================
CREATE TABLE IF NOT EXISTS voluntarios (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              TEXT NOT NULL,
  categoria         TEXT NOT NULL CHECK (categoria IN ('medico', 'psicologo', 'instrutor', 'terapeuta_fisioterapeuta', 'enfermeiro', 'advogado')),
  registro_profissional TEXT, -- CRM, COREN, CRP, CREF, OAB, etc.
  especialidade_ou_funcao TEXT NOT NULL,
  telefone          TEXT NOT NULL,
  email             TEXT NOT NULL,
  cor_agenda        TEXT DEFAULT '#FBBF24',
  duracao_atendimento_minutos INT DEFAULT 30,
  ativo             BOOLEAN NOT NULL DEFAULT true,
  horarios_trabalho JSONB DEFAULT '{}',
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: agendamentos_sociais
-- ============================================================
CREATE TABLE IF NOT EXISTS agendamentos_sociais (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  morador_id        UUID NOT NULL REFERENCES moradores(id) ON DELETE CASCADE,
  morador_nome      TEXT NOT NULL,
  morador_sus       TEXT NOT NULL,
  tipo              TEXT NOT NULL CHECK (tipo IN ('Consulta', 'Exame', 'Terapia', 'Esporte')),
  modalidade_ou_especialidade TEXT NOT NULL,
  voluntario_id     UUID NOT NULL REFERENCES voluntarios(id) ON DELETE CASCADE,
  voluntario_nome   TEXT NOT NULL,
  data              DATE NOT NULL,
  hora              TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'agendado' CHECK (status IN ('confirmado', 'agendado', 'realizado', 'cancelado', 'faltou')),
  observacoes       TEXT,
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: fila_espera
-- ============================================================
CREATE TABLE IF NOT EXISTS fila_espera (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  morador_id        UUID NOT NULL REFERENCES moradores(id) ON DELETE CASCADE,
  morador_nome      TEXT NOT NULL,
  morador_telefone  TEXT NOT NULL,
  tipo_servico      TEXT NOT NULL CHECK (tipo_servico IN ('Consulta', 'Exame', 'Terapia', 'Esporte')),
  modalidade_ou_especialidade TEXT NOT NULL,
  prioridade        INT NOT NULL DEFAULT 1 CHECK (prioridade IN (1, 2, 3)), -- 1=Baixa, 2=Média, 3=Alta
  status            TEXT NOT NULL DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'notificado', 'encaixado', 'desistiu')),
  observacoes       TEXT,
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: automacoes_sociais
-- ============================================================
CREATE TABLE IF NOT EXISTS automacoes_sociais (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              TEXT NOT NULL,
  evento_gatilho    TEXT NOT NULL CHECK (evento_gatilho IN ('agendamento_criado', 'lembrete_24h', 'vaga_liberada', 'comunicado_geral')),
  ativa             BOOLEAN NOT NULL DEFAULT true,
  mensagem_template TEXT NOT NULL,
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDICES DE PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_moradores_cpf ON moradores(cpf);
CREATE INDEX IF NOT EXISTS idx_moradores_nome ON moradores(nome);
CREATE INDEX IF NOT EXISTS idx_agendamentos_data ON agendamentos_sociais(data);
CREATE INDEX IF NOT EXISTS idx_fila_prioridade ON fila_espera(prioridade);
