'use client';

/**
 * Animated Tech Stack Card Component
 * 
 * Traces outer card and inner pill shapes for tech stack display
 * Animation sequence matches codebase standards:
 * - 3.0s SVG trace (all paths simultaneously)
 * - 3.0s card pop
 * - Content fade in
 */

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface AnimatedTechStackCardProps {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
  className?: string;
  techCount?: number; // Number of tech pills to trace
}

export default function AnimatedTechStackCard({
  children,
  gradientFrom = '#13ffe3',
  gradientTo = '#6B2FD8',
  delay = 0,
  className = '',
  techCount = 8,
}: AnimatedTechStackCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ============================================
          SVG OUTLINES - FADE OUT AT 3.0s
          ============================================ */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 2 }}
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          delay: delay + 3.0,
          duration: 0.4,
          ease: 'easeOut',
        }}
      >
        <svg
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>

          {/* OUTER CARD OUTLINE */}
          <motion.rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="24"
            ry="24"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* HEADER BOX - "Built With" */}
          <motion.rect
            x="10%"
            y="8%"
            width="80%"
            height="60"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* TECH PILLS - Calculate positions dynamically */}
          {Array.from({ length: techCount }).map((_, i) => {
            const startY = 20; // Start after header (percentage)
            const pillHeight = 9; // Height as percentage
            const gap = 2; // Gap as percentage
            const yPosition = startY + (i * (pillHeight + gap));
            
            return (
              <motion.rect
                key={i}
                x="10%"
                y={`${yPosition}%`}
                width="80%"
                height={`${pillHeight}%`}
                rx="28"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 3.0,
                  ease: [0.4, 0, 0.2, 1],
                  delay: delay,
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ============================================
          CARD CONTAINER - POPS SLOWLY
          ============================================ */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white shadow-2xl"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.95, opacity: 0 }
        }
        transition={{
          delay: delay + 3.0,
          duration: 3.0,
          ease: 'easeOut',
        }}
      >
        {/* CONTENT */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: delay + 3.0,
            duration: 0.6,
            ease: 'easeIn',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
