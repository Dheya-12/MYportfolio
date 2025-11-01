'use client';

/**
 * Gradient Fade Component
 *
 * Creates smooth gradient fades between sections
 * Alternative to wave dividers for a more subtle transition
 *
 * Use this when you want:
 * - Subtle, minimal transitions
 * - No visual dividers
 * - Pure gradient blending
 */

import { motion } from 'framer-motion';

export interface GradientFadeProps {
  /** Starting color (usually transparent or section color) */
  fromColor?: string;

  /** Ending color (usually the next section's color) */
  toColor?: string;

  /** Height of the fade (in pixels) */
  height?: number;

  /** Direction of the fade */
  direction?: 'to-bottom' | 'to-top' | 'to-right' | 'to-left';

  /** Enable fade-in animation */
  animated?: boolean;

  /** Custom className */
  className?: string;

  /** Position (relative to parent) */
  position?: 'top' | 'bottom';
}

/**
 * GradientFade Component
 *
 * Creates a smooth linear gradient transition
 *
 * @example
 * ```tsx
 * // Fade from transparent gradient to white
 * <GradientFade
 *   fromColor="rgba(255, 255, 255, 0)"
 *   toColor="rgba(255, 255, 255, 1)"
 *   height={200}
 * />
 *
 * // Animated fade
 * <GradientFade
 *   fromColor="transparent"
 *   toColor="#ffffff"
 *   animated
 * />
 * ```
 */
export default function GradientFade({
  fromColor = 'rgba(255, 255, 255, 0)',
  toColor = 'rgba(255, 255, 255, 1)',
  height = 150,
  direction = 'to-bottom',
  animated = false,
  className = '',
  position = 'bottom',
}: GradientFadeProps) {
  const gradient = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;

  const Component = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      }
    : {};

  return (
    <Component
      className={`gradient-fade absolute left-0 w-full pointer-events-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{
        height: `${height}px`,
        background: gradient,
      }}
      {...animationProps}
    />
  );
}

/**
 * ============================================
 * PRESET VARIANTS
 * ============================================
 */

/**
 * Fade from transparent to white
 */
export function FadeToWhite(props: Partial<GradientFadeProps>) {
  return (
    <GradientFade
      {...props}
      fromColor="rgba(255, 255, 255, 0)"
      toColor="rgba(255, 255, 255, 1)"
    />
  );
}

/**
 * Fade from transparent to black
 */
export function FadeToBlack(props: Partial<GradientFadeProps>) {
  return (
    <GradientFade
      {...props}
      fromColor="rgba(0, 0, 0, 0)"
      toColor="rgba(0, 0, 0, 1)"
    />
  );
}

/**
 * Subtle fade (smaller height)
 */
export function SubtleFade(props: Partial<GradientFadeProps>) {
  return <GradientFade {...props} height={100} />;
}

/**
 * Dramatic fade (larger height)
 */
export function DramaticFade(props: Partial<GradientFadeProps>) {
  return <GradientFade {...props} height={300} />;
}
