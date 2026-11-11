import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#031344",
        electric: "#087BEE",
        cyan: "#32D9F5",
        aqua: "#D9FAFA",
      },
    },
  },
  plugins: [],
};

export default config;
