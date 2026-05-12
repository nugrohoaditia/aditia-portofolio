import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Header from "../components/Header";

test("renders all primary portfolio sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Aditia Nugroho" })).toBeInTheDocument();
    expect(screen.getByText("Software Engineer | React & PHP | High-Traffic Web Platforms")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reliable web platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /professional work history/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technical skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /major digital platforms/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /academic foundation/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /open to engineering roles/i })).toBeInTheDocument();
});

test("renders CV-backed experience and project content", () => {
    render(<App />);

    expect(screen.getByText("PT. Trans Digital Media (Detikcom)")).toBeInTheDocument();
    expect(screen.getByText("PT. Sigma Cipta Caraka (Telkomsigma)")).toBeInTheDocument();
    expect(screen.getByText("cnnindonesia.com")).toBeInTheDocument();
    expect(screen.getByText("insertlive.com")).toBeInTheDocument();
    expect(screen.getByText("Master of Management Information Systems")).toBeInTheDocument();
});

test("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    const onToggleTheme = jest.fn();

    render(<Header theme="light" onToggleTheme={onToggleTheme} />);

    const menuButton = screen.getByRole("button", { name: /toggle mobile menu/i });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("Projects")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /toggle dark mode/i }));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByText("Contact")[1]);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("link", { name: "Aditia Nugroho" }));
});
