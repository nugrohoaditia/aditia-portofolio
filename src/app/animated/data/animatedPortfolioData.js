import { education, experiences, profile, projects, skillGroups } from "../../../data";

export const animatedProfile = {
    ...profile,
    pageTitle: "Animated",
    intro:
        "I build and maintain high-traffic media platforms with React, PHP, and JavaScript, bringing production experience to every release.",
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
        label: "Selected media platforms",
        detail: "News and lifestyle products across the Detik network."
    },
    {
        value: "45",
        suffix: "+",
        label: "Critical production issues resolved",
        detail: "Supported by monitoring, investigation, and fixes in production."
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
