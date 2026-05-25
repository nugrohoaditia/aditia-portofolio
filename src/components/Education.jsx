import Section from "./Section";

function Education({ content }) {
    return (
        <Section id="education" eyebrow={content.eyebrow} title={content.title}>
            <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
                <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <img
                        className="mx-auto h-auto w-full max-w-[14rem] dark:rounded-md dark:bg-white dark:p-3"
                        src={content.items[0].logo}
                        alt="Bina Nusantara University logo"
                    />
                    <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {content.aside}
                    </p>
                </aside>
                <div className="relative border-l-2 border-mint/70 pl-7 dark:border-marine">
                    {content.items.map((item) => (
                        <article className="timeline-item" key={item.degree}>
                            <h3 className="text-xl font-black text-ink dark:text-white">{item.degree}</h3>
                            <p className="mt-2 font-bold text-slate-700 dark:text-slate-200">{item.institution}</p>
                            <p className="mt-1 text-slate-600 dark:text-slate-300">
                                {item.period} | {content.gpaLabel}: {item.gpa}
                            </p>
                            <p className="mt-1 text-slate-600 dark:text-slate-300">{item.focus}</p>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default Education;
