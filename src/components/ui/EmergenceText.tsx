'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  settled: boolean;
}

interface EmergenceTextProps {
  text: string;
  fontSize?: number;
  onComplete?: () => void;
}

export default function EmergenceText({
  text,
  fontSize = 72,
  onComplete,
}: EmergenceTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const noise2D = (x: number, y: number): number => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = xf * xf * (3.0 - 2.0 * xf);
    const v = yf * yf * (3.0 - 2.0 * yf);

    const hash = (a: number, b: number) => {
      return ((Math.sin(a * 12.9898 + b * 78.233) * 43758.5453123) % 1 + 1) % 1;
    };

    const a = hash(X, Y);
    const b = hash(X + 1, Y);
    const c = hash(X, Y + 1);
    const d = hash(X + 1, Y + 1);

    return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const textCanvas = textCanvasRef.current;
    if (!canvas || !textCanvas) return;

    const ctx = canvas.getContext('2d');
    const textCtx = textCanvas.getContext('2d');
    if (!ctx || !textCtx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    textCanvas.width = rect.width * dpr;
    textCanvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    textCtx.scale(dpr, dpr);

    textCtx.font = `bold ${fontSize}px ${getComputedStyle(document.documentElement).getPropertyValue('font-family')}`;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';
    textCtx.fillStyle = 'white';
    textCtx.fillText(text, rect.width / 2, rect.height / 2);

    const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
    const targetPoints: { x: number; y: number }[] = [];

    for (let y = 0; y < imageData.height; y += 4) {
      for (let x = 0; x < imageData.width; x += 4) {
        const i = (y * imageData.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          targetPoints.push({ x: x / dpr, y: y / dpr });
        }
      }
    }

    const particles: Particle[] = targetPoints.map((target) => ({
      x: rect.width / 2 + (Math.random() - 0.5) * rect.width,
      y: rect.height / 2 + (Math.random() - 0.5) * rect.height,
      vx: 0,
      vy: 0,
      targetX: target.x,
      targetY: target.y,
      settled: false,
    }));

    particlesRef.current = particles;
    startTimeRef.current = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;

      ctx.clearRect(0, 0, rect.width, rect.height);

      let allSettled = true;

      particles.forEach((p, i) => {
        if (elapsed < 3) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 1) {
            allSettled = false;

            const springForce = 0.15;
            p.vx += dx * springForce;
            p.vy += dy * springForce;

            particles.forEach((other, j) => {
              if (i !== j) {
                const odx = p.x - other.x;
                const ody = p.y - other.y;
                const odist = Math.sqrt(odx * odx + ody * ody);

                if (odist < 20 && odist > 0) {
                  const repelForce = 0.5;
                  p.vx += (odx / odist) * repelForce;
                  p.vy += (ody / odist) * repelForce;
                }
              }
            });

            p.vx *= 0.85;
            p.vy *= 0.85;

            p.x += p.vx;
            p.y += p.vy;
          } else {
            p.settled = true;
          }
        } else {
          p.settled = true;

          const noiseScale = 0.01;
          const noiseStrength = 3;
          const noiseX = noise2D(p.targetX * noiseScale + elapsed * 0.3, p.targetY * noiseScale);
          const noiseY = noise2D(p.targetX * noiseScale, p.targetY * noiseScale + elapsed * 0.3);

          const mdx = p.targetX - mouseRef.current.x;
          const mdy = p.targetY - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const magneticStrength = 50;
          const magneticInfluence = mdist > 0 ? magneticStrength / (mdist * mdist) : 0;

          p.x = p.targetX + (noiseX - 0.5) * noiseStrength * 2 + (mdx / mdist) * magneticInfluence * 100;
          p.y = p.targetY + (noiseY - 0.5) * noiseStrength * 2 + (mdy / mdist) * magneticInfluence * 100;
        }

        const alpha = p.settled ? 1 : 0.6;
        const size = p.settled ? 2 : 1.5;

        const colorPhase = (p.x / rect.width + elapsed * 0.1) % 1;
        let r, g, b;
        if (colorPhase < 0.5) {
          const t = colorPhase * 2;
          r = Math.floor(232 * (1 - t) + 19 * t);
          g = Math.floor(93 * (1 - t) + 255 * t);
          b = Math.floor(154 * (1 - t) + 227 * t);
        } else {
          const t = (colorPhase - 0.5) * 2;
          r = Math.floor(19 * (1 - t) + 107 * t);
          g = Math.floor(255 * (1 - t) + 47 * t);
          b = Math.floor(227 * (1 - t) + 216 * t);
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (allSettled && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [text, fontSize, onComplete, isComplete]);

  return (
    <div className="relative w-full" style={{ height: `${fontSize * 1.5}px` }}>
      <canvas
        ref={textCanvasRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
