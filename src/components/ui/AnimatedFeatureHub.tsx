'use client';

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export interface AnimatedIntervynScreenshotProps {
  gradient: [string, string];
  delay?: number;
}

export default function AnimatedIntervynScreenshot({
  gradient,
  delay = 0,
}: AnimatedIntervynScreenshotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className="relative w-full aspect-[12/7]">
      <motion.div
        className="pointer-events-none absolute inset-0"
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
          className="w-full h-full"
          viewBox="0 0 1200 700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>

          <motion.rect
            x="2"
            y="2"
            width="1196"
            height="696"
            rx="20"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay },
              opacity: { duration: 0.3, delay: delay },
            }}
          />

          <motion.rect
            x="20"
            y="20"
            width="1160"
            height="50"
            rx="10"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.3 },
              opacity: { duration: 0.3, delay: delay + 0.3 },
            }}
          />

          <motion.rect
            x="20"
            y="80"
            width="280"
            height="600"
            rx="15"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.6 },
              opacity: { duration: 0.3, delay: delay + 0.6 },
            }}
          />

          <motion.circle
            cx="160"
            cy="270"
            r="90"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.9 },
              opacity: { duration: 0.3, delay: delay + 0.9 },
            }}
          />

          <motion.rect
            x="320"
            y="80"
            width="860"
            height="600"
            rx="15"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.2 },
              opacity: { duration: 0.3, delay: delay + 1.2 },
            }}
          />

          <motion.rect
            x="340"
            y="380"
            width="820"
            height="280"
            rx="10"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.5 },
              opacity: { duration: 0.3, delay: delay + 1.5 },
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{
          delay: delay + 3.0,
          duration: 3.0,
          ease: 'easeOut',
        }}
      >
        <Image
          src="/Screenshot 2025-10-22 155554.png"
          alt="Intervyn Interview Platform Demo"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}

