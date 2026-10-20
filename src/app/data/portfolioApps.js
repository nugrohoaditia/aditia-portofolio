export const APP_ROUTES = {
    root: "/app",
    animated: "/app/animated",
    newsroom: "/app/newsroom",
    caseStudy: "/app/case-study"
};

export const APP_STATUS = {
    live: {
        label: "Live",
        tone: "ready"
    },
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
    independentProducts: "Independent Products",
    portfolioExperience: "Portfolio Experience",
    professionalApplications: "Professional Applications",
    engineeringLabs: "Engineering Labs",
    researchInnovation: "Research and Innovation",
    creativeExperiments: "Creative Experiments"
};

export const portfolioApps = [
    {
        id: "daso",
        title: "DASO",
        externalUrl: "https://daso.web.id/",
        description: "A short-drama streaming platform for discovering series and continuing episodes across multiple sources.",
        category: portfolioAppCategories.independentProducts,
        status: "live",
        featured: true,
        technologies: ["Streaming", "Discovery", "Responsive Web"],
        previewType: "screenshot",
        previewAsset: "/assets/images/apps/daso.webp",
        actionLabel: "Explore DASO",
        releaseLabel: "Live product",
        enabled: true,
        order: 1
    },
    {
        id: "sinyalrasa",
        title: "SinyalRasa",
        externalUrl: "https://sinyalrasa.me/",
        description: "An Indonesian food publication with recipes, dining guides, reviews, and stories from culinary businesses.",
        category: portfolioAppCategories.independentProducts,
        status: "live",
        featured: false,
        technologies: ["Editorial", "Food Media", "Responsive Web"],
        previewType: "screenshot",
        previewAsset: "/assets/images/apps/sinyalrasa.webp",
        actionLabel: "Visit SinyalRasa",
        enabled: true,
        order: 2
    },
    {
        id: "dapur-utieira",
        title: "Dapur Utieira",
        externalUrl: "https://dapur.sinyalrasa.me/",
        description: "A frozen-food storefront with a searchable menu, product categories, and a shopping cart.",
        category: portfolioAppCategories.independentProducts,
        status: "live",
        featured: false,
        technologies: ["Storefront", "Product Catalog", "Responsive Web"],
        previewType: "screenshot",
        previewAsset: "/assets/images/apps/dapur-utieira.webp",
        actionLabel: "Visit Dapur Utieira",
        enabled: true,
        order: 3
    },
    {
        id: "super-kid-math",
        title: "Super Kid Math / Soal SD",
        externalUrl: "https://soal-sd.aditianugroho.dev/",
        description: "A playful learning site with arithmetic, word problems, vocabulary, and a group quiz mode.",
        category: portfolioAppCategories.independentProducts,
        status: "live",
        featured: false,
        technologies: ["Education", "Interactive Games", "Responsive Web"],
        previewType: "screenshot",
        previewAsset: "/assets/images/apps/super-kid-math.webp",
        actionLabel: "Play Super Kid Math",
        enabled: true,
        order: 4
    },
    {
        id: "daycare-attendance",
        title: "Daycare Attendance",
        description: "Exploring a simpler attendance flow for daycare operations. In development; no public demo yet.",
        category: portfolioAppCategories.independentProducts,
        status: "inDevelopment",
        enabled: false,
        showInProgress: true,
        order: 10
    },
    {
        id: "animated",
        title: "Animated Portfolio",
        shortTitle: "Animated",
        route: APP_ROUTES.animated,
        description:
            "A cinematic version of the portfolio with section transitions, project gallery, and focused contact flow.",
        category: portfolioAppCategories.portfolioExperience,
        status: "ready",
        featured: false,
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        previewType: "cinematic-portfolio",
        previewAsset: null,
        actionLabel: "Open Experience",
        releaseLabel: "Live app",
        accent: "teal",
        enabled: true,
        order: 20
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
        order: 21
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

export function getInProgressPortfolioApps() {
    return portfolioApps
        .filter((app) => app.showInProgress && !app.enabled)
        .sort((first, second) => first.order - second.order);
}
