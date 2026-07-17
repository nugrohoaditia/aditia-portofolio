import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ContactForm from "./components/ContactForm";
import AppHub from "./components/AppHub";
import AnimatedPage from "./app/animated/AnimatedPage";
import { APP_ROUTES } from "./app/data/portfolioApps";
import { translations } from "./i18n";
import { getNextTheme } from "./utils";

function getInitialTheme() {
    return localStorage.getItem("theme") || "light";
}

function getInitialLanguage() {
    return localStorage.getItem("language") === "ID" ? "ID" : "EN";
}

function isAppRoute() {
    return window.location.pathname === APP_ROUTES.root || window.location.pathname.startsWith(`${APP_ROUTES.root}/`);
}

function isAnimatedRoute() {
    return window.location.pathname === APP_ROUTES.animated;
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);
    const [language, setLanguage] = useState(getInitialLanguage);
    const [isAppPage, setIsAppPage] = useState(isAppRoute);
    const [isAnimatedPage, setIsAnimatedPage] = useState(isAnimatedRoute);
    const copy = translations[language];

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = language.toLowerCase();
        localStorage.setItem("language", language);
    }, [language]);

    useEffect(() => {
        const updateRoute = () => {
            setIsAnimatedPage(isAnimatedRoute());
            setIsAppPage(isAppRoute());
        };

        window.addEventListener("popstate", updateRoute);

        return () => {
            window.removeEventListener("popstate", updateRoute);
        };
    }, []);

    const toggleTheme = () => {
        setTheme((current) => getNextTheme(current));
    };

    const toggleLanguage = () => {
        setLanguage((current) => (current === "EN" ? "ID" : "EN"));
    };

    if (isAnimatedPage) {
        return (
            <>
                <AnimatedPage theme={theme} onToggleTheme={toggleTheme} />
                <Analytics />
            </>
        );
    }

    if (isAppPage) {
        return (
            <>
                <AppHub theme={theme} onToggleTheme={toggleTheme} />
                <Analytics />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <Header
                copy={copy}
                language={language}
                onToggleLanguage={toggleLanguage}
                theme={theme}
                onToggleTheme={toggleTheme}
            />
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
