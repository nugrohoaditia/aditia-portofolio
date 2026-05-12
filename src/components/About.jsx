import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";
import { profile } from "../data";

function About() {
    return (
        <Section
            id="about"
            eyebrow="About Me"
            title="Reliable web platforms for media, ERP, and digital products."
            tone="muted"
        >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                        I am a Software Engineer focused on React, PHP, frontend website development, API integration, and system
                        optimization. My work includes high-traffic media platforms, Oracle EBS integration, reusable frontend and
                        backend modules, unit testing, and production issue handling.
                    </p>
                    <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        I currently work at PT. Trans Digital Media (Detikcom) as a Web Developer on frontend websites. I help ship
                        production-ready features for high-traffic digital platforms while collaborating across product, design, QA,
                        and backend teams to keep applications reliable and scalable.
                    </p>
                    <a href={profile.resumeUrl} download className="btn-primary mt-7">
                        <FontAwesomeIcon icon={faDownload} />
                        Download Resume
                    </a>
                </div>
                <div className="grid gap-4">
                    <div className="info-tile">
                        <span>Current Role</span>
                        <strong>Web Developer (Frontend Website), PT. Trans Digital Media (Detikcom)</strong>
                    </div>
                    <div className="info-tile">
                        <span>Core Stack</span>
                        <strong>PHP, React JS, JavaScript, SQL, HTML5, CSS3, MySQL, REST API Integration</strong>
                    </div>
                    <div className="info-tile">
                        <span>Focus</span>
                        <strong>High-traffic platforms, API integration, system optimization, and digital transformation</strong>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default About;
