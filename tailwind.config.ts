import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--clr-surface-a0)',
        foreground: 'var(--clr-primary-a50)',
        'surface-a10': 'var(--clr-surface-a10)',
        'surface-a50': 'var(--clr-surface-a50)',
        'primary-a0': 'var(--clr-primary-a0)',
        'primary-a10': 'var(--clr-primary-a10)',
        'primary-a50': 'var(--clr-primary-a50)',
        'primary-a30': 'var(--clr-primary-a30)',
        'primary-a20': 'var(--clr-primary-a20)',
        'surface-a0': 'var(--clr-surface-a0)',
        'surface-a20': 'var(--clr-surface-a20)',
        'surface-a40': 'var(--clr-surface-a40)',
        'surface-a30': 'var(--clr-surface-a30)',
        'light-a0': 'var(--clr-light-a0)',
      },
      fontFamily: {
        'roboto-condensed': 'var(--font-roboto_condensed)',
        roboto: 'var(--font-roboto)',
      },
      container: {},
    },
  },
  plugins: [],
} satisfies Config
