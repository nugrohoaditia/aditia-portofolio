import Section from "./Section";
import { skillGroups } from "../data";
import { calculateAverageSkillLevel } from "../utils";

function Skills() {
    const averageSkillLevel = calculateAverageSkillLevel(skillGroups);

    return (
        <Section id="skills" eyebrow="Skills" title="Technical skills used across frontend, backend, databases, and delivery workflows.">
            <div className="mb-6 inline-flex rounded-full bg-mint/15 px-4 py-2 text-sm font-extrabold text-marine dark:bg-marine/25 dark:text-mint">
                Average proficiency: {averageSkillLevel}%
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                {skillGroups.map((group) => (
                    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" key={group.title}>
                        <h3 className="text-xl font-black text-ink dark:text-white">{group.title}</h3>
                        <div className="mt-6 grid gap-4">
                            {group.skills.map((skill) => (
                                <div className="grid gap-2" key={skill.name}>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="inline-flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200">
                                            <b className="flex h-8 min-w-8 items-center justify-center rounded-full bg-mint/20 text-xs text-marine dark:bg-marine/30 dark:text-mint">
                                                {skill.icon}
                                            </b>
                                            {skill.name}
                                        </span>
                                        <span className="text-sm font-extrabold text-slate-500 dark:text-slate-400">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-marine to-mint"
                                            style={{ width: `${skill.level}%` }}
                                            aria-label={`${skill.name} proficiency ${skill.level}%`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}

export default Skills;
