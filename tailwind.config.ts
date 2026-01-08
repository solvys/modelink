import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        outfit: ["Outfit", "sans-serif"],
        "cursive-primary": ["Great Vibes", "cursive"],
        "cursive-secondary": ["Dancing Script", "cursive"],
        "cursive-tertiary": ["Allura", "cursive"],
      },
      colors: {
        beige: {
          DEFAULT: "#F5F5DC",
          light: "#FAFAF0",
          dark: "#E8E8D0",
        },
        khaki: {
          DEFAULT: "#C3B091",
          light: "#D4C5A8",
          dark: "#A8956F",
        },
        "baby-blue": {
          DEFAULT: "#89CFF0",
          light: "#B0E0E6",
          dark: "#5FB3D3",
        },
        "baby-pink": {
          DEFAULT: "#F4C2C2",
          light: "#FFD1DC",
          dark: "#E8A5A5",
        },
        blush: {
          DEFAULT: "#F8E8E8",
          light: "#FDF5F5",
          dark: "#F0D8D8",
        },
        sage: {
          DEFAULT: "#E8F0E8",
          light: "#F0F5F0",
          dark: "#D8E8D8",
        },
        lavender: {
          DEFAULT: "#EDE8F5",
          light: "#F5F0FA",
          dark: "#E0D8ED",
        },
        cream: {
          DEFAULT: "#FDF9F3",
          light: "#FFFCF8",
          dark: "#F8F3E8",
        },
        "soft-gray": {
          DEFAULT: "#F5F5F5",
          light: "#FAFAFA",
          dark: "#E8E8E8",
        },
        unisex: {
          gray: {
            DEFAULT: "#4A4A4A",
            light: "#6B6B6B",
            dark: "#2A2A2A",
          },
          slate: {
            DEFAULT: "#64748B",
            light: "#94A3B8",
            dark: "#475569",
          },
          steel: {
            DEFAULT: "#71717A",
            light: "#A1A1AA",
            dark: "#52525B",
          },
        },
      },
      backgroundImage: {
        "liquid-grid":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 50px)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.08)",
        "medium": "0 4px 16px rgba(0, 0, 0, 0.12)",
        "glass": "0 35px 75px rgba(15, 23, 42, 0.35)",
        "orb": "0 0 80px rgba(244, 194, 194, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

