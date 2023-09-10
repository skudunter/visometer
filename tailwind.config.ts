import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx }",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "main-screen-diving-image": "url('/main-screen-diving-image.png')",
        "main-screen-diving-image-secondary": "url('/main-screen-secondary.png')",
      },
      colors: {
        primary: "#171219",
        secondary: "#201b23",
        tersiary: "#EDF2F4",
        quad: "#048BA8",
        quint: "#6F2DBD",
        sextant:'#2f2b31'
      },
      animation: {
        
      },
    },
  },
  plugins: [],
};
export default config;
