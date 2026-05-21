import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ContactForm from "./components/ContactForm";
import { getNextTheme } from "./utils";

function getInitialTheme() {
    return localStorage.getItem("theme") || "light";
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => getNextTheme(current));
    };

    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <Header theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Education />
                <ContactForm />
            </main>
            <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <p>(c) 2026 Aditia Nugroho - Software Engineer.</p>
            </footer>
        </div>
    );
}

export default App;
