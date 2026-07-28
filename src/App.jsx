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
import NewsroomPage from "./app/newsroom/NewsroomPage";
import CaseStudyPage from "./app/case-study/CaseStudyPage";
import { APP_ROUTES } from "./app/data/portfolioApps";
import { localizedPortfolioContent } from "./data";
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

function isNewsroomRoute() {
    return window.location.pathname === APP_ROUTES.newsroom;
}

function isCaseStudyRoute() {
    return window.location.pathname === APP_ROUTES.caseStudy;
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);
    const [language, setLanguage] = useState(getInitialLanguage);
    const [isAppPage, setIsAppPage] = useState(isAppRoute);
    const [isAnimatedPage, setIsAnimatedPage] = useState(isAnimatedRoute);
    const [isNewsroomPage, setIsNewsroomPage] = useState(isNewsroomRoute);
    const [isCaseStudyPage, setIsCaseStudyPage] = useState(isCaseStudyRoute);
    const copy = translations[language];
    const content = localizedPortfolioContent[language];

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
            setIsNewsroomPage(isNewsroomRoute());
            setIsCaseStudyPage(isCaseStudyRoute());
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

    if (isNewsroomPage) {
        return (
            <>
                <NewsroomPage theme={theme} onToggleTheme={toggleTheme} />
                <Analytics />
            </>
        );
    }

    if (isCaseStudyPage) {
        return (
            <>
                <CaseStudyPage theme={theme} onToggleTheme={toggleTheme} />
                <Analytics />
            </>
        );
    }

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
                <About copy={copy.about} language={language} />
                <Experience copy={copy.experience} items={content.experiences} />
                <Skills copy={copy.skills} items={content.skillGroups} />
                <Projects copy={copy.projects} items={content.projects} />
                <Education copy={copy.education} items={content.education} />
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
