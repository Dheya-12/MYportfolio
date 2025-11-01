'use client';

/**
 * Tech Explanation Card Component
 *
 * Displays tech stack information with icon, title, description
 * Used in the scroll-synchronized tech stack section
 *
 * Features:
 * - Gradient accent border
 * - Progress indicator showing current tech in sequence
 * - Typography following design system
 */

import { motion } from 'framer-motion';

export interface TechExplanationCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: [string, string];
  currentIndex: number;
  totalCount: number;
}

export default function TechExplanationCard({
  icon,
  title,
  description,
  gradient,
  currentIndex,
  totalCount,
}: TechExplanationCardProps) {
  return (
    <div className="relative">
      {/* Main card content */}
      <div className="space-y-6">
        {/* Icon with gradient background */}
        <motion.div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 pt-4">
          {Array.from({ length: totalCount }).map((_, index) => (
            <motion.div
              key={index}
              className="h-1 rounded-full flex-1"
              style={{
                background:
                  index === currentIndex
                    ? `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`
                    : '#E5E7EB',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}
        </div>

        {/* Counter text */}
        <p className="text-sm text-gray-400 font-medium">
          {currentIndex + 1} of {totalCount}
        </p>
      </div>
    </div>
  );
}
