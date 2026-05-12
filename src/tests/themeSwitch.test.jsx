import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import DarkModeToggle from "../components/DarkModeToggle";
import { getNextTheme, calculateAverageSkillLevel } from "../utils";
import { skillGroups } from "../data";

beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
});

test("calculates next theme values", () => {
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("dark")).toBe("light");
});

test("dark mode toggle calls the provided handler", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(<DarkModeToggle theme="light" onToggle={onToggle} />);
    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
});

test("dark mode toggle renders light action when dark mode is active", () => {
    render(<DarkModeToggle theme="dark" onToggle={jest.fn()} />);

    expect(screen.getByRole("button", { name: /toggle dark mode/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Light")).toBeInTheDocument();
});

test("app persists dark and light mode choices", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /toggle dark mode/i });
    await user.click(toggle);

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    await user.click(toggle);

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
});

test("app reads the saved dark theme on startup", () => {
    localStorage.setItem("theme", "dark");

    render(<App />);

    expect(document.documentElement).toHaveClass("dark");
    expect(screen.getByText("Light")).toBeInTheDocument();
});

test("average skill score is calculated from skill data", () => {
    expect(calculateAverageSkillLevel(skillGroups)).toBe(85);
});
