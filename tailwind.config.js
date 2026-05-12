module.exports = {
    darkMode: "class",
    content: ["./public/index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#12233f",
                marine: "#176b87",
                mint: "#64ccc5",
                paper: "#f6f8fb",
                ember: "#f97316"
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
            },
            boxShadow: {
                soft: "0 18px 60px rgba(18, 35, 63, 0.10)"
            }
        }
    },
    plugins: []
};
