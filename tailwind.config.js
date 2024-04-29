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
        extend: {
            animation: {
                glow: "glow 1s infinite alternate",
            },
            keyframes: {
                glow: {
                    "0%": {
                        boxShadow: "0 0 0 0px rgba(0, 0, 255, 0.7)",
                    },
                    "100%": {
                        boxShadow: "0 0 0 10px rgba(0, 0, 255, 0)",
                    },
                },
            },
            boxShadow: {
                glow: "0 0 20px 5px rgba(255, 255, 250, 0.3)",
            },
        },
    },
    plugins: [],
};
