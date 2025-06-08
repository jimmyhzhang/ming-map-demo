import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mid-century modern palette
        avocado: '#71895b',
        orange: '#c65a2e', 
        mustard: '#d2a447',
        teal: '#4f826d',
        cream: '#e7dcc0',
        coffee: '#4a3d34',
        'warm-bg': '#f3eddc'
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'paper-hover': '0 4px 12px rgba(74, 61, 52, 0.15)',
      },
      fontFamily: {
        'mid-century': ['"Inter"', '"Helvetica Neue"', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
