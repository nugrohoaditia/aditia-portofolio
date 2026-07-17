import { useEffect, useState } from "react";

function useActiveSection(sectionIds) {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const observers = [];

        if (!("IntersectionObserver" in window)) {
            return undefined;
        }

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);

            if (!element) {
                return;
            }

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: "-35% 0px -50% 0px", threshold: 0.08 }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => observers.forEach((observer) => observer.disconnect());
    }, [sectionIds]);

    return activeSection;
}

export default useActiveSection;
