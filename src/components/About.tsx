"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

function StatItem({ label, value, suffix = "", prefix = "" }: StatItemProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 1500; // 1.5s

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCurrentVal(Math.floor(progress * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentVal(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center text-center border border-md-outline/30 relative overflow-hidden group hover:border-md-primary/60 transition-all duration-300"
      style={{ background: "rgba(10, 16, 29, 0.45)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-md-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="text-3xl md:text-4xl font-display font-black text-md-primary mb-2 text-glow">
        {prefix}
        {currentVal.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs uppercase tracking-wider text-md-on-surface-var/80 font-mono">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Me Mission Dossier"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-mono text-md-primary tracking-[0.2em] mb-2">
            SYSTEM DIRECTORY: /ABOUT
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            LAUNCH PAD & DOSSIER
          </h2>
          <div className="w-16 h-1 bg-md-primary mt-4 rounded-full" />
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column Dossier */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="scanlines absolute inset-0 z-0 opacity-20" />

            <div className="relative z-10 flex flex-col gap-8">
              {/* Dossier Header Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-24 h-24 rounded-full p-1 border border-md-primary shadow-[0_0_15px_rgba(0,188,212,0.3)] animate-[spin_20s_linear_infinite_paused] hover:animate-[spin_6s_linear_infinite]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image
                      src="/ravi_avatar.png"
                      alt="Ravi Burman Portrait"
                      fill
                      sizes="96px"
                      className="object-cover object-top filter brightness-110"
                    />
                  </div>
                  {/* Orbiting indicator dot */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-md-secondary rounded-full shadow-[0_0_8px_var(--color-md-secondary)]" />
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Ravi Burman
                  </h3>
                  <p className="text-sm font-mono text-md-primary mb-1">
                    Senior Software Engineer (SDE-2)
                  </p>
                  <p className="text-xs text-md-on-surface-var/70 font-mono">
                    📍 Coordinates: Pune, Maharashtra, India (18.5204° N, 73.8567° E)
                  </p>
                </div>
              </div>

              {/* Bio Details */}
              <div className="flex flex-col gap-4 text-md-on-surface-var text-base leading-relaxed font-light">
                <p>
                  Full-stack systems engineer specializing in building high-performance, responsive enterprise web applications. Proven track record of optimizing page speeds, building reusable design libraries, and architecting secure cloud integrations.
                </p>
                <p>
                  Experienced in leading frontend re-architectures that scale to support thousands of active users, reduce developer onboarding cycles, and streamline deployment pipelines. Believes in clean, self-documenting code, type safety, and accessibility as standard requirements.
                </p>
              </div>
            </div>

            {/* Dossier stamp */}
            <div className="border-t border-md-outline/20 pt-6 mt-8 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-md-on-surface-faint relative z-10">
              <span>DOSSIER CLASSIFICATION: PUBLIC</span>
              <span>COMPILATION DATE: 2026.05.29</span>
            </div>
          </motion.div>

          {/* Right Column Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <StatItem label="Years of Experience" value={3} suffix=".5 YOE" />
            <StatItem label="Technologies Mastered" value={18} suffix="+" />
            <StatItem label="Government Agencies Served" value={1000} suffix="+" />
            <StatItem label="Development Effort Saved" value={90} suffix="%" />
            <StatItem label="Performance Gains Optimized" value={40} suffix="%" />
            <StatItem label="Proficiency Trainees Mentored" value={70} suffix="%" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
