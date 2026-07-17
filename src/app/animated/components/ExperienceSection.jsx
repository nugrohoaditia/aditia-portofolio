import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedExperiences } from "../data/animatedPortfolioData";
import { revealUp, staggerContainer } from "../utils/animationVariants";

function ExperienceSection() {
    return (
        <section className="animated-section animated-experience" id="animated-experience" aria-labelledby="animated-experience-title">
            <SectionHeading eyebrow="Career sequence" title="Experience across media platforms, ERP systems, and web delivery.">
                <p>
                    A scroll-friendly career path built from the same professional experience already used by the main
                    portfolio.
                </p>
            </SectionHeading>
            <div className="animated-experience__layout">
                <aside className="animated-experience__rail" aria-hidden="true">
                    {animatedExperiences.map((experience) => (
                        <span key={experience.company}>{experience.period}</span>
                    ))}
                </aside>
                <motion.div
                    className="animated-timeline"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                >
                    {animatedExperiences.map((experience, index) => (
                        <motion.article className="animated-timeline-card" key={experience.company} variants={revealUp}>
                            <div className="animated-timeline-card__index">{String(index + 1).padStart(2, "0")}</div>
                            <div>
                                <p className="animated-timeline-card__period">{experience.period}</p>
                                <h3>{experience.company}</h3>
                                <strong>{experience.title}</strong>
                                <p>{experience.description}</p>
                                <ul>
                                    {experience.responsibilities.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div className="animated-chip-row">
                                    {experience.technologies.map((technology) => (
                                        <span key={technology}>{technology}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default ExperienceSection;
