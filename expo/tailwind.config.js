/** @type {import('tailwindcss').Config} */
module.exports = {
  // specify what component files we want to use nativewind
  content: [
      "./App.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
      "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
      "./app/(tabs)/*.tsx",
  ],
  theme: {
      extend: {
          // specify fontFamily for custom fonts we added
          fontFamily: {
              rmono: ["Roboto-Mono", "sans-serif"],
          },
          colors: {
            'custom-background': "#FAF6EB",
            'custom-green': '#859860',
            'primary-green': '#C4D2A6',
            'secondary-green': '#394032',
            'primary-pink': '#F2D3C0',
          },
      },
  },
  plugins: [],
};