import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
  },

  plugins: [typography, forms, daisyui],
} satisfies Config;

export default config;
