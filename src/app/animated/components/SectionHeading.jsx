import { motion } from "framer-motion";
import { revealUp } from "../utils/animationVariants";

function SectionHeading({ eyebrow, title, children }) {
    return (
        <motion.div
            className="animated-section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={revealUp}
        >
            <p>{eyebrow}</p>
            <h2>{title}</h2>
            {children ? <div className="animated-section-heading__copy">{children}</div> : null}
        </motion.div>
    );
}

export default SectionHeading;
