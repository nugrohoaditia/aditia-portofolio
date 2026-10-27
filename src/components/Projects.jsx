import { motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { projects } from "../data";

function Projects({ copy, items = projects }) {
    const reducedMotion = useReducedMotion();
    return (
        <Section id="projects" eyebrow={copy.eyebrow} title={copy.title} tone="muted">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((project) => (
                    <motion.article
                        className="flex min-h-[24rem] flex-col gap-4 rounded-xl border border-slate-200/90 bg-white p-7 shadow-sm transition duration-300 hover:border-marine/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-mint/40"
                        key={project.name}
                        whileHover={reducedMotion ? undefined : { y: -6 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <div className="project-logo-frame">
                            {project.image ? (
                                <img
                                    className="max-h-16 w-auto max-w-full object-contain"
                                    src={project.image}
                                    alt={`${project.name} logo`}
                                />
                            ) : (
                                <span className="text-2xl font-black text-ink dark:text-mint">
                                    {project.badge}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-black text-ink dark:text-white">{project.name}</h3>
                        <p className="leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{project.role}</p>
                        <div className="tag-row">
                            {project.technologies.map((technology) => (
                                <span key={technology}>{technology}</span>
                            ))}
                        </div>
                        <a className="mt-auto inline-flex items-center gap-1.5 font-extrabold text-marine transition hover:text-ink hover:underline dark:text-mint dark:hover:text-white" href={project.url} target="_blank" rel="noreferrer">
                            {copy.visit}
                        </a>
                    </motion.article>
                ))}
            </div>
        </Section>
    );
}

export default Projects;
