"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LaunchLoaderProps {
  onComplete: () => void;
}

export default function LaunchLoader({ onComplete }: LaunchLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING LAUNCH SEQUENCE");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200; // 2.2 seconds total
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress < 30) {
        setPhase("INITIALIZING LAUNCH SEQUENCE");
      } else if (nextProgress < 60) {
        setPhase("CALIBRATING THRUSTERS & SYSTEMS");
      } else if (nextProgress < 85) {
        setPhase("WARPING CORE READY");
      } else if (nextProgress < 100) {
        setPhase("NAVIGATIONAL VECTOR ALIGNED");
      } else {
        setPhase("T-MINUS ZERO");
        clearInterval(timer);
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] bg-[#04080F] flex flex-col items-center justify-center font-mono gap-8 select-none"
        >
          {/* Futuristic grid overlay background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,188,212,0.1),rgba(0,0,0,0))] pointer-events-none" />
          <div className="scanlines absolute inset-0 z-0 opacity-40" />

          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            {/* Mission design header */}
            <span className="text-[10px] tracking-[0.3em] text-md-primary/60 animate-pulse">
              SYSTEM COMMAND OVERRIDE // RB-PORTFOLIO-2026
            </span>

            {/* Loading ring */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Track */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-md-surface-variant fill-none"
                  strokeWidth="4"
                />
                {/* Progress fill */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-md-primary fill-none transition-all duration-75"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{
                    filter: "drop-shadow(0px 0px 8px var(--color-md-primary))",
                  }}
                />
              </svg>
              {/* Inner text readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-display text-glow text-md-primary">
                  {progress}%
                </span>
                <span className="text-[9px] text-md-on-surface-var/60 tracking-wider">
                  LOAD VECTORS
                </span>
              </div>
            </div>

            {/* Readout messages */}
            <div className="flex flex-col items-center gap-1 min-h-[50px]">
              <span className="text-xs text-white tracking-[0.2em] uppercase font-semibold">
                {phase}
              </span>
              <span className="text-[10px] text-md-on-surface-var tracking-widest font-light">
                SECURE AUTHENTICATED ACCESS GRANTED
              </span>
            </div>
          </div>

          {/* Hexagonal bracket details */}
          <div className="absolute bottom-12 text-[10px] text-md-on-surface-faint tracking-wider z-10">
            ENGINE CORE: ACTIVE // HYPERDRIVE: ARMED // SEED: #00BCD4
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
