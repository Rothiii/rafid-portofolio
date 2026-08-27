import { socialLinks } from "@/data/contact";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="contact"
          description="Open to full-time Backend / DevOps roles. I typically respond within 24 hours."
        />

        <div className="max-w-2xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-4 group hover:text-accent transition-colors"
            >
              <span className="text-xl text-accent">{social.icon}</span>
              <div className="flex-1">
                <span className="font-semibold">{social.name}</span>
                <span className="text-theme-fg/50 text-sm ml-2 font-primary">
                  {social.handle}
                </span>
              </div>
              <span className="text-theme-fg/40 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </span>
            </a>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-300 text-sm font-medium"
        >
          Send a message
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
