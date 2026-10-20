import { motion } from "framer-motion";
import AppPreview from "./AppPreview";
import AppStatusBadge from "./AppStatusBadge";

function FeaturedAppCard({ app, onNavigate, reducedMotion }) {
    const href = app.externalUrl || app.route;
    const handleClick = (event) => {
        if (!app.route || !onNavigate || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        onNavigate(app.route);
    };

    return (
        <motion.article
            className="app-featured-card"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="app-featured-preview">
                <AppPreview type={app.previewType} asset={app.previewAsset} title={app.title} variant="featured" />
            </div>
            <div className="app-featured-content">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="app-kicker">{app.category}</span>
                    <AppStatusBadge status={app.status} />
                    {app.releaseLabel && <span className="app-release-label">{app.releaseLabel}</span>}
                </div>
                <h2 className="text-3xl font-black leading-tight text-ink sm:text-4xl dark:text-white">
                    {app.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                    {app.description}
                </p>
                <div className="tag-row mt-6" aria-label={`${app.title} technologies`}>
                    {app.technologies.slice(0, 5).map((technology) => (
                        <span key={technology}>{technology}</span>
                    ))}
                </div>
                <a className="app-featured-action" href={href} target={app.externalUrl ? "_blank" : undefined} rel={app.externalUrl ? "noopener noreferrer" : undefined} onClick={handleClick}>
                    {app.actionLabel || "Open app"}
                    <span aria-hidden="true">-&gt;</span>
                </a>
            </div>
        </motion.article>
    );
}

export default FeaturedAppCard;
