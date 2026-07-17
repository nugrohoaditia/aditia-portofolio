import { AnimatePresence, motion } from "framer-motion";

function PageLoader({ isLoading, progress }) {
    return (
        <AnimatePresence>
            {isLoading ? (
                <motion.div
                    className="animated-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
                    role="status"
                    aria-live="polite"
                >
                    <div className="animated-loader__mark" aria-hidden="true">
                        AN
                    </div>
                    <div className="animated-loader__meta">
                        <span>Loading portfolio sequence</span>
                        <strong>{progress}%</strong>
                    </div>
                    <div className="animated-loader__track" aria-hidden="true">
                        <motion.span style={{ width: `${progress}%` }} />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default PageLoader;
