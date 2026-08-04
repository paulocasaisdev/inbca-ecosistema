# Guia do Desenvolvedor - INBCA Ecossistema

Este documento destina-se aos desenvolvedores e engenheiros de software que irão manter e expandir o Ecossistema INBCA.

## 1. Stack Tecnológica
O projeto foi construído utilizando as mais modernas tecnologias do ecossistema JavaScript/TypeScript:
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes de UI:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Banco de Dados (ORM):** [Prisma](https://www.prisma.io/)
- **Ícones:** [Lucide React](https://lucide.dev/)

## 2. Configuração do Ambiente Local

### Pré-requisitos
- Node.js (v18+)
- Banco de Dados PostgreSQL rodando localmente ou em nuvem (ex: Supabase, Vercel Postgres, Neon)

### Passos para Inicialização
1. **Instalar Dependências:**
   ```bash
   npm install
   ```

2. **Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto contendo a URL de conexão do PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/inbca?schema=public"
   ```

3. **Configurar Banco de Dados:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(O comando `db push` criará as tabelas no banco de dados sincronizando com o `schema.prisma`)*

4. **Executar o Projeto:**
   ```bash
   npm run dev
   ```

## 3. Estrutura de Diretórios
- `/app`: Páginas da aplicação usando a arquitetura App Router do Next.js.
  - `/app/agendamento`: Portal público/comunitário de marcações.
  - `/app/painel`: Área restrita para médicos, instrutores e recepção.
- `/components/ui`: Componentes isolados e reutilizáveis gerados pelo shadcn (Button, Card, Input, etc).
- `/prisma`: Contém o arquivo `schema.prisma` com a modelagem do banco de dados.
- `/utils`: Funções utilitárias (ex: `validations.ts` para validar cartões SUS e CPFs).
- `/lib`: Configurações de bibliotecas externas (ex: `utils.ts` do Tailwind).

## 4. Padrões de Código e Design System
- **Cores:** As cores oficiais (Inbca Amarelo, Health Verde, Sports Laranja) estão definidas no `tailwind.config.ts`. Utilize classes como `bg-inbca-600`, `text-health-700`, etc.
- **Validações:** Sempre utilize o módulo `/utils/validations.ts` ao lidar com entrada de documentos oficiais (como CNS).
- **Componentes:** Sempre dê preferência aos componentes do diretório `@/components/ui/` ao invés de criar botões ou inputs do zero com HTML puro. Isso mantém a consistência visual.
