"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "LAUNCH PAD", id: "about" },
  { name: "SKILLS BELT", id: "skills" },
  { name: "SOLAR SYSTEM", id: "projects" },
  { name: "STAR CHART", id: "experience" },
  { name: "DOCKING BAY", id: "contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Viewport Intersection Observer for active state dot mapping
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // triggers when section is in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el && (window as any).lenisInstance) {
      (window as any).lenisInstance.scrollTo(el);
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. TOP HEADER */}
      <header className="fixed top-0 inset-x-0 h-20 bg-md-background/30 backdrop-blur-md border-b border-md-outline-variant/10 z-[49] px-6 md:px-12 flex items-center justify-between">
        {/* Monogram logo */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
            {/* Hexagon logo frame */}
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              stroke="var(--color-md-primary)"
              strokeWidth="4"
              className="group-hover:stroke-md-secondary transition-colors duration-300"
            />
            {/* Initials inside */}
            <text
              x="50"
              y="58"
              textAnchor="middle"
              className="fill-white font-display text-3xl font-black tracking-wide"
            >
              RB
            </text>
          </svg>
          <span className="font-mono text-xs text-glow tracking-widest text-white/80 group-hover:text-md-primary transition-colors">
            COMMANDER.EXE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`nav-dotted-link relative text-glow tracking-[0.15em] font-semibold pb-1.5 transition-colors cursor-crosshair ${
                  isLinkActive ? "text-md-primary" : "text-md-on-surface-var/60 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex items-center justify-center w-10 h-10 border border-md-outline/30 rounded-lg text-md-on-surface-var hover:border-md-primary hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* 2. MOBILE FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#04080F]/98 flex flex-col p-6 overflow-hidden"
          >
            {/* Warp background */}
            <div className="scanlines absolute inset-0 z-0 opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,188,212,0.1),transparent_70%)] pointer-events-none" />

            {/* Menu Header */}
            <div className="flex justify-between items-center h-14 border-b border-md-outline/10 relative z-10">
              <span className="font-mono text-xs text-glow text-md-primary">
                NAVIGATION CORE ACTIVE
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 border border-md-outline/30 rounded-lg text-md-on-surface-var flex items-center justify-center hover:border-md-primary hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  onClick={() => handleNavClick(link.id)}
                  className="font-display text-2xl font-black tracking-wider text-white hover:text-md-primary transition-colors uppercase"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. VERTICAL DOT INDICATOR (Right Edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40 hidden md:flex">
        {["hero", ...navLinks.map((l) => l.id)].map((id) => {
          const isDotActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
              aria-label={`Scroll to ${id}`}
            >
              {/* Tooltip name */}
              <span className="absolute right-8 px-2.5 py-1 rounded bg-md-surface-container border border-md-outline text-[10px] font-mono text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-widest whitespace-nowrap">
                {id === "hero" ? "LAUNCH SITE" : id}
              </span>

              {/* Glowing Active Ring */}
              <div
                className={`absolute inset-0.5 rounded-full border border-md-primary/40 scale-0 transition-transform duration-300 ${
                  isDotActive ? "scale-100" : "group-hover:scale-75"
                }`}
                style={{
                  boxShadow: isDotActive ? "0 0 8px var(--color-md-primary)" : "none",
                }}
              />

              {/* Center Dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isDotActive ? "bg-white scale-125" : "bg-md-on-surface-var/40 group-hover:bg-white"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Dotted underline styles */}
      <style jsx global>{`
        .nav-dotted-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1.5px;
          background-image: radial-gradient(
            circle,
            var(--color-md-primary) 20%,
            transparent 30%
          );
          background-size: 4px 1.5px;
          background-repeat: repeat-x;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: all 0.3s var(--motion-standard);
        }

        .nav-dotted-link:hover::after,
        .nav-dotted-link.relative.text-md-primary::after {
          opacity: 1;
          transform: scaleX(1);
        }
      `}</style>
    </>
  );
}
