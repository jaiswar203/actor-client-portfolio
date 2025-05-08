/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        gold: {
          DEFAULT: "#d4af37",
          light: "#e5c158",
          dark: "#b3941f",
          50: "#fcf7e6",
          100: "#f7edc5",
          200: "#eeda8c",
          300: "#e5c158",
          400: "#dbaa2c",
          500: "#d4af37", // Main gold color
          600: "#b3941f",
          700: "#8c731a",
          800: "#695616",
          900: "#433610",
        },
        cream: {
          DEFAULT: "#FFF8E7",
          50: "#FFFDF9",
          100: "#FFF8E7",
          200: "#FFF0D0",
          300: "#FFE8B8",
        },
        charcoal: {
          DEFAULT: "#2D3035",
          50: "#f6f7f8",
          100: "#e2e4e7",
          200: "#c3c8ce",
          300: "#9ca3ad",
          400: "#767f8c",
          500: "#5a6272",
          600: "#484e5d",
          700: "#3b404c",
          800: "#2D3035",
          900: "#1f2025",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'elegant': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04)',
        'gold': '0 10px 30px -5px rgba(212, 175, 55, 0.2), 0 4px 10px -5px rgba(212, 175, 55, 0.1)',
        'card': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s ease-in-out infinite",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f2d77e 50%, #d4af37 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8E7 0%, #FFFFFF 100%)',
        'light-pattern': "url('/patterns/light-pattern.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
