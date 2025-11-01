'use client';

/**
 * Animated Data Structure Hierarchy Tree
 * 
 * For Section 1: Project Overview
 * Phase 1 (0-3s): SVG outline of hierarchy tree traces
 * Phase 2 (3-6s): Outline fades, colorful 3D boxes appear
 * 
 * Structure:
 * - Data Structures (root)
 *   - Linear
 *     - Static → Array
 *     - Dynamic → List, Stack, Queue
 *   - Non-Linear
 *     - Graph
 *     - Tree
 * 
 * FIXED: Added Array + proper spacing for Graph/Tree
 */

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface AnimatedDataStructureTreeProps {
  gradient: [string, string];
  delay?: number;
}

export default function AnimatedDataStructureTree({
  gradient,
  delay = 0,
}: AnimatedDataStructureTreeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className="relative w-full aspect-square">
      {/* ============================================
          PHASE 1: SVG OUTLINE - TRACES HIERARCHY
          ============================================ */}
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
          viewBox="0 0 800 420"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>

          {/* Root: Data Structures */}
          <motion.rect
            x="325"
            y="20"
            width="150"
            height="50"
            rx="8"
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

          {/* Lines from root to Linear and Non-Linear */}
          <motion.line
            x1="400" y1="70" x2="225" y2="110"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.2 },
              opacity: { duration: 0.3, delay: delay + 0.2 },
            }}
          />
          <motion.line
            x1="400" y1="70" x2="575" y2="110"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.2 },
              opacity: { duration: 0.3, delay: delay + 0.2 },
            }}
          />

          {/* Linear box */}
          <motion.rect
            x="150"
            y="110"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.4 },
              opacity: { duration: 0.3, delay: delay + 0.4 },
            }}
          />

          {/* Non-Linear box */}
          <motion.rect
            x="500"
            y="110"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.4 },
              opacity: { duration: 0.3, delay: delay + 0.4 },
            }}
          />

          {/* Lines from Linear to Static and Dynamic */}
          <motion.line
            x1="225" y1="160" x2="100" y2="200"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.6 },
              opacity: { duration: 0.3, delay: delay + 0.6 },
            }}
          />
          <motion.line
            x1="225" y1="160" x2="325" y2="200"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.6 },
              opacity: { duration: 0.3, delay: delay + 0.6 },
            }}
          />

          {/* Static box */}
          <motion.rect
            x="25"
            y="200"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.8 },
              opacity: { duration: 0.3, delay: delay + 0.8 },
            }}
          />

          {/* Dynamic box */}
          <motion.rect
            x="250"
            y="200"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.8 },
              opacity: { duration: 0.3, delay: delay + 0.8 },
            }}
          />

          {/* Lines from Non-Linear to Graph and Tree - FIXED SPACING */}
          <motion.line
            x1="575" y1="160" x2="500" y2="200"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.6 },
              opacity: { duration: 0.3, delay: delay + 0.6 },
            }}
          />
          <motion.line
            x1="575" y1="160" x2="650" y2="200"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.6 },
              opacity: { duration: 0.3, delay: delay + 0.6 },
            }}
          />

          {/* Graph box */}
          <motion.rect
            x="475"
            y="200"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.8 },
              opacity: { duration: 0.3, delay: delay + 0.8 },
            }}
          />

          {/* Tree box */}
          <motion.rect
            x="625"
            y="200"
            width="150"
            height="50"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 0.8 },
              opacity: { duration: 0.3, delay: delay + 0.8 },
            }}
          />

          {/* Line from Static to Array */}
          <motion.line
            x1="100" y1="250" x2="100" y2="310"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.0 },
              opacity: { duration: 0.3, delay: delay + 1.0 },
            }}
          />

          {/* Lines from Dynamic to List, Stack, Queue */}
          <motion.line
            x1="285" y1="250" x2="225" y2="310"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.0 },
              opacity: { duration: 0.3, delay: delay + 1.0 },
            }}
          />
          <motion.line
            x1="325" y1="250" x2="375" y2="310"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.0 },
              opacity: { duration: 0.3, delay: delay + 1.0 },
            }}
          />
          <motion.line
            x1="365" y1="250" x2="525" y2="310"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.0 },
              opacity: { duration: 0.3, delay: delay + 1.0 },
            }}
          />

          {/* Bottom row boxes - ADDED ARRAY + PROPER SPACING */}
          
          {/* Array */}
          <motion.rect
            x="25"
            y="310"
            width="150"
            height="50"
            rx="8"
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

          {/* List */}
          <motion.rect
            x="200"
            y="310"
            width="150"
            height="50"
            rx="8"
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

          {/* Stack */}
          <motion.rect
            x="360"
            y="310"
            width="150"
            height="50"
            rx="8"
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

          {/* Queue */}
          <motion.rect
            x="520"
            y="310"
            width="150"
            height="50"
            rx="8"
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
        </svg>
      </motion.div>

      {/* ============================================
          PHASE 2: COLORFUL 3D BOXES
          ============================================ */}
      <motion.div
        className="relative w-full h-full"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{
          delay: delay + 3.0,
          duration: 3.0,
          ease: 'easeOut',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 800 400">
          <defs>
            {/* Gradients for 3D effect */}
            <linearGradient id="light-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="dark-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          {/* Connection lines */}
          <line x1="400" y1="70" x2="225" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="400" y1="70" x2="575" y2="110" stroke="#374151" strokeWidth="2" />
          <line x1="225" y1="160" x2="100" y2="200" stroke="#374151" strokeWidth="2" />
          <line x1="225" y1="160" x2="325" y2="200" stroke="#374151" strokeWidth="2" />
          <line x1="575" y1="160" x2="550" y2="200" stroke="#374151" strokeWidth="2" />
          <line x1="575" y1="160" x2="700" y2="200" stroke="#374151" strokeWidth="2" />
          <line x1="100" y1="250" x2="100" y2="310" stroke="#374151" strokeWidth="2" />
          <line x1="285" y1="250" x2="275" y2="310" stroke="#374151" strokeWidth="2" />
          <line x1="325" y1="250" x2="435" y2="310" stroke="#374151" strokeWidth="2" />
          <line x1="365" y1="250" x2="595" y2="310" stroke="#374151" strokeWidth="2" />

          {/* Colored boxes with text */}
          
          {/* Data Structures (light blue) */}
          <rect x="325" y="20" width="150" height="50" rx="8" fill="url(#light-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="400" y="50" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Data Structures</text>

          {/* Linear (light blue) */}
          <rect x="150" y="110" width="150" height="50" rx="8" fill="url(#light-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="225" y="140" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Linear</text>

          {/* Non-Linear (light blue) */}
          <rect x="500" y="110" width="150" height="50" rx="8" fill="url(#light-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="575" y="140" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Non-Linear</text>

          {/* Static (light blue) */}
          <rect x="25" y="200" width="150" height="50" rx="8" fill="url(#light-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="100" y="230" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Static</text>

          {/* Dynamic (light blue) */}
          <rect x="250" y="200" width="150" height="50" rx="8" fill="url(#light-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="325" y="230" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Dynamic</text>

          {/* Graph (dark blue) - PROPER SPACING */}
          <rect x="475" y="200" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="550" y="230" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Graph</text>

          {/* Tree (dark blue) - PROPER SPACING */}
          <rect x="625" y="200" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="700" y="230" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Tree</text>

          {/* Bottom row - all dark blue - ADDED ARRAY + PROPER SPACING */}
          
          {/* Array */}
          <rect x="25" y="310" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="100" y="340" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Array</text>

          {/* List */}
          <rect x="200" y="310" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="275" y="340" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">List</text>

          {/* Stack */}
          <rect x="360" y="310" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="435" y="340" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Stack</text>

          {/* Queue */}
          <rect x="520" y="310" width="150" height="50" rx="8" fill="url(#dark-blue)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
          <text x="595" y="340" textAnchor="middle" fontSize="16" fontWeight="600" fill="white">Queue</text>
        </svg>
      </motion.div>
    </div>
  );
}