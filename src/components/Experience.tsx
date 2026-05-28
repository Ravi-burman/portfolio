"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Milestone {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  date: string;
  bullets: string[];
  cx: number; // SVG X coordinate
  cy: number; // SVG Y coordinate
  color: string;
}

const milestonesData: Milestone[] = [
  {
    id: "edu-mc",
    type: "education",
    title: "Master of Computer Applications (MCA)",
    organization: "Indira Gandhi National Tribal University",
    location: "Amarkantak, MP",
    date: "June 2019 -- July 2022",
    bullets: [
      "Graduated with a CGPA of 7.5/10.",
      "Acquired core competencies in Data Structures, Algorithms, Database Management Systems, and Software Engineering principles.",
      "Developed web project components and explored Java & SQL stacks."
    ],
    cx: 150,
    cy: 280,
    color: "var(--color-md-secondary)",
  },
  {
    id: "job-leadrat",
    type: "work",
    title: "Trainee Software Engineer",
    organization: "Leadrat CRM",
    location: "Bangalore, India",
    date: "April 2023 -- July 2023",
    bullets: [
      "Improved CRM frontend modules using Angular and TypeScript, contributing to a 15% increase in user satisfaction.",
      "Streamlined RESTful API integrations with backend services and resolved critical UI bug backlogs."
    ],
    cx: 400,
    cy: 160,
    color: "var(--color-md-tertiary)",
  },
  {
    id: "job-digi",
    type: "work",
    title: "Associate Engineer",
    organization: "Digi Tele Networks",
    location: "Hyderabad, India",
    date: "July 2023 -- February 2025",
    bullets: [
      "Engineered scalable Angular modules with shared component architectures for enterprise data platforms.",
      "Built real-time interactive dashboards using PlotlyJS and Chart.js for large time-series data analysis.",
      "Implemented Test-Driven Development (TDD) using Jasmine/Karma unit testing.",
      "Enhanced frontend security architectures with token-based JWT authentications and protected routing guards."
    ],
    cx: 680,
    cy: 240,
    color: "var(--color-md-primary)",
  },
  {
    id: "job-xperate",
    type: "work",
    title: "Senior Software Engineer",
    organization: "Xperate Systems",
    location: "Pune, India",
    date: "April 2025 -- Present",
    bullets: [
      "Architected scalable SPAs for enterprise commercial platforms, serving 1,000+ UK government agencies and reducing operational overhead by 70%.",
      "Refactored legacy codebases and optimized bundling strategies, achieving a 40% improvement in page load performance.",
      "Designed a reusable UI component library aligned with client UX systems, reducing developer implementation efforts by 90%.",
      "Implemented a GCP-based error logging system using React and GoLang, improving telemetry monitoring and debugging."
    ],
    cx: 950,
    cy: 120,
    color: "var(--color-md-primary)",
  },
];

export default function Experience() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(milestonesData[3]); // Default to Senior SE

  return (
    <section
      id="experience"
      aria-label="Experience Star Chart"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono text-md-primary tracking-[0.2em] mb-2">
            SYSTEM DIRECTORY: /EXPERIENCE
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            STAR CHART & TIMELINE
          </h2>
          <div className="w-16 h-1 bg-md-primary mt-4 rounded-full" />
        </div>

        {/* Content Box */}
        <div className="flex flex-col gap-12">
          {/* DESKTOP SVG CONSTELLATION MAP */}
          <div className="hidden lg:block relative w-full h-[380px] bg-md-surface/30 border border-md-outline/10 rounded-2xl p-6 overflow-hidden">
            {/* Ambient scanning grids */}
            <div className="scanlines absolute inset-0 z-0 opacity-10" />

            <svg viewBox="0 0 1100 380" className="w-full h-full relative z-10">
              {/* Connecting dashed constellation lines */}
              <motion.path
                d="M 150 280 L 400 160 L 680 240 L 950 120"
                fill="none"
                stroke="var(--color-md-outline)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* Glowing animated path line */}
              <motion.path
                d="M 150 280 L 400 160 L 680 240 L 950 120"
                fill="none"
                stroke="var(--color-md-primary)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
                style={{
                  filter: "drop-shadow(0 0 4px var(--color-md-primary))",
                }}
              />

              {/* Star Nodes */}
              {milestonesData.map((node) => {
                const isSelected = selectedMilestone.id === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedMilestone(node)}
                  >
                    {/* Ring highlight aura */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 16 : 10}
                      fill="transparent"
                      stroke={node.color}
                      strokeWidth="1.5"
                      className="transition-all duration-300 group-hover:scale-150 group-hover:opacity-80"
                      style={{
                        filter: `drop-shadow(0 0 6px ${node.color})`,
                        opacity: isSelected ? 0.7 : 0.2,
                      }}
                    />

                    {/* Main star node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? "#white" : node.color}
                      className="transition-all duration-300 group-hover:r-7"
                    />

                    {/* Pulse overlay */}
                    {isSelected && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="14"
                        fill="transparent"
                        stroke="var(--color-md-primary)"
                        strokeWidth="1"
                        className="animate-ping opacity-60"
                      />
                    )}

                    {/* Small tag labels */}
                    <text
                      x={node.cx}
                      y={node.cy + 30}
                      textAnchor="middle"
                      className="fill-md-on-surface-var font-mono text-[10px] tracking-wider font-semibold pointer-events-none transition-colors duration-200 group-hover:fill-md-primary"
                    >
                      {node.organization.split(" ")[0]}
                    </text>
                    <text
                      x={node.cx}
                      y={node.cy - 18}
                      textAnchor="middle"
                      className="fill-white/60 font-mono text-[9px] pointer-events-none"
                    >
                      {node.date.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* MOBILE TIMELINE LIST (Vertical dot grid) */}
          <div className="lg:hidden w-full flex flex-col gap-4">
            {milestonesData.map((node) => {
              const isSelected = selectedMilestone.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedMilestone(node)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? "glass-panel border-md-primary/60 bg-md-primary-container/10"
                      : "bg-md-surface/30 border-md-outline/10 hover:border-md-outline/40"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ border: `2px solid ${node.color}` }}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-md-on-surface-var/60 uppercase">
                      {node.date}
                    </span>
                    <span className="font-bold text-white text-sm">{node.title}</span>
                    <span className="text-xs font-mono text-md-primary">{node.organization}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC CARD DETAIL OF SELECTED STAR NODE */}
          <motion.div
            key={selectedMilestone.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6 md:p-8 rounded-xl border border-md-outline/30 relative"
            style={{
              boxShadow: `0 8px 30px rgba(0, 188, 212, 0.05), inset 0 0 15px rgba(0, 188, 212, 0.03)`,
            }}
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-md-outline/15 pb-4 mb-5 gap-3">
              <div>
                <span className="text-xs font-mono text-md-primary uppercase tracking-wider block mb-1">
                  ⬡ Constellation Star Node // Data Readout
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">
                  {selectedMilestone.title}
                </h3>
                <span className="text-sm font-mono text-md-on-surface-var/80 block mt-1">
                  {selectedMilestone.organization} — <span className="italic">{selectedMilestone.location}</span>
                </span>
              </div>
              <div className="shrink-0">
                <span className="px-3 py-1 rounded-full bg-md-surface-variant text-[11px] font-mono text-white border border-md-outline/20">
                  {selectedMilestone.date}
                </span>
              </div>
            </div>

            {/* Bullet achievements */}
            <ul className="flex flex-col gap-3 font-light text-sm md:text-base text-md-on-surface-var leading-relaxed">
              {selectedMilestone.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-md-primary font-bold mt-1.5 shrink-0 text-xs">⬡</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
