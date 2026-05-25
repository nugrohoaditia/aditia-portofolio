import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";
import { profile } from "../data";

function About({ content }) {
    return (
        <Section
            id="about"
            eyebrow={content.eyebrow}
            title={content.title}
            tone="muted"
        >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    {content.paragraphs.map((paragraph, index) => (
                        <p
                            className={`${index > 0 ? "mt-5 " : ""}text-lg leading-8 text-slate-600 dark:text-slate-300`}
                            key={paragraph}
                        >
                            {paragraph}
                        </p>
                    ))}
                    <a href={profile.resumeUrl} download className="btn-primary mt-7">
                        <FontAwesomeIcon icon={faDownload} />
                        {content.resumeAction}
                    </a>
                </div>
                <div className="grid gap-4">
                    {content.tiles.map((tile) => (
                        <div className="info-tile" key={tile.label}>
                            <span>{tile.label}</span>
                            <strong>{tile.value}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default About;
