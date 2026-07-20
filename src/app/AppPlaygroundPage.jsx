import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import DarkModeToggle from "../components/DarkModeToggle";
import AppCard from "./components/AppCard";
import AppRoadmap from "./components/AppRoadmap";
import FeaturedAppCard from "./components/FeaturedAppCard";
import {
    getAvailablePortfolioApps,
    getFeaturedPortfolioApps,
    getRoadmapPortfolioApps
} from "./data/portfolioApps";

function navigateWithinApp(route) {
    window.history.pushState({}, "", route);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function setMetaTag(name, content, attribute = "name") {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function getMetaContent(name, attribute = "name") {
    const tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    return tag ? tag.getAttribute("content") : null;
}

function groupAppsByCategory(appList) {
    return appList.reduce((groups, app) => {
        if (!groups[app.category]) {
            groups[app.category] = [];
        }

        groups[app.category].push(app);
        return groups;
    }, {});
}

function AppPlaygroundPage({ theme, onToggleTheme }) {
    const reducedMotion = useReducedMotion();
    const apps = getAvailablePortfolioApps();
    const featuredApps = getFeaturedPortfolioApps();
    const roadmapApps = getRoadmapPortfolioApps();
    const standardApps = apps.filter((app) => !app.featured);
    const featuredApp = featuredApps[0];
    const groupedApps = groupAppsByCategory(standardApps.length > 0 ? standardApps : apps);
    const availableCount = apps.length;
    const categoryCount = Object.keys(groupAppsByCategory(apps)).length;

    useEffect(() => {
        const previousMeta = {
            title: document.title,
            description: getMetaContent("description"),
            ogTitle: getMetaContent("og:title", "property"),
            ogDescription: getMetaContent("og:description", "property"),
            themeColor: getMetaContent("theme-color")
        };
        const description =
            "Explore interactive portfolio experiences, professional simulations, and frontend engineering experiments.";

        document.title = "App Playground | Aditia Nugroho";
        setMetaTag("description", description);
        setMetaTag("og:title", "App Playground | Aditia Nugroho", "property");
        setMetaTag("og:description", description, "property");
        setMetaTag("theme-color", "#07111f");

        return () => {
            document.title = previousMeta.title;

            if (previousMeta.description) {
                setMetaTag("description", previousMeta.description);
            }

            if (previousMeta.ogTitle) {
                setMetaTag("og:title", previousMeta.ogTitle, "property");
            }

            if (previousMeta.ogDescription) {
                setMetaTag("og:description", previousMeta.ogDescription, "property");
            }

            if (previousMeta.themeColor) {
                setMetaTag("theme-color", previousMeta.themeColor);
            }
        };
    }, []);

    return (
        <div className="app-playground-page">
            <header className="app-playground-nav">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8" aria-label="App navigation">
                    <a className="app-home-link" href="/">
                        &lt; Home
                    </a>
                    <div className="hidden min-w-0 items-center gap-3 text-sm font-black text-slate-500 sm:flex dark:text-slate-400">
                        <span>App Playground</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                        <span>{availableCount} live</span>
                    </div>
                    <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                </nav>
            </header>

            <main className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pb-16">
                <section className="app-hero" aria-labelledby="app-playground-title">
                    <div>
                        <p className="app-kicker">Digital Product Lab</p>
                        <h1 id="app-playground-title">App Playground</h1>
                        <p>
                            A curated collection of interactive portfolio experiences, product simulations, and frontend
                            engineering experiments.
                        </p>
                    </div>
                    <div className="app-hero-panel" aria-label="Application ecosystem summary">
                        <div>
                            <strong>{availableCount}</strong>
                            <span>Live application</span>
                        </div>
                        <div>
                            <strong>{categoryCount}</strong>
                            <span>Active category</span>
                        </div>
                        <div>
                            <strong>{roadmapApps.length}</strong>
                            <span>Concepts planned</span>
                        </div>
                    </div>
                </section>

                <section className="mt-10" aria-labelledby="featured-app-title">
                    <div className="app-section-heading">
                        <span>Featured experience</span>
                        <h2 id="featured-app-title">Start with the live application</h2>
                    </div>
                    <FeaturedAppCard app={featuredApp} onNavigate={navigateWithinApp} reducedMotion={reducedMotion} />
                </section>

                <section className="mt-12" aria-labelledby="available-apps-title">
                    <div className="app-section-heading">
                        <span>Available applications</span>
                        <h2 id="available-apps-title">Built experiments</h2>
                        <p>Every visible app is generated from the shared registry and links only to routes that exist.</p>
                    </div>
                    {Object.entries(groupedApps).map(([category, categoryApps]) => (
                        <div className="mb-8" key={category}>
                            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {category}
                            </h3>
                            <div className="app-grid" aria-label="Experimental apps grid">
                                {categoryApps.map((app) => (
                                    <AppCard app={app} key={app.id} onNavigate={navigateWithinApp} />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <AppRoadmap apps={roadmapApps} />

                <footer className="app-playground-footer">
                    <p>More experiments will be added when they are useful, working, and worth opening.</p>
                    <a href="/">Back to portfolio</a>
                </footer>
            </main>
        </div>
    );
}

export default AppPlaygroundPage;
