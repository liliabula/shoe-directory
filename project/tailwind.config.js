/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334155',
            h1: {
              color: '#0F172A',
            },
            h2: {
              color: '#0F172A',
            },
            h3: {
              color: '#0F172A',
            },
            h4: {
              color: '#0F172A',
            },
            strong: {
              color: '#0F172A',
            },
            a: {
              color: '#F59E0B',
              '&:hover': {
                color: '#B45309',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};