import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedSkillGroups } from "../data/animatedPortfolioData";
import { softScale, staggerContainer } from "../utils/animationVariants";

function SkillsSection() {
    const allSkills = animatedSkillGroups.flatMap((group) => group.skills);

    return (
        <section className="animated-section animated-skills" id="animated-skills" aria-labelledby="animated-skills-title">
            <SectionHeading eyebrow="Technology field" title="A stack shaped by production work.">
                <p>
                    No arbitrary percentages. The skills are grouped by how they appear in day-to-day delivery:
                    frontend, backend integration, quality, and workflow.
                </p>
            </SectionHeading>
            <div className="animated-skills__layout">
                <motion.div
                    className="animated-skill-orbit"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    aria-label="Technology constellation"
                >
                    {allSkills.slice(0, 18).map((skill, index) => (
                        <span style={{ "--index": index }} key={skill}>
                            {skill}
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    className="animated-skill-panels"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {animatedSkillGroups.map((group) => (
                        <motion.article className="animated-skill-panel" key={group.title} variants={softScale}>
                            <h3>{group.title}</h3>
                            <p>{group.summary}</p>
                            <div className="animated-chip-row">
                                {group.skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default SkillsSection;
