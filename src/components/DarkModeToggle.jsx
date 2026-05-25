import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function DarkModeToggle({ theme, onToggle, ariaLabel = "Toggle dark mode", className = "" }) {
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            aria-pressed={isDark}
            onClick={onToggle}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-extrabold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-marine hover:text-marine dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-mint dark:hover:text-mint ${className}`}
        >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            <span>{isDark ? "Light" : "Dark"}</span>
        </button>
    );
}

export default DarkModeToggle;
