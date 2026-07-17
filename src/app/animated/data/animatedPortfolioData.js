import { education, experiences, profile, projects, skillGroups } from "../../../data";

export const animatedProfile = {
    ...profile,
    pageTitle: "Animated",
    intro:
        "A cinematic portfolio view for a software engineer focused on React, PHP, API integration, production features, and maintainable web platforms.",
    status: "Open to software engineering roles and product collaboration",
    location: "Jakarta, Indonesia",
    links: [
        {
            label: "LinkedIn",
            href: profile.linkedin
        },
        {
            label: "Email",
            href: `mailto:${profile.email}`
        },
        {
            label: "WhatsApp",
            href: `https://wa.me/${profile.whatsapp}`
        }
    ]
};

export const animatedExperiences = experiences;
export const animatedProjects = projects;
export const animatedSkillGroups = skillGroups;
export const animatedEducation = education;

export const animatedHighlights = [
    {
        value: "7",
        suffix: "+",
        label: "Years of web engineering experience",
        detail: "From client websites to enterprise systems and media platforms."
    },
    {
        value: String(projects.length),
        suffix: "",
        label: "Selected platforms shown",
        detail: "Based on projects already listed in the portfolio."
    },
    {
        value: String(skillGroups.reduce((total, group) => total + group.skills.length, 0)),
        suffix: "",
        label: "Technologies and tools grouped",
        detail: "Frontend, backend, integration, testing, and team workflow."
    },
    {
        value: String(experiences.length),
        suffix: "",
        label: "Professional roles",
        detail: "Across media, ERP consulting, client delivery, and internship experience."
    }
];

export const animatedSections = [
    { id: "animated-hero", label: "Intro" },
    { id: "animated-about", label: "About" },
    { id: "animated-experience", label: "Experience" },
    { id: "animated-projects", label: "Projects" },
    { id: "animated-skills", label: "Skills" },
    { id: "animated-education", label: "Education" },
    { id: "animated-highlights", label: "Highlights" },
    { id: "animated-contact", label: "Contact" }
];
