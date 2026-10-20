import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DarkModeToggle from "../components/DarkModeToggle";
import AppCard from "./components/AppCard";
import AppRoadmap from "./components/AppRoadmap";
import AppStoryCard from "./components/AppStoryCard";
import FeaturedAppCard from "./components/FeaturedAppCard";
import {
    getAvailablePortfolioApps,
    getFeaturedPortfolioApps,
    getInProgressPortfolioApps,
    portfolioAppCategories,
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
    const inProgressApps = getInProgressPortfolioApps();
    const independentApps = apps.filter((app) => app.category === portfolioAppCategories.independentProducts);
    const experiments = apps.filter((app) => app.category !== portfolioAppCategories.independentProducts);
    const featuredApp = featuredApps[0];
    const groupedExperiments = groupAppsByCategory(experiments);

    useEffect(() => {
        const previousMeta = {
            title: document.title,
            description: getMetaContent("description"),
            ogTitle: getMetaContent("og:title", "property"),
            ogDescription: getMetaContent("og:description", "property"),
            themeColor: getMetaContent("theme-color")
        };
        const description =
            "Explore Aditia Nugroho's independent digital products, interactive portfolio experiences, and work in progress.";

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
                        <span>Independent work</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                        <span>{independentApps.length} live products</span>
                    </div>
                    <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                </nav>
            </header>

            <main className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pb-16">
                <motion.section
                    className="app-hero"
                    aria-labelledby="app-playground-title"
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <p className="app-kicker">Digital Product Lab</p>
                        <h1 id="app-playground-title">App Playground</h1>
                        <p>
                            Products I build independently, from streaming and food media to commerce and playful learning.
                            Explore the live sites and see what is still taking shape.
                        </p>
                    </div>
                    <div className="app-hero-panel" aria-label="Application ecosystem summary">
                        <div>
                            <strong>{independentApps.length}</strong>
                            <span>Live independent products</span>
                        </div>
                        <div>
                            <strong>{experiments.length}</strong>
                            <span>Interactive experiments</span>
                        </div>
                        <div>
                            <strong>{inProgressApps.length}</strong>
                            <span>Product in progress</span>
                        </div>
                    </div>
                </motion.section>

                <section className="mt-10" aria-labelledby="featured-app-title">
                    <div className="app-section-heading">
                        <span>Featured product</span>
                        <h2 id="featured-app-title">Start with DASO</h2>
                    </div>
                    <FeaturedAppCard app={featuredApp} onNavigate={navigateWithinApp} reducedMotion={reducedMotion} />
                </section>

                <section className="mt-12" aria-labelledby="independent-apps-title">
                    <div className="app-section-heading">
                        <span>Independent products</span>
                        <h2 id="independent-apps-title">Explore the live sites</h2>
                        <p>Each preview comes from the public product. External sites open in a new tab.</p>
                    </div>
                    <div className="app-grid" aria-label="Independent products grid">
                        {independentApps.filter((app) => !app.featured).map((app) => (
                            <AppCard app={app} key={app.id} onNavigate={navigateWithinApp} />
                        ))}
                    </div>
                </section>

                {inProgressApps.length > 0 && (
                    <section className="mt-12" aria-labelledby="in-progress-apps-title">
                        <div className="app-section-heading">
                            <span>In progress</span>
                            <h2 id="in-progress-apps-title">A product taking shape</h2>
                        </div>
                        {inProgressApps.map((app) => <AppStoryCard app={app} key={app.id} />)}
                    </section>
                )}

                <section className="mt-12" aria-labelledby="available-apps-title">
                    <div className="app-section-heading">
                        <span>Portfolio experiments</span>
                        <h2 id="available-apps-title">Interactive explorations</h2>
                    </div>
                    {Object.entries(groupedExperiments).map(([category, categoryApps]) => (
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
                    <p>Built and explored independently by Aditia Nugroho.</p>
                    <a href="/">Back to portfolio</a>
                </footer>
            </main>
        </div>
    );
}

export default AppPlaygroundPage;
