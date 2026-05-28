"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  mastery: number; // 0 to 100
  category: "core" | "backend" | "tools";
}

const skillsData: Skill[] = [
  // Core (Inner)
  { name: "React.js", mastery: 95, category: "core" },
  { name: "Angular", mastery: 90, category: "core" },
  { name: "TypeScript", mastery: 90, category: "core" },
  { name: "JavaScript", mastery: 95, category: "core" },
  // Backend (Mid)
  { name: "Golang", mastery: 75, category: "backend" },
  { name: "Python", mastery: 80, category: "backend" },
  { name: "REST APIs", mastery: 90, category: "backend" },
  { name: "SQL", mastery: 85, category: "backend" },
  { name: "MongoDB", mastery: 80, category: "backend" },
  { name: "Node.js", mastery: 85, category: "backend" },
  // Tools (Outer)
  { name: "Git", mastery: 95, category: "tools" },
  { name: "Docker", mastery: 80, category: "tools" },
  { name: "Jenkins", mastery: 75, category: "tools" },
  { name: "CI/CD", mastery: 80, category: "tools" },
  { name: "AWS", mastery: 75, category: "tools" },
  { name: "GCP", mastery: 75, category: "tools" },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Group skills
  const coreSkills = skillsData.filter((s) => s.category === "core");
  const backendSkills = skillsData.filter((s) => s.category === "backend");
  const toolsSkills = skillsData.filter((s) => s.category === "tools");

  // Get index-based position offset using trigonometry
  const getPositionStyle = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      left: `calc(50% + ${x}px - 24px)`, // 24px is half of 48px (w-12)
      top: `calc(50% + ${y}px - 24px)`,
    };
  };

  return (
    <section
      id="skills"
      aria-label="Technical Skills Belt"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono text-md-primary tracking-[0.2em] mb-2">
            SYSTEM DIRECTORY: /SKILLS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            ORBITAL SKILLS BELT
          </h2>
          <div className="w-16 h-1 bg-md-primary mt-4 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="relative flex flex-col items-center justify-center min-h-[600px] w-full">
          {/* DESKTOP/TABLET: Orbital concentric rings (hidden on mobile) */}
          <div className="hidden md:flex relative w-full h-[620px] items-center justify-center">
            {/* CENTRAL SUN SYSTEM */}
            <div className="w-24 h-24 rounded-full bg-md-surface-container border-2 border-md-primary flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,188,212,0.25)] relative z-30">
              {/* Radiating visual rays */}
              <div className="absolute inset-[-6px] rounded-full border border-md-primary/10 animate-ping opacity-60" />
              <div className="absolute inset-[-12px] rounded-full border border-md-primary/5 animate-pulse opacity-40" />
              <span className="font-display text-lg font-black text-white tracking-widest">
                R.B.
              </span>
              <span className="text-[8px] font-mono text-md-on-surface-var/60 mt-0.5 uppercase tracking-wider">
                CORE SYSTEM
              </span>
            </div>

            {/* INNER ORBIT: Core Skills */}
            <div
              className={`absolute w-[240px] h-[240px] rounded-full border border-md-outline-variant/30 flex items-center justify-center ${
                hoveredSkill ? "paused-orbit" : "animate-orbit-cw-12s"
              }`}
            >
              {coreSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`absolute w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-crosshair text-[10px] font-mono font-bold text-glow text-white transition-all duration-300 hover:scale-125 hover:border-md-primary border-md-outline/40 ${
                    hoveredSkill && hoveredSkill.name !== skill.name ? "opacity-20" : "opacity-100"
                  } ${hoveredSkill ? "" : "animate-orbit-ccw-12s"}`}
                  style={getPositionStyle(index, coreSkills.length, 120)}
                >
                  <span className="text-center truncate px-1">{skill.name.split(".")[0]}</span>
                </div>
              ))}
            </div>

            {/* MID ORBIT: Backend Skills */}
            <div
              className={`absolute w-[420px] h-[420px] rounded-full border border-md-outline-variant/20 flex items-center justify-center ${
                hoveredSkill ? "paused-orbit" : "animate-orbit-cw-20s"
              }`}
            >
              {backendSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`absolute w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-crosshair text-[9px] font-mono text-glow text-white transition-all duration-300 hover:scale-125 hover:border-md-secondary border-md-outline/30 ${
                    hoveredSkill && hoveredSkill.name !== skill.name ? "opacity-20" : "opacity-100"
                  } ${hoveredSkill ? "" : "animate-orbit-ccw-20s"}`}
                  style={getPositionStyle(index, backendSkills.length, 210)}
                >
                  <span className="text-center truncate px-0.5">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* OUTER ORBIT: Tools Skills */}
            <div
              className={`absolute w-[600px] h-[600px] rounded-full border border-md-outline-variant/10 flex items-center justify-center ${
                hoveredSkill ? "paused-orbit" : "animate-orbit-cw-30s"
              }`}
            >
              {toolsSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`absolute w-12 h-12 rounded-full glass-panel flex items-center justify-center cursor-crosshair text-[9px] font-mono text-glow text-white transition-all duration-300 hover:scale-125 hover:border-md-tertiary border-md-outline/20 ${
                    hoveredSkill && hoveredSkill.name !== skill.name ? "opacity-20" : "opacity-100"
                  } ${hoveredSkill ? "" : "animate-orbit-ccw-30s"}`}
                  style={getPositionStyle(index, toolsSkills.length, 300)}
                >
                  <span className="text-center truncate px-0.5">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* DYNAMIC TOOLTIP INTERACTION DISPLAY */}
            <div className="absolute bottom-[-10px] w-[320px] min-h-[85px] glass-panel rounded-xl p-4 flex flex-col justify-center border border-md-outline/40 shadow-xl transition-all duration-300">
              {hoveredSkill ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs uppercase font-mono text-md-on-surface-var/60">
                      System Module:
                    </span>
                    <span className="text-xs font-mono font-bold text-md-primary">
                      {hoveredSkill.mastery}% LOADED
                    </span>
                  </div>
                  <span className="text-base font-bold text-white font-mono mb-2">
                    {hoveredSkill.name}
                  </span>
                  {/* Glowing progress bar */}
                  <div className="w-full h-2 bg-md-surface-variant rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-md-primary to-md-secondary rounded-full shadow-[0_0_8px_var(--color-md-primary)]"
                      style={{ width: `${hoveredSkill.mastery}%` }}
                    />
                  </div>
                </motion.div>
              ) : (
                <span className="text-center font-mono text-xs text-md-on-surface-var/50 tracking-wider">
                  ⬡ Hover over a node to read diagnostic mastery data.
                </span>
              )}
            </div>
          </div>

          {/* MOBILE BACKUP: Interactive Sci-Fi Grid Terminal (shown on small screens) */}
          <div className="md:hidden w-full flex flex-col gap-6">
            {/* Core */}
            <div className="glass-panel p-5 rounded-xl border border-md-outline/30">
              <span className="text-xs font-mono text-md-primary tracking-wider uppercase mb-3 block">
                ⬡ Core Stack
              </span>
              <div className="flex flex-col gap-3">
                {coreSkills.map((s) => (
                  <div key={s.name} className="flex flex-col">
                    <div className="flex justify-between text-xs font-mono text-white mb-1">
                      <span>{s.name}</span>
                      <span>{s.mastery}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-md-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-md-primary rounded-full" style={{ width: `${s.mastery}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="glass-panel p-5 rounded-xl border border-md-outline/20">
              <span className="text-xs font-mono text-md-secondary tracking-wider uppercase mb-3 block">
                ⬡ Backend & Databases
              </span>
              <div className="grid grid-cols-2 gap-4">
                {backendSkills.map((s) => (
                  <div key={s.name} className="flex flex-col">
                    <div className="flex justify-between text-[11px] font-mono text-white mb-1">
                      <span className="truncate">{s.name}</span>
                      <span>{s.mastery}%</span>
                    </div>
                    <div className="w-full h-1 bg-md-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-md-secondary rounded-full" style={{ width: `${s.mastery}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="glass-panel p-5 rounded-xl border border-md-outline/10">
              <span className="text-xs font-mono text-md-tertiary tracking-wider uppercase mb-3 block">
                ⬡ Infrastructure & Tools
              </span>
              <div className="grid grid-cols-2 gap-4">
                {toolsSkills.map((s) => (
                  <div key={s.name} className="flex flex-col">
                    <div className="flex justify-between text-[11px] font-mono text-white mb-1">
                      <span className="truncate">{s.name}</span>
                      <span>{s.mastery}%</span>
                    </div>
                    <div className="w-full h-1 bg-md-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-md-tertiary rounded-full" style={{ width: `${s.mastery}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .paused-orbit {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
