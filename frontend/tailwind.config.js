/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /* Light mode */
                "primary": "var(--color-primary)",
                "primary-container": "var(--color-primary-container)",
                "on-primary-container": "var(--color-on-primary-container)",
                "secondary": "var(--color-secondary)",
                "secondary-container": "var(--color-secondary-container)",
                "on-secondary-container": "var(--color-on-secondary-container)",
                "background": "var(--color-background)",
                "surface": "var(--color-surface)",
                "surface-variant": "var(--color-surface-variant)",
                "on-surface": "var(--color-on-surface)",
                "on-surface-variant": "var(--color-on-surface-variant)",
                "outline": "var(--color-outline)",
                "error": "var(--color-error)",
                "success": "var(--color-success)",
                "warning": "var(--color-warning)",
                "accent": "var(--color-accent)",
                "accent-light": "var(--color-accent-light)",
                /* Dark mode */
                "dark-bg": "var(--color-dark-bg)",
                "dark-surface": "var(--color-dark-surface)",
                "dark-surface-variant": "var(--color-dark-surface-variant)",
                "dark-on-surface": "var(--color-dark-on-surface)",
                "dark-on-surface-variant": "var(--color-dark-on-surface-variant)",
                "dark-primary": "var(--color-dark-primary)",
                "dark-secondary": "var(--color-dark-secondary)",
            },
            fontFamily: {
                "headline": ["Manrope", "sans-serif"],
                "body": ["Plus Jakarta Sans", "sans-serif"],
                "display": ["Playfair Display", "serif"],
            },
            borderRadius: {
                "3xl": "1.5rem",
                "4xl": "2rem",
                "5xl": "3rem",
                "6xl": "4rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
