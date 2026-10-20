import { fireEvent, render, screen } from "@testing-library/react";
import AppPlaygroundPage from "../app/AppPlaygroundPage";
import AppCard from "../app/components/AppCard";
import AppPreview from "../app/components/AppPreview";
import AppRoadmap from "../app/components/AppRoadmap";
import AppStatusBadge from "../app/components/AppStatusBadge";
import FeaturedAppCard from "../app/components/FeaturedAppCard";
import { getAvailablePortfolioApps, getInProgressPortfolioApps, getRoadmapPortfolioApps, portfolioApps } from "../app/data/portfolioApps";

const sampleApp = {
    id: "sample",
    title: "Sample App",
    route: "/app/sample",
    description: "Sample description for an internal app card.",
    category: "Engineering Labs",
    status: "ready",
    technologies: ["React"],
    previewType: "cinematic-portfolio"
};

beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    }));
});

test("app registry returns only enabled apps sorted by order", () => {
    try {
        portfolioApps.push(
            {
                ...sampleApp,
                id: "later",
                title: "Later App",
                enabled: true,
                order: 3
            },
            {
                ...sampleApp,
                id: "earlier",
                title: "Earlier App",
                enabled: true,
                order: 0
            },
            {
                ...sampleApp,
                id: "hidden",
                title: "Hidden App",
                enabled: false,
                order: -1
            }
        );

        expect(getAvailablePortfolioApps().map((app) => app.id)).toEqual([
            "earlier", "daso", "sinyalrasa", "dapur-utieira", "later", "super-kid-math", "animated", "newsroom-dashboard"
        ]);
    } finally {
        portfolioApps.splice(-3, 3);
    }
});

test("app preview renders a fallback visual for unknown preview types", () => {
    const { container } = render(<AppPreview type="unknown" />);

    expect(container.querySelector(".app-preview-visual--empty")).toBeInTheDocument();
});

test("app preview renders a public product screenshot", () => {
    render(<AppPreview type="screenshot" asset="/assets/images/apps/daso.webp" title="DASO" />);
    expect(screen.getByAltText("DASO website preview")).toHaveAttribute("src", "/assets/images/apps/daso.webp");
});

test("app preview renders a lightweight newsroom dashboard visual", () => {
    const { container } = render(<AppPreview type="newsroom-dashboard" />);

    expect(container.querySelector(".app-preview-visual--newsroom")).toBeInTheDocument();
    expect(container.querySelector(".app-newsroom-preview-shell")).toBeInTheDocument();
    expect(container.querySelector(".app-preview-visual--newsroom")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("button, a, input, select")).toHaveLength(0);
});

test("app status badge falls back to concept for unknown statuses", () => {
    render(<AppStatusBadge status="not-a-status" />);

    expect(screen.getByText("Concept")).toBeInTheDocument();
});

test("app card uses SPA navigation for normal clicks", () => {
    const onNavigate = jest.fn();
    render(<AppCard app={sampleApp} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("link", { name: /sample app/i }));

    expect(onNavigate).toHaveBeenCalledWith("/app/sample");
});

