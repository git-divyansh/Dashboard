import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Custom plugin to add global styles for scrollbar
    function ({ addBase }: PluginAPI) {
      addBase({
        '@import': "url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap')",
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: 'rgba(133, 82, 133, 0.1)',
          borderRadius: '4px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: 'rgba(133, 82, 133, 0.5)',
          borderRadius: '4px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(133, 82, 133, 0.7)',
        },
      });
    },
  ],
};

export default config;
