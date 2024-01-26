/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "secondary-bg": "rgba(255, 209, 227, 0.75)",
        "primary": "rgba(57, 36, 103, 1)",
        "secondary": "rgba(164, 103, 177, 1)",
        "primary-bg": "rgba(163, 103, 177, 0.25)"
      },
    },
  },
  plugins: [],
}

