import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Header from "../components/Header";
import Projects from "../components/Projects";
import { projects, siteContent } from "../data";

beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
});

test("renders all primary portfolio sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByText("Software Engineer | React & PHP | High-Traffic Web Platforms")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reliable web engineering/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /professional work history/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practical stack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /major digital platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /academic foundation/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reach me directly/i })).toBeInTheDocument();
});

test("renders CV-backed experience and project content", () => {
    render(<App />);

    expect(screen.getByText("PT. Trans Digital Media (Detikcom)")).toBeInTheDocument();
    expect(screen.getByText("PT. Sigma Cipta Caraka (Telkomsigma)")).toBeInTheDocument();
    expect(screen.getByText("cnnindonesia.com")).toBeInTheDocument();
    expect(screen.getByText("insertlive.com")).toBeInTheDocument();
    expect(screen.getByText("Master of Management Information Systems")).toBeInTheDocument();
});

test("renders project image when a project image path is supplied", () => {
    const originalImage = projects[0].image;

    projects[0].image = "/assets/images/projects/cnnindonesia.png";

    render(<Projects content={siteContent.en.projects} />);

    expect(screen.getByAltText("cnnindonesia.com logo")).toHaveAttribute("src", "/assets/images/projects/cnnindonesia.png");

    projects[0].image = originalImage;
});

test("renders project badge fallback when no project image is supplied", () => {
    const originalImage = projects[0].image;

    delete projects[0].image;

    render(<Projects content={siteContent.en.projects} />);

    expect(screen.getByText("CNN")).toBeInTheDocument();

    projects[0].image = originalImage;
});

test("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    const onToggleTheme = jest.fn();
    const onToggleLanguage = jest.fn();

    render(
        <Header
            content={siteContent.en}
            language="en"
            onToggleLanguage={onToggleLanguage}
            theme="light"
            onToggleTheme={onToggleTheme}
        />
    );

    const menuButton = screen.getByRole("button", { name: /toggle mobile menu/i });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Projects")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /toggle mobile language/i }));
    expect(onToggleLanguage).toHaveBeenCalledTimes(1);

    await user.click(menuButton);
    await user.click(screen.getByRole("button", { name: /toggle mobile dark mode/i }));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByText("Contact")[1]);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("link", { name: "Aditia Nugroho" }));
});

test("renders Indonesian mobile menu controls", async () => {
    const user = userEvent.setup();

    render(
        <Header
            content={siteContent.id}
            language="id"
            onToggleLanguage={jest.fn()}
            theme="dark"
            onToggleTheme={jest.fn()}
        />
    );

    await user.click(screen.getByRole("button", { name: /toggle mobile menu/i }));

    expect(screen.getByRole("button", { name: /toggle mobile language/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /toggle mobile dark mode/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("Proyek")).toHaveLength(2);
});

test("switches portfolio copy between English and Indonesian", async () => {
    const user = userEvent.setup();

    render(<App />);

    const languageToggle = screen.getByRole("button", { name: /toggle language/i });
    expect(languageToggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.lang).toBe("en");

    await user.click(languageToggle);

    expect(languageToggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.lang).toBe("id");
    expect(localStorage.getItem("language")).toBe("id");
    expect(screen.getByRole("heading", { name: /rekayasa web/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /lihat pengalaman/i })).toBeInTheDocument();

    await user.click(languageToggle);

    expect(languageToggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("language")).toBe("en");
});

test("reads saved Indonesian language preference on startup", () => {
    localStorage.setItem("language", "id");

    render(<App />);

    expect(document.documentElement.lang).toBe("id");
    expect(screen.getByRole("heading", { name: /rekayasa web/i })).toBeInTheDocument();
});
