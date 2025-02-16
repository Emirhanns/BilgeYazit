/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors: {
        'old-paper': '#F5E6D6', // veya istediğiniz başka bir renk kodu
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}

