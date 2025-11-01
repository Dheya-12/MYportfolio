'use client';

import { useEffect, useRef, useState } from 'react';
import { GradientRenderer, createStripeGradient } from '@/lib/webgl/gradient-renderer';
import type { GradientConfig } from '@/lib/webgl/types';

export interface AnimatedGradientProps {
  config?: Partial<GradientConfig>;
  className?: string;
  autoStart?: boolean;
  zIndex?: number;
  opacity?: number;
  onInit?: (renderer: GradientRenderer) => void;
  onError?: (error: Error) => void;
}

export default function AnimatedGradient({
  config,
  className = '',
  autoStart = true,
  zIndex = -1,
  opacity = 1,
  onInit,
  onError,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GradientRenderer | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('⚠️ Canvas ref not ready yet');
      return;
    }

    if (!canvas.isConnected) {
      console.warn('⚠️ Canvas not connected to DOM yet');
      return;
    }

    try {
      console.log('🎨 Initializing AnimatedGradient component...');

      const renderer = createStripeGradient(canvas);

      if (config) {
        renderer.updateConfig(config);
      }

      const success = renderer.initialize();

      if (!success) {
        console.warn('⚠️ WebGL initialization failed - using fallback gradient');
        setHasError(true);
        return;
      }

      rendererRef.current = renderer;
      setIsInitialized(true);

      if (autoStart) {
        renderer.start();
      }

      if (onInit) {
        onInit(renderer);
      }

      console.log('✅ AnimatedGradient initialized successfully');
    } catch (error) {
      console.error('❌ AnimatedGradient initialization failed:', error);
      setHasError(true);

      if (onError && error instanceof Error) {
        onError(error);
      }
    }

    return () => {
      if (rendererRef.current) {
        console.log('🧹 Cleaning up AnimatedGradient...');
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rendererRef.current && config) {
      rendererRef.current.updateConfig(config);
    }
  }, [config]);

  useEffect(() => {
    if (!rendererRef.current) return;

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isInitialized]);

  useEffect(() => {
    if (!rendererRef.current || !autoStart) return;

    const handleVisibilityChange = () => {
      if (!rendererRef.current) return;

      if (document.hidden) {
        if (rendererRef.current.isRunning()) {
          rendererRef.current.stop();
        }
      } else {
        if (!rendererRef.current.isRunning()) {
          rendererRef.current.start();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInitialized, autoStart]);

  return (
    <canvas
      ref={canvasRef}
      className={`animated-gradient ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        opacity,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {hasError && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            zIndex,
            opacity,
          }}
        />
      )}
    </canvas>
  );
}

export function StripeGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return <AnimatedGradient {...props} />;
}

export function DarkGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#1e2635',
          '#4316d3',
          '#7a3cff',
          '#3b26ff',
          '#13ffe3',
          '#00cfff',
        ],
      }}
    />
  );
}

export function WarmGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#ff6b6b',
          '#ff8e53',
          '#ffd93d',
          '#ff6bcb',
          '#c44569',
          '#f8b500',
        ],
      }}
    />
  );
}

export function CoolGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#13ffe3',
          '#00cfff',
          '#4facfe',
          '#00f2fe',
          '#43e97b',
          '#38f9d7',
        ],
      }}
    />
  );
}

export function SunsetGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#fa709a',
          '#fee140',
          '#ff6a00',
          '#ee0979',
          '#ff512f',
          '#feca57',
        ],
      }}
    />
  );
}
