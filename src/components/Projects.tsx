"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface Project {
  id: string;
  name: string;
  role: string;
  tech: string[];
  description: string;
  challenges: string;
  impact: string;
  status: string;
  colorClass: string;
  gradientStyle: string;
  ringStyle?: boolean;
}

const projectsData: Project[] = [
  {
    id: "energysync",
    name: "EnergySync -- Real-time Energy Market Analytics",
    role: "Lead Full-Stack Developer",
    tech: ["Python", "FastAPI", "MongoDB", "Angular", "Highcharts", "Jenkins"],
    description: "Developed a real-time energy market analytics platform for Indian markets with dynamic dashboards, forecasting insights, and trading workflows.",
    challenges: "Synchronizing high-frequency market ticker feeds without blocking the main event loops. Solved by writing asynchronous websocket consumers in FastAPI and lazy-rendering visual nodes.",
    impact: "Serves real-time market projections and automates CI/CD deployment pipelines using Jenkins.",
    status: "Live & Active",
    colorClass: "text-md-primary",
    gradientStyle: "radial-gradient(circle at 30% 30%, #00d4ff, #0a1b3a 70%)",
  },
  {
    id: "wordrace",
    name: "Word Race Game Terminal",
    role: "Front-end Game Developer",
    tech: ["React.js", "HTML5", "CSS3", "Bootstrap 5"],
    description: "Built a real-time typing speed game where words appear at increasing rates; player must clear the stack before it fills up.",
    challenges: "Designing reliable difficulty multipliers and score state syncs that recalculate at 60 FPS without introducing browser execution delays.",
    impact: "Achieved a multiplier scoring logic based on typing speed metrics and generated interactive local player leaderboards.",
    status: "Open Source",
    colorClass: "text-md-error",
    gradientStyle: "radial-gradient(circle at 30% 30%, #CF6679, #29000a 80%)",
  },
  {
    id: "seatbooking",
    name: "Seat Booking Engine (BookMyShow Clone)",
    role: "Full-Stack Engineer",
    tech: ["React.js", "Node.js", "Express", "MongoDB"],
    description: "Built a ticket booking platform replicating BookMyShow's seat selection flow with complex multi-seat booking logic.",
    challenges: "Preventing double-booking of seats during high-concurrency window releases. Implemented a Redis-based transient lock queue.",
    impact: "Guarantees immediate visual feedback for seat locks and prevents overlapping double-bookings.",
    status: "Case Study",
    colorClass: "text-md-tertiary",
    gradientStyle: "radial-gradient(circle at 30% 30%, #FDD663, #3a1f00 70%)",
    ringStyle: true,
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const planetRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handlePlanetClick = (project: Project) => {
    const planetEl = planetRefs.current[project.id];
    if (planetEl) {
      // 1. Hyperspace zoom animation using GSAP
      gsap.to(planetEl, {
        scale: 35,
        opacity: 0,
        duration: 0.65,
        ease: "power2.in",
        onComplete: () => {
          setActiveProject(project);
          // Reset the clicked element's inline transform styles once details are active
          gsap.set(planetEl, { scale: 1, opacity: 1 });
        },
      });

      // Quick hyperspace flash transition
      const flash = document.createElement("div");
      flash.className = "warp-flash";
      document.body.appendChild(flash);
      gsap.to(flash, {
        opacity: 0.85,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        onComplete: () => flash.remove(),
      });
    }
  };

  const closeBriefing = () => {
    setActiveProject(null);
  };

  return (
    <section
      id="projects"
      aria-label="Solar System Projects"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono text-md-primary tracking-[0.2em] mb-2">
            SYSTEM DIRECTORY: /PROJECTS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            SOLAR SYSTEM VOYAGE
          </h2>
          <div className="w-16 h-1 bg-md-primary mt-4 rounded-full" />
        </div>

        {/* Floating planet list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center min-h-[400px]">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center justify-center text-center group cursor-pointer"
              onClick={() => handlePlanetClick(project)}
            >
              {/* Planet sphere */}
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
                {/* Orbital Ring decoration */}
                {project.ringStyle && (
                  <div
                    className="absolute w-[260px] h-[40px] border border-md-tertiary/20 rounded-full pointer-events-none transform rotate-12"
                    style={{
                      boxShadow: "0 0 10px rgba(253, 214, 99, 0.05)",
                    }}
                  />
                )}

                {/* Swirling planet body */}
                <div
                  ref={(el) => {
                    planetRefs.current[project.id] = el;
                  }}
                  className="w-40 h-40 rounded-full shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,188,212,0.1)] group-hover:scale-105 group-hover:shadow-[inset_-25px_-25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,188,212,0.25)] transition-all duration-500 animate-[spin_40s_linear_infinite]"
                  style={{
                    background: project.gradientStyle,
                  }}
                />

                {/* Subtle outer atmosphere glow */}
                <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              </div>

              {/* Text elements */}
              <span className="text-[10px] tracking-[0.2em] font-mono text-md-on-surface-var/60 uppercase mb-1">
                {project.status}
              </span>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-md-primary transition-colors mb-2">
                {project.name.split(" -- ")[0]}
              </h3>

              {/* Mini tech badges */}
              <div className="flex gap-1.5 flex-wrap justify-center max-w-[220px]">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-md-surface-variant/40 text-md-on-surface-var/80 border border-md-outline/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-PANEL MISSION BRIEFING OVERLAY */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-[#04080F]/90 backdrop-blur-md overflow-y-auto"
          >
            {/* Ambient planetary background backdrop */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none scale-125 filter blur-[60px]"
              style={{ background: activeProject.gradientStyle }}
            />
            <div className="scanlines absolute inset-0 z-0 opacity-25" />

            <div className="max-w-4xl w-full glass-panel border border-md-outline p-6 md:p-10 rounded-2xl relative z-10 flex flex-col gap-6 md:gap-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-md-outline/20 pb-5">
                <div>
                  <span className="text-xs font-mono text-md-primary tracking-wider uppercase mb-1 block">
                    PROJECT LOGS: {activeProject.id.toUpperCase()} // BRIEFING
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white">
                    {activeProject.name}
                  </h3>
                </div>
                <button
                  onClick={closeBriefing}
                  className="interactive-element px-4 py-2 rounded-full font-mono text-xs font-semibold bg-md-surface-variant/80 border border-md-outline text-md-on-surface-var hover:border-md-primary hover:text-white transition-colors"
                >
                  ◀ ESCAPE POD
                </button>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm leading-relaxed">
                {/* Left col */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  <div>
                    <h4 className="font-mono text-xs text-md-primary tracking-wider uppercase mb-2">
                      📋 MISSION SUMMARY
                    </h4>
                    <p className="text-md-on-surface-var/90 font-light text-base">
                      {activeProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-md-primary tracking-wider uppercase mb-2">
                      🛡️ TECHNICAL CHALLENGES & RESOLUTIONS
                    </h4>
                    <p className="text-md-on-surface-var/90 font-light">
                      {activeProject.challenges}
                    </p>
                  </div>
                </div>

                {/* Right col */}
                <div className="flex flex-col gap-5 bg-md-surface-variant/30 border border-md-outline/10 p-5 rounded-xl">
                  <div>
                    <h4 className="font-mono text-[10px] text-md-on-surface-var/60 uppercase mb-1">
                      My Role
                    </h4>
                    <span className="font-bold text-white font-display text-base">
                      {activeProject.role}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-md-on-surface-var/60 uppercase mb-1.5">
                      Mission Payload Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-md-primary-container/20 text-md-on-primary-cont text-[10px] font-mono border border-md-outline/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-md-on-surface-var/60 uppercase mb-1">
                      System Metrics
                    </h4>
                    <span className="text-xs text-md-on-surface font-light">
                      {activeProject.impact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="border-t border-md-outline/15 pt-5 flex justify-end gap-4 font-mono text-xs">
                <a
                  href="https://github.com/Ravi-burman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-element px-4 py-2.5 rounded-full border border-md-outline/60 text-md-on-surface-var hover:border-md-primary hover:text-white"
                >
                  SYSTEM SOURCE (GITHUB)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
