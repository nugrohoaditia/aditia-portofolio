import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        mass: 0.25
    });

    return <motion.div className="animated-scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export default ScrollProgress;
