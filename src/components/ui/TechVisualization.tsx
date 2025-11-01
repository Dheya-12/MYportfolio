'use client';

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface IntervynVisualizationProps {
  type: string;
  gradient: [string, string];
  icon?: string;
}

interface PathAnimation {
  initial: { pathLength: number; opacity: number };
  animate: { pathLength: number; opacity: number };
  transition: {
    pathLength: { duration: number; ease: [number, number, number, number] };
    opacity: { duration: number };
  };
}

interface VisualizationComponentProps {
  gradientId: string;
  pathAnimation: PathAnimation;
}

interface VisualizationWithIconProps extends VisualizationComponentProps {
  icon?: string;
}

interface DefaultPlaceholderProps {
  icon?: string;
  gradient: [string, string];
}

export default function IntervynVisualization({ type, gradient, icon }: IntervynVisualizationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  // Common animation props
  const pathAnimation = {
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { duration: 3.0, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      opacity: { duration: 0.3 },
    },
  };

  const renderVisualization = () => {
    switch (type) {
      case 'interview-mockup':
        return <InterviewMockup gradientId={gradientId} pathAnimation={pathAnimation} icon={icon} />;
      case 'features-grid':
        return <FeaturesGrid gradientId={gradientId} pathAnimation={pathAnimation} icon={icon} />;
      case 'system-diagram':
        return <SystemDiagram gradientId={gradientId} pathAnimation={pathAnimation} />;
      case 'growth-journey':
        return <GrowthJourney gradientId={gradientId} pathAnimation={pathAnimation} icon={icon} />;
      case 'metrics-display':
        return <MetricsDisplay gradientId={gradientId} pathAnimation={pathAnimation} icon={icon} />;
      default:
        return <DefaultPlaceholder icon={icon} gradient={gradient} />;
    }
  };

  return (
    <div ref={ref} className="relative w-full aspect-square">
      <svg
        className="w-full h-full"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>

          <marker id={`arrow-${gradientId}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill={`url(#${gradientId})`} />
          </marker>
        </defs>

        {renderVisualization()}
      </svg>
    </div>
  );
}

function InterviewMockup({ gradientId, pathAnimation }: VisualizationWithIconProps) {
  return (
    <g>
      <motion.rect
        x="100"
        y="50"
        width="200"
        height="300"
        rx="20"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
      />

      <motion.circle
        cx="200"
        cy="120"
        r="30"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.3,
        }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="25"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.5,
        }}
      />
      <motion.rect
        x="197"
        y="190"
        width="6"
        height="20"
        rx="3"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.5,
        }}
      />

      <motion.path
        d="M 120 260 L 130 250 L 140 260 L 150 240 L 160 260 L 170 245 L 180 260 L 190 235 L 200 260 L 210 240 L 220 260 L 230 250 L 240 260 L 250 245 L 260 260 L 270 250 L 280 260"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.7,
        }}
      />

      <motion.rect
        x="130"
        y="290"
        width="140"
        height="40"
        rx="20"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.9,
        }}
      />
    </g>
  );
}

function FeaturesGrid({ gradientId, pathAnimation }: VisualizationWithIconProps) {
  const features = [
    { x: 80, y: 80, icon: '🎙️' },
    { x: 220, y: 80, icon: '💬' },
    { x: 80, y: 180, icon: '🧠' },
    { x: 220, y: 180, icon: '⚙️' },
    { x: 80, y: 280, icon: '🧾' },
    { x: 220, y: 280, icon: '☁️' },
  ];

  return (
    <g>
      {features.map((feature, i) => (
        <g key={i}>
          <motion.rect
            x={feature.x}
            y={feature.y}
            width="80"
            height="80"
            rx="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            {...pathAnimation}
            transition={{
              ...pathAnimation.transition,
              delay: i * 0.15,
            }}
          />

          <text
            x={feature.x + 40}
            y={feature.y + 50}
            textAnchor="middle"
            className="text-3xl"
          >
            {feature.icon}
          </text>
        </g>
      ))}

      <motion.path
        d="M 160 120 L 220 120"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeDasharray="4,4"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.0,
        }}
      />
      <motion.path
        d="M 120 160 L 120 180"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeDasharray="4,4"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.0,
        }}
      />
      <motion.path
        d="M 260 160 L 260 180"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeDasharray="4,4"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.0,
        }}
      />
    </g>
  );
}

