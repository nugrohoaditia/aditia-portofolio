import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faCheck,
    faCode,
    faCopy,
    faDiagramProject,
    faExternalLinkAlt,
    faLayerGroup,
    faListCheck,
    faShieldHalved
} from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "../../components/DarkModeToggle";
import { APP_ROUTES } from "../data/portfolioApps";
import { caseStudies, defaultCaseStudyId } from "./data/caseStudies";
import "./case-study.css";

const sectionLabels = [
    ["overview", "Overview"],
    ["snapshot", "Snapshot"],
    ["context", "Context"],
    ["problem", "Problem"],
    ["goals", "Goals"],
    ["role", "Role"],
    ["process", "Process"],
    ["solution", "Solution"],
    ["architecture", "Architecture"],
    ["flow", "User flow"],
    ["responsive", "Responsive"],
    ["challenges", "Challenges"],
    ["code", "Code"],
    ["comparison", "Comparison"],
    ["results", "Results"],
    ["lessons", "Lessons"]
];

function getProjectIdFromLocation() {
    const params = new URLSearchParams(window.location.search);
    return params.get("project");
}

function getCaseStudyById(id) {
    return caseStudies.find((caseStudy) => caseStudy.id === id) || caseStudies.find((caseStudy) => caseStudy.id === defaultCaseStudyId) || caseStudies[0];
}

function getMetaContent(name, attribute = "name") {
    const tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    return tag ? tag.getAttribute("content") : null;
}

function setMetaTag(name, content, attribute = "name") {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
}

