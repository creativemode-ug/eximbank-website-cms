/** @type {import("tailwindcss").Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1.5rem",
                sm: "2rem",
                lg: "2rem",
                xl: "2rem",
                "2xl": "3rem",
                "3xl": "4rem",
            },
        },
        extend: {
            screens: {
                "3xl": "1792px",
                "4xl": "2048px",
            },
            colors: {
                primary: {
                    DEFAULT: "#2A3C7F",
                    50: "#F2F7FA",
                    100: "#E1EBF2",
                    200: "#BACEE0",
                    300: "#95AECC",
                    400: "#5872A6",
                    500: "#2A3C7F",
                    600: "#223273",
                    700: "#18255E",
                    800: "#0F194D",
                    900: "#081038",
                    950: "#040824",
                },

                secondary: {
                    DEFAULT: "#d4af37",
                    50: "#faf9ec",
                    100: "#f4f0cd",
                    200: "#ebdf9d",
                    300: "#dfc865",
                    400: "#d4af37",
                    500: "#c59b2d",
                    600: "#aa7a24",
                    700: "#885920",
                    800: "#724921",
                    900: "#623e21",
                    950: "#382010",
                },

                tertiary: {
                    DEFAULT: "#907e4c",
                    50: "#f7f6ef",
                    100: "#eae9d7",
                    200: "#d7d4b1",
                    300: "#bfb985",
                    400: "#aca263",
                    500: "#9d9055",
                    600: "#907e4c",
                    700: "#6d5c3b",
                    800: "#5d4d36",
                    900: "#514332",
                    950: "#2e241a",
                },

                "primary-accent": "#1B609F",
                "secondary-accent": "#F9D027",
                "tertiary-accent": "#CCC2A8",
            },

            fontFamily: {
                open: ["Open Sans"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        // require("@tailwindcss/aspect-ratio")
    ],
}
