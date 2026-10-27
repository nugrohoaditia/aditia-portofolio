import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Section from "./Section";
import { profile } from "../data";

function ContactForm({ copy }) {
    return (
        <Section id="contact" eyebrow={copy.eyebrow} title={copy.title}>
            <div className="grid gap-8 rounded-xl border border-slate-200/90 bg-white p-7 shadow-sm transition duration-300 hover:border-marine/30 hover:shadow-md md:grid-cols-[1fr_auto] md:items-center lg:p-10 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-mint/30">
                <div>
                    <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        {copy.intro}
                    </p>
                    <div className="mt-6 grid gap-3 text-sm font-bold text-slate-600 sm:grid-cols-2 dark:text-slate-300">
                        <span className="inline-flex items-center gap-3">
                            <FontAwesomeIcon className="text-marine dark:text-mint" icon={faPhone} />
                            {profile.phone}
                        </span>
                        <span className="inline-flex items-center gap-3">
                            <FontAwesomeIcon className="text-marine dark:text-mint" icon={faEnvelope} />
                            {profile.email}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
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
        </Section>
    );
}

export default ContactForm;
