const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|calendar|card|image|input|navbar|skeleton|user|ripple|spinner|avatar).js"
  ],
  theme: {
      extend: {
        colors: {
          primary: '#34e0a1',    // Your chosen primary color
          secondary: '#e0347d',  // Matching secondary color (suggested below)
        },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

