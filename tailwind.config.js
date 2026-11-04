/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        navy: '#1E3A5F',
        orange: '#B4420B', // accents, liens au survol (AA sur blanc)
        coral: '#EE6A4D', // aplats et mises en avant uniquement (pas de petit texte)
        sun: '#FFC857',
        teal: '#2A9D8F',
        mist: '#EEF1F5',
        muted: '#4A5B70',
        line: '#D5DCE5'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
