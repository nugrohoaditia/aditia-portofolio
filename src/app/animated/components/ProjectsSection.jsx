import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedProjects } from "../data/animatedPortfolioData";
import { revealUp, staggerContainer } from "../utils/animationVariants";

function ProjectsSection() {
    return (
        <section className="animated-section animated-projects" id="animated-projects" aria-labelledby="animated-projects-title">
            <SectionHeading eyebrow="Selected work" title="Media platforms shaped by real production needs.">
                <p>
                    Frontend delivery, reusable components, and ongoing production support across news and lifestyle
                    products.
                </p>
            </SectionHeading>
            <motion.div
                className="animated-project-track"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {animatedProjects.map((project, index) => (
                    <motion.article className="animated-project-card" data-cursor="active" key={project.name} variants={revealUp}>
                        <div className="animated-project-card__media">
                            {project.image ? (
                                <img src={project.image} alt={`${project.name} visual identity`} loading="lazy" />
                            ) : (
                                <span>{project.badge}</span>
                            )}
                        </div>
                        <div className="animated-project-card__body">
                            <span className="animated-project-card__number">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <strong>{project.role}</strong>
                            <div className="animated-chip-row">
                                {project.technologies.map((technology) => (
                                    <span key={technology}>{technology}</span>
                                ))}
                            </div>
                            <a href={project.url} target="_blank" rel="noreferrer">
                                Visit project
                            </a>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

export default ProjectsSection;
