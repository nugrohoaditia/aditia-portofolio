import { useEffect, useMemo, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import AnimatedNavbar from "./components/AnimatedNavbar";
import PageLoader from "./components/PageLoader";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import HighlightsSection from "./components/HighlightsSection";
import ContactSection from "./components/ContactSection";
import useActiveSection from "./hooks/useActiveSection";
import useReducedMotionPreference from "./hooks/useReducedMotionPreference";
import { animatedProfile, animatedSections } from "./data/animatedPortfolioData";
import { pageFade } from "./utils/animationVariants";
import "./animated.css";

function setMetaTag(name, content, attribute = "name") {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function AnimatedPage() {
    const [isLoading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const sectionIds = useMemo(() => animatedSections.map((section) => section.id), []);
    const activeSection = useActiveSection(sectionIds);
    const prefersReducedMotion = useReducedMotionPreference();

    useEffect(() => {
        const previousTitle = document.title;
        const description =
            "Animated portfolio experience for Aditia Nugroho, Software Engineer focused on React, PHP, and web platform development.";

        document.title = "Animated | Aditia Nugroho";
        setMetaTag("description", description);
        setMetaTag("og:title", "Animated | Aditia Nugroho", "property");
        setMetaTag("og:description", description, "property");
        setMetaTag("theme-color", "#132322");

        return () => {
            document.title = previousTitle;
        };
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) {
            setProgress(100);
            setLoading(false);
            return undefined;
        }

        let currentProgress = 0;
        const interval = window.setInterval(() => {
            currentProgress = Math.min(currentProgress + 8, 100);
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                window.clearInterval(interval);
                window.setTimeout(() => setLoading(false), 220);
            }
        }, 55);

        return () => window.clearInterval(interval);
    }, [prefersReducedMotion]);

    return (
        <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "user"}>
            <motion.div className="animated-page" initial="hidden" animate="visible" variants={pageFade}>
                <PageLoader isLoading={isLoading} progress={progress} />
                <CustomCursor disabled={prefersReducedMotion} />
                <ScrollProgress />
                <AnimatedNavbar
                    activeSection={activeSection}
                    sections={animatedSections}
                />
                <main aria-label={`${animatedProfile.pageTitle} portfolio experience`}>
                    <HeroSection />
                    <AboutSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <SkillsSection />
                    <EducationSection />
                    <HighlightsSection />
                    <ContactSection />
                </main>
            </motion.div>
        </MotionConfig>
    );
}

export default AnimatedPage;
