/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // deep blue
        secondary: '#3B82F6', // sky blue
        accent: '#10B981', // emerald green
        background: '#F9FAFB', // light gray
        border: '#E5E7EB', // gray-200
        textPrimary: '#111827', // gray-900
        textSecondary: '#6B7280', // gray-500
        error: '#EF4444', // red
      },
    },
  },
  plugins: [],
};
