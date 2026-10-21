import forms from '@tailwindcss/forms';

/**
 * As with the night system, every colour resolves through a CSS custom
 * property written into `src/theme.css` by the generator, so this file is
 * byte-identical across all five brutal sites.
 */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: c('paper'),
        paper2: c('paper2'),
        ink: c('ink'),
        volt: c('volt'),
        blaze: c('blaze'),
        muted: c('muted'),
        mutedInk: c('mutedInk'),
        blazeText: c('blazeText')
      },
      fontFamily: {
        display: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      maxWidth: {
        shell: '1440px'
      },
      boxShadow: {
        // The only shadows this system uses: flat, offset, no blur.
        hard: '6px 6px 0 0 rgb(var(--ink))',
        'hard-sm': '4px 4px 0 0 rgb(var(--ink))',
        'hard-paper': '6px 6px 0 0 rgb(var(--paper))',
        'hard-volt': '6px 6px 0 0 rgb(var(--volt))'
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        }
      },
      animation: {
        ticker: 'ticker 42s linear infinite',
        blink: 'blink 1.1s step-end infinite'
      }
    }
  },
  plugins: [forms]
};
