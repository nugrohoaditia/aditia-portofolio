import { education, experiences, profile, projects, skillGroups } from "../../../data";

export const animatedProfile = {
    ...profile,
    pageTitle: "Animated",
    intro:
        "A cinematic portfolio view for a senior software engineer focused on React, PHP, high-traffic web platforms, API integration, clean code, and reliable product delivery.",
    status: "Open to Senior Software Engineer, Technical Lead, and product collaboration roles",
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
        value: "8",
        suffix: "+",
        label: "Years of web engineering experience",
        detail: "From client websites to enterprise systems and high-traffic media platforms."
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
