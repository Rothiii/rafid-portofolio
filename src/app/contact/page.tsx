"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import { info } from "@/data/contact";

import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formData.firstname || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in your first name, email, and message.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message."
      );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeIn" }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[32px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 border border-theme-fg/10 rounded-xl"
            >
              <h1 className="text-4xl text-accent">Get in touch</h1>
              <p className="text-theme-fg/60">
                Open to full-time Backend / DevOps roles. Fill in the form
                below and I&apos;ll get back to you as soon as possible.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className="sr-only">First Name</label>
                  <Input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="sr-only">Last Name</label>
                  <Input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <Input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  className="h-[50px] resize-none overflow-hidden"
                  placeholder="Type your message here."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "50px";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
              </div>

              <Button
                size="md"
                type="submit"
                className="max-w-40"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              <div role="status" aria-live="polite">
                {status === "success" && (
                  <p className="text-green-400 text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>

          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item) => (
                <li key={item.title} className="flex items-center gap-6">
                  <div className="w-[48px] h-[48px] xl:w-[72px] xl:h-[72px] border border-theme-fg/10 text-accent rounded-md flex items-center justify-center">
                    <div className="text-[24px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-theme-fg/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
