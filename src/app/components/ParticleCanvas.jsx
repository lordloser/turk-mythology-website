"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParticleCanvas — Reusable canvas particle system component.
 *
 * Props:
 *  - ParticleClass: The particle constructor class
 *  - colors: Array of RGB color strings (optional, passed to constructor)
 *  - countDivisor: Area / divisor = number of particles (default 10000)
 *  - maxCount: Max number of particles (default 100)
 *  - sectionId: The DOM id of the parent section (for ScrollTrigger gating)
 *  - drawConnections: Whether to draw lines between nearby particles
 *  - connectionColor: Color for connection lines (default "212,168,67")
 *  - connectionDistance: Max distance for connections (default 100)
 *  - mouseInteractive: Whether particles respond to mouse
 */
export default function ParticleCanvas({
  ParticleClass,
  colors,
  countDivisor = 10000,
  maxCount = 100,
  sectionId,
  drawConnections = false,
  connectionColor = "212,168,67",
  connectionDistance = 100,
  mouseInteractive = false,
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animIdRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef(null);

  // Stable animate function reference
  const animateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    containerRef.current = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    // Resize handler
    const resize = () => {
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse handlers
    let handleMouseMove, handleMouseLeave;
    if (mouseInteractive && containerRef.current) {
      handleMouseMove = (e) => {
        const r = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - r.left;
        mouseRef.current.y = e.clientY - r.top;
      };
      handleMouseLeave = () => {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      };
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initialize particles
    const cnt = Math.min(maxCount, Math.floor((canvas.width * canvas.height) / countDivisor));
    const particles = [];
    for (let i = 0; i < cnt; i++) {
      particles.push(new ParticleClass(canvas.width, canvas.height, colors));
    }
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections if enabled
      if (drawConnections) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${connectionColor},${0.06 * (1 - d / connectionDistance)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach((p) => {
        const pf = p.update(mouseInteractive ? mouseRef.current : null);
        p.wrap(canvas.width, canvas.height);
        if (pf !== undefined) {
          p.draw(ctx, pf);
        } else {
          p.draw(ctx);
        }
      });

      animIdRef.current = requestAnimationFrame(animate);
    };
    animateRef.current = animate;

    // Cleanup
    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
      if (mouseInteractive && containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [ParticleClass, colors, countDivisor, maxCount, drawConnections, connectionColor, connectionDistance, mouseInteractive]);

  // ScrollTrigger visibility gating via useGSAP
  useGSAP(() => {
    if (!sectionId) {
      // No gating — start immediately
      animateRef.current?.();
      return;
    }

    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => animateRef.current?.(),
      onLeave: () => cancelAnimationFrame(animIdRef.current),
      onEnterBack: () => animateRef.current?.(),
      onLeaveBack: () => cancelAnimationFrame(animIdRef.current),
    });
  }, { dependencies: [sectionId] });

  return <canvas className="particle-canvas" ref={canvasRef} />;
}
