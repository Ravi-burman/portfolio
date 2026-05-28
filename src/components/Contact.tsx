"use client";

import { useState } from "react";
import { Mail, MapPin, Check, Send, TriangleAlert } from "lucide-react";
import confetti from "canvas-confetti";

// Custom SVG components for social brand icons
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  const validateField = (name: string, val: string) => {
    let err = "";
    if (name === "name" && !val.trim()) err = "Name is required";
    if (name === "email") {
      if (!val.trim()) {
        err = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        err = "Invalid email format";
      }
    }
    if (name === "subject" && !val.trim()) err = "Subject is required";
    if (name === "message" && !val.trim()) err = "Message is required";

    setErrors((prev) => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isSubjectValid = validateField("subject", formData.subject);
    const isMessageValid = validateField("message", formData.message);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Trigger cinematic particle confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#00BCD4", "#BB86FC", "#FDD663"],
        });

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});

        // Clear success notification after 5s
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    } else {
      setIsSubmitting(false);
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 600); // clear shake
    }
  };

  return (
    <section
      id="contact"
      aria-label="Airlock Space Station Contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      {/* Structural Space Airlock rivets background lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-md-outline/30 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-md-outline/10 to-transparent" />

      <div className="max-w-7xl w-full flex flex-col gap-16 relative z-10">
        {/* Title */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono text-md-primary tracking-[0.2em] mb-2">
            SYSTEM DIRECTORY: /CONTACT
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            TRANSMISSION TERMINAL
          </h2>
          <div className="w-16 h-1 bg-md-primary mt-4 rounded-full" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Transmission Channels */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Mission Channels
              </h3>
              <p className="text-sm font-light text-md-on-surface-var/80 leading-relaxed max-w-sm">
                Open communication ports for recruitment briefings, technical collaboration, or engineering feedback.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:raviburman98@gmail.com"
                className="interactive-element glass-panel p-4 rounded-xl border border-md-outline/25 flex items-center gap-4 transition-all duration-300 hover:border-md-primary hover:translate-x-1"
                style={{ background: "rgba(8, 20, 38, 0.4)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-md-primary/10 border border-md-primary/25 flex items-center justify-center text-md-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-md-on-surface-var/50 uppercase">
                    Comms Relay Email
                  </span>
                  <span className="text-sm font-mono text-white font-semibold break-all">
                    raviburman98@gmail.com
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ravi-burman-943536170/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-element glass-panel p-4 rounded-xl border border-md-outline/25 flex items-center gap-4 transition-all duration-300 hover:border-md-primary hover:translate-x-1"
                style={{ background: "rgba(8, 20, 38, 0.4)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-md-primary/10 border border-md-primary/25 flex items-center justify-center text-md-primary">
                  <LinkedinIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-md-on-surface-var/50 uppercase">
                    LinkedIn Frequency
                  </span>
                  <span className="text-sm font-mono text-white font-semibold">
                    ravi-burman-943536170
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Ravi-burman"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-element glass-panel p-4 rounded-xl border border-md-outline/25 flex items-center gap-4 transition-all duration-300 hover:border-md-primary hover:translate-x-1"
                style={{ background: "rgba(8, 20, 38, 0.4)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-md-primary/10 border border-md-primary/25 flex items-center justify-center text-md-primary">
                  <GithubIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-md-on-surface-var/50 uppercase">
                    GitHub Matrix Repository
                  </span>
                  <span className="text-sm font-mono text-white font-semibold">
                    Ravi-burman
                  </span>
                </div>
              </a>

              {/* Location */}
              <div
                className="glass-panel p-4 rounded-xl border border-md-outline/25 flex items-center gap-4 cursor-default"
                style={{ background: "rgba(8, 20, 38, 0.4)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-md-primary/10 border border-md-primary/25 flex items-center justify-center text-md-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-md-on-surface-var/50 uppercase">
                    Sector Location
                  </span>
                  <span className="text-sm font-mono text-white font-semibold">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className={`glass-panel p-6 md:p-8 rounded-2xl border border-md-outline/35 flex flex-col gap-6 relative overflow-hidden transition-transform duration-300 ${
                shakeForm ? "animate-[shake_0.5s_ease-in-out]" : ""
              }`}
            >
              <div className="scanlines absolute inset-0 z-0 opacity-15" />

              <h3 className="font-display text-xl font-bold text-white relative z-10">
                Send Transmission
              </h3>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-md-on-surface-var/80">
                    Your Identifier (Name)
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Commander Shepard"
                      className={`w-full px-4 py-3 rounded-lg font-mono text-sm bg-md-surface-variant/40 border text-white transition-all focus:outline-none focus:bg-md-surface-variant/60 ${
                        errors.name
                          ? "border-md-error focus:border-md-error"
                          : formData.name && !errors.name
                          ? "border-emerald-500/50 focus:border-emerald-500"
                          : "border-md-outline focus:border-md-primary"
                      }`}
                    />
                    {formData.name && !errors.name && (
                      <Check className="absolute right-3 top-3 w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  {errors.name && (
                    <span className="text-[10px] font-mono text-md-error flex items-center gap-1 mt-0.5">
                      <TriangleAlert className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-md-on-surface-var/80">
                    Transmission Frequency (Email)
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. user@nexus.com"
                      className={`w-full px-4 py-3 rounded-lg font-mono text-sm bg-md-surface-variant/40 border text-white transition-all focus:outline-none focus:bg-md-surface-variant/60 ${
                        errors.email
                          ? "border-md-error focus:border-md-error"
                          : formData.email && !errors.email
                          ? "border-emerald-500/50 focus:border-emerald-500"
                          : "border-md-outline focus:border-md-primary"
                      }`}
                    />
                    {formData.email && !errors.email && (
                      <Check className="absolute right-3 top-3 w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  {errors.email && (
                    <span className="text-[10px] font-mono text-md-error flex items-center gap-1 mt-0.5">
                      <TriangleAlert className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <label htmlFor="subject" className="text-xs font-mono text-md-on-surface-var/80">
                  Relay Subject
                </label>
                <div className="relative">
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Enterprise Collaboration Opportunity"
                    className={`w-full px-4 py-3 rounded-lg font-mono text-sm bg-md-surface-variant/40 border text-white transition-all focus:outline-none focus:bg-md-surface-variant/60 ${
                      errors.subject
                        ? "border-md-error focus:border-md-error"
                        : formData.subject && !errors.subject
                        ? "border-emerald-500/50 focus:border-emerald-500"
                        : "border-md-outline focus:border-md-primary"
                    }`}
                  />
                  {formData.subject && !errors.subject && (
                    <Check className="absolute right-3 top-3 w-4 h-4 text-emerald-500" />
                  )}
                </div>
                {errors.subject && (
                  <span className="text-[10px] font-mono text-md-error flex items-center gap-1 mt-0.5">
                    <TriangleAlert className="w-3 h-3" /> {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <label htmlFor="message" className="text-xs font-mono text-md-on-surface-var/80">
                  Data Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your transmission details..."
                    className={`w-full px-4 py-3 rounded-lg font-mono text-sm bg-md-surface-variant/40 border text-white transition-all focus:outline-none focus:bg-md-surface-variant/60 resize-none ${
                      errors.message
                        ? "border-md-error focus:border-md-error"
                        : formData.message && !errors.message
                        ? "border-emerald-500/50 focus:border-emerald-500"
                        : "border-md-outline focus:border-md-primary"
                    }`}
                  />
                </div>
                {errors.message && (
                  <span className="text-[10px] font-mono text-md-error flex items-center gap-1 mt-0.5">
                    <TriangleAlert className="w-3 h-3" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="interactive-element w-full py-3.5 rounded-lg text-sm font-semibold tracking-wider font-mono bg-gradient-to-r from-md-primary to-md-secondary text-md-on-primary hover:shadow-[0_0_20px_var(--color-md-primary)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 relative z-10"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING PACKETS...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND TRANSMISSION</span>
                  </>
                )}
              </button>

              {/* Success notification overlay */}
              {submitSuccess && (
                <div className="absolute inset-0 bg-md-surface-container/95 flex flex-col items-center justify-center text-center p-6 z-20">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 mb-4 animate-[scale-in_0.4s_var(--motion-spring)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="font-display text-lg font-bold text-white mb-2">
                    Transmission Relayed!
                  </span>
                  <p className="text-sm font-mono text-md-on-surface-var max-w-sm">
                    Packets securely queued for delivery to Sector: Ravi Burman. Relaying acknowledgment...
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
