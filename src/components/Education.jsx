import Section from "./Section";
import { education } from "../data";

function Education() {
    return (
        <Section id="education" eyebrow="Education" title="Academic foundation in information systems and computer science.">
            <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
                <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                    <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mint/20 text-2xl font-black text-ink dark:bg-marine/30 dark:text-mint">
                            BINUS
                        </div>
                        <p className="mt-4 text-sm font-extrabold uppercase text-slate-500 dark:text-slate-400">Bina Nusantara University</p>
                    </div>
                </div>
                <div className="relative border-l-2 border-mint/70 pl-7 dark:border-marine">
                    {education.map((item) => (
                        <article className="timeline-item" key={item.degree}>
                            <h3 className="text-xl font-black text-ink dark:text-white">{item.degree}</h3>
                            <p className="mt-2 font-bold text-slate-700 dark:text-slate-200">{item.institution}</p>
                            <p className="mt-1 text-slate-600 dark:text-slate-300">
                                {item.period} | GPA: {item.gpa}
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
