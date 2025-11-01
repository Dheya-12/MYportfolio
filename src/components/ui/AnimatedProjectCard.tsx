'use client';

/**
 * Animated Project Card Component - STRIPE-STYLE WITH INNER TRACING
 * 
 * Animation sequence:
 * 1. Outer + ALL inner outlines trace simultaneously (0.0s - 3.0s)
 * 2. Card pops SLOWLY + Skeleton fades out + Content fades in (3.0s - 6.0s)
 * 3. Animation complete (6.0s)
 */

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface AnimatedProjectCardProps {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
  className?: string;
}

/**
 * Skeleton Component - Layout only
 */
function CardSkeleton() {
  return (
    <div className="relative h-full w-full bg-gray-900 p-8">
      <div className="flex h-full gap-8">
        
        {/* LEFT PANEL */}
        <div className="flex flex-1 flex-col items-center justify-between py-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gray-800" />
          </div>
          <div className="relative w-full max-w-[280px]">
            <div className="h-14 w-full rounded-full bg-gray-800" />
          </div>
          <div className="relative w-full space-y-4">
            <div className="h-20 w-full rounded-xl bg-gray-800" />
            <div className="h-32 w-full rounded-xl bg-gray-800" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative">
            <div className="h-12 w-48 rounded-lg bg-gray-800" />
          </div>
          <div className="relative flex-1">
            <div className="h-full w-full rounded-2xl bg-gray-800" />
          </div>
          <div className="relative ml-auto">
            <div className="h-12 w-36 rounded-lg bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AnimatedProjectCard Component
 */
export default function AnimatedProjectCard({
  children,
  gradientFrom = '#8B5CF6',
  gradientTo = '#06B6D4',
  delay = 0,
  className = '',
}: AnimatedProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ============================================
          ALL SVG OUTLINES - FADE OUT AT 3.0s
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

          {/* INNER TRACES */}
          
          {/* 1. Avatar Circle */}
          <motion.circle
            cx="20%"
            cy="18%"
            r="64"
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
          
          {/* 2. End Interview Button */}
          <motion.rect
            x="8%"
            y="44%"
            width="32%"
            height="56"
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
          
          {/* 3. Title Box */}
          <motion.rect
            x="5%"
            y="62%"
            width="40%"
            height="80"
            rx="12"
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
          
          {/* 4. Description Box */}
          <motion.rect
            x="5%"
            y="75%"
            width="40%"
            height="128"
            rx="12"
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

          {/* 5. Solution Header */}
          <motion.rect
            x="52%"
            y="8%"
            width="24%"
            height="48"
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
          
          {/* 6. Code Editor Container */}
          <motion.rect
            x="52%"
            y="15%"
            width="43%"
            height="68%"
            rx="16"
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
          
          {/* 7. Run Code Button */}
          <motion.rect
            x="76%"
            y="87%"
            width="18%"
            height="48"
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
        </svg>
      </motion.div>

      {/* ============================================
          CARD CONTAINER - POPS SLOWLY OVER 3 SECONDS
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
          duration: 3.0,        // 🔥 3 SECOND SLOW POP!
          ease: 'easeOut',
        }}
      >
        {/* SKELETON LAYER - Fades out at 3.0s */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            delay: delay + 3.0,
            duration: 0.4,
            ease: 'easeOut',
          }}
          style={{ pointerEvents: 'none' }}
        >
          <CardSkeleton />
        </motion.div>

        {/* REAL CONTENT - Fades in at 3.0s */}
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