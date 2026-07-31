import type { Config } from 'tailwindcss'

const configuracaoTailwind: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './componentes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaria: {
          50: '#FFFBEB',  // Amarelo creme ultra claro
          100: '#FEF3C7', // Amarelo sol claro
          200: '#FDE68A', // Amarelo casinha
          300: '#FCD34D', // Amarelo dourado suave
          400: '#FBBF24', // Amarelo vibrante
          500: '#F59E0B', // Âmbar / Amarelo sol principal
          600: '#D97706', // Dourado escuro
          700: '#B45309', // Terracota âmbar
          800: '#92400E', // Marrom aquecido
          900: '#78350F', // Marrom profundo
        },
        casinha: {
          parede: '#FEF08A',
          telhado: '#EAB308',
          telhadoEscuro: '#CA8A04',
          porta: '#854D0E',
          janela: '#FEF9C3',
          brilho: '#FACC15',
        },
        agendado: '#F59E0B',
        confirmado: '#10B981',
        em_atendimento: '#3B82F6',
        concluido: '#64748B',
        cancelado: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(245, 158, 11, 0.08)',
        glass: '0 8px 32px 0 rgba(217, 119, 6, 0.08)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(245, 158, 11, 0.05)',
        casinha: '0 20px 50px -10px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fumaca': 'fumacaSubindo 3s infinite ease-out',
        'janela-brilho': 'janelaBrilho 2.5s infinite ease-in-out',
        'sol-giro': 'solGiro 20s linear infinite',
        'coracao-pulso': 'coracaoPulso 1.8s infinite ease-in-out',
        'flutuar': 'flutuar 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fumacaSubindo: {
          '0%': { opacity: '0.2', transform: 'translateY(0) scale(0.8)' },
          '50%': { opacity: '0.7', transform: 'translateY(-15px) scale(1.2)' },
          '100%': { opacity: '0', transform: 'translateY(-30px) scale(1.6)' },
        },
        janelaBrilho: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.9))' },
        },
        solGiro: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        coracaoPulso: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        flutuar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default configuracaoTailwind
