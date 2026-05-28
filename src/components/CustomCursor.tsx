"use client";

import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Setup mouse listener
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Add to trailing dots trail
      setTrailPoints((prev) => {
        const updated = [...prev, { x: e.clientX, y: e.clientY, alpha: 1.0 }];
        if (updated.length > 5) {
          updated.shift();
        }
        return updated;
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive-element") ||
        target.closest(".interactive-element")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);

    // Spring logic for ring
    let animationFrameId: number;
    const updateRing = () => {
      const ease = 0.15; // spring strength
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * ease;
      ringPos.current.y += dy * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0) scale(${isHovered ? 1.5 : 1})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    updateRing();

    // Age trail points
    const interval = setInterval(() => {
      setTrailPoints((prev) =>
        prev
          .map((p) => ({ ...p, alpha: p.alpha - 0.15 }))
          .filter((p) => p.alpha > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [isHovered, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Comet tail trail dots */}
      {trailPoints.map((point, index) => (
        <div
          key={index}
          className="fixed w-1.5 h-1.5 rounded-full bg-md-primary/40 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-75"
          style={{
            left: point.x,
            top: point.y,
            opacity: point.alpha,
          }}
        />
      ))}

      {/* Lag ring */}
      <div
        ref={ringRef}
        className={`fixed w-8 h-8 rounded-full border border-md-primary/60 transition-colors duration-200 ${
          isHovered ? "bg-md-primary/10 border-md-primary" : "bg-transparent"
        }`}
        style={{
          left: 0,
          top: 0,
          boxShadow: isHovered ? "0 0 12px var(--color-md-primary)" : "none",
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-white rounded-full"
        style={{
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
