import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: "640px", // Small devices (e.g., phones)
        md: "768px", // Medium devices (e.g., tablets)
        lg: "1024px", // Large devices (e.g., laptops/desktops)
        xl: "1280px", // Extra large devices (e.g., wide desktops)
        "2xl": "1536px", // 2x Extra large devices
        custom: "1440px", // Example custom breakpoint
      },
    },
  },
  plugins: [],
} satisfies Config;
