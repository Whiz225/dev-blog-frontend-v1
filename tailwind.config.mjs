// tailwind.config.mjs
import { join } from "path";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "./src/**/*.{js,jsx,ts,tsx}"),
    join(__dirname, "./app/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  darkMode: "class", // or 'media' for OS-level dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        grey: {
          0: "#fff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        blue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        indigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },
      borderRadius: {
        tiny: "3px",
        sm: "5px",
        md: "7px",
        lg: "9px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)",
        lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
      },

      animation: {
        spin: "spin 1.5s linear infinite",
      },
      keyframes: {
        spin: {
          to: { transform: "rotate(1turn)" },
        },
      },
    },
  },
  variants: {
    extend: {
      grayscale: ["dark"],
      opacity: ["dark"],
    },
  },
  plugins: [],
};
