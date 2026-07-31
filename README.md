# 🏡 INBCA - Instituto Nilson Bispo Casinha Amarela

Ecossistema digital da associação comunitária **INBCA - Instituto Nilson Bispo Casinha Amarela**, voltado para a gestão integrada de clínica médica comunitária (agendamento e realização de consultas e exames), serviços de terapias integrativas (psicologia, psicoterapia e fisioterapia) e práticas esportivas inclusivas (**Karatê, Zumba, Capoeira, Boxe e Kickboxing**).

---

## 🚀 Funcionalidades Principais

- **Portal Público Interativo (`/`)**:
  - Apresentação da associação com o componente interativo **Casinha Amarela Animada** (SVG animado com chaminé, raios de sol, janelas com iluminação pulsante e coração comunitário).
  - Vitrine de serviços médicos, exames de imagem/laboratoriais, terapias e modalidades esportivas.
  - Indicadores de impacto social e histórias do Instituto.

- **Portal de Agendamento Comunitário (`/agendamento`)**:
  - Marcação pública de consultas médicas, exames, terapias e aulas esportivas com emissão de comprovante e código único (`INBCA-XXXXXX`).

- **Painel Administrativo (`/painel`)**:
  - Dashboard de Métricas Comunitárias (Consultas, Exames, Praticantes de Esportes/Lutas e Sessões Terapêuticas).
  - **Clínica & Exames (`/painel/clinica`)**: Marcação, lista de chamada e prontuários médicos.
  - **Esportes & Terapias (`/painel/esportes-terapias`)**: Gestão de turmas de Karatê, Zumba, Capoeira, Boxe, Kickboxing, Fisioterapia e Psicoterapia com chamada de presença diária.
  - **Assistência Social & Famílias (`/painel/social`)**: Cadastro de famílias beneficiadas.
  - **Voluntários & Doações (`/painel/voluntarios`)**: Gestão de apoiadores e campanhas de arrecadação.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **React 18** & **TypeScript**
- **Tailwind CSS** (Tema customizado em Amarelo Claro e Âmbar Quente)
- **Lucide React** (Ícones)
- **Sonner** (Notificações Toast)
- **Next Themes** (Suporte ao Modo Claro e Escuro)

---

## 💻 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/inbca-ecosistema.git
cd inbca-ecosistema
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador em `http://localhost:3000` (ou `http://localhost:3001`).

---

## 📦 Build e Produção

Para gerar a versão otimizada de produção:

```bash
npm run build
npm run start
```
