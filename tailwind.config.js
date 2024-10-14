/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.html", // Path to your HTML files
    "./public/**/*.html", // If you have any HTML files in the public folder
    "./public/css/**/*.css", // Optional: If you use additional CSS files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // Include typography plugin
    require("daisyui"), // Include daisyUI for additional components
  ],
};
