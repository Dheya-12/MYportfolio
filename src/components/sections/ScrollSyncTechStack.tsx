'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedTechStackCard from '@/components/ui/AnimatedTechStackCard';
import AnimatedTreeVisualization from '@/components/ui/AnimatedTreeVisualization';
import AnimatedFeatureHub from '@/components/ui/AnimatedFeatureHub';
import AnimatedArchitecturePipeline from '@/components/ui/AnimatedArchitecturePipeline';
import TechVisualization from '@/components/ui/TechVisualization';

type Feature = { icon: string; text: string };
type Metric = { metric: string; label: string };
type TechLayers = { [key: string]: string };
type SectionContent = string | Feature[] | Metric[] | TechLayers;

interface ProjectSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: SectionContent;
  visualization: string;
  gradient: [string, string];
}

const PROJECT_SECTIONS: ProjectSection[] = [
  {
    id: 'overview',
    title: 'The Problem I Solved',
    subtitle: 'Project Overview',
    icon: '',
    content: `I built Intervyn after bombing a real interview. Not because I didn't know algorithms, but because I'd never practiced thinking out loud. Intervyn bridges that gap by letting users talk to an AI interviewer that listens, responds, and evaluates, just like a real interview.`,
    visualization: 'interview-mockup',
    gradient: ['#E85D9A', '#13ffe3'],
  },
  {
    id: 'features',
    title: 'What It Does',
    subtitle: 'Key Features',
    icon: '',
    content: [
      { icon: '', text: 'Real-time voice interaction. Speak naturally with an AI interviewer that responds instantly' },
      { icon: '', text: 'Dynamic question flow. AI adapts based on your reasoning and communication style' },
      { icon: '', text: 'Multiple interview types. DSA, System Design, Product Thinking, Behavioral' },
      { icon: '', text: 'Live coding integration. Tracks your logic in real time' },
      { icon: '', text: 'Instant feedback. Evaluates clarity, correctness, and communication' },
      { icon: '', text: 'Cloud-hosted reliability. 99.2% uptime with AWS and Docker' },
    ],
    visualization: 'features-grid',
    gradient: ['#13ffe3', '#6B2FD8'],
  },
  {
    id: 'tech-stack',
    title: 'Engineering Choices',
    subtitle: 'Tech Stack',
    icon: '',
    content: {
      frontend: 'Next.js 15, React 19, TypeScript, TailwindCSS, Framer Motion',
      backend: 'Node.js, Supabase (Auth + Database), Redis (caching), WebSockets',
      ai: 'OpenAI Realtime API, Whisper (speech-to-text)',
      infrastructure: 'AWS EC2, RDS (PostgreSQL), S3, CloudFront, Docker, GitHub Actions (CI/CD), WebRTC',
    },
    visualization: 'tech-stack-card', // Special: uses AnimatedTechStackCard
    gradient: ['#6B2FD8', '#8B5CF6'],
  },
  {
    id: 'architecture',
    title: 'How It Works',
    subtitle: 'Architecture',
    icon: '',
    content: `Built for low-latency, real-time interaction. Audio streams through WebRTC directly to the AI pipeline, where Whisper handles speech-to-text, OpenAI Realtime API generates contextual voice responses, and Supabase stores session data. Everything runs on AWS with Dockerized microservices, CI/CD pipelines, and load-balanced EC2 instances to ensure sub-200ms response times.`,
    visualization: 'system-diagram',
    gradient: ['#FF8C00', '#DC143C'],
  },
  {
    id: 'impact',
    title: 'What I Learned',
    subtitle: 'Personal Impact',
    icon: '',
    content: `Building Intervyn taught me how to design distributed, low-latency systems and orchestrate cloud infrastructure while keeping the user experience seamless. More than that, it showed me how to turn a personal problem (interview anxiety) into a real, functional product that helps others grow their confidence.`,
    visualization: 'growth-journey',
    gradient: ['#4316d3', '#00A3CC'],
  },
  {
    id: 'results',
    title: 'The Impact',
    subtitle: 'Results & Metrics',
    icon: '',
    content: [
      { metric: '500+', label: 'Mock interviews simulated' },
      { metric: '<200ms', label: 'Average response latency' },
      { metric: '5+', label: 'Universities testing' },
      { metric: '99.2%', label: 'Uptime (improved from 94%)' },
      { metric: '4.6/5', label: 'Conversational realism rating' },
    ],
    visualization: 'metrics-display',
    gradient: ['#E85D9A', '#13ffe3'],
  },
];

