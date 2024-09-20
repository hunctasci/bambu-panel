/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(122, 52%, 22%)",
          foreground: "hsl(0, 0%, 100%)",
          light: "hsl(122, 52%, 32%)",
          dark: "hsl(122, 52%, 12%)",
        },
        secondary: {
          DEFAULT: "hsl(46, 96%, 71%)",
          foreground: "hsl(0, 0%, 10%)",
          light: "hsl(46, 96%, 81%)",
          dark: "hsl(46, 96%, 61%)",
        },
        background: "hsl(200, 17%, 96%)",
        foreground: "hsl(0, 0%, 10%)",
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        popover: {
          DEFAULT: "hsl(46, 96%, 93%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        muted: {
          DEFAULT: "hsl(200, 17%, 86%)",
          foreground: "hsl(0, 0%, 40%)",
        },
        accent: {
          DEFAULT: "hsl(46, 96%, 81%)",
          foreground: "hsl(0, 0%, 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        border: "hsl(200, 17%, 86%)",
        input: "hsl(200, 17%, 86%)",
        ring: "hsl(122, 52%, 22%)",
        chart: {
          1: "hsl(122, 52%, 22%)",
          2: "hsl(46, 96%, 71%)",
          3: "hsl(200, 17%, 96%)",
          4: "hsl(122, 52%, 32%)",
          5: "hsl(46, 96%, 81%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
