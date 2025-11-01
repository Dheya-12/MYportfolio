'use client';

import { motion } from 'framer-motion';

export interface WaveDividerProps {
  variant?: 'subtle' | 'bold' | 'layered' | 'organic';

  fillColor?: string;

  position?: 'top' | 'bottom';

  animated?: boolean;

  className?: string;

  flip?: boolean;
}

export default function WaveDivider({
  variant = 'layered',
  fillColor = '#ffffff',
  position = 'bottom',
  animated = true,
  className = '',
  flip = false,
}: WaveDividerProps) {
  const waves = {
    subtle: (
      <path
        d="M0,96 C240,150 480,30 720,96 C960,162 1200,42 1440,96 L1440,200 L0,200 Z"
        fill={fillColor}
      />
    ),

    bold: (
      <path
        d="M0,60 C320,150 640,0 960,90 C1280,180 1440,120 1440,120 L1440,200 L0,200 Z"
        fill={fillColor}
      />
    ),

    layered: (
      <>
        <motion.path
          d="M0,75 C360,135 720,45 1080,105 C1260,135 1440,90 1440,90 L1440,200 L0,200 Z"
          fill={fillColor}
          opacity="0.3"
          initial={{ x: -100 }}
          animate={animated ? { x: [0, 50, 0] } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M0,105 C240,150 480,75 720,120 C960,165 1200,90 1440,120 L1440,200 L0,200 Z"
          fill={fillColor}
          opacity="0.5"
          initial={{ x: 50 }}
          animate={animated ? { x: [0, -30, 0] } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.path
          d="M0,120 C300,165 600,90 900,135 C1200,180 1440,135 1440,135 L1440,200 L0,200 Z"
          fill={fillColor}
          initial={{ x: 0 }}
          animate={animated ? { x: [0, 40, 0] } : {}}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </>
    ),

    organic: (
      <motion.path
        d="M0,90 Q360,150 720,90 T1440,90 L1440,200 L0,200 Z"
        fill={fillColor}
        initial={{ d: "M0,90 Q360,150 720,90 T1440,90 L1440,200 L0,200 Z" }}
        animate={
          animated
            ? {
                d: [
                  "M0,90 Q360,150 720,90 T1440,90 L1440,200 L0,200 Z",
                  "M0,105 Q360,60 720,120 T1440,105 L1440,200 L0,200 Z",
                  "M0,90 Q360,150 720,90 T1440,90 L1440,200 L0,200 Z",
                ],
              }
            : {}
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ),
  };

  return (
    <div
      className={`wave-divider absolute left-0 w-full overflow-hidden ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{
        transform: flip ? 'scaleY(-1)' : 'none',
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="relative block h-full w-full"
        aria-hidden="true"
      >
        {waves[variant]}
      </svg>
    </div>
  );
}

export function GradientToWhiteWave(props: Omit<WaveDividerProps, 'fillColor'>) {
  return <WaveDivider {...props} fillColor="#ffffff" />;
}

export function WhiteToDarkWave(props: Omit<WaveDividerProps, 'fillColor'>) {
  return <WaveDivider {...props} fillColor="#1a1a1a" />;
}

export function GradientWaveDivider({
  fromColor = 'rgba(255,255,255,0)',
  toColor = 'rgba(255,255,255,1)',
  ...props
}: Omit<WaveDividerProps, 'fillColor'> & {
  fromColor?: string;
  toColor?: string;
}) {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
      <WaveDivider {...props} fillColor={toColor} />
    </div>
  );
}
