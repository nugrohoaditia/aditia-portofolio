import { motion } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 }
};

function Section({ id, eyebrow, title, children, tone = "default" }) {
    const toneClass =
        tone === "muted"
            ? "bg-slate-100/80 dark:bg-slate-900/70"
            : "bg-white dark:bg-slate-950";

    return (
        <motion.section
            id={id}
            className={`section-band ${toneClass}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
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
