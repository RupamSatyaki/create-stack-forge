export const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: { extend: {} },
  plugins: [],
}
`

export const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

export const tailwindCss = `@tailwind base;
@tailwind components;
@tailwind utilities;
`
