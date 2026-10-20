import { motion, useReducedMotion } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 42 },
    visible: { opacity: 1, y: 0 }
};

function Section({ id, eyebrow, title, children, tone = "default" }) {
    const reducedMotion = useReducedMotion();
    const toneClass =
        tone === "muted"
            ? "bg-slate-100/80 dark:bg-slate-900/70"
            : "bg-white dark:bg-slate-950";

    return (
        <motion.section
            id={id}
            className={`section-band ${toneClass}`}
            variants={sectionVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="section-heading">
                    <p>{eyebrow}</p>
                    <h2>{title}</h2>
                </div>
                {children}
            </div>
        </motion.section>
    );
}

export default Section;
