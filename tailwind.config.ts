import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "page-pattern": 'url("/takaro-pattern-200.png")',
      },
      colors: {
        orange: {
          takaro: "#ed771f",
          shaded: "#e88235",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
