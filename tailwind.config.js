const config = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
         lightBg: '#e9e9e9',     
        darkBg: '#1a1a1a',       
        lightText: '#111827',    
        darkText: '#f9fafb',     
        black: {
          dark:'#1a1a1a'
        },
        white: {
        },
        green: {
          light:'#4ef09d'
        }
      },
    },
  },
  plugins: [],
};
export default config;
