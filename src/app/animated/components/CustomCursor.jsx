import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CustomCursor({ disabled }) {
    const [isPointerDevice, setPointerDevice] = useState(false);
    const [isActive, setActive] = useState(false);
    const x = useMotionValue(-80);
    const y = useMotionValue(-80);
    const springX = useSpring(x, { stiffness: 320, damping: 32 });
    const springY = useSpring(y, { stiffness: 320, damping: 32 });

    useEffect(() => {
        if (!window.matchMedia) {
            return undefined;
        }

        const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updatePointer = () => setPointerDevice(pointerQuery.matches);

        updatePointer();
        pointerQuery.addEventListener("change", updatePointer);

        return () => pointerQuery.removeEventListener("change", updatePointer);
    }, []);

    useEffect(() => {
        if (disabled || !isPointerDevice) {
            return undefined;
        }

        const moveCursor = (event) => {
            x.set(event.clientX);
            y.set(event.clientY);
        };
        const activate = (event) => {
            if (event.target.closest("a, button, [data-cursor='active']")) {
                setActive(true);
            }
        };
        const deactivate = () => setActive(false);

        window.addEventListener("pointermove", moveCursor);
        document.addEventListener("pointerover", activate);
        document.addEventListener("pointerout", deactivate);

        return () => {
            window.removeEventListener("pointermove", moveCursor);
            document.removeEventListener("pointerover", activate);
            document.removeEventListener("pointerout", deactivate);
        };
    }, [disabled, isPointerDevice, x, y]);

    if (disabled || !isPointerDevice) {
        return null;
    }

    return (
        <motion.div
            className={`animated-cursor ${isActive ? "is-active" : ""}`}
            style={{ x: springX, y: springY }}
            aria-hidden="true"
        />
    );
}

export default CustomCursor;
