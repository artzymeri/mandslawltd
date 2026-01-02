"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// GPU Performance Detection
const detectGPUPerformance = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'medium';
  
  const nav = navigator as Navigator & { 
    deviceMemory?: number; 
    hardwareConcurrency?: number;
    connection?: { effectiveType?: string };
  };
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'low';
  
  // Check device memory (Chrome only)
  const memory = nav.deviceMemory || 4;
  const cores = nav.hardwareConcurrency || 4;
  
  // Check connection type
  const connection = nav.connection?.effectiveType;
  const slowConnection = connection === '2g' || connection === 'slow-2g';
  
  // Mobile detection
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (memory < 2 || cores < 2 || slowConnection) return 'low';
  if (memory < 4 || cores < 4 || isMobileDevice) return 'medium';
  return 'high';
};

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const velvetCanvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [gpuTier, setGpuTier] = useState<'high' | 'medium' | 'low'>('medium');

  const { scrollYProgress } = useScroll();
  
  // Adjust spring settings based on GPU tier
  const springConfig = useMemo(() => ({
    stiffness: gpuTier === 'low' ? 50 : 100,
    damping: gpuTier === 'low' ? 50 : 30,
    restDelta: gpuTier === 'low' ? 0.01 : 0.001
  }), [gpuTier]);
  
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Detect GPU performance on mount
  useEffect(() => {
    setGpuTier(detectGPUPerformance());
  }, []);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position for velvet animation (throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Velvet Canvas Animation - GPU Optimized
  useEffect(() => {
    const canvas = velvetCanvasRef.current;
    if (!canvas) return;
    
    // Skip animation entirely for low-tier GPUs
    if (gpuTier === 'low') {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true, // Allow async rendering for better performance
    });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let lastFrameTime = 0;
    
    // Adaptive FPS based on GPU tier
    const targetFPS = gpuTier === 'high' ? 60 : (isMobile ? 24 : 30);
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      // Lower DPR for better performance
      const maxDpr = gpuTier === 'high' ? 2 : 1;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const heightMultiplier = isMobile ? 2 : (gpuTier === 'high' ? 5 : 3);
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * heightMultiplier * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight * heightMultiplier + "px";
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Velvet wave parameters - adjusted based on GPU tier
    const waves = gpuTier === 'high' && !isMobile ? [
      { amplitude: 80, frequency: 0.003, speed: 0.015, opacity: 0.04, yOffset: 0 },
      { amplitude: 60, frequency: 0.004, speed: 0.012, opacity: 0.035, yOffset: 200 },
      { amplitude: 100, frequency: 0.002, speed: 0.018, opacity: 0.03, yOffset: 400 },
      { amplitude: 70, frequency: 0.0035, speed: 0.01, opacity: 0.045, yOffset: 600 },
    ] : [
      { amplitude: 50, frequency: 0.002, speed: 0.01, opacity: 0.03, yOffset: 0 },
      { amplitude: 60, frequency: 0.0015, speed: 0.012, opacity: 0.025, yOffset: 250 },
    ];

    const drawVelvetWave = (
      wave: typeof waves[0],
      yBase: number,
      time: number
    ) => {
      // Larger steps for better performance
      const step = gpuTier === 'high' && !isMobile ? 3 : 8;
      const maxDpr = gpuTier === 'high' ? 2 : 1;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      
      ctx.beginPath();

      const canvasHeight = canvas.height / dpr;
      const canvasWidth = canvas.width / dpr;

      for (let x = 0; x <= canvasWidth; x += step) {
        const y =
          yBase +
          wave.yOffset +
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * (wave.amplitude * 0.4);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.closePath();

      // Simple gradient for performance
      const gradient = ctx.createLinearGradient(0, yBase, 0, yBase + 200);
      gradient.addColorStop(0, `rgba(194, 159, 97, ${wave.opacity})`);
      gradient.addColorStop(1, `rgba(194, 159, 97, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawVelvetFabric = () => {
      const maxDpr = gpuTier === 'high' ? 2 : 1;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const canvasHeight = canvas.height / dpr;
      const canvasWidth = canvas.width / dpr;
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Fewer layers based on GPU tier
      const layerCount = gpuTier === 'high' && !isMobile ? 5 : 2;
      
      for (let layer = 0; layer < layerCount; layer++) {
        const baseY = layer * (canvasHeight / layerCount);
        const layerTime = time + layer * 30;
        
        waves.forEach((wave, index) => {
          drawVelvetWave(
            {
              ...wave,
              amplitude: wave.amplitude * (1 + layer * 0.03),
            },
            baseY + index * 150,
            layerTime
          );
        });
      }

      // Shimmer particles only for high-tier GPUs
      if (gpuTier === 'high' && !isMobile) {
        for (let i = 0; i < 12; i++) {
          const shimmerX = (Math.sin(time * 0.008 + i * 0.5) * 0.5 + 0.5) * canvasWidth;
          const shimmerY = (Math.cos(time * 0.006 + i * 0.7) * 0.5 + 0.5) * canvasHeight;
          const shimmerOpacity = Math.sin(time * 0.015 + i) * 0.2 + 0.2;

          ctx.beginPath();
          ctx.arc(shimmerX, shimmerY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 183, 138, ${shimmerOpacity * 0.12})`;
          ctx.fill();
        }
      }
    };

    // Check if page is visible (don't animate when hidden)
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Don't render when page is hidden
      if (!isVisible) return;
      
      // Throttle frame rate
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;
      
      time += gpuTier === 'high' ? 1 : 0.5; // Slower animation for lower tiers
      drawVelvetFabric();
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, gpuTier]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 3D Velvet Canvas - Full page flowing fabric - GPU optimized */}
      <canvas
        ref={velvetCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none mix-blend-soft-light"
        style={{
          transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
          willChange: gpuTier === 'high' ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
          contain: 'strict',
        }}
      />

      {/* Static gradient background - no animation for performance */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(194, 159, 97, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(194, 159, 97, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(26, 26, 26, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Simplified grid pattern - only for high-tier GPUs */}
      {gpuTier === 'high' && !isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26, 26, 26, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 26, 26, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            willChange: 'auto',
          }}
        />
      )}

      {/* Scroll progress indicator line - GPU optimized */}
      <motion.div
        className="fixed left-0 top-0 w-1 bg-gradient-to-b from-amber-600/50 to-amber-800/50 origin-top z-50"
        style={{
          scaleY: smoothProgress,
          height: "100vh",
          willChange: gpuTier === 'high' ? 'transform' : 'auto',
          transform: 'translateZ(0)',
        }}
      />

      {/* Ambient glow - simplified for lower tiers */}
      {gpuTier !== 'low' && (
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(194, 159, 97, 0.06) 0%, transparent 70%)",
            left: "50%",
            top: useTransform(smoothProgress, [0, 1], ["10%", "90%"]),
            x: "-50%",
            y: "-50%",
            willChange: gpuTier === 'high' ? 'transform' : 'auto',
          }}
        />
      )}
    </div>
  );
}
