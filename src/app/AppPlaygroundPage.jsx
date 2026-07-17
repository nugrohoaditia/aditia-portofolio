import { useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import AppCard from "./components/AppCard";
import { getAvailablePortfolioApps } from "./data/portfolioApps";

const apps = getAvailablePortfolioApps();

function navigateWithinApp(route) {
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function AppPlaygroundPage({ theme, onToggleTheme }) {
    useEffect(() => {
        const previousTitle = document.title;

        document.title = "Apps | Aditia Nugroho";

        return () => {
            document.title = previousTitle;
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="App navigation">
                    <a className="font-black text-ink transition hover:text-marine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marine dark:text-white dark:hover:text-mint dark:focus-visible:outline-mint" href="/">
                        &lt; Home
                    </a>
                    <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                </nav>
            </header>
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                <div className="mb-7 max-w-2xl">
                    <p className="mb-2 text-xs font-black uppercase tracking-wider text-marine dark:text-mint">
                        Experimental apps
                    </p>
                    <h1 className="text-3xl font-black leading-tight text-ink dark:text-white sm:text-4xl">
                        App playground
                    </h1>
                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                        A quiet place for portfolio experiments and small product-style demos.
                    </p>
                </div>

                <div className="app-grid" aria-label="Experimental apps grid">
                    {apps.map((app) => (
                        <AppCard app={app} key={app.id} onNavigate={navigateWithinApp} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default AppPlaygroundPage;
