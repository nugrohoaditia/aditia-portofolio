import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "./DarkModeToggle";
import { profile } from "../data";

function Header({
    content,
    language,
    onToggleLanguage,
    theme,
    onToggleTheme
}) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const links = content.nav;
    const hero = content.hero;

    const closeMenu = () => setMenuOpen(false);
    const toggleLanguageFromMenu = () => {
        onToggleLanguage();
        closeMenu();
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4 lg:px-8" aria-label="Main navigation">
                    <a href="#home" className="max-w-[13rem] truncate text-base font-black tracking-tight text-ink sm:max-w-none sm:text-lg dark:text-white" onClick={closeMenu}>
                        {profile.name}
                    </a>
                    <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex dark:text-slate-300">
                        {links.map((link) => (
                            <a className="nav-link" href={`#${link.id}`} key={link.id}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="hidden items-center gap-2 md:flex">
                        <button
                            type="button"
                            className="language-toggle"
                            aria-label="Toggle language"
                            aria-pressed={language === "id"}
                            onClick={onToggleLanguage}
                        >
                            <span className={language === "en" ? "is-active" : ""}>EN</span>
                            <span className={language === "id" ? "is-active" : ""}>ID</span>
                        </button>
                        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-ink transition hover:border-marine hover:text-marine dark:border-slate-700 dark:text-white"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                        </button>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft md:hidden dark:border-slate-800 dark:bg-slate-950">
                        <div className="grid gap-1 text-sm font-bold text-slate-700 dark:text-slate-200">
                            {links.map((link) => (
                                <a className="mobile-link" href={`#${link.id}`} key={link.id} onClick={closeMenu}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                            <button
                                type="button"
                                className="language-toggle w-full justify-center"
                                aria-label="Toggle mobile language"
                                aria-pressed={language === "id"}
                                onClick={toggleLanguageFromMenu}
                            >
                                <span className={language === "en" ? "is-active" : ""}>EN</span>
                                <span className={language === "id" ? "is-active" : ""}>ID</span>
                            </button>
                            <DarkModeToggle
                                ariaLabel="Toggle mobile dark mode"
                                className="w-full"
                                theme={theme}
                                onToggle={onToggleTheme}
                            />
                        </div>
                    </div>
                )}
            </header>

            <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-white pt-24 dark:border-slate-800 dark:bg-slate-950 sm:pt-32">
                <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 sm:px-5 sm:pb-16 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24">
                    <motion.div
                        className="order-2 md:order-1"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <p className="mb-4 inline-flex rounded-full bg-mint/15 px-4 py-2 text-sm font-extrabold text-marine dark:bg-marine/25 dark:text-mint">
                            {hero.badge}
                        </p>
                        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl dark:text-white">
                            {profile.name}
                        </h1>
                        <p className="mt-4 text-lg font-bold text-marine sm:mt-5 sm:text-xl dark:text-mint">{hero.subtitle}</p>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-slate-300">{hero.summary}</p>
                        <div className="mt-6 grid gap-3 text-sm font-bold text-slate-600 sm:mt-8 sm:grid-cols-3 dark:text-slate-300">
                            {hero.metrics.map((metric) => (
                                <span className="metric-line" key={metric}>{metric}</span>
                            ))}
                        </div>
                        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                            <a href="#experience" className="btn-primary">
                                {hero.primaryAction}
                            </a>
                            <a href={profile.resumeUrl} download className="btn-secondary">
                                <FontAwesomeIcon icon={faDownload} />
                                {hero.resumeAction}
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        className="order-1 md:order-2"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                    >
                        <div className="relative mx-auto max-w-md md:max-w-xl">
                            <img
                                src={profile.image}
                                alt={hero.imageAlt}
                                className="aspect-[4/3] w-full rounded-lg object-cover object-center shadow-soft"
                            />
                            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/40 bg-white/90 px-4 py-3 text-sm font-bold text-ink shadow-soft backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/85 dark:text-white">
                                {hero.imageCaption}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Header;
