"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Navigation from "@/components/Navigation";
import LaunchLoader from "@/components/LaunchLoader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

// Dynamic import for R3F Canvas to prevent SSR issues
const CosmicCanvas = dynamic(() => import("@/components/CosmicCanvas"), {
  ssr: false,
});

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      {/* 1. Launch Sequence Loader */}
      <LaunchLoader onComplete={() => setLoaderComplete(true)} />

      {/* 2. Main Page Layout (revealed after launch) */}
      <AnimatePresence>
        {loaderComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative min-h-screen"
          >
            {/* Immersive 3D Space Background (persistent fixed canvas) */}
            <CosmicCanvas />

            {/* Navigation Controls */}
            <Navigation />

            {/* Main scroll container content */}
            <main className="relative z-10 w-full flex flex-col">
              {/* Section 1: The Void (Hero) */}
              <Hero />

              {/* Section 2: Launch Pad (About Me) */}
              <About />

              {/* Section 3: Asteroid Belt (Skills) */}
              <Skills />

              {/* Section 4: Solar System (Projects) */}
              <Projects />

              {/* Section 5: Star Chart (Experience) */}
              <Experience />

              {/* Section 6: Space Station (Contact) */}
              <Contact />
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 border-t border-md-outline/10 text-center font-mono text-[10px] text-md-on-surface-var/40 bg-md-background/60 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span>© 2026 RAVI BURMAN // ALL SYSTEMS OPERATIONAL</span>
                <span>DESIGNED IN THE COSMOS</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
