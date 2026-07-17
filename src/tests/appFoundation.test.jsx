import { fireEvent, render, screen } from "@testing-library/react";
import AppCard from "../app/components/AppCard";
import AppPreview from "../app/components/AppPreview";
import AppStatusBadge from "../app/components/AppStatusBadge";
import { getAvailablePortfolioApps, portfolioApps } from "../app/data/portfolioApps";

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

        expect(getAvailablePortfolioApps().map((app) => app.id)).toEqual(["earlier", "animated", "later"]);
    } finally {
        portfolioApps.splice(-3, 3);
    }
});

test("app preview renders a fallback visual for unknown preview types", () => {
    const { container } = render(<AppPreview type="unknown" />);

    expect(container.querySelector(".app-preview-visual--empty")).toBeInTheDocument();
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
