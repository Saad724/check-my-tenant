import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xxs: ["0.625rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      xs: ["0.75rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      sm: ["0.875rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      base: ["1rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      lg: ["1.125rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      xl: ["1.25rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      "2xl": ["1.5rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      "3xl": ["1.75rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      "4xl": ["2rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      "5xl": ["2.5rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
      "6xl": ["3.25rem", { lineHeight: "1.4rem", letterSpacing: "-0.02em" }],
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spinner: "spinner 1s linear infinite",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--primary) / 0.05)",
          foreground: "hsl(var(--primary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / 0.12)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info) / 0.08)",
          foreground: "hsl(var(--info))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      dropShadow: {
        button: ["0 0px 0px #F5F5F5", "0 0.6px 0.6px rgba(0, 0, 0, 0.1)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
