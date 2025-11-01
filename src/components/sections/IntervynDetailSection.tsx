'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useId } from 'react';
import ScrollSyncTechStack from '@/components/sections/ScrollSyncTechStack';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import { COMPLETE_CONFIG } from '@/lib/webgl/types';

export default function IntervynDetailSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const svgGradientId = useId();

  return (
    <>
      {/* ============================================
          INTERVYN HERO SECTION WITH GRADIENT
          Matches main hero design language
          ============================================ */}
      <section className="relative overflow-hidden">
        {/* Subtle animated gradient background - 30% opacity */}
        <div className="absolute inset-0 z-0">
          <AnimatedGradient
            config={COMPLETE_CONFIG}
            opacity={0.3}
            zIndex={0}
          />
          {/* Gradient overlay for softer effect */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.7) 100%)',
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 px-8 py-16">
          <div className="max-w-[1200px] mx-auto">

            {/* ============================================
                SVG STROKE TITLE - MATCHING HERO STYLE
                ============================================ */}
            <div ref={heroRef} className="relative">
              <svg
                className="w-full h-auto"
                viewBox="0 0 1000 100"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
              <defs>
                <linearGradient id={svgGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E85D9A">
                    <animate
                      attributeName="stop-color"
                      values="#E85D9A;#13ffe3;#6B2FD8;#E85D9A"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#13ffe3">
                    <animate
                      attributeName="stop-color"
                      values="#13ffe3;#6B2FD8;#E85D9A;#13ffe3"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#6B2FD8">
                    <animate
                      attributeName="stop-color"
                      values="#6B2FD8;#E85D9A;#13ffe3;#6B2FD8"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>

                <linearGradient id="gradient-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="50%" stopColor="#4a4a4a" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>

                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feFlood floodColor="#06b6d4" floodOpacity="0.6" result="floodColor" />
                  <feComposite in="floodColor" in2="coloredBlur" operator="in" result="coloredGlow" />
                  <feMerge>
                    <feMergeNode in="coloredGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Stroke text */}
              <motion.text
                x="500"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="60"
                fontWeight="700"
                fill="none"
                stroke={`url(#${svgGradientId})`}
                strokeWidth="2"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isHeroInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                  pathLength: { duration: 2.5, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3 },
                }}
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                }}
              >
                INTERVYN
              </motion.text>

              {/* Fill text */}
              <motion.text
                x="500"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="60"
                fontWeight="700"
                fill="url(#gradient-fill)"
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                INTERVYN
              </motion.text>
            </svg>

            {/* Subtitle with glass morphism */}
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div
                  className="absolute inset-0 blur-xl opacity-60"
                  style={{
                    background: 'radial-gradient(circle, rgba(19, 255, 227, 0.4) 0%, rgba(107, 47, 216, 0.3) 100%)',
                  }}
                />
                {/* Glass card */}
                <div className="relative backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl px-8 py-4 shadow-2xl">
                  <p className="text-center text-lg sm:text-xl font-medium bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Real-Time AI Interview Platform
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative accent line */}
            <motion.div
              className="flex justify-center mt-8 mb-12"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isHeroInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <div
                className="h-1 w-32 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #E85D9A, #13ffe3, #6B2FD8)',
                }}
              />
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SCROLL-SYNC INTERVYN SHOWCASE
          All 6 sections including Tech Stack
          ============================================ */}
      <ScrollSyncTechStack />
    </>
  );
}