function navigateToApp(event) {
    if (event?.defaultPrevented || event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) {
        return;
    }

    event?.preventDefault();
    window.history.pushState({}, "", APP_ROUTES.root);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function navigateToPortfolio(event) {
    if (event?.defaultPrevented || event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) {
        return;
    }

    event?.preventDefault();
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function updateProjectUrl(projectId) {
    const nextUrl = `${APP_ROUTES.caseStudy}?project=${encodeURIComponent(projectId)}`;
    window.history.pushState({}, "", nextUrl);
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function scrollToTop(reducedMotion) {
    if (navigator.userAgent.toLowerCase().includes("jsdom")) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        return;
    }

    try {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    } catch (error) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}

function Section({ id, title, kicker, children, wide = false }) {
    return (
        <section className={`case-section ${wide ? "case-section--wide" : ""}`} id={id} aria-labelledby={`${id}-title`}>
            <p className="case-section-kicker">{kicker || title}</p>
            <h2 id={`${id}-title`}>{title}</h2>
            {children}
        </section>
    );
}

function ProjectSelector({ selectedId, onSelect }) {
    if (caseStudies.length <= 1) return null;

    return (
        <section className="case-selector" aria-label="Choose a case study">
            {caseStudies.map((caseStudy) => (
                <button
                    className={caseStudy.id === selectedId ? "is-active" : ""}
                    type="button"
                    key={caseStudy.id}
                    onClick={() => onSelect(caseStudy.id)}
                    aria-pressed={caseStudy.id === selectedId}
                >
                    <span>{caseStudy.category}</span>
                    <strong>{caseStudy.shortTitle}</strong>
                    <small>{caseStudy.role}</small>
                </button>
            ))}
        </section>
    );
}

function Snapshot({ items }) {
    return (
        <dl className="case-snapshot-grid">
            {items.map((item) => (
                <div key={`${item.label}-${item.value}`}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function TableOfContents({ activeSection, availableSections, onNavigate }) {
    return (
        <nav className="case-toc" aria-label="Case study sections">
            <p>Sections</p>
            <div>
                {availableSections.map(([id, label]) => (
                    <a
                        className={activeSection === id ? "is-active" : ""}
                        href={`#${id}`}
                        key={id}
                        onClick={(event) => onNavigate(event, id)}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </nav>
    );
}

function ArchitectureDiagram({ architecture }) {
    return (
        <figure className="case-diagram">
            <figcaption>{architecture.description}</figcaption>
            <div className="case-diagram-grid" aria-label="Simplified public architecture diagram">
                {architecture.nodes.map((node, index) => (
                    <div className="case-diagram-node" key={node.label}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <strong>{node.label}</strong>
                        <p>{node.detail}</p>
                    </div>
                ))}
            </div>
        </figure>
    );
}

function ProcessTimeline({ items }) {
    return (
        <ol className="case-timeline">
            {items.map((item, index) => (
                <li key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

function CodeHighlight({ snippet }) {
    const [copyState, setCopyState] = useState("idle");
    const timeoutRef = useRef(null);

    useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    const copyCode = async () => {
        window.clearTimeout(timeoutRef.current);

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error("Clipboard API unavailable");
            }

            await navigator.clipboard.writeText(snippet.code);
            setCopyState("copied");
        } catch (error) {
            setCopyState("failed");
        }

        timeoutRef.current = window.setTimeout(() => setCopyState("idle"), 2200);
    };

    const label = copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy";

    return (
        <article className="case-code-card">
            <div className="case-code-header">
                <div>
                    <span>{snippet.language}</span>
                    <h3>{snippet.title}</h3>
                    <p>{snippet.context}</p>
                </div>
                <button type="button" onClick={copyCode} aria-label={`Copy ${snippet.title} code`}>
                    <FontAwesomeIcon icon={copyState === "copied" ? faCheck : faCopy} />
                    {label}
                </button>
            </div>
            <p>{snippet.explanation}</p>
            <pre tabIndex="0">
                <code>{snippet.code}</code>
            </pre>
            <span className="sr-only" role="status" aria-live="polite">
                {copyState === "copied" ? "Code copied." : copyState === "failed" ? "Code could not be copied." : ""}
            </span>
        </article>
    );
}

function DeviceShowcase({ caseStudy }) {
    return (
        <figure className="case-device-showcase">
            <figcaption>Responsive representation based on the public project card and available logo asset.</figcaption>
            <div className="case-device-row">
                <div className="case-device case-device--desktop">
                    <div>
                        <img src={caseStudy.project.image} alt={`${caseStudy.title} logo preview`} loading="lazy" />
                        <p>{caseStudy.summary}</p>
                    </div>
                </div>
                <div className="case-device case-device--tablet">
                    <div>
                        <img src={caseStudy.project.image} alt="" loading="lazy" />
                        <span>{caseStudy.shortTitle}</span>
                        <p>{caseStudy.category}</p>
                    </div>
                </div>
                <div className="case-device case-device--mobile">
                    <div>
                        <img src={caseStudy.project.image} alt="" loading="lazy" />
                        <span>{caseStudy.shortTitle}</span>
                    </div>
                </div>
            </div>
        </figure>
    );
}

function CaseStudyPage({ theme, onToggleTheme }) {
    const reducedMotion = useReducedMotion();
    const [selectedId, setSelectedId] = useState(() => getCaseStudyById(getProjectIdFromLocation())?.id);
    const [activeSection, setActiveSection] = useState("overview");
    const [progress, setProgress] = useState(0);
    const previousMetaRef = useRef(null);
    const selectedCaseStudy = getCaseStudyById(selectedId);

    const availableSections = useMemo(() => {
        if (!selectedCaseStudy) return [];

        return sectionLabels.filter(([id]) => {
            if (id === "overview") return true;
            if (id === "snapshot") return selectedCaseStudy.snapshot?.length;
            if (id === "context") return selectedCaseStudy.context?.length;
            if (id === "problem") return selectedCaseStudy.problem?.body?.length;
            if (id === "goals") return selectedCaseStudy.goals?.length;
            if (id === "role") return selectedCaseStudy.responsibilities?.length;
            if (id === "process") return selectedCaseStudy.process?.length;
            if (id === "solution") return selectedCaseStudy.solutions?.length;
            if (id === "architecture") return selectedCaseStudy.architecture?.nodes?.length;
            if (id === "flow") return selectedCaseStudy.userFlow?.length;
            if (id === "responsive") return selectedCaseStudy.project?.image;
            if (id === "challenges") return selectedCaseStudy.challenges?.length;
            if (id === "code") return selectedCaseStudy.codeHighlights?.length;
            if (id === "comparison") return selectedCaseStudy.comparisons?.length;
            if (id === "results") return selectedCaseStudy.results?.length;
            if (id === "lessons") return selectedCaseStudy.lessons?.length;
            return false;
        });
    }, [selectedCaseStudy]);

    useEffect(() => {
        const handleRouteChange = () => {
            setSelectedId(getCaseStudyById(getProjectIdFromLocation())?.id);
        };

        window.addEventListener("popstate", handleRouteChange);
        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    useEffect(() => {
        previousMetaRef.current = {
            title: document.title,
            description: getMetaContent("description"),
            ogTitle: getMetaContent("og:title", "property"),
            ogDescription: getMetaContent("og:description", "property"),
            themeColor: getMetaContent("theme-color")
        };

        return () => {
            const previousMeta = previousMetaRef.current;
            if (!previousMeta) return;

            document.title = previousMeta.title;
            if (previousMeta.description) setMetaTag("description", previousMeta.description);
            if (previousMeta.ogTitle) setMetaTag("og:title", previousMeta.ogTitle, "property");
            if (previousMeta.ogDescription) setMetaTag("og:description", previousMeta.ogDescription, "property");
            if (previousMeta.themeColor) setMetaTag("theme-color", previousMeta.themeColor);
        };
    }, []);

    useEffect(() => {
        if (!selectedCaseStudy) return;

        const description =
            `${selectedCaseStudy.shortTitle} case study covering product context, frontend architecture, implementation trade-offs, and lessons learned.`;

        document.title = `${selectedCaseStudy.shortTitle} Case Study | Aditia Nugroho`;
        setMetaTag("description", description);
        setMetaTag("og:title", `${selectedCaseStudy.shortTitle} Case Study | Aditia Nugroho`, "property");
        setMetaTag("og:description", description, "property");
        setMetaTag("theme-color", theme === "dark" ? "#07111f" : "#f8fafc");
    }, [selectedCaseStudy, theme]);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0);
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    useEffect(() => {
        if (!("IntersectionObserver" in window)) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

                if (visibleEntry) setActiveSection(visibleEntry.target.id);
            },
            { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.4] }
        );

        availableSections.forEach(([id]) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [availableSections, selectedId]);

    const selectProject = (projectId) => {
        setSelectedId(getCaseStudyById(projectId)?.id);
        updateProjectUrl(projectId);
        scrollToTop(reducedMotion);
    };

    const navigateSection = (event, sectionId) => {
        event.preventDefault();
        const target = document.getElementById(sectionId);
        if (!target) return;
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        setActiveSection(sectionId);
    };

    if (!selectedCaseStudy) {
        return (
            <div className="case-study-page">
                <main className="case-empty-state">
                    <h1>Project Case Study</h1>
                    <p>No valid case study data is available yet.</p>
                    <a href={APP_ROUTES.root} onClick={navigateToApp}>Back to App Playground</a>
                </main>
            </div>
        );
    }

    const currentIndex = caseStudies.findIndex((caseStudy) => caseStudy.id === selectedCaseStudy.id);
    const previousCaseStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
    const nextCaseStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

    return (
        <div className={`case-study-page case-study-page--${selectedCaseStudy.accent}`}>
            <div className="case-progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${progress})` }} />
            </div>

            <header className="case-topbar">
                <nav aria-label="Case study navigation">
                    <a href={APP_ROUTES.root} onClick={navigateToApp}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        App Playground
                    </a>
                    <span>Project Case Study</span>
                    <div>
                        <a href="/" onClick={navigateToPortfolio}>Main portfolio</a>
                        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                    </div>
                </nav>
            </header>

            <main className="case-main" aria-labelledby="case-study-title">
                <article>
                    <motion.section
                        className="case-hero"
                        id="overview"
                        aria-labelledby="case-study-title"
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                        <div className="case-hero-copy">
                            <p className="case-eyebrow">{selectedCaseStudy.category}</p>
                            <h1 id="case-study-title">{selectedCaseStudy.title}</h1>
                            <p>{selectedCaseStudy.summary}</p>
                            <div className="case-hero-actions">
                                {selectedCaseStudy.project.url && (
                                    <a href={selectedCaseStudy.project.url} target="_blank" rel="noreferrer">
                                        Open live project
                                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </a>
                                )}
                                <a href="#context" onClick={(event) => navigateSection(event, "context")}>
                                    Read case study
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </a>
                            </div>
                        </div>
                        <figure className="case-hero-visual">
                            <img
                                src={selectedCaseStudy.project.image}
                                alt={`${selectedCaseStudy.title} public project preview`}
                                loading="eager"
                            />
                            <figcaption>Existing portfolio asset reused as the public visual anchor.</figcaption>
                        </figure>
                    </motion.section>

                    <ProjectSelector selectedId={selectedCaseStudy.id} onSelect={selectProject} />

                    <div className="case-content-layout">
                        <TableOfContents activeSection={activeSection} availableSections={availableSections} onNavigate={navigateSection} />

                        <div className="case-story">
                            {selectedCaseStudy.confidentialityNote && (
                                <aside className="case-disclosure">
                                    <FontAwesomeIcon icon={faShieldHalved} />
                                    <p>{selectedCaseStudy.confidentialityNote}</p>
                                </aside>
                            )}

                            <Section id="snapshot" title="Project Snapshot" kicker="Overview">
                                <Snapshot items={selectedCaseStudy.snapshot} />
                            </Section>

                            <Section id="context" title="Context">
                                {selectedCaseStudy.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            </Section>

                            <Section id="problem" title="Problem">
                                {selectedCaseStudy.problem.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                <div className="case-highlight-grid">
                                    {selectedCaseStudy.problem.highlights.map((highlight) => (
                                        <div key={highlight}>
                                            <FontAwesomeIcon icon={faListCheck} />
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </Section>

                            <Section id="goals" title="Goals">
                                <ul className="case-check-list">
                                    {selectedCaseStudy.goals.map((goal) => <li key={goal}>{goal}</li>)}
                                </ul>
                            </Section>

                            <Section id="role" title="My Role">
                                <p>
                                    The responsibilities below come from the existing professional experience data for the current Detikcom role.
                                </p>
                                <ul className="case-check-list">
                                    {selectedCaseStudy.responsibilities.map((responsibility) => (
                                        <li key={responsibility}>{responsibility}</li>
                                    ))}
                                </ul>
                            </Section>

                            <Section id="process" title="Development Process" wide>
                                <ProcessTimeline items={selectedCaseStudy.process} />
                            </Section>

                            <Section id="solution" title="Solution Decisions" wide>
                                <div className="case-solution-grid">
                                    {selectedCaseStudy.solutions.map((solution) => (
                                        <article key={solution.title}>
                                            <FontAwesomeIcon icon={faLayerGroup} />
                                            <h3>{solution.title}</h3>
                                            <p><strong>Problem:</strong> {solution.problem}</p>
                                            <p><strong>Approach:</strong> {solution.approach}</p>
                                            <p><strong>Trade-off:</strong> {solution.tradeoff}</p>
                                            <p><strong>Result:</strong> {solution.result}</p>
                                        </article>
                                    ))}
                                </div>
                            </Section>

                            <Section id="architecture" title="Architecture" wide>
                                <ArchitectureDiagram architecture={selectedCaseStudy.architecture} />
                            </Section>

                            <Section id="flow" title="User Flow">
                                <ol className="case-flow">
                                    {selectedCaseStudy.userFlow.map((step) => <li key={step}>{step}</li>)}
                                </ol>
                            </Section>

                            <Section id="responsive" title="Responsive Design" wide>
                                <DeviceShowcase caseStudy={selectedCaseStudy} />
                            </Section>

                            <Section id="challenges" title="Technical Challenges" wide>
                                <div className="case-challenge-grid">
                                    {selectedCaseStudy.challenges.map((challenge) => (
                                        <article key={challenge.title}>
                                            <h3>{challenge.title}</h3>
                                            <p><strong>Options:</strong> {challenge.options}</p>
                                            <p><strong>Decision:</strong> {challenge.decision}</p>
                                            <p><strong>Trade-off:</strong> {challenge.tradeoff}</p>
                                        </article>
                                    ))}
                                </div>
                            </Section>

                            <Section id="code" title="Code Highlights" wide>
                                <div className="case-code-grid">
                                    {selectedCaseStudy.codeHighlights.map((snippet) => (
                                        <CodeHighlight snippet={snippet} key={snippet.title} />
                                    ))}
                                </div>
                            </Section>

                            <Section id="comparison" title="Before and After" wide>
                                <div className="case-comparison-grid">
                                    {selectedCaseStudy.comparisons.map((comparison) => (
                                        <article key={`${comparison.before}-${comparison.after}`}>
                                            <div>
                                                <span>Before</span>
                                                <p>{comparison.before}</p>
                                            </div>
                                            <div>
                                                <span>After</span>
                                                <p>{comparison.after}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </Section>

                            <Section id="results" title="Results">
                                <ul className="case-check-list">
                                    {selectedCaseStudy.results.map((result) => <li key={result}>{result}</li>)}
                                </ul>
                            </Section>

                            <Section id="lessons" title="Lessons Learned">
                                <ul className="case-check-list">
                                    {selectedCaseStudy.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
                                </ul>
                            </Section>

                            <footer className="case-footer">
                                <div>
                                    {previousCaseStudy && (
                                        <button type="button" onClick={() => selectProject(previousCaseStudy.id)}>
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                            {previousCaseStudy.shortTitle}
                                        </button>
                                    )}
                                    {nextCaseStudy && (
                                        <button type="button" onClick={() => selectProject(nextCaseStudy.id)}>
                                            {nextCaseStudy.shortTitle}
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    )}
                                </div>
                                <a href={APP_ROUTES.root} onClick={navigateToApp}>Return to App Playground</a>
                                <p>
                                    <FontAwesomeIcon icon={faDiagramProject} />
                                    Diagrams are simplified public representations. Code examples are sanitized.
                                    <FontAwesomeIcon icon={faCode} />
                                </p>
                            </footer>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}

export default CaseStudyPage;
