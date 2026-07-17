import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Header from "../components/Header";
import Projects from "../components/Projects";
import { projects } from "../data";
import { translations } from "../i18n";

beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
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
    expect(screen.getByText("Software Engineer | React & PHP | Web Platform Development")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /web development experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /work history/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /practical stack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /selected platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /education in information systems/i })).toBeInTheDocument();
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
