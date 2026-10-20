import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedHighlights, animatedProfile } from "../data/animatedPortfolioData";
import { revealUp, softScale, staggerContainer } from "../utils/animationVariants";

function AboutSection() {
    const keywords = ["Frontend delivery", "API integration", "Performance fixes", "Production support"];

    return (
        <section className="animated-section animated-about" id="animated-about" aria-labelledby="animated-about-title">
            <SectionHeading eyebrow="Profile" title="A practical engineer for real production platforms.">
                <p>
                    From fast-moving media products to enterprise integration, I work with product, QA, backend, and
                    design teams to ship dependable features.
                </p>
            </SectionHeading>
            <div className="animated-about__grid">
                <motion.article
                    className="animated-story-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={staggerContainer}
                >
                    <motion.p variants={revealUp}>{animatedProfile.summary}</motion.p>
                    <motion.p variants={revealUp}>
                        Based in {animatedProfile.location}, I work across React, PHP, JavaScript, APIs, CMS workflows,
                        databases, and production issue handling. The emphasis is simple: build features that are usable,
                        maintainable, and ready for real users.
                    </motion.p>
                    <motion.div className="animated-keyword-row" variants={revealUp}>
                        {keywords.map((keyword) => (
                            <span key={keyword}>{keyword}</span>
                        ))}
                    </motion.div>
                </motion.article>
                <motion.div
                    className="animated-signal-stack"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={staggerContainer}
                >
                    {animatedHighlights.slice(0, 3).map((highlight) => (
                        <motion.article className="animated-signal" key={highlight.label} variants={softScale}>
                            <strong>
                                {highlight.value}
                                {highlight.suffix}
                            </strong>
                            <span>{highlight.label}</span>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default AboutSection;
