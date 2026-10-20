import { render, screen } from "@testing-library/react";
import AppPlaygroundPage from "../app/AppPlaygroundPage";
import Header from "../components/Header";
import Projects from "../components/Projects";
import Section from "../components/Section";
import { translations } from "../i18n";

jest.mock("framer-motion", () => ({
    ...jest.requireActual("framer-motion"),
    useReducedMotion: () => true
}));

test("homepage sections and cards show immediately with reduced motion", () => {
    const { container } = render(
        <>
            <Header copy={translations.EN} language="EN" onToggleLanguage={jest.fn()} theme="light" onToggleTheme={jest.fn()} />
            <Section id="check" eyebrow="Check" title="Visible content"><p>Ready now</p></Section>
            <Projects copy={translations.EN.projects} />
        </>
    );

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByText("Ready now")).toBeInTheDocument();
    expect(container.querySelector("#home")).toBeInTheDocument();
});

test("independent product catalog shows immediately with reduced motion", () => {
    render(<AppPlaygroundPage theme="light" onToggleTheme={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "App Playground" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open SinyalRasa" })).toBeInTheDocument();
});
