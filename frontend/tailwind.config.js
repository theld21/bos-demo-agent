/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '600px',
      '2md': '768px',
      '3md': '800px',
      lg: '900px',
      '2lg': '992px',
      '3lg': '1200px',
      xl: '1280px',
      '2xl': '1366px',
      '3xl': '1400px',
      '4xl': '1536px',
      '5xl': '1600px',
      '6xl': '1670px',
      '7xl': '1920px',
      '8xl': '2560px',
      '9xl': '2880px',
      '10xl': '3200px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
