"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  delay: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: "circle" | "ring" | "dot" | "line";
  parallaxFactor: number;
  opacity: number;
}

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background gradient rotation based on scroll
  const gradientRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const gradientScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]);

  // Generate particles and shapes on mount
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    const generateShapes = () => {
      const shapeTypes: ("circle" | "ring" | "dot" | "line")[] = ["circle", "ring", "dot", "line"];
      const newShapes: FloatingShape[] = [];
      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50,
          rotation: Math.random() * 360,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          parallaxFactor: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
      setShapes(newShapes);
    };

    generateParticles();
    generateShapes();
  }, []);

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseStyle = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      opacity: shape.opacity,
    };

    switch (shape.type) {
      case "circle":
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/10 blur-xl"
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              x: mousePosition.x * shape.parallaxFactor * 50,
              y: mousePosition.y * shape.parallaxFactor * 50,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 30 + shape.id * 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      case "ring":
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full border border-[#1a1a1a]/10"
            style={{
              ...baseStyle,
              width: shape.size,
              height: shape.size,
              x: mousePosition.x * shape.parallaxFactor * 30,
              y: mousePosition.y * shape.parallaxFactor * 30,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 40 + shape.id * 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      case "dot":
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-[#1a1a1a]"
            style={{
              ...baseStyle,
              width: 4,
              height: 4,
              x: mousePosition.x * shape.parallaxFactor * 20,
              y: mousePosition.y * shape.parallaxFactor * 20,
            }}
            animate={{
              opacity: [shape.opacity, shape.opacity * 2, shape.opacity],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: shape.id * 0.2,
            }}
          />
        );
      case "line":
        return (
          <motion.div
            key={shape.id}
            className="absolute bg-gradient-to-r from-transparent via-[#1a1a1a]/10 to-transparent"
            style={{
              ...baseStyle,
              width: shape.size * 2,
              height: 1,
              x: mousePosition.x * shape.parallaxFactor * 40,
              y: mousePosition.y * shape.parallaxFactor * 40,
              rotate: shape.rotation,
            }}
            animate={{
              opacity: [shape.opacity, shape.opacity * 1.5, shape.opacity],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: shape.id * 0.3,
            }}
          />
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(194, 159, 97, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(194, 159, 97, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(26, 26, 26, 0.08) 0%, transparent 50%)
          `,
          rotate: gradientRotate,
          scale: gradientScale,
        }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 26, 26, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 26, 26, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Floating geometric shapes */}
      {shapes.map(renderShape)}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#1a1a1a]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.speedX * 100, 0],
            y: [0, particle.speedY * 100, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 10 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scroll progress indicator line */}
      <motion.div
        className="fixed left-0 top-0 w-1 bg-gradient-to-b from-amber-600/50 to-amber-800/50 origin-top z-50"
        style={{
          scaleY: smoothProgress,
          height: "100vh",
        }}
      />

      {/* Ambient glow that follows scroll */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(194, 159, 97, 0.1) 0%, transparent 70%)",
          left: "50%",
          top: useTransform(smoothProgress, [0, 1], ["10%", "90%"]),
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}
