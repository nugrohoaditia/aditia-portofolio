import { useEffect, useState } from "react";

function useReducedMotionPreference() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () => Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    );

    useEffect(() => {
        if (!window.matchMedia) {
            return undefined;
        }

        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(query.matches);

        updatePreference();
        query.addEventListener("change", updatePreference);

        return () => query.removeEventListener("change", updatePreference);
    }, []);

    return prefersReducedMotion;
}

export default useReducedMotionPreference;
