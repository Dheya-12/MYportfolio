'use client';

import { motion } from 'framer-motion';

export interface GradientFadeProps {
  fromColor?: string;

  toColor?: string;

  height?: number;

  direction?: 'to-bottom' | 'to-top' | 'to-right' | 'to-left';

  animated?: boolean;

  className?: string;

  position?: 'top' | 'bottom';
}

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

export function FadeToWhite(props: Partial<GradientFadeProps>) {
  return (
    <GradientFade
      {...props}
      fromColor="rgba(255, 255, 255, 0)"
      toColor="rgba(255, 255, 255, 1)"
    />
  );
}

export function FadeToBlack(props: Partial<GradientFadeProps>) {
  return (
    <GradientFade
      {...props}
      fromColor="rgba(0, 0, 0, 0)"
      toColor="rgba(0, 0, 0, 1)"
    />
  );
}

export function SubtleFade(props: Partial<GradientFadeProps>) {
  return <GradientFade {...props} height={100} />;
}

export function DramaticFade(props: Partial<GradientFadeProps>) {
  return <GradientFade {...props} height={300} />;
}
