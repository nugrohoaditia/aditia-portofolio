import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";
import { getResumeUrl } from "../data";

function About({ copy, language }) {
    return (
        <Section
            id="about"
            eyebrow={copy.eyebrow}
            title={copy.title}
            tone="muted"
        >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-xl border border-slate-200/90 bg-white p-7 shadow-sm transition duration-300 hover:border-marine/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-mint/40 sm:p-8">
                    {copy.paragraphs.map((paragraph, index) => (
                        <p className={`${index > 0 ? "mt-5 " : ""}text-lg leading-8 text-slate-600 dark:text-slate-300`} key={paragraph}>
                            {paragraph}
                        </p>
                    ))}
                    <a href={getResumeUrl(language)} download className="btn-primary mt-7">
                        <FontAwesomeIcon icon={faDownload} />
                        {copy.resumeButton}
                    </a>
                </div>
                <div className="grid gap-4">
                    {copy.tiles.map(([label, value]) => (
                        <div className="info-tile" key={label}>
                            <span>{label}</span>
                            <strong>{value}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default About;
