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
            theme={theme}
            onToggleTheme={onToggleTheme}
        />
    );
}

test("renders all primary portfolio sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByText("Software Engineer | React & PHP | High-Traffic Web Platforms")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reliable web platforms/i })).toBeInTheDocument();
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

    render(<HeaderHarness onToggleTheme={onToggleTheme} />);

    expect(screen.getByAltText("Aditia Nugroho logo")).toHaveAttribute("src", "/assets/images/logo_trans.png");
    expect(screen.queryByRole("button", { name: /switch language/i })).not.toBeInTheDocument();

    const menuButton = screen.getByRole("button", { name: /toggle mobile menu/i });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Projects")).toHaveLength(2);
    expect(screen.queryByText("Language")).not.toBeInTheDocument();
    expect(screen.queryByText("Theme")).not.toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: /toggle dark mode/i })[1]);
    expect(onToggleTheme).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByText("Contact")[1]);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("link", { name: /back to home/i }));
});

test("app keeps English language while the language switch is hidden", () => {
    localStorage.setItem("language", "ID");

    render(<App />);

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { name: /reliable web platforms/i })).toBeInTheDocument();
});

test("renders dark logo when dark theme is active", () => {
    render(
        <Header
            copy={translations.EN}
            language="EN"
            theme="dark"
            onToggleTheme={jest.fn()}
        />
    );

    expect(screen.getByAltText("Aditia Nugroho logo")).toHaveAttribute("src", "/assets/images/logo.png");
});
