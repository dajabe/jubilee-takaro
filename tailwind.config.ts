import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
