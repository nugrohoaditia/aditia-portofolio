import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function AnimatedNavbar({ activeSection, sections }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [isMenuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="animated-nav">
            <a className="animated-nav__home" href="/app">
                &lt; Home
            </a>
            <nav className="animated-nav__links" aria-label="Animated page sections">
                {sections.map((section) => (
                    <a
                        className={activeSection === section.id ? "is-active" : ""}
                        href={`#${section.id}`}
                        key={section.id}
                    >
                        {section.label}
                    </a>
                ))}
            </nav>
            <div className="animated-nav__actions">
                <button
                    className="animated-menu-button"
                    type="button"
                    aria-label="Open animated page menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </button>
            </div>
            {isMenuOpen ? (
                <div className="animated-mobile-menu" role="dialog" aria-label="Animated section menu">
                    {sections.map((section) => (
                        <a
                            className={activeSection === section.id ? "is-active" : ""}
                            href={`#${section.id}`}
                            key={section.id}
                            onClick={closeMenu}
                        >
                            {section.label}
                        </a>
                    ))}
                </div>
            ) : null}
        </header>
    );
}

export default AnimatedNavbar;
