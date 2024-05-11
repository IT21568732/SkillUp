/** @type {import('tailwindcss').Config} */
module.exports =  ({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto':['Roboto','sans-serif'],
      },
      colors:{
        'bg-dark':'#22092C',
        'sec-pink':'#872341',
        'sec-light':'#BE3144',
        'sec-orange':'F05941',
      },           
    },
  },
  plugins: [],
});