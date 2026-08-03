import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Header from "../components/Header";
import Projects from "../components/Projects";
import { getResumeUrl, localizedPortfolioContent, projects } from "../data";
import { translations } from "../i18n";

jest.setTimeout(15000);

beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
    window.history.pushState({}, "", "/");
    window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    }));
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
            writeText: jest.fn().mockResolvedValue()
        }
    });
});

function HeaderHarness({ theme = "light", onToggleTheme = jest.fn() }) {
    return (
        <Header
            copy={translations.EN}
            language="EN"
            onToggleLanguage={jest.fn()}
            theme={theme}
            onToggleTheme={onToggleTheme}
        />
    );
}

test("renders all primary portfolio sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByText("Senior Software Engineer | React & PHP | High-Traffic Web Platforms")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /web development experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /work history/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practical stack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /selected platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /education in management information systems/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reach me directly/i })).toBeInTheDocument();
});

test("renders CV-backed experience and project content", () => {
    render(<App />);

    expect(screen.getByText("PT. Trans Digital Media (Detikcom)")).toBeInTheDocument();
    expect(screen.getByText("PT. Sigma Cipta Caraka (Telkomsigma)")).toBeInTheDocument();
    expect(screen.getByText("cnnindonesia.com")).toBeInTheDocument();
    expect(screen.getByText("insertlive.com")).toBeInTheDocument();
    expect(screen.getByText("Master of Management Information Systems")).toBeInTheDocument();
    expect(screen.getByText(/460\+ development tickets/i)).toBeInTheDocument();
    expect(screen.getByText(/Vertical Video component/i)).toBeInTheDocument();
});

test("renders company logos for every work experience", () => {
    render(<App />);

    Object.values(localizedPortfolioContent).forEach((content) => {
        content.experiences.forEach((experience) => {
            expect(experience.logo).toMatch(/^\/assets\/images\/companies\/.+\.(jpg|png|webp|svg)$/);
        });
    });

    localizedPortfolioContent.EN.experiences.forEach((experience) => {
        expect(screen.getByAltText(`${experience.company} logo`)).toHaveAttribute("src", experience.logo);
    });
});

test("renders the private app route shell without exposing portfolio sections", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/app");

    render(<App />);

    expect(screen.getByRole("navigation", { name: /app navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "< Home" })).toHaveAttribute("href", "/");
    expect(screen.getByLabelText("Experimental apps grid")).toHaveClass("app-grid");
    expect(screen.getByRole("heading", { name: "App Playground" })).toBeInTheDocument();
    const animatedCard = screen.getByRole("link", { name: /open experience/i });
    expect(animatedCard).toHaveAttribute("href", "/app/animated");
    expect(screen.getByRole("link", { name: /open newsroom dashboard/i })).toHaveAttribute("href", "/app/newsroom");
    expect(screen.getAllByText("Newsroom Dashboard")).toHaveLength(1);
    expect(screen.queryByText("Newsroom Dashboard Simulator")).not.toBeInTheDocument();
    expect(screen.getAllByText("Portfolio Experience").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ready").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /start with the live application/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /future experiments/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Aditia Nugroho" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    animatedCard.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
        expect(screen.getByRole("main", { name: /animated portfolio experience/i })).toBeInTheDocument();
    });
});

test("updates the rendered shell when browser history moves into an app child route", async () => {
    const { unmount } = render(<App />);

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();

    act(() => {
        window.history.pushState({}, "", "/app/demo");
        window.dispatchEvent(new PopStateEvent("popstate"));
    });

    await waitFor(() => {
        expect(screen.getByRole("navigation", { name: /app navigation/i })).toBeInTheDocument();
    });

    unmount();
});

test("renders the animated portfolio route with metadata and key sections", async () => {
    window.history.pushState({}, "", "/app/animated");

    render(<App />);

    expect(document.title).toBe("Animated | Aditia Nugroho");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
        "content",
        expect.stringContaining("Animated portfolio experience")
    );
    expect(screen.getByRole("main", { name: /animated portfolio experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experience across media platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cinematic gallery/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /stack shaped by production work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "< Home" })).toHaveAttribute("href", "/app");

    await userEvent.click(screen.getByRole("button", { name: /copy email/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("nugrohoaditia46@gmail.com");
    expect(screen.getByRole("button", { name: /email copied/i })).toBeInTheDocument();
});

test("animated route supports mobile menu, escape close, and theme switching", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/app/animated");

    render(<App />);

    const menuButton = screen.getByRole("button", { name: /open animated page menu/i });
    await user.click(menuButton);

    expect(screen.getByRole("dialog", { name: /animated section menu/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /animated section menu/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));
    expect(document.documentElement).toHaveClass("dark");
});

test("renders the newsroom dashboard route and supports core workflow", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/app/newsroom");

    render(<App />);

    expect(document.title).toBe("Newsroom OS | Aditia Nugroho");
    expect(screen.getAllByRole("link", { name: /app playground/i }).map((link) => link.getAttribute("href"))).toEqual([
        "/app",
        "/app"
    ]);
    expect(screen.getByRole("link", { name: /back to app playground/i })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /editorial command center/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /editorial queue/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /articles/i }));
    expect(screen.getByRole("heading", { name: /search, filter, and inspect stories/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/search articles/i), "AI safety");
    expect(screen.getAllByText("New AI safety guidance reaches schools").length).toBeGreaterThan(0);
    expect(screen.queryByText("Markets steady after regional rate signal")).not.toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Status"), "Writing");
    expect(screen.getByText(/1 article results/i)).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /open article/i })[0]);
    expect(screen.getByRole("dialog", { name: /new ai safety guidance reaches schools/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
        expect(screen.queryByRole("dialog", { name: /new ai safety guidance reaches schools/i })).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /reset/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Filters reset.");

    await user.click(screen.getByRole("button", { name: /activity/i }));
    await user.click(screen.getAllByRole("button", { name: /mark read/i })[0]);
    expect(screen.getByRole("status")).toHaveTextContent("Notification marked as read.");
});

test("newsroom dashboard supports status updates, breaking action, theme, and mobile drawer", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/app/newsroom");

    render(<App />);

    await user.click(screen.getByRole("button", { name: /open newsroom navigation/i }));
    expect(screen.getByRole("dialog", { name: /newsroom mobile navigation/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /close navigation/i }));
    await waitFor(() => {
        expect(screen.queryByRole("dialog", { name: /newsroom mobile navigation/i })).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /editorial queue/i }));
    const moveSelect = screen.getAllByLabelText(/move to/i)[0];
    await user.selectOptions(moveSelect, "Review");
    expect(screen.getByRole("status")).toHaveTextContent("Article moved to Review.");

    await user.click(screen.getByRole("button", { name: /breaking news/i }));
    await user.click(screen.getAllByRole("button", { name: /mark verification complete/i })[0]);
    expect(screen.getByRole("status")).toHaveTextContent("Breaking story verification updated.");

    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));
    expect(document.documentElement).toHaveClass("dark");
});

test("renders the project case study route with project selector and safe metadata", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/app/case-study");

    render(<App />);

    expect(document.title).toBe("CNN Indonesia Case Study | Aditia Nugroho");
    expect(screen.getByRole("heading", { name: "cnnindonesia.com" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /app playground/i })[0]).toHaveAttribute("href", "/app");
    expect(screen.getByRole("navigation", { name: /case study sections/i })).toBeInTheDocument();
    const selector = within(screen.getByLabelText("Choose a case study"));
    expect(selector.getByRole("button", { name: /cnbc indonesia/i })).toHaveAttribute("aria-pressed", "false");
    expect(selector.getByRole("button", { name: /cnn indonesia/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("link", { name: /open live project/i })[0]).toHaveAttribute(
        "rel",
        expect.stringContaining("noreferrer")
    );

    await user.click(selector.getByRole("button", { name: /cnbc indonesia/i }));

    expect(screen.getByRole("heading", { name: "cnbcindonesia.com" })).toBeInTheDocument();
    expect(window.location.search).toBe("?project=cnbc-indonesia");
    expect(selector.getByRole("button", { name: /cnbc indonesia/i })).toHaveAttribute("aria-pressed", "true");
});

test("case study invalid project selection falls back safely and copy code reports success", async () => {
    const user = userEvent.setup();
    const writeText = jest.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    window.history.pushState({}, "", "/app/case-study?project=missing-project");

    render(<App />);

    expect(screen.getByRole("heading", { name: "cnnindonesia.com" })).toBeInTheDocument();
    expect(screen.queryByText("undefined")).not.toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /copy .* code/i })[0]);

    expect(writeText).toHaveBeenCalled();
    expect(screen.getByText("Code copied.")).toBeInTheDocument();
});