test("external product cards open safely without SPA navigation", () => {
    const onNavigate = jest.fn();
    render(<AppCard app={portfolioApps[1]} onNavigate={onNavigate} />);
    const link = screen.getByRole("link", { name: /open sinyalrasa/i });
    expect(link).toHaveAttribute("href", "https://sinyalrasa.me/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(onNavigate).not.toHaveBeenCalled();
});

test("app card keeps default link behavior when navigation is unavailable or modified", () => {
    const onNavigate = jest.fn();
    const { rerender } = render(<AppCard app={sampleApp} />);

    fireEvent.click(screen.getByRole("link", { name: /sample app/i }));

    rerender(<AppCard app={sampleApp} onNavigate={onNavigate} />);

    const link = screen.getByRole("link", { name: /sample app/i });
    fireEvent.click(link, { metaKey: true });
    fireEvent.click(link, { ctrlKey: true });
    fireEvent.click(link, { shiftKey: true });
    fireEvent.click(link, { altKey: true });

    const preventedEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    preventedEvent.preventDefault();
    fireEvent(link, preventedEvent);

    expect(onNavigate).not.toHaveBeenCalled();
});

test("featured app card supports normal SPA navigation and modified link behavior", () => {
    const onNavigate = jest.fn();
    render(<FeaturedAppCard app={{ ...sampleApp, actionLabel: "Open Experience", releaseLabel: "Live app" }} onNavigate={onNavigate} reducedMotion />);

    const link = screen.getByRole("link", { name: /open experience/i });
    fireEvent.click(link);
    fireEvent.click(link, { metaKey: true });
    fireEvent.click(link, { ctrlKey: true });
    fireEvent.click(link, { shiftKey: true });
    fireEvent.click(link, { altKey: true });

    const preventedEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    preventedEvent.preventDefault();
    fireEvent(link, preventedEvent);

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledWith("/app/sample");
});

test("featured app card falls back to the default action label", () => {
    render(<FeaturedAppCard app={sampleApp} onNavigate={jest.fn()} reducedMotion />);

    expect(screen.getByRole("link", { name: /open app/i })).toHaveAttribute("href", "/app/sample");
});

test("featured DASO action is a safe external link", () => {
    const onNavigate = jest.fn();
    render(<FeaturedAppCard app={portfolioApps[0]} onNavigate={onNavigate} reducedMotion />);
    const link = screen.getByRole("link", { name: /explore daso/i });
    expect(link).toHaveAttribute("href", "https://daso.web.id/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(onNavigate).not.toHaveBeenCalled();
});

test("roadmap returns no section when there are no planned apps", () => {
    const { container } = render(<AppRoadmap apps={[]} />);

    expect(container).toBeEmptyDOMElement();
});

test("app playground metadata is applied and restored", () => {
    document.head.innerHTML = `
        <meta name="description" content="Previous description" />
        <meta property="og:title" content="Previous OG title" />
        <meta property="og:description" content="Previous OG description" />
        <meta name="theme-color" content="#ffffff" />
    `;
    document.title = "Previous title";

    const { unmount } = render(<AppPlaygroundPage theme="light" onToggleTheme={jest.fn()} />);

    expect(document.title).toBe("App Playground | Aditia Nugroho");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
        "content",
        "Explore Aditia Nugroho's independent digital products, interactive portfolio experiences, and work in progress."
    );

    unmount();

    expect(document.title).toBe("Previous title");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", "Previous description");
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute("content", "Previous OG title");
    expect(document.head.querySelector('meta[property="og:description"]')).toHaveAttribute(
        "content",
        "Previous OG description"
    );
    expect(document.head.querySelector('meta[name="theme-color"]')).toHaveAttribute("content", "#ffffff");
});

test("app playground groups nonfeatured apps when the registry grows", () => {
    try {
        portfolioApps.push(
            {
                ...sampleApp,
                id: "standard-one",
                title: "Standard One",
                enabled: true,
                featured: false,
                order: 2
            },
            {
                ...sampleApp,
                id: "standard-two",
                title: "Standard Two",
                enabled: true,
                featured: false,
                order: 3
            }
        );

        render(<AppPlaygroundPage theme="light" onToggleTheme={jest.fn()} />);

        expect(screen.getByRole("link", { name: /standard one/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /standard two/i })).toBeInTheDocument();
    } finally {
        portfolioApps.splice(-2, 2);
    }
});

test("enabled app registry entries are complete and unique", () => {
    const enabledApps = getAvailablePortfolioApps();
    const ids = enabledApps.map((app) => app.id);
    const newsroomEntries = portfolioApps.filter((app) => app.id === "newsroom-dashboard");

    expect(new Set(ids).size).toBe(ids.length);
    expect(newsroomEntries).toHaveLength(1);

    enabledApps.forEach((app) => {
        expect(app.route || app.externalUrl).toMatch(/^(\/app\/|https:\/\/)/);
        expect(app.title).toBeTruthy();
        expect(app.description).toBeTruthy();
        expect(["live", "ready", "beta", "inDevelopment", "concept", "archived"]).toContain(app.status);
        expect(app.category).toBeTruthy();
    });
});

test("daycare is only an in-progress story without a link", () => {
    expect(getInProgressPortfolioApps().map((app) => app.id)).toEqual(["daycare-attendance"]);
    expect(getRoadmapPortfolioApps().map((app) => app.id)).toEqual(["performance-lab", "tech-stack-galaxy"]);
    render(<AppPlaygroundPage theme="light" onToggleTheme={jest.fn()} />);
    const story = screen.getByText("Daycare Attendance").closest("article");
    expect(story).toHaveTextContent("In development");
    expect(story.querySelector("a, button")).toBeNull();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Live independent products")).toBeInTheDocument();
});

test("in-progress stories follow their configured order", () => {
    try {
        portfolioApps.push({ ...portfolioApps.find((app) => app.id === "daycare-attendance"), id: "later-story", order: 50 });
        expect(getInProgressPortfolioApps().map((app) => app.id)).toEqual(["daycare-attendance", "later-story"]);
    } finally {
        portfolioApps.pop();
    }
});

test("app playground renders immediate content for reduced-motion users", () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    }));

    render(<AppPlaygroundPage theme="dark" onToggleTheme={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "App Playground" })).toBeInTheDocument();
});
