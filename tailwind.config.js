/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            fontFamily: ["Poppins", "sans-serif"],
            sans: ["Roboto", "sans-serif"]
        },
        colors: {
            transparent: "transparent",
            background: "#FFFFFA",
            black: "#000103",
            white: "#fff",
            red: "#EA2A4D",
            blue: "#2A6BEA",
            grey: "#515052",
            darkgrey: "#333138",
        },
        extend: {},
    },
    plugins: [],
};