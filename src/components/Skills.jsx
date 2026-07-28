import Section from "./Section";
function Skills({ copy, items }) {
    return (
        <Section id="skills" eyebrow={copy.eyebrow} title={copy.title}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((group) => (
                    <article className="skill-panel" key={group.title}>
                        <h3>{group.title}</h3>
                        <p>{group.summary}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <span className="skill-chip" key={skill}>{skill}</span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}

export default Skills;
