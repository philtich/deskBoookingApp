/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '976px',
        'xl': '1180px',
      },
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1200px',
    },
    colors: {
      white:      "#FFFFFF",
      offWhite:   "#D9D9D9",
      darkGray:   "#3C3D3D",
      lightBlue:  "#afe1ea",
      darkBlue:   "#042c60",
      success:    "#198754",
      danger:     "#DC3545",
      green:      "#1E942A",
      red:        "#D02A2A",
      orange:      "#ffa500",
    },
    extend: {},
  },
  plugins: [],
};
