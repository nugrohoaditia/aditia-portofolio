export function getNextTheme(currentTheme) {
    return currentTheme === "dark" ? "light" : "dark";
}

export function calculateAverageSkillLevel(skillGroups) {
    const skills = skillGroups.flatMap((group) => group.skills);
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
}

export function createContactPayload(formValues) {
    return {
        name: formValues.name.trim(),
        email: formValues.email.trim().toLowerCase(),
        message: formValues.message.trim()
    };
}
