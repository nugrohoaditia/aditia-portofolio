import { render, screen } from "@testing-library/react";
import ContactForm from "../components/ContactForm";

test("renders direct contact actions without an input form", () => {
    render(<ContactForm />);

    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/6281291723823");
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:nugrohoaditia46@gmail.com");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /send message/i })).not.toBeInTheDocument();
});
