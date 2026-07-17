import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { animatedHighlights } from "../data/animatedPortfolioData";
import { softScale, staggerContainer } from "../utils/animationVariants";

function HighlightsSection() {
    return (
        <section className="animated-section animated-highlights" id="animated-highlights" aria-labelledby="animated-highlights-title">
            <SectionHeading eyebrow="Signals" title="Professional highlights without inflated claims.">
                <p>
                    These numbers come from the portfolio data itself: roles, selected projects, grouped technologies,
                    and years of experience.
                </p>
            </SectionHeading>
            <motion.div
                className="animated-highlight-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={staggerContainer}
            >
                {animatedHighlights.map((highlight) => (
                    <motion.article className="animated-highlight-card" key={highlight.label} variants={softScale}>
                        <strong>
                            {highlight.value}
                            {highlight.suffix}
                        </strong>
                        <h3>{highlight.label}</h3>
                        <p>{highlight.detail}</p>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
}

export default HighlightsSection;
