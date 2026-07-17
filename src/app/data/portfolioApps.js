export const APP_ROUTES = {
    root: "/app",
    animated: "/app/animated"
};

export const APP_STATUS = {
    ready: {
        label: "Ready",
        tone: "ready"
    },
    beta: {
        label: "Beta",
        tone: "beta"
    },
    inDevelopment: {
        label: "In development",
        tone: "in-development"
    },
    concept: {
        label: "Concept",
        tone: "concept"
    },
    archived: {
        label: "Archived",
        tone: "archived"
    }
};

export const portfolioAppCategories = {
    portfolioExperience: "Portfolio Experience",
    professionalApplications: "Professional Applications",
    engineeringLabs: "Engineering Labs",
    researchInnovation: "Research and Innovation",
    creativeExperiments: "Creative Experiments"
};

export const portfolioApps = [
    {
        id: "animated",
        title: "Animated Portfolio",
        shortTitle: "Animated",
        route: APP_ROUTES.animated,
        description:
            "A cinematic version of the portfolio with section transitions, project gallery, and focused contact flow.",
        category: portfolioAppCategories.portfolioExperience,
        status: "ready",
        featured: true,
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        previewType: "cinematic-portfolio",
        previewAsset: null,
        enabled: true,
        order: 1
    }
];

export function getAvailablePortfolioApps() {
    return portfolioApps
        .filter((app) => app.enabled)
        .sort((first, second) => first.order - second.order);
}
