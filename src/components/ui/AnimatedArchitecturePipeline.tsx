'use client';

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface AnimatedArchitecturePipelineProps {
  gradient: [string, string];
  delay?: number;
}

export default function AnimatedArchitecturePipeline({
  gradient,
  delay = 0,
}: AnimatedArchitecturePipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className="relative w-full aspect-[16/9]">
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
          viewBox="0 0 1400 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>

          <motion.rect
            x="380"
            y="220"
            width="180"
            height="120"
            rx="20"
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
            x="630"
            y="220"
            width="180"
            height="120"
            rx="20"
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

          <motion.rect
            x="880"
            y="220"
            width="180"
            height="120"
            rx="20"
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

          <motion.path
            d="M 290 280 L 380 280"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            markerEnd={`url(#arrow-${gradientId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.2 },
              opacity: { duration: 0.3, delay: delay + 1.2 },
            }}
          />
          <motion.path
            d="M 560 280 L 630 280"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            markerEnd={`url(#arrow-${gradientId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.4 },
              opacity: { duration: 0.3, delay: delay + 1.4 },
            }}
          />
          <motion.path
            d="M 810 280 L 880 280"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            markerEnd={`url(#arrow-${gradientId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.6 },
              opacity: { duration: 0.3, delay: delay + 1.6 },
            }}
          />
          <motion.path
            d="M 1060 280 L 1130 280"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            markerEnd={`url(#arrow-${gradientId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 1.8 },
              opacity: { duration: 0.3, delay: delay + 1.8 },
            }}
          />

          <motion.circle
            cx="470"
            cy="530"
            r="60"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.0 },
              opacity: { duration: 0.3, delay: delay + 2.0 },
            }}
          />
          <motion.circle
            cx="720"
            cy="530"
            r="60"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.2 },
              opacity: { duration: 0.3, delay: delay + 2.2 },
            }}
          />
          <motion.circle
            cx="970"
            cy="530"
            r="60"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.4 },
              opacity: { duration: 0.3, delay: delay + 2.4 },
            }}
          />

          <motion.path
            d="M 470 340 L 470 470"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.6 },
              opacity: { duration: 0.3, delay: delay + 2.6 },
            }}
          />
          <motion.path
            d="M 720 340 L 720 470"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.6 },
              opacity: { duration: 0.3, delay: delay + 2.6 },
            }}
          />
          <motion.path
            d="M 970 340 L 970 470"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1], delay: delay + 2.6 },
              opacity: { duration: 0.3, delay: delay + 2.6 },
            }}
          />

          <defs>
            <marker
              id={`arrow-${gradientId}`}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill={`url(#${gradientId})`} />
            </marker>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="relative w-full h-full bg-white"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{
          delay: delay + 3.0,
          duration: 3.0,
          ease: 'easeOut',
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1400 800">
          <text x="700" y="80" textAnchor="middle" fontSize="48" fontWeight="600" fill="#1f2937">
            How Intervyn&apos;s Voice-to-Voice Pipeline Works
          </text>

          <text x="700" y="180" textAnchor="middle" fontSize="32" fontWeight="500" fill="#374151">
            WebRTC Audio Stream
          </text>

          <text x="200" y="260" textAnchor="middle" fontSize="64">🎙️</text>
          <text x="200" y="320" textAnchor="middle" fontSize="20" fontWeight="500" fill="#374151">User</text>
          <text x="200" y="345" textAnchor="middle" fontSize="20" fontWeight="500" fill="#374151">Microphone</text>

          <line x1="290" y1="280" x2="380" y2="280" stroke="#374151" strokeWidth="3" />
          <polygon points="380,275 390,280 380,285" fill="#374151" />

          <rect x="380" y="220" width="180" height="120" rx="20" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="470" y="270" textAnchor="middle" fontSize="48">💻</text>
          <text x="470" y="305" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1f2937">Whisper</text>
          <text x="470" y="325" textAnchor="middle" fontSize="16" fill="#6b7280">(Speech-to-Text)</text>

          <line x1="560" y1="280" x2="630" y2="280" stroke="#374151" strokeWidth="3" />
          <polygon points="630,275 640,280 630,285" fill="#374151" />

          <rect x="630" y="220" width="180" height="120" rx="20" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="720" y="275" textAnchor="middle" fontSize="32" fontWeight="600" fill="#1f2937">OpenAI</text>
          <text x="720" y="305" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1f2937">LLM</text>

          <line x1="810" y1="280" x2="880" y2="280" stroke="#374151" strokeWidth="3" />
          <polygon points="880,275 890,280 880,285" fill="#374151" />

          <rect x="880" y="220" width="180" height="120" rx="20" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="970" y="270" textAnchor="middle" fontSize="48">🔊</text>
          <text x="970" y="305" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1f2937">Text-to-</text>
          <text x="970" y="325" textAnchor="middle" fontSize="18" fontWeight="600" fill="#1f2937">Speech</text>

          <line x1="1060" y1="280" x2="1130" y2="280" stroke="#374151" strokeWidth="3" />
          <polygon points="1130,275 1140,280 1130,285" fill="#374151" />

          <text x="1200" y="260" textAnchor="middle" fontSize="64">🎧</text>
          <text x="1200" y="320" textAnchor="middle" fontSize="20" fontWeight="500" fill="#374151">User</text>
          <text x="1200" y="345" textAnchor="middle" fontSize="20" fontWeight="500" fill="#374151">Audio Output</text>

          <line x1="470" y1="340" x2="470" y2="470" stroke="#374151" strokeWidth="2" />
          <line x1="720" y1="340" x2="720" y2="470" stroke="#374151" strokeWidth="2" />
          <line x1="970" y1="340" x2="970" y2="470" stroke="#374151" strokeWidth="2" />

          <path d="M 420 400 L 420 430 L 1020 430 L 1020 400" stroke="#374151" strokeWidth="2" fill="none" />
          <line x1="720" y1="430" x2="720" y2="470" stroke="#374151" strokeWidth="2" />

          <circle cx="470" cy="530" r="60" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="470" y="540" textAnchor="middle" fontSize="40">💾</text>
          <text x="470" y="620" textAnchor="middle" fontSize="24" fontWeight="600" fill="#1f2937">Supabase</text>

          <circle cx="720" cy="530" r="60" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="720" y="545" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1f2937">aws</text>
          <text x="720" y="620" textAnchor="middle" fontSize="24" fontWeight="600" fill="#1f2937">AWS</text>

          <circle cx="970" cy="530" r="60" fill="none" stroke="#d1d5db" strokeWidth="2" />
          <text x="970" y="540" textAnchor="middle" fontSize="40">☁️</text>
          <text x="970" y="620" textAnchor="middle" fontSize="24" fontWeight="600" fill="#1f2937">AWS Cloud</text>
        </svg>
      </motion.div>
    </div>
  );
}