function SystemDiagram({ gradientId, pathAnimation }: VisualizationComponentProps) {
  return (
    <g>
      <motion.circle
        cx="80"
        cy="200"
        r="35"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
      />
      <text x="80" y="260" textAnchor="middle" className="text-xs fill-gray-400">User</text>

      <motion.rect
        x="150"
        y="170"
        width="60"
        height="60"
        rx="8"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.3,
        }}
      />
      <text x="180" y="205" textAnchor="middle" className="text-xs fill-gray-400">WebRTC</text>

      <motion.circle
        cx="270"
        cy="200"
        r="35"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.5,
        }}
      />
      <text x="270" y="260" textAnchor="middle" className="text-xs fill-gray-400">AI</text>

      <motion.rect
        x="240"
        y="100"
        width="60"
        height="50"
        rx="8"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.7,
        }}
      />
      <text x="270" y="130" textAnchor="middle" className="text-xs fill-gray-400">Supabase</text>

      <motion.rect
        x="240"
        y="270"
        width="60"
        height="50"
        rx="8"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 0.9,
        }}
      />
      <text x="270" y="300" textAnchor="middle" className="text-xs fill-gray-400">AWS</text>

      <motion.path
        d="M 115 200 L 150 200"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        markerEnd={`url(#arrow-${gradientId})`}
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.1,
        }}
      />
      <motion.path
        d="M 210 200 L 235 200"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        markerEnd={`url(#arrow-${gradientId})`}
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.2,
        }}
      />
      <motion.path
        d="M 270 165 L 270 150"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        markerEnd={`url(#arrow-${gradientId})`}
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.3,
        }}
      />
      <motion.path
        d="M 270 235 L 270 270"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        markerEnd={`url(#arrow-${gradientId})`}
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.4,
        }}
      />
    </g>
  );
}

function GrowthJourney({ gradientId, pathAnimation }: VisualizationWithIconProps) {
  return (
    <g>
      <motion.path
        d="M 80 320 Q 150 250, 200 200 T 320 80"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        fill="none"
        {...pathAnimation}
      />

      {[
        { x: 80, y: 320, label: 'Start' },
        { x: 150, y: 250, label: 'Learn' },
        { x: 200, y: 200, label: 'Build' },
        { x: 250, y: 150, label: 'Scale' },
        { x: 320, y: 80, label: 'Impact' },
      ].map((point, i) => (
        <g key={i}>
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="white"
            {...pathAnimation}
            transition={{
              ...pathAnimation.transition,
              delay: i * 0.3,
            }}
          />
          <text
            x={point.x}
            y={point.y + 25}
            textAnchor="middle"
            className="text-xs fill-gray-400"
          >
            {point.label}
          </text>
        </g>
      ))}

      <motion.path
        d="M 315 90 L 320 80 L 325 90"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.5,
        }}
      />
    </g>
  );
}

function MetricsDisplay({ gradientId, pathAnimation }: VisualizationWithIconProps) {
  const metrics = [
    { x: 100, y: 100, size: 50 },
    { x: 250, y: 100, size: 50 },
    { x: 100, y: 220, size: 50 },
    { x: 250, y: 220, size: 50 },
    { x: 175, y: 310, size: 40 },
  ];

  return (
    <g>
      {metrics.map((metric, i) => (
        <g key={i}>
          <motion.rect
            x={metric.x - metric.size}
            y={metric.y - metric.size}
            width={metric.size * 2}
            height={metric.size * 2}
            rx="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            {...pathAnimation}
            transition={{
              ...pathAnimation.transition,
              delay: i * 0.2,
            }}
          />

          <motion.circle
            cx={metric.x}
            cy={metric.y}
            r={metric.size - 10}
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            {...pathAnimation}
            transition={{
              ...pathAnimation.transition,
              delay: i * 0.2 + 0.5,
            }}
          >
            <animate
              attributeName="r"
              values={`${metric.size - 10};${metric.size - 5};${metric.size - 10}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </g>
      ))}

      <motion.path
        d="M 150 100 L 250 100"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeDasharray="4,4"
        opacity="0.3"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.2,
        }}
      />
      <motion.path
        d="M 100 150 L 100 220"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeDasharray="4,4"
        opacity="0.3"
        {...pathAnimation}
        transition={{
          ...pathAnimation.transition,
          delay: 1.2,
        }}
      />
    </g>
  );
}

function DefaultPlaceholder({ icon, gradient }: DefaultPlaceholderProps) {
  return (
    <div
      className="w-full h-full rounded-3xl flex items-center justify-center text-8xl opacity-20"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}20, ${gradient[1]}20)`,
      }}
    >
      {icon}
    </div>
  );
}