/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey: "var(--grey)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        error: "var(--error)",
        success: "var(--success)",
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-accent': 'var(--gradient-accent)',
      },
      boxShadow: {
        'card': 'var(--card-shadow)',
      },
    },
  },
  plugins: [],
};