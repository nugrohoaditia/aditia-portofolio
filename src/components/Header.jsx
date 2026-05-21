import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "./DarkModeToggle";
import { profile } from "../data";

const links = [
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" }
];

function Header({ theme, onToggleTheme }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
                    <a href="#home" className="text-lg font-black tracking-tight text-ink dark:text-white" onClick={closeMenu}>
                        {profile.name}
                    </a>
                    <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex dark:text-slate-300">
                        {links.map((link) => (
                            <a className="nav-link" href={`#${link.id}`} key={link.id}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-ink transition hover:border-marine hover:text-marine md:hidden dark:border-slate-700 dark:text-white"
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                        </button>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
                        <div className="grid gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                            {links.map((link) => (
                                <a className="mobile-link" href={`#${link.id}`} key={link.id} onClick={closeMenu}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-800 dark:bg-slate-950 sm:pt-32">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24">
                    <motion.div
                        className="order-2 md:order-1"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <p className="mb-4 inline-flex rounded-full bg-mint/15 px-4 py-2 text-sm font-extrabold text-marine dark:bg-marine/25 dark:text-mint">
                            Frontend Developer at Detikcom
                        </p>
                        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl dark:text-white">
                            {profile.name}
                        </h1>
                        <p className="mt-5 text-xl font-bold text-marine dark:text-mint">{profile.subtitle}</p>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{profile.summary}</p>
                        <div className="mt-8 grid gap-3 text-sm font-bold text-slate-600 sm:grid-cols-3 dark:text-slate-300">
                            <span className="metric-line">7 years experience</span>
                            <span className="metric-line">High-traffic media</span>
                            <span className="metric-line">React + PHP</span>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a href="#experience" className="btn-primary">
                                View Experience
                            </a>
                            <a href={profile.resumeUrl} download className="btn-secondary">
                                <FontAwesomeIcon icon={faDownload} />
                                Download Resume
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
                                alt="Aditia Nugroho in a smart casual outfit with Jakarta city skyline"
                                className="aspect-[4/3] w-full rounded-lg object-cover object-center shadow-soft"
                            />
                            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/40 bg-white/90 px-4 py-3 text-sm font-bold text-ink shadow-soft backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/85 dark:text-white">
                                Building web platforms where traffic, speed, and reliability matter.
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Header;