export default function ScrollSyncTechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const contentIndex = useTransform(
    scrollYProgress,
    [0, 0.16, 0.33, 0.50, 0.66, 0.83, 1],
    [0, 1, 2, 3, 4, 5, 5]
  );

  useEffect(() => {
    return contentIndex.on('change', (latest) => {
      setActiveIndex(Math.round(latest));
    });
  }, [contentIndex]);

  const activeSection = PROJECT_SECTIONS[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${PROJECT_SECTIONS.length * 100}vh`,
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 1) 50%, rgba(255, 255, 255, 1) 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(232, 93, 154, 0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-40 left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(19, 255, 227, 0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(107, 47, 216, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="sticky top-0 h-screen flex items-center px-8 py-20">
        <div className="max-w-[1400px] mx-auto w-full">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div
              key={`content-${activeSection.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative"
            >
              <div className="relative backdrop-blur-sm bg-white/60 border border-white/60 rounded-3xl p-10 shadow-2xl">
                {/* Subtle glow effect */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-50 blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${activeSection.gradient[0]}20, ${activeSection.gradient[1]}20)`,
                  }}
                />

                <div className="relative space-y-6">
              <motion.p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{
                  background: `linear-gradient(90deg, ${activeSection.gradient[0]}, ${activeSection.gradient[1]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {activeSection.subtitle}
              </motion.p>

              <motion.div
                className="text-6xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {activeSection.icon}
              </motion.div>

              <motion.h3
                className="text-5xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                {activeSection.title}
              </motion.h3>

              <motion.div
                className="text-xl text-gray-600 leading-relaxed space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                {renderContent(activeSection)}
              </motion.div>

              <motion.div
                className="flex gap-2 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {PROJECT_SECTIONS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500`}
                    style={{
                      width: index === activeIndex ? '48px' : '32px',
                      background:
                        index === activeIndex
                          ? `linear-gradient(90deg, ${activeSection.gradient[0]}, ${activeSection.gradient[1]})`
                          : '#d1d5db',
                    }}
                  />
                ))}
              </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`visualization-${activeSection.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative"
            >
              {renderVisualization(activeSection)}
            </motion.div>

          </div>
        </div>
      </div>

      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 blur-lg opacity-60 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${PROJECT_SECTIONS[activeIndex].gradient[0]}, ${PROJECT_SECTIONS[activeIndex].gradient[1]})`,
            }}
          />
          <div className="relative backdrop-blur-md bg-white/80 border border-white/60 rounded-full px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-bold"
                style={{
                  background: `linear-gradient(135deg, ${PROJECT_SECTIONS[activeIndex].gradient[0]}, ${PROJECT_SECTIONS[activeIndex].gradient[1]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {activeIndex + 1}
              </span>
              <span className="text-xs text-gray-400">/</span>
              <span className="text-xs text-gray-600 font-medium">{PROJECT_SECTIONS.length}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function renderContent(section: ProjectSection) {
  if (Array.isArray(section.content) && section.content[0] && 'icon' in section.content[0]) {
    return (
      <div className="space-y-3">
        {(section.content as Feature[]).map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-2xl">{feature.icon}</span>
            <p className="text-lg text-gray-600">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  if (typeof section.content === 'object' && !Array.isArray(section.content) && 'frontend' in section.content) {
    return (
      <div className="space-y-4">
        {Object.entries(section.content as TechLayers).map(([layer, techs], i) => (
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm font-semibold text-gray-900 uppercase mb-1">
              {layer.charAt(0).toUpperCase() + layer.slice(1)}
            </p>
            <p className="text-base text-gray-600">{techs}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  if (Array.isArray(section.content) && section.content[0] && 'metric' in section.content[0]) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {(section.content as Metric[]).map((item, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="text-4xl font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, ${section.gradient[0]}, ${section.gradient[1]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {item.metric}
            </div>
            <p className="text-sm text-gray-600">{item.label}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return <p>{section.content as string}</p>;
}

function renderVisualization(section: ProjectSection) {
  if (section.visualization === 'interview-mockup') {
    return (
      <AnimatedTreeVisualization
        gradient={section.gradient as [string, string]}
      />
    );
  }

  if (section.visualization === 'features-grid') {
    return (
      <AnimatedFeatureHub
        gradient={section.gradient as [string, string]}
      />
    );
  }

  if (section.visualization === 'tech-stack-card') {
    return (
      <AnimatedTechStackCard
        gradientFrom={section.gradient[0]}
        gradientTo={section.gradient[1]}
        techCount={8}
      >
        <div className="bg-white rounded-3xl p-10 shadow-xl">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">Built With</h3>
          <div className="flex flex-col gap-4">
            {['Next.js', 'TypeScript', 'Flask', 'Python', 'WebRTC', 'OpenAI API', 'Supabase', 'Redis'].map((tech, i) => (
              <motion.div
                key={i}
                className="bg-gray-900 text-white px-6 py-5 rounded-full text-center font-medium text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedTechStackCard>
    );
  }

  if (section.visualization === 'system-diagram') {
    return (
      <AnimatedArchitecturePipeline
        gradient={section.gradient as [string, string]}
      />
    );
  }

  return (
    <TechVisualization
      type={section.visualization}
      gradient={section.gradient as [string, string]}
      icon={section.icon}
    />
  );
}
