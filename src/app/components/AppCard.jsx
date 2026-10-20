import { motion, useReducedMotion } from "framer-motion";
import AppPreview from "./AppPreview";
import AppStatusBadge from "./AppStatusBadge";

function AppCard({ app, onNavigate }) {
    const reducedMotion = useReducedMotion();
    const href = app.externalUrl || app.route;
    const handleClick = (event) => {
        if (!app.route || !onNavigate || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        onNavigate(app.route);
    };

    return (
        <motion.a
            className="app-preview-card group"
            href={href}
            target={app.externalUrl ? "_blank" : undefined}
            rel={app.externalUrl ? "noopener noreferrer" : undefined}
            onClick={handleClick}
            aria-label={`Open ${app.title}`}
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            whileHover={reducedMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <AppPreview type={app.previewType} asset={app.previewAsset} title={app.title} />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-black uppercase tracking-wider text-marine dark:text-mint">
                        {app.category}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-ink transition group-hover:text-marine dark:text-white dark:group-hover:text-mint">
                        {app.title}
                    </h2>
                </div>
                <AppStatusBadge status={app.status} />
            </div>

            <p className="mt-4 min-h-[4.5rem] leading-7 text-slate-600 dark:text-slate-300">{app.description}</p>

            <div className="tag-row mt-5" aria-label={`${app.title} technologies`}>
                {app.technologies.slice(0, 5).map((technology) => (
                    <span key={technology}>{technology}</span>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                <span className="text-sm font-black text-ink dark:text-white">{app.actionLabel || "Open app"}</span>
                <span className="app-card-arrow" aria-hidden="true">
                    -&gt;
                </span>
            </div>
        </motion.a>
    );
}

export default AppCard;
