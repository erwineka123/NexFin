import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/services/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem"
      },
      boxShadow: {
        soft: "0 12px 32px -16px rgba(15, 23, 42, 0.18)",
        glow: "0 18px 50px -24px rgba(16, 185, 129, 0.45)"
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 34%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 28%), radial-gradient(circle at bottom, rgba(15, 118, 110, 0.18), transparent 38%)"
      },
      fontFamily: {
        sans: ["\"Plus Jakarta Sans\"", "\"Segoe UI\"", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

