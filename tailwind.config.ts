import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf8f2',
          100: '#f5f0e6',
          200: '#eadfca',
        },
        forest: '#1F3B2F',
        gold: '#B68D40',
        wood: '#8A5A3B',
        ink: '#2E2E2E',
      },
      boxShadow: {
        soft: '0 20px 70px rgba(31, 59, 47, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