test("renders project image when a project image path is supplied", () => {
    render(<Projects copy={translations.EN.projects} />);

    expect(screen.getByAltText("cnnindonesia.com logo")).toHaveAttribute("src", "/assets/images/projects/cnnindonesia.png");
});

test("renders project badge fallback when image is not supplied", () => {
    const storedImage = projects[0].image;
    delete projects[0].image;

    render(<Projects copy={translations.EN.projects} />);

    expect(screen.getByText("CNN")).toBeInTheDocument();

    projects[0].image = storedImage;
});

test("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    const onToggleTheme = jest.fn();
    const onToggleLanguage = jest.fn();

    render(
        <Header
            copy={translations.EN}
            language="EN"
            onToggleLanguage={onToggleLanguage}
            theme="light"
            onToggleTheme={onToggleTheme}
        />
    );

    expect(screen.getByAltText("Aditia Nugroho logo")).toHaveAttribute("src", "/assets/images/logo_trans.png");
    expect(screen.getByRole("button", { name: /switch between english and indonesian/i })).toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: /toggle mobile menu/i });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Projects")).toHaveLength(2);
    expect(screen.queryByText("Theme")).not.toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /switch between english and indonesian/i })[1]);
    expect(onToggleLanguage).toHaveBeenCalledTimes(1);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);
    await user.click(screen.getAllByRole("button", { name: /toggle dark mode/i })[1]);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByText("Contact")[1]);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("link", { name: /back to home/i }));
});

test("switches portfolio copy between English and Indonesian", async () => {
    const user = userEvent.setup();

    render(<App />);

    const languageToggle = screen.getByRole("button", { name: /switch between english and indonesian/i });
    expect(languageToggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).toHaveAttribute("lang", "en");

    await user.click(languageToggle);

    expect(languageToggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveAttribute("lang", "id");
    expect(localStorage.getItem("language")).toBe("ID");
    expect(screen.getByRole("heading", { name: /pengalaman web development/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lihat pengalaman/i })).toBeInTheDocument();
    expect(screen.getByText(/Merampungkan 460\+ tiket development/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /unduh cv/i })[0]).toHaveAttribute("href", getResumeUrl("ID"));
});

test("app reads the saved Indonesian language preference", () => {
    localStorage.setItem("language", "ID");

    render(<App />);

    expect(document.documentElement).toHaveAttribute("lang", "id");
    expect(screen.getByRole("heading", { name: /pengalaman web development/i })).toBeInTheDocument();
});

test("switches from saved Indonesian preference back to English", async () => {
    const user = userEvent.setup();
    localStorage.setItem("language", "ID");

    render(<App />);

    const languageToggle = screen.getByRole("button", { name: /switch between english and indonesian/i });
    await user.click(languageToggle);

    expect(languageToggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(localStorage.getItem("language")).toBe("EN");
});

test("renders dark logo when dark theme is active", () => {
    render(
        <Header
            copy={translations.EN}
            language="EN"
            onToggleLanguage={jest.fn()}
            theme="dark"
            onToggleTheme={jest.fn()}
        />
    );

    expect(screen.getByAltText("Aditia Nugroho logo")).toHaveAttribute("src", "/assets/images/logo.png");
});

test("marks Indonesian language as active in the mobile menu", async () => {
    const user = userEvent.setup();

    render(
        <Header
            copy={translations.ID}
            language="ID"
            onToggleLanguage={jest.fn()}
            theme="light"
            onToggleTheme={jest.fn()}
        />
    );

    await user.click(screen.getByRole("button", { name: /toggle mobile menu/i }));

    const mobileLanguageToggle = screen.getAllByRole("button", { name: /switch between english and indonesian/i })[1];
    expect(mobileLanguageToggle).toHaveAttribute("aria-pressed", "true");
    expect(mobileLanguageToggle.querySelectorAll(".is-active")).toHaveLength(1);
    expect(mobileLanguageToggle.querySelector(".is-active")).toHaveTextContent("ID");
});
