import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ContactForm from "./components/ContactForm";
import { getNextTheme } from "./utils";
import { siteContent } from "./data";

function getInitialTheme() {
    return localStorage.getItem("theme") || "light";
}

function getInitialLanguage() {
    return localStorage.getItem("language") === "id" ? "id" : "en";
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);
    const [language, setLanguage] = useState(getInitialLanguage);
    const content = siteContent[language];

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language;
        localStorage.setItem("language", language);
    }, [language]);

    const toggleTheme = () => {
        setTheme((current) => getNextTheme(current));
    };

    const toggleLanguage = () => {
        setLanguage((current) => (current === "en" ? "id" : "en"));
    };

    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <Header
                content={content}
                language={language}
                onToggleLanguage={toggleLanguage}
                theme={theme}
                onToggleTheme={toggleTheme}
            />
            <main>
                <About content={content.about} />
                <Experience content={content.experience} />
                <Skills content={content.skills} />
                <Projects content={content.projects} />
                <Education content={content.education} />
                <ContactForm content={content.contact} />
            </main>
            <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <p>{content.footer}</p>
            </footer>
        </div>
    );
}

export default App;
