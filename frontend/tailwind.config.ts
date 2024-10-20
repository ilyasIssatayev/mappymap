import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': {
          '50': '#fff3f1',
          '100': '#ffe4e1',
          '200': '#ffcec7',
          '300': '#ffaca1',
          '400': '#ff7b6a',
          '500': '#f85944',
          '600': '#e5341d',
          '700': '#c12814',
          '800': '#9f2515',
          '900': '#842518',
          '950': '#480f07',
      },
      'dark': '#17070a',
      'light': '#E8EAE9',
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
