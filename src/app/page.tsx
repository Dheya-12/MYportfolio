'use client';

import AnimatedGradient from '@/components/ui/AnimatedGradient';
import WaveDivider from '@/components/ui/WaveDivider';
import ProjectSection from '@/components/sections/ProjectSection';
import IntervynDetailSection from '@/components/sections/IntervynDetailSection';
import { COMPLETE_CONFIG } from '@/lib/webgl/types';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const getOrganicDelay = (index: number) => {
    const base = index * 0.05;
    const noise = Math.sin(index * 2.5) * 0.03 + Math.cos(index * 1.7) * 0.02;
    return base + noise;
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden pb-48">
        <AnimatedGradient config={COMPLETE_CONFIG} />

        <div
          className="absolute bottom-0 left-0 right-0 z-20 h-64 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.95) 100%)',
          }}
        />

        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-20">
          <motion.div
            className="flex flex-col items-center gap-8 text-center"
            style={{ y, opacity }}
          >
            <div className="relative w-full px-4">
              <motion.div
                className="absolute inset-0 text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl pointer-events-none"
                initial={{ x: -3, opacity: 0.7 }}
                animate={{ x: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ color: '#ff0040', mixBlendMode: 'screen' }}
              >
                Dheya Algalham
              </motion.div>
              <motion.div
                className="absolute inset-0 text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl pointer-events-none"
                initial={{ x: 3, opacity: 0.7 }}
                animate={{ x: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ color: '#00ffff', mixBlendMode: 'screen' }}
              >
                Dheya Algalham
              </motion.div>

              <svg
                className="relative w-full h-auto overflow-visible"
                viewBox="-50 -20 1100 180"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E85D9A">
                      <animate
                        attributeName="stop-color"
                        values="#E85D9A;#13ffe3;#6B2FD8;#E85D9A"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#13ffe3">
                      <animate
                        attributeName="stop-color"
                        values="#13ffe3;#6B2FD8;#E85D9A;#13ffe3"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#6B2FD8">
                      <animate
                        attributeName="stop-color"
                        values="#6B2FD8;#E85D9A;#13ffe3;#6B2FD8"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  <linearGradient id="liquidMetalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4a5568" />
                    <stop offset="20%" stopColor="#cbd5e0" />
                    <stop offset="40%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="60%" stopColor="#ffffff" />
                    <stop offset="80%" stopColor="#cbd5e0" />
                    <stop offset="100%" stopColor="#4a5568" />
                  </linearGradient>

                  <linearGradient id="specularSweep" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a202c" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="#cbd5e0" stopOpacity="0.3">
                      <animate
                        attributeName="offset"
                        values="0%;1%;0%"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9">
                      <animate
                        attributeName="offset"
                        values="0.2%;1.2%;0.2%"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="70%" stopColor="#cbd5e0" stopOpacity="0.3">
                      <animate
                        attributeName="offset"
                        values="0.4%;1.4%;0.4%"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#1a202c" stopOpacity="0.8" />
                  </linearGradient>

                  <filter id="liquidMetal" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.01 0.03"
                      numOctaves="3"
                      result="turbulence"
                    >
                      <animate
                        attributeName="baseFrequency"
                        values="0.01 0.03;0.02 0.04;0.01 0.03"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </feTurbulence>

                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="turbulence"
                      scale="3"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displaced"
                    />

                    <feSpecularLighting
                      in="displaced"
                      surfaceScale="5"
                      specularConstant="1.5"
                      specularExponent="20"
                      lightingColor="#ffffff"
                      result="specular"
                    >
                      <fePointLight x="500" y="-200" z="300">
                        <animate
                          attributeName="x"
                          values="200;800;200"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </fePointLight>
                    </feSpecularLighting>

                    <feComposite
                      in="specular"
                      in2="displaced"
                      operator="in"
                      result="specularComposite"
                    />

                    <feMerge>
                      <feMergeNode in="displaced" />
                      <feMergeNode in="specularComposite" />
                    </feMerge>
                  </filter>

                  <filter id="chromeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feFlood floodColor="#06b6d4" floodOpacity="0.6" result="floodColor" />
                    <feComposite in="floodColor" in2="coloredBlur" operator="in" result="coloredGlow" />
                    <feMerge>
                      <feMergeNode in="coloredGlow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.text
                  x="500"
                  y="80"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="72"
                  fontWeight="700"
                  fill="none"
                  stroke="url(#textGradient)"
                  strokeWidth="2"
                  filter="url(#chromeGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 2.5, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.3 },
                  }}
                  style={{
                    strokeDasharray: '1000',
                    strokeDashoffset: '1000',
                  }}
                >
                  Dheya Algalham
                </motion.text>

                <motion.text
                  x="500"
                  y="80"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="72"
                  fontWeight="700"
                  fill="url(#liquidMetalGradient)"
                  filter="url(#liquidMetal)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                  Dheya Algalham
                </motion.text>

                <motion.text
                  x="500"
                  y="80"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="72"
                  fontWeight="700"
                  fill="url(#specularSweep)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  style={{ mixBlendMode: 'overlay' }}
                >
                  Dheya Algalham
                </motion.text>
              </svg>

              <motion.div
                className="absolute inset-0 blur-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.25, 0.15, 0.25],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                }}
              />
            </div>

            <div className="text-xl font-medium text-white/90 sm:text-2xl md:text-3xl overflow-hidden">
              {['Full-Stack Developer', '•', 'AI Engineer', '•', 'Creative Coder'].map(
                (word, wordIndex) => (
                  <motion.span
                    key={`word-${wordIndex}`}
                    className="inline-block mr-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: word === '•' ? 0.6 : 1 }}
                    transition={{ delay: 2.5 + wordIndex * 0.1 }}
                  >
                    {word === '•' ? (
                      word
                    ) : (
                      <>
                        {word.split('').map((char, charIndex) => {
                          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                          const glitchChar = chars[(wordIndex * 13 + charIndex * 7) % chars.length];
                          return (
                            <motion.span
                              key={`char-${wordIndex}-${charIndex}`}
                              className="inline-block"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                              }}
                              transition={{
                                delay: 2.5 + wordIndex * 0.1 + charIndex * 0.03,
                                duration: 0.1,
                              }}
                              whileHover={{
                                scale: 1.2,
                                color: '#13ffe3',
                                transition: { duration: 0.1 },
                              }}
                            >
                              <motion.span
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                  delay: 2.5 + wordIndex * 0.1 + charIndex * 0.03,
                                  duration: 0.05,
                                }}
                                style={{ position: 'absolute' }}
                              >
                                {glitchChar}
                              </motion.span>
                              {char}
                            </motion.span>
                          );
                        })}
                      </>
                    )}
                  </motion.span>
                )
              )}
            </div>

            <motion.div className="max-w-2xl text-base text-white/80 sm:text-lg relative overflow-visible">
              {`I build web apps and AI systems that run fast, scale well, and make life easier for users and teams.`
                .split(' ')
                .map((word, index) => (
                  <motion.span
                    key={`desc-${index}`}
                    className="inline-block mr-[0.3em]"
                    initial={{
                      opacity: 0,
                      y: 20,
                      rotateX: 90,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 3.5 + getOrganicDelay(index),
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      transformPerspective: '1000px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.div>

            <motion.div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="#projects"
                className="group relative rounded-full bg-white px-8 py-4 font-semibold text-black overflow-hidden"
                initial={{
                  clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                  scale: 0,
                }}
                animate={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 4.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: { duration: 0.6 },
                  }}
                />
                <span className="relative z-10 flex items-center">
                  View My Work
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm overflow-hidden"
                initial={{
                  clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                  scale: 0,
                }}
                animate={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 4.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(19, 255, 227, 0.6)',
                  }}
                />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.5, 1],
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          >
            <svg
              className="h-6 w-6 text-white/60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </section>

        <div className="absolute bottom-0 left-0 right-0 z-30">
          <WaveDivider
            variant="layered"
            fillColor="#ffffff"
            position="bottom"
            animated
            className="h-32 sm:h-40 md:h-48"
          />
        </div>
      </div>

      <ProjectSection />

      <IntervynDetailSection />

    </>
  );
}
