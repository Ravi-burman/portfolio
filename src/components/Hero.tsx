"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const avatarFrameRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const avatarLines = [
    "Hi, I'm Ravi Burman — a full-stack developer based in Pune.",
    "I build fast, accessible, production-grade web apps.",
    "Specializing in React, Angular & Node.js since 2022.",
    "3.5 years of experience. GCP & AWS cloud certified.",
    "Currently open to exciting new opportunities. Let's connect!",
  ];

  // 1. Text reveal stagger animation
  useEffect(() => {
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter-span");
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          scale: 0.1,
          filter: "brightness(5) blur(10px)",
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(1) blur(0px)",
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  // 2. Avatar speaks typewriter effect loop
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let active = true;

    function typeLoop() {
      if (!active) return;
      const current = avatarLines[lineIndex];

      if (!isDeleting) {
        setTypedText(current.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeLoop, 2500); // pause at full text
          return;
        }
      } else {
        setTypedText(current.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          lineIndex = (lineIndex + 1) % avatarLines.length;
        }
      }
      setTimeout(typeLoop, isDeleting ? 30 : 60);
    }

    typeLoop();

    const cursorBlink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      active = false;
      clearInterval(cursorBlink);
    };
  }, []);

  // 3. Avatar attention pulse
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const triggerPulse = () => {
      if (window.scrollY === 0 && avatarFrameRef.current) {
        avatarFrameRef.current.classList.add("pulse");
        setTimeout(() => {
          if (avatarFrameRef.current) avatarFrameRef.current.classList.remove("pulse");
        }, 1200);
      }
      timer = setTimeout(triggerPulse, 8000);
    };
    timer = setTimeout(triggerPulse, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Handler to scroll smoothly
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && (window as any).lenisInstance) {
      (window as any).lenisInstance.scrollTo(el);
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameString = "RAVI BURMAN";

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-md-on-surface-var/80 font-mono mb-3">
            ⬡ Greetings, Universe. I&apos;m
          </span>

          <h1
            ref={nameRef}
            className="text-glow font-display text-white text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight select-none mb-6 flex flex-wrap gap-x-4"
          >
            <span className="whitespace-nowrap">
              {"RAVI".split("").map((char, index) => (
                <span
                  key={`r-${index}`}
                  className="letter-span inline-block cursor-default hover:text-md-primary transition-colors duration-150"
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="whitespace-nowrap">
              {"BURMAN".split("").map((char, index) => (
                <span
                  key={`b-${index}`}
                  className="letter-span inline-block cursor-default hover:text-md-primary transition-colors duration-150"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Role Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Full-Stack Developer", "React / Angular", "Node.js", "GoLang"].map((role, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-md-surface-variant/40 border border-md-outline/40 text-md-on-surface-var flex items-center gap-1.5"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-md-primary" />
                {role}
              </span>
            ))}
          </div>

          <p className="text-md-on-surface-var text-lg md:text-xl font-light mb-8 max-w-xl">
            Building digital universes — one optimized component at a time. Specializing in high-performance frontend micro-frontends and robust APIs.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="interactive-element px-6 py-3 rounded-full text-sm font-semibold tracking-wider bg-md-primary-container text-md-on-primary-cont hover:shadow-[0_0_20px_var(--color-md-primary)] transition-all duration-300"
            >
              Explore My Work →
            </button>
            <a
              href="mailto:raviburman98@gmail.com"
              className="interactive-element px-6 py-3 rounded-full text-sm font-semibold tracking-wider border border-dashed border-md-primary text-md-primary hover:bg-md-primary/5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Avatar Column */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center z-10">
          <div className="holo-panel flex flex-col items-center gap-4">
            {/* Holographic Frame */}
            <div
              ref={avatarFrameRef}
              className="holo-frame relative w-[280px] h-[340px] border border-md-outline overflow-hidden shadow-2xl transition-all duration-500"
              style={{
                clipPath:
                  "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
              }}
            >
              {/* AI Portrait */}
              <Image
                src="/portfolio/ravi_avatar.png"
                alt="Ravi Burman - Full Stack Developer"
                width={320}
                height={380}
                className="avatar-img w-full h-full object-cover object-top select-none filter saturate-[0.85] contrast-[1.05]"
                priority
              />

              {/* Scanlines overlay */}
              <div className="scanlines absolute inset-0 z-10 pointer-events-none" />

              {/* Glowing Dynamic Border */}
              <div className="holo-border absolute inset-[-2px] z-[-1] bg-gradient-to-r from-md-primary via-md-secondary to-md-primary bg-[length:300%_300%] animate-[border-rotate_4s_linear_infinite]" />
            </div>

            {/* Speach bubble */}
            <div className="avatar-speech relative bg-md-surface-container border border-md-outline rounded-xl p-4 font-mono text-xs text-md-on-surface w-[300px] min-h-[90px] shadow-lg">
              {/* Pointer */}
              <div className="absolute top-[-8px] left-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-md-outline" />
              <div className="absolute top-[-7px] left-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-md-surface-container" />

              <span className="text-md-primary mr-1">&gt;</span>
              <span>{typedText}</span>
              <span
                className="cursor-blink font-bold text-md-primary ml-1"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              >
                |
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint chevron */}
      <div
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono text-md-on-surface-var/50 group-hover:text-md-primary transition-colors">
          SCROLL TO ORBIT
        </span>
        <svg
          className="w-5 h-5 text-md-on-surface-var/50 animate-bounce group-hover:text-md-primary transition-colors"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Embedded CSS for custom custom properties */}
      <style jsx global>{`
        .holo-frame.pulse {
          animation: attention-pulse 1.2s ease-out;
        }

        @keyframes attention-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.5);
            border-color: rgba(0, 188, 212, 1);
          }
          70% {
            box-shadow: 0 0 0 25px rgba(0, 188, 212, 0);
            border-color: rgba(0, 188, 212, 0.4);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0);
          }
        }

        @keyframes border-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
