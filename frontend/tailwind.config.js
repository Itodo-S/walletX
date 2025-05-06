/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        'primary-hover': 'hsl(var(--primary-hover))',
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        'muted-text': 'hsl(var(--muted-text))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
      },
    },
  },
  plugins: [],
}

