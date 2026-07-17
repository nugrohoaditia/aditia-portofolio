import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { animatedProfile } from "../data/animatedPortfolioData";
import { revealUp, staggerContainer } from "../utils/animationVariants";

function ContactSection() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(animatedProfile.email);
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    return (
        <section className="animated-section animated-contact" id="animated-contact" aria-labelledby="animated-contact-title">
            <motion.div
                className="animated-contact__panel"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={staggerContainer}
            >
                <motion.p className="animated-eyebrow" variants={revealUp}>
                    Contact
                </motion.p>
                <motion.h2 id="animated-contact-title" variants={revealUp}>
                    Let us build something practical, fast, and maintainable.
                </motion.h2>
                <motion.p variants={revealUp}>
                    The fastest way to reach me is through WhatsApp, email, or LinkedIn. I am open to software
                    engineering roles, product collaboration, and web platform work.
                </motion.p>
                <motion.div className="animated-contact__actions" variants={revealUp}>
                    <button className="animated-button animated-button--primary" type="button" onClick={copyEmail}>
                        <FontAwesomeIcon icon={copied ? faCheck : faEnvelope} />
                        {copied ? "Email copied" : "Copy email"}
                    </button>
                    <a className="animated-button" href={animatedProfile.linkedin} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                        LinkedIn
                    </a>
                    <a className="animated-button" href={`https://wa.me/${animatedProfile.whatsapp}`} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} />
                        WhatsApp
                    </a>
                </motion.div>
                <motion.a className="animated-back-top" href="#animated-hero" variants={revealUp}>
                    <FontAwesomeIcon icon={faArrowUp} />
                    Back to top
                </motion.a>
            </motion.div>
        </section>
    );
}

export default ContactSection;
