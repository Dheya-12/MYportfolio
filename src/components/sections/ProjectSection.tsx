'use client';

import AnimatedProjectCard from '@/components/ui/AnimatedProjectCard';
import Image from 'next/image';

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-white"
    >
      <div className="flex items-center justify-center min-h-screen px-8 py-20">

        <div className="w-full max-w-[1200px]">
          <AnimatedProjectCard
            gradientFrom="#8B5CF6"
            gradientTo="#06B6D4"
          >
            <div className="relative w-full overflow-hidden bg-white rounded-3xl" style={{ height: '85vh' }}>
              <Image
                src="/intervyn-demo.png"
                alt="Intervyn AI Interview Platform"
                fill
                className="object-contain"
                sizes="1200px"
                priority
              />
            </div>
          </AnimatedProjectCard>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">Scroll for details</span>
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

    </section>
  );
}