import Section from "./Section";
import { experiences } from "../data";

function Experience() {
    return (
        <Section id="experience" eyebrow="Experience" title="Professional work history from frontend platforms to ERP integration.">
            <div className="grid gap-5">
                {experiences.map((experience) => (
                    <article className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-[14rem_1fr] dark:border-slate-800 dark:bg-slate-900" key={experience.company}>
                        <div className="border-b border-slate-200 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6 dark:border-slate-800">
                            <span className="block text-sm font-black text-marine dark:text-mint">{experience.period}</span>
                            <strong className="mt-2 block text-sm text-slate-500 dark:text-slate-400">{experience.location}</strong>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-ink dark:text-white">{experience.company}</h3>
                            <p className="mt-1 font-extrabold text-marine dark:text-mint">{experience.title}</p>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{experience.description}</p>
                            <ul className="mt-4 grid gap-2 pl-5 text-slate-600 marker:text-marine dark:text-slate-300">
                                {experience.responsibilities.map((item) => (
                                    <li className="list-disc leading-7" key={item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="tag-row mt-5">
                                {experience.technologies.map((technology) => (
                                    <span key={technology}>{technology}</span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}

export default Experience;
