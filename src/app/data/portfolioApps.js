export const APP_ROUTES = {
    root: "/app",
    animated: "/app/animated",
    newsroom: "/app/newsroom",
    caseStudy: "/app/case-study"
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
        actionLabel: "Open Experience",
        releaseLabel: "Live app",
        accent: "teal",
        enabled: true,
        order: 1
    },
    {
        id: "newsroom-dashboard",
        title: "Newsroom Dashboard",
        shortTitle: "Newsroom",
        route: APP_ROUTES.newsroom,
        description: "A professional newsroom simulation combining editorial workflow management, publishing schedules, audience analytics, breaking-news coordination, and team workload.",
        category: portfolioAppCategories.professionalApplications,
        status: "ready",
        featured: false,
        technologies: ["React", "Framer Motion", "Tailwind CSS", "SVG Charts", "Local Mock Data"],
        previewType: "newsroom-dashboard",
        previewAsset: null,
        actionLabel: "Explore Newsroom",
        releaseLabel: "Interactive Simulation",
        accent: "cyan",
        enabled: true,
        showInRoadmap: false,
        order: 20
    },
    {
        id: "performance-lab",
        title: "Web Performance Lab",
        shortTitle: "Performance",
        route: null,
        description: "A future engineering lab for exploring frontend metrics, rendering behavior, and optimization tradeoffs.",
        category: portfolioAppCategories.engineeringLabs,
        status: "concept",
        featured: false,
        technologies: ["React", "Performance", "UX"],
        previewType: "lab-concept",
        previewAsset: null,
        actionLabel: "Planned",
        releaseLabel: "Concept",
        accent: "violet",
        enabled: false,
        showInRoadmap: true,
        order: 30
    },
    {
        id: "tech-stack-galaxy",
        title: "Tech Stack Galaxy",
        shortTitle: "Galaxy",
        route: null,
        description: "A planned creative view of tools and technologies grouped by how they support real web delivery.",
        category: portfolioAppCategories.creativeExperiments,
        status: "concept",
        featured: false,
        technologies: ["React", "Motion", "Visualization"],
        previewType: "galaxy-concept",
        previewAsset: null,
        actionLabel: "Planned",
        releaseLabel: "Concept",
        accent: "green",
        enabled: false,
        showInRoadmap: true,
        order: 40
    }
];

export function getAvailablePortfolioApps() {
    return portfolioApps
        .filter((app) => app.enabled)
        .sort((first, second) => first.order - second.order);
}

export function getFeaturedPortfolioApps() {
    return getAvailablePortfolioApps().filter((app) => app.featured);
}

export function getRoadmapPortfolioApps() {
    return portfolioApps
        .filter((app) => app.showInRoadmap && !app.enabled)
        .sort((first, second) => first.order - second.order);
}
