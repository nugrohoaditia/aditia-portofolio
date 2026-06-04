import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ContactForm from "./components/ContactForm";
import { translations } from "./i18n";
import { getNextTheme } from "./utils";

function getInitialTheme() {
    return localStorage.getItem("theme") || "light";
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);
    const [language] = useState("EN");
    const copy = translations[language];

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language.toLowerCase();
    }, [language]);

    const toggleTheme = () => {
        setTheme((current) => getNextTheme(current));
    };

    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <Header copy={copy} language={language} theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <About copy={copy.about} />
                <Experience copy={copy.experience} />
                <Skills copy={copy.skills} />
                <Projects copy={copy.projects} />
                <Education copy={copy.education} />
                <ContactForm copy={copy.contact} />
            </main>
            <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <p>{copy.footer}</p>
            </footer>
            <Analytics />
        </div>
    );
}

export default App;
