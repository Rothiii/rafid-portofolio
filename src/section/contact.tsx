"use client";
import { socialLinks } from "@/data/contact";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-t from-black/30 via-transparent to-transparent"
    >
      <div className="container mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            "Got a cool project idea? Want to collaborate? Or just want to say
            hi? Drop me a line!"
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Yapping */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let's Connect! 🤝
              </h3>

              <div className="space-y-4 text-white/80">
                <p>
                  I'm always excited to discuss new opportunities, collaborate
                  on interesting projects, or simply chat about technology and
                  innovation.
                </p>

                <p>
                  Whether you're looking for a developer to join your team, have
                  a project idea you'd like to explore, or want to share
                  knowledge and experiences, I'd love to hear from you!
                </p>

                <p>
                  Feel free to reach out through any of the platforms listed
                  here. I typically respond within 24 hours and I'm always open
                  to meaningful conversations.
                </p>

                <div className="pt-4">
                  <p className="text-accent font-medium">
                    "The best way to predict the future is to create it." -
                    Let's create something amazing together! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact List */}
          <div className="space-y-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{social.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg">
                      {social.name}
                    </h4>
                    <p className="text-white/70">{social.handle}</p>
                  </div>
                  <span className="text-accent">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Send Email Button */}
        <div className="text-center mt-12">
          <Link href="/contact">
            <button className="px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors duration-200">
              Send Me a Message
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
