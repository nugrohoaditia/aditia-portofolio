import Section from "./Section";
function Experience({ copy, items }) {
    return (
        <Section id="experience" eyebrow={copy.eyebrow} title={copy.title}>
            <div className="grid gap-6">
                {items.map((experience) => (
                    <article className="grid gap-6 rounded-xl border border-slate-200/90 bg-white p-7 shadow-sm transition duration-300 hover:border-marine/40 hover:shadow-md md:grid-cols-[12rem_1fr] dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-mint/40" key={experience.company}>
                        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 md:flex-col md:items-start md:gap-4 md:border-b-0 md:border-r md:pb-0 md:pr-6 dark:border-slate-800">
                            {experience.logo && (
                                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2 shadow-sm md:h-20 md:w-20 md:p-2.5 dark:border-slate-700">
                                    <img
                                        src={experience.logo}
                                        alt={`${experience.company} logo`}
                                        className="h-full w-full object-contain"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            )}
                            <div className="min-w-0">
                                <span className="block text-sm font-black text-marine dark:text-mint">{experience.period}</span>
                                <strong className="mt-2 block text-sm text-slate-500 dark:text-slate-400">{experience.location}</strong>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-ink dark:text-white">{experience.company}</h3>
                            <p className="mt-1 font-extrabold text-marine dark:text-mint">{experience.title}</p>
                            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{experience.description}</p>
                            <ul className="mt-4 space-y-2.5 pl-5 text-slate-600 marker:text-marine dark:text-slate-300 dark:marker:text-mint">
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
