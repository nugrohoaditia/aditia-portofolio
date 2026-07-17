import { motion } from "framer-motion";
import Section from "./Section";
import { projects } from "../data";

function Projects({ copy }) {
    return (
        <Section id="projects" eyebrow={copy.eyebrow} title={copy.title} tone="muted">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <motion.article
                        className="flex min-h-[24rem] flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
                        key={project.name}
                        whileHover={{ y: -8 }}
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
                        <a className="mt-auto font-extrabold text-marine hover:underline dark:text-mint" href={project.url} target="_blank" rel="noreferrer">
                            {copy.visit}
                        </a>
                    </motion.article>
                ))}
            </div>
        </Section>
    );
}

export default Projects;
