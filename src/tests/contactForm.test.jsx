import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../components/ContactForm";
import { createContactPayload } from "../utils";

test("normalizes contact payload values", () => {
    expect(
        createContactPayload({
            name: "  Aditia  ",
            email: "  NUGROHOADITIA46@GMAIL.COM ",
            message: "  Hello there  "
        })
    ).toEqual({
        name: "Aditia",
        email: "nugrohoaditia46@gmail.com",
        message: "Hello there"
    });
});

test("submits contact form with data integrity", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "Aditia Nugroho");
    await user.type(screen.getByLabelText(/email/i), "Aditia@Example.COM");
    await user.type(screen.getByLabelText(/message/i), "Let's build a platform.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(onSubmit).toHaveBeenCalledWith({
        name: "Aditia Nugroho",
        email: "aditia@example.com",
        message: "Let's build a platform."
    });
    expect(screen.getByRole("status")).toHaveTextContent("Thanks, Aditia Nugroho");
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/6281291723823");
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", "mailto:nugrohoaditia46@gmail.com");
});

test("submits contact form when no external submit handler is supplied", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Aditia");
    await user.type(screen.getByLabelText(/email/i), "aditia@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("status")).toHaveTextContent("Thanks, Aditia");
});
