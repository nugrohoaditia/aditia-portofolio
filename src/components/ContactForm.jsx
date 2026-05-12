import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Section from "./Section";
import { profile } from "../data";
import { createContactPayload } from "../utils";

const initialForm = { name: "", email: "", message: "" };

function ContactForm({ onSubmit }) {
    const [formValues, setFormValues] = useState(initialForm);
    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = createContactPayload(formValues);
        onSubmit?.(payload);
        setStatus(`Thanks, ${payload.name}. Your message is ready to send.`);
        setFormValues(initialForm);
    };

    return (
        <Section id="contact" eyebrow="Contact" title="Open to engineering roles, collaboration, and product work.">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="grid content-start gap-4">
                    <a className="contact-link" href={`mailto:${profile.email}`}>
                        {profile.email}
                    </a>
                    <a className="contact-link" href={`tel:+${profile.whatsapp}`}>
                        {profile.phone}
                    </a>
                    <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                        linkedin.com/in/aditianugroho23
                    </a>
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                        <a className="btn-whatsapp" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                            WhatsApp
                        </a>
                        <a className="btn-email" href={`mailto:${profile.email}`}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            Email
                        </a>
                    </div>
                </div>
                <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label>
                            <span>Name</span>
                            <input name="name" type="text" placeholder="Your name" required value={formValues.name} onChange={handleChange} />
                        </label>
                        <label>
                            <span>Email</span>
                            <input name="email" type="email" placeholder="you@example.com" required value={formValues.email} onChange={handleChange} />
                        </label>
                    </div>
                    <label className="mt-5 block">
                        <span>Message</span>
                        <textarea name="message" rows="5" placeholder="Tell me about the opportunity or project" required value={formValues.message} onChange={handleChange} />
                    </label>
                    <button className="btn-primary mt-6 w-full sm:w-auto" type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Send Message
                    </button>
                    {status && (
                        <p className="mt-4 rounded-lg bg-mint/15 px-4 py-3 text-sm font-bold text-marine dark:bg-marine/25 dark:text-mint" role="status">
                            {status}
                        </p>
                    )}
                </form>
            </div>
        </Section>
    );
}

export default ContactForm;
