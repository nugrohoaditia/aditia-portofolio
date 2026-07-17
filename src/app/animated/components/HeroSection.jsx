import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { animatedProfile } from "../data/animatedPortfolioData";
import { revealUp, staggerContainer } from "../utils/animationVariants";

function HeroSection() {
    const titleWords = animatedProfile.name.split(" ");

    return (
        <section className="animated-hero" id="animated-hero" aria-labelledby="animated-hero-title">
            <div className="animated-grid-bg" aria-hidden="true" />
            <motion.div
                className="animated-hero__content"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.p className="animated-eyebrow" variants={revealUp}>
                    {animatedProfile.status}
                </motion.p>
                <h1 id="animated-hero-title" className="animated-hero__title">
                    {titleWords.map((word) => (
                        <motion.span key={word} variants={revealUp}>
                            {word}
                        </motion.span>
                    ))}
                </h1>
                <motion.p className="animated-hero__subtitle" variants={revealUp}>
                    {animatedProfile.subtitle}
                </motion.p>
                <motion.p className="animated-hero__intro" variants={revealUp}>
                    {animatedProfile.intro}
                </motion.p>
                <motion.div className="animated-hero__actions" variants={revealUp}>
                    <a className="animated-button animated-button--primary" href="#animated-projects">
                        View selected work
                    </a>
                    <a className="animated-button" href={animatedProfile.resumeUrl} download>
                        <FontAwesomeIcon icon={faDownload} />
                        Download CV
                    </a>
                    <a className="animated-button animated-button--ghost" href={`mailto:${animatedProfile.email}`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        Contact
                    </a>
                </motion.div>
                <motion.div className="animated-hero__links" variants={revealUp}>
                    {animatedProfile.links.map((link) => (
                        <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            </motion.div>
            <motion.figure
                className="animated-hero__portrait"
                initial={{ opacity: 0, rotateX: 8, y: 28 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
                <img src={animatedProfile.image} alt="Aditia Nugroho portrait" />
                <figcaption>
                    <span>React</span>
                    <span>PHP</span>
                    <span>Production UI</span>
                </figcaption>
            </motion.figure>
            <a className="animated-scroll-cue" href="#animated-about" aria-label="Scroll to about section">
                <FontAwesomeIcon icon={faArrowDown} />
                <span>Scroll</span>
            </a>
        </section>
    );
}

export default HeroSection;
