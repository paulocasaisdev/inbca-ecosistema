'use client'

import React from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  HeartPulse,
  Dumbbell,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Phone,
  Clock,
  Home,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react'
import { CasinhaAmarelaAnimada } from '@/componentes/animacoes/CasinhaAmarelaAnimada'

export default function PaginaInicial() {
  const servicosMedicos = [
    { titulo: 'Clínica Geral & Preventiva', desc: 'Atendimento médico contínuo, diagnóstico primário e check-ups comunitários.', icone: Stethoscope },
    { titulo: 'Pediatria & Cuidado Infantil', desc: 'Acompanhamento do desenvolvimento e saúde de bebês e crianças da comunidade.', icone: UserCheck },
    { titulo: 'Oftalmologia & Saúde Visual', desc: 'Consultas de vista, exames de refração e prevenção de doenças oculares.', icone: ShieldCheck },
    { titulo: 'Exames Laboratoriais', desc: 'Coleta de exames de sangue, fezes, urina e glicemia de forma rápida e acessível.', icone: HeartPulse },
    { titulo: 'Exames de Imagem & ECG', desc: 'Ultrassonografia, Eletrocardiograma e exames preventivos com rápida entrega.', icone: CheckCircle2 },
  ]

  const terapias = [
    { titulo: 'Psicologia Individual', desc: 'Acolhimento emocional e escuta qualificada para crianças, jovens e adultos.', icone: Sparkles },
    { titulo: 'Psicoterapia em Grupo', desc: 'Rodas de conversa e desenvolvimento contínuo de apoio à saúde mental.', icone: Users },
    { titulo: 'Fisioterapia Reabilitadora', desc: 'Tratamento de dores, reabilitação motora, postural e recuperação pós-lesão.', icone: HeartPulse },
  ]

  const modalidadesEsportivas = [
    { nome: 'Karatê Inclusivo', publico: 'Crianças, Jovens e PNEs', horario: 'Ter e Qui - 09h e 14h', icone: '🥋' },
    { nome: 'Zumba & Ginástica', publico: 'Adultos e Terceira Idade', horario: 'Seg e Quar - 08h e 17h', icone: '💃' },
    { nome: 'Capoeira Comunitária', publico: 'Todas as idades', horario: 'Sábados - 10h', icone: '🪘' },
    { nome: 'Boxe para Saúde', publico: 'Jovens e Adultos', horario: 'Ter e Qui - 18h', icone: '🥊' },
    { nome: 'Kickboxing Adaptado', publico: 'Iniciantes e Praticantes', horario: 'Seg e Sex - 19h', icone: '🥇' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdf5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Barra Superior / Banner da Comunidade */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>INBCA - Instituto Nilson Bispo Casinha Amarela: Promovendo Saúde, Esporte e Inclusão na Comunidade!</span>
      </div>

      {/* Cabeçalho / Navegação Principal */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/60 dark:border-amber-900/40 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
            <Home className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-amber-300">
              INBCA <span className="text-amber-600 dark:text-amber-400 font-semibold">Casinha Amarela</span>
            </h1>
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              Instituto Nilson Bispo
            </p>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <a href="#clinica" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Clínica & Exames</a>
          <a href="#terapias" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Terapias</a>
          <a href="#esportes" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Esportes & Lutas</a>
          <a href="#impacto" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">História do INBCA</a>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link href="/painel" className="hidden sm:inline-flex botao-secundario text-xs py-2 px-3.5">
            Acesso Painel
          </Link>
          <Link href="/agendamento" className="botao-primario text-xs py-2 px-4">
            <Calendar className="w-4 h-4" />
            <span>Agendar Atendimento</span>
          </Link>
        </div>
      </header>

      {/* HERO SECTION com a Casinha Amarela Animada */}
      <section className="relative px-4 lg:px-8 py-12 lg:py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Lado Esquerdo: Mensagem e CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 text-xs font-bold shadow-sm">
            <Home className="w-4 h-4 text-amber-600" />
            <span>Associação Comunitária de Saúde & Inclusão</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            Cuidando da nossa comunidade na{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500">
              Casinha Amarela
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            O <strong>Instituto Nilson Bispo (INBCA)</strong> une consultas médicas comunitárias, exames laboratoriais, acompanhamento terapêutico e práticas esportivas inclusivas (Karatê, Zumba, Capoeira, Boxe e Kickboxing) para promover bem-estar e dignidade a todas as famílias.
          </p>

          {/* Destaques Rápidos */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/30">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-200">Consultas & Exames Agendados</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/30">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-200">Terapias & Saúde Mental</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/30">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-200">Karatê, Zumba & Lutas</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/30">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-bold text-slate-800 dark:text-amber-200">Acolhimento Gratuito/Acessível</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/agendamento" className="botao-primario py-3.5 px-6 text-sm">
              <span>Agendar Consulta ou Exame</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#esportes" className="botao-secundario py-3.5 px-6 text-sm">
              <span>Ver Projetos Esportivos</span>
            </a>
          </div>
        </div>

        {/* Lado Direito: Animação Interativa da Casinha Amarela */}
        <div className="lg:col-span-6 flex justify-center">
          <CasinhaAmarelaAnimada />
        </div>
      </section>

      {/* SEÇÃO 1: CLÍNICA MÉDICA & EXAMES */}
      <section id="clinica" className="py-16 px-4 lg:px-8 bg-amber-50/40 dark:bg-slate-900/50 border-y border-amber-200/60 dark:border-amber-900/30">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="badge-amarelo">Clínica Comunitária</div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-100">
              Consultas Médicas & Realização de Exames
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
              Acolhimento médico de qualidade com agendamento organizado para evitar filas e garantir atendimento humanizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicosMedicos.map((serv, idx) => {
              const Icone = serv.icone
              return (
                <div key={idx} className="cartao-amarelo flex flex-col justify-between group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <Icone className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2">{serv.titulo}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{serv.desc}</p>
                  </div>
                  <Link href="/agendamento" className="mt-4 pt-3 border-t border-amber-100 dark:border-amber-900/40 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:gap-2 transition-all">
                    <span>Agendar agora</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: TERAPIAS & SAÚDE MENTAL */}
      <section id="terapias" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="badge-amarelo">Saúde Integrativa</div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-100">
            Terapias, Psicoterapia & Fisioterapia
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
            Cuidado com a mente e o corpo através de profissionais dedicados ao fortalecimento do bem-estar comunitário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {terapias.map((ter, idx) => {
            const Icone = ter.icone
            return (
              <div key={idx} className="cartao-destaque flex flex-col justify-between space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-soft">
                  <Icone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-amber-200 mb-2">{ter.titulo}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ter.desc}</p>
                </div>
                <Link href="/agendamento" className="botao-secundario text-xs w-full py-2.5">
                  Marcar Sessão Terapêutica
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* SEÇÃO 3: PRÁTICAS ESPORTIVAS & LUTAS INCLUSIVAS */}
      <section id="esportes" className="py-16 px-4 lg:px-8 bg-gradient-to-b from-amber-500/10 via-yellow-300/10 to-transparent border-t border-amber-200/60 dark:border-amber-900/30">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="badge-amarelo">Esporte & Saúde</div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-100">
              Práticas Esportivas & Lutas Inclusivas
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
              Modalidades abertas para todas as idades, promovendo disciplina, saúde, autoestima e inclusão social na Casinha Amarela.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {modalidadesEsportivas.map((mod, idx) => (
              <div key={idx} className="cartao-amarelo flex flex-col justify-between text-center items-center hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-2">{mod.icone}</div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base mb-1">{mod.nome}</h3>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full mb-3">
                  {mod.publico}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{mod.horario}</span>
                </div>
                <Link href="/agendamento" className="mt-4 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-soft transition-colors">
                  Inscrever-se
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: IMPACTO SOCIAL E HISTÓRIA DO INSTITUTO NILSON BISPO */}
      <section id="impacto" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="cartao-destaque grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="badge-amarelo">Nossa História</div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-amber-300">
              Instituto Nilson Bispo - Casinha Amarela
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Fundado com a missão de acolher e cuidar das famílias em situação de vulnerabilidade, o INBCA tornou a <strong>Casinha Amarela</strong> um símbolo de esperança, saúde preventiva e oportunidade esportiva. Atuamos diariamente com profissionais voluntários, médicos, terapeutas e instrutores de lutas dedicados a transformar vidas.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-white/80 dark:bg-slate-900 rounded-2xl border border-amber-200 text-center">
                <p className="text-xl font-black text-amber-600">100%</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Comunitário</p>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900 rounded-2xl border border-amber-200 text-center">
                <p className="text-xl font-black text-amber-600">5 Modalidades</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Esportivas</p>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900 rounded-2xl border border-amber-200 text-center">
                <p className="text-xl font-black text-amber-600">+12 Mil</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Atendimentos</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-amber-200/80 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Apoie a Casinha Amarela</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sua doação ou trabalho voluntário nos ajuda a expandir os exames, consultas médicas e aulas de Karatê, Capoeira, Zumba e Boxe!
            </p>
            <Link href="/agendamento" className="botao-primario w-full text-xs py-3">
              Quero Apoiar / Ser Voluntário
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-auto bg-slate-900 text-slate-300 py-12 px-4 lg:px-8 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Home className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-amber-400 text-base">INBCA Casinha Amarela</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instituto Nilson Bispo - Associação Comunitária promovendo saúde, consultas médicas, exames, terapias e esportes inclusivos.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Consultas Médicas</li>
              <li>Exames Laboratoriais e Imagem</li>
              <li>Fisioterapia e Psicologia</li>
              <li>Karatê, Capoeira, Boxe e Kickboxing</li>
              <li>Zumba & Ginástica</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Contato & Sede</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Sede Casinha Amarela - Comunidade</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-500" /> (71) 99999-0000 / Contato INBCA</p>
              <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-500" /> Seg a Sáb: 07h às 19h</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Acesso Rápido</h4>
            <Link href="/agendamento" className="botao-primario w-full text-xs py-2">
              Agendar Atendimento
            </Link>
            <Link href="/painel" className="botao-secundario w-full text-xs py-2 bg-slate-800 text-amber-300 border-amber-500/30">
              Painel Administrativo
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} INBCA - Instituto Nilson Bispo Casinha Amarela. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
