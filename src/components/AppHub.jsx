import DarkModeToggle from "./DarkModeToggle";

const appItems = [
    {
        href: "/app/animated",
        eyebrow: "Portfolio experiment",
        title: "Animated Portfolio",
        description: "A cinematic version of the portfolio with section transitions, project gallery, and focused contact flow.",
        tags: ["React", "Motion", "Portfolio"],
        status: "Ready"
    }
];

function AppHub({ theme, onToggleTheme }) {
    return (
        <div className="min-h-screen bg-white text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
            <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="App navigation">
                    <a className="font-black text-ink transition hover:text-marine dark:text-white dark:hover:text-mint" href="/">
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
                    {appItems.map((item) => (
                        <a className="app-preview-card group" href={item.href} key={item.href}>
                            <div className="app-preview-visual" aria-hidden="true">
                                <div className="app-preview-topbar">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div className="app-preview-hero">
                                    <div>
                                        <span className="app-preview-kicker" />
                                        <span className="app-preview-title" />
                                        <span className="app-preview-title short" />
                                        <span className="app-preview-subtitle" />
                                        <span className="app-preview-button" />
                                    </div>
                                    <div className="app-preview-photo">
                                        <span />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-marine dark:text-mint">
                                        {item.eyebrow}
                                    </p>
                                    <h2 className="mt-2 text-xl font-black text-ink transition group-hover:text-marine dark:text-white dark:group-hover:text-mint">
                                        {item.title}
                                    </h2>
                                </div>
                                <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
                                    {item.status}
                                </span>
                            </div>

                            <p className="mt-4 min-h-[4.5rem] leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>

                            <div className="tag-row mt-5">
                                {item.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                                <span className="text-sm font-black text-ink dark:text-white">Open app</span>
                                <span className="app-card-arrow">-&gt;</span>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default AppHub;
