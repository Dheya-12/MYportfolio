'use client';

/**
 * Animated Gradient Component
 * 
 * React wrapper for the WebGL gradient renderer
 * Creates Stripe-style animated gradient background
 */

import { useEffect, useRef, useState } from 'react';
import { GradientRenderer, createStripeGradient } from '@/lib/webgl/gradient-renderer';
import type { GradientConfig } from '@/lib/webgl/types';

/**
 * Component props
 */
export interface AnimatedGradientProps {
  /** Custom gradient configuration (optional) */
  config?: Partial<GradientConfig>;
  
  /** CSS class name for the canvas */
  className?: string;
  
  /** Whether to start animation automatically (default: true) */
  autoStart?: boolean;
  
  /** Z-index for the canvas (default: -1 for background) */
  zIndex?: number;
  
  /** Opacity (default: 1) */
  opacity?: number;
  
  /** Callback when renderer initializes */
  onInit?: (renderer: GradientRenderer) => void;
  
  /** Callback when renderer fails to initialize */
  onError?: (error: Error) => void;
}

/**
 * AnimatedGradient Component
 * 
 * Renders a full-screen Stripe-style animated gradient
 * Perfect for hero sections, backgrounds, and landing pages
 * 
 * @example
 * ```tsx
 * // Default Stripe gradient
 * <AnimatedGradient />
 * 
 * // Custom colors
 * <AnimatedGradient 
 *   config={{ 
 *     colors: ['#ff0000', '#00ff00', '#0000ff'] 
 *   }} 
 * />
 * 
 * // With custom styling
 * <AnimatedGradient 
 *   className="rounded-lg" 
 *   opacity={0.8}
 *   zIndex={0}
 * />
 * ```
 */
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

  /**
   * Initialize the gradient renderer
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('⚠️ Canvas ref not ready yet');
      return;
    }

    // Ensure canvas is mounted in DOM
    if (!canvas.isConnected) {
      console.warn('⚠️ Canvas not connected to DOM yet');
      return;
    }

    try {
      console.log('🎨 Initializing AnimatedGradient component...');

      // Create renderer
      const renderer = createStripeGradient(canvas);

      // Apply custom config if provided
      if (config) {
        renderer.updateConfig(config);
      }

      // Initialize WebGL
      const success = renderer.initialize();

      if (!success) {
        console.warn('⚠️ WebGL initialization failed - using fallback gradient');
        setHasError(true);
        return;
      }

      // Store renderer reference
      rendererRef.current = renderer;
      setIsInitialized(true);

      // Start animation if autoStart is enabled
      if (autoStart) {
        renderer.start();
      }

      // Call onInit callback
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

    // Cleanup on unmount
    return () => {
      if (rendererRef.current) {
        console.log('🧹 Cleaning up AnimatedGradient...');
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount - initialization should not re-run

  /**
   * Update config when it changes
   */
  useEffect(() => {
    if (rendererRef.current && config) {
      rendererRef.current.updateConfig(config);
    }
  }, [config]);

  /**
   * Handle window resize
   */
  useEffect(() => {
    if (!rendererRef.current) return;

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
      }
    };

    // Initial resize
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isInitialized]);

  /**
   * Handle visibility change (pause when tab is hidden)
   */
  useEffect(() => {
    if (!rendererRef.current || !autoStart) return;

    const handleVisibilityChange = () => {
      if (!rendererRef.current) return;

      if (document.hidden) {
        // Pause animation when tab is hidden (save CPU/battery)
        if (rendererRef.current.isRunning()) {
          rendererRef.current.stop();
        }
      } else {
        // Resume animation when tab is visible
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
        pointerEvents: 'none', // Allow clicks to pass through
      }}
      aria-hidden="true" // Decorative element
    >
      {/* Fallback content for browsers without canvas support */}
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

/**
 * ============================================
 * PRESET COMPONENTS
 * ============================================
 */

/**
 * Stripe-style gradient (default colors)
 */
export function StripeGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return <AnimatedGradient {...props} />;
}

/**
 * Dark theme gradient
 */
export function DarkGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#1e2635', // Midnight blue
          '#4316d3', // Deep purple
          '#7a3cff', // Violet
          '#3b26ff', // Intense blue
          '#13ffe3', // Cyan
          '#00cfff', // Aqua
        ],
      }}
    />
  );
}

/**
 * Warm gradient
 */
export function WarmGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#ff6b6b', // Red
          '#ff8e53', // Orange
          '#ffd93d', // Yellow
          '#ff6bcb', // Pink
          '#c44569', // Deep pink
          '#f8b500', // Gold
        ],
      }}
    />
  );
}

/**
 * Cool gradient
 */
export function CoolGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#13ffe3', // Cyan
          '#00cfff', // Aqua
          '#4facfe', // Blue
          '#00f2fe', // Light cyan
          '#43e97b', // Green
          '#38f9d7', // Turquoise
        ],
      }}
    />
  );
}

/**
 * Sunset gradient
 */
export function SunsetGradient(props: Omit<AnimatedGradientProps, 'config'>) {
  return (
    <AnimatedGradient
      {...props}
      config={{
        colors: [
          '#fa709a', // Pink
          '#fee140', // Yellow
          '#ff6a00', // Orange
          '#ee0979', // Magenta
          '#ff512f', // Red-orange
          '#feca57', // Gold
        ],
      }}
    />
  );
}
