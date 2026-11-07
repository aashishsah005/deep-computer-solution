/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",       // charcoal workbench background
        surface: "var(--color-surface)",    // panel surface
        surfacealt: "var(--color-surfacealt)", // raised panel / card hover
        border: "var(--color-border)",
        ink: "var(--color-ink)",        // primary text, warm off-white
        muted: "var(--color-muted)",
        amber: {
          DEFAULT: "#FFB020",  // solder/heat accent - primary CTA
          dim: "#B87F1C",
        },
        circuit: {
          DEFAULT: "#34C77B",  // PCB trace green - success / in stock / completed
          dim: "#1F8F55",
        },
        signal: {
          DEFAULT: "#4E8EF7",  // status blue - in progress
        },
        alert: "#E5484D",      // pending / attention
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "circuit-trace":
          "linear-gradient(90deg, transparent 0%, transparent 47%, currentColor 47%, currentColor 53%, transparent 53%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
