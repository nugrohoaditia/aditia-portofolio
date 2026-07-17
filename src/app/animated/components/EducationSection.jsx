import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedEducation } from "../data/animatedPortfolioData";
import { revealUp, staggerContainer } from "../utils/animationVariants";

function EducationSection() {
    return (
        <section className="animated-section animated-education" id="animated-education" aria-labelledby="animated-education-title">
            <SectionHeading eyebrow="Education" title="Academic foundation in systems and computer science.">
                <p>
                    Formal education from Bina Nusantara University, presented as a compact archive instead of a resume
                    table.
                </p>
            </SectionHeading>
            <motion.div
                className="animated-education-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={staggerContainer}
            >
                {animatedEducation.map((item) => (
                    <motion.article className="animated-education-card" key={item.degree} variants={revealUp}>
                        <img src={item.logo} alt={`${item.institution} logo`} loading="lazy" />
                        <div>
                            <span>{item.period}</span>
                            <h3>{item.degree}</h3>
                            <strong>{item.institution}</strong>
                            <p>GPA: {item.gpa}</p>
                            <p>{item.focus}</p>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

export default EducationSection;
