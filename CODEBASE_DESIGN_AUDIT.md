# Portfolio Codebase Design Audit Report

## Executive Summary

This portfolio is a **Next.js 15** application using the **App Router**, **React 19**, and **TypeScript**. The codebase demonstrates advanced patterns including:

- **Custom WebGL gradient renderer** with GLSL shaders (Stripe-style animated background)
- **Framer Motion** animations with scroll-triggered effects
- **Tailwind CSS v4** with modern theming approach
- **Modular architecture** separating UI, business logic, and WebGL engine
- **Comprehensive TypeScript** typing with strict mode
- **Performance-focused** patterns (cleanup, visibility API, cached uniforms)

The design philosophy emphasizes **clean separation of concerns**, **extensive documentation**, **type safety**, and **reusable patterns**.

---

## Project Structure Overview

```
my-portfolio/
├── public/
│   └── intervyn-demo.png          # Project screenshot
├── src/
│   ├── app/
│   │   ├── globals.css            # Global styles, Tailwind, CSS variables
│   │   ├── layout.tsx             # Root layout with fonts
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   ├── sections/
│   │   │   └── ProjectSection.tsx # Projects display section
│   │   └── ui/
│   │       ├── AnimatedGradient.tsx      # WebGL gradient wrapper
│   │       └── AnimatedProjectCard.tsx   # Framer Motion card
│   └── lib/
│       └── webgl/
│           ├── gradient-renderer.ts  # Main WebGL engine
│           ├── mesh.ts              # Geometry generation
│           ├── noise.ts             # Perlin noise functions
│           ├── shaders.ts           # GLSL vertex/fragment shaders
│           └── types.ts             # TypeScript definitions
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

**Key organizational principles:**
- **Components** organized by type: `sections/` for page sections, `ui/` for reusable UI
- **Library code** separated into `lib/` directory
- **WebGL engine** fully isolated in `lib/webgl/` with modular files
- **Clear naming** reflects purpose (no generic names like "utils")

---

## Design Philosophy & Patterns

### Core Design Principles

1. **Modularity First**: Every feature is self-contained and reusable
2. **Type Safety**: Comprehensive TypeScript with strict mode enabled
3. **Documentation**: Extensive JSDoc comments with usage examples
4. **Performance**: Cleanup patterns, caching, visibility API
5. **Separation of Concerns**: UI, logic, and rendering isolated
6. **Modern Stack**: Latest versions (Next.js 15, React 19, Tailwind v4)
7. **Accessibility**: Semantic HTML, ARIA attributes, focus styles
8. **Progressive Enhancement**: Fallbacks for WebGL failures

### Architectural Patterns

#### 1. **Component Architecture**
- **Default export** for main component
- **Named exports** for variants/presets
- **Props interface** with JSDoc documentation
- **Client components** explicitly marked with `'use client'`
- **useRef** for DOM/instance references
- **useEffect** for side effects with cleanup

#### 2. **WebGL Architecture**
- **Class-based renderer** (`GradientRenderer`)
- **Functional utilities** for mesh, noise operations
- **Modular separation**: shaders, mesh, noise, types in separate files
- **Cached uniforms** for performance optimization
- **GLSL shaders** as template strings for syntax highlighting

#### 3. **State Management**
- **Local state** with `useState` (no global state needed)
- **Ref-based** state for WebGL instances
- **Controlled lifecycle** with proper initialization and cleanup

#### 4. **Animation Strategy**
- **Framer Motion** for declarative React animations
- **requestAnimationFrame** for WebGL rendering
- **Visibility API** to pause when tab hidden
- **Scroll-triggered** with `useInView` from Framer Motion

#### 5. **Styling Strategy**
- **Tailwind CSS** as primary styling method
- **CSS variables** for themeable values
- **Global styles** only for truly global needs (scrollbar, smooth scroll)
- **@theme inline** directive for Tailwind v4 custom values
- **Utility-first** approach with minimal custom CSS

---

## File-by-File Analysis

### Configuration Files

#### File: `/package.json`

**Complete Code:**
```json
{
  "name": "my-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.545.0",
    "next": "15.5.5",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.5",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**Design Patterns Identified:**
- **Latest versions**: Next.js 15.5.5, React 19.1.0, Tailwind CSS v4
- **Turbopack enabled**: Using `--turbopack` flag for faster dev/build
- **Minimal dependencies**: Only essential packages (Framer Motion, Lucide icons)
- **Type definitions**: Proper @types packages for all dependencies

**Key Design Decisions:**
- Using **Framer Motion** for animations instead of alternatives like GSAP or plain CSS
- Using **Lucide React** for icons (lightweight, tree-shakeable)
- Using **Tailwind CSS v4** (latest, with new @theme directive)
- **No UI library**: Custom components from scratch for full control

**Naming Conventions:**
- Package name: kebab-case (`my-portfolio`)
- Scripts: lowercase, descriptive (`dev`, `build`, `start`, `lint`)

---

#### File: `/tsconfig.json`

**Complete Code:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Design Patterns Identified:**
- **Strict mode enabled**: Maximum type safety
- **Path aliases**: `@/*` maps to `./src/*` for clean imports
- **ESNext target**: Modern JavaScript features
- **Bundler module resolution**: Optimized for Next.js/webpack/turbopack

**Key Design Decisions:**
- **strict: true** ensures comprehensive type checking
- **Path aliases** eliminate relative import hell (`../../../`)
- **Next.js plugin** for TypeScript integration

**Import Convention:**
```typescript
// ✅ DO: Use path aliases
import Component from '@/components/ui/Component';

// ❌ DON'T: Use relative paths
import Component from '../../../components/ui/Component';
```

---

#### File: `/next.config.ts`

**Complete Code:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Design Patterns Identified:**
- **Type-safe configuration**: Using `NextConfig` type
- **Minimal config**: Defaults are sufficient for this project
- **TypeScript config file**: `.ts` instead of `.js` for type safety

**Key Design Decisions:**
- Using **default Next.js settings** (App Router, RSC, etc.)
- No custom webpack config needed
- Keeping configuration simple and maintainable

---

#### File: `/eslint.config.mjs`

**Complete Code:**
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
```

**Design Patterns Identified:**
- **ESM format**: Using `.mjs` extension with ES modules
- **FlatCompat**: Compatibility layer for ESLint 9 flat config
- **Next.js presets**: Using official Next.js ESLint configurations
- **Explicit ignores**: Clear list of excluded directories

**Key Design Decisions:**
- Following **Next.js recommended** ESLint rules
- Using **TypeScript-aware** linting
- Ignoring build artifacts and dependencies

---

#### File: `/postcss.config.mjs`

**Complete Code:**
```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

**Design Patterns Identified:**
- **Minimal PostCSS config**: Only Tailwind CSS plugin
- **Tailwind v4 approach**: Uses new `@tailwindcss/postcss` plugin
- **ESM format**: Consistent with other config files

**Key Design Decisions:**
- Using **Tailwind CSS v4** architecture (single plugin, no separate config file)
- No additional PostCSS plugins (autoprefixer built-in to Tailwind v4)

---

#### File: `/next-env.d.ts`

**Complete Code:**
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

**Design Patterns Identified:**
- **Auto-generated file**: Not manually edited
- **Triple-slash directives**: TypeScript reference types
- **Next.js types**: Ensures proper typing for Next.js features

**Key Design Decisions:**
- **Never modify** this file (regenerated by Next.js)

---

### Application Files

#### File: `/src/app/globals.css`

**Complete Code:**
```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* Remove default background since we're using gradient */
body {
  background: transparent;
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Ensure canvas covers viewport */
.animated-gradient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

/* Text selection styling */
::selection {
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

/* Focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}
```

**Design Patterns Identified:**
- **Tailwind v4 import**: Using `@import "tailwindcss"` directive
- **CSS variables**: Using CSS custom properties for theming
- **@theme inline**: Tailwind v4 feature for extending theme in CSS
- **Global styles only**: Only truly global styles here (scrollbar, focus, selection)
- **Accessibility**: Custom focus styles for keyboard navigation
- **Modern CSS**: Using modern features like `::selection`, `:focus-visible`

**Key Design Decisions:**
- **Transparent body background**: Allows WebGL gradient to show through
- **Custom scrollbar**: Better aesthetics than default
- **Smooth scrolling**: Native CSS, no JS required
- **Pointer events none** on gradient: Allows clicks to pass through
- **Fixed positioning** for gradient: Always visible background

**Naming Conventions:**
- CSS variables: kebab-case with double dash prefix (`--background`, `--foreground`)
- CSS classes: kebab-case (`.animated-gradient`)
- Color values: rgba() for transparency support

**Color Palette:**
```css
Background: #0a0a0a (very dark gray, almost black)
Foreground: #ededed (light gray)
Selection: rgba(255, 255, 255, 0.3) (semi-transparent white)
Focus outline: rgba(255, 255, 255, 0.8) (mostly opaque white)
```

---

#### File: `/src/app/layout.tsx`

**Complete Code:**
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Full-Stack Developer, AI Engineer, and Creative Coder building the future with cutting-edge web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Design Patterns Identified:**
- **Next.js App Router** root layout pattern
- **Font optimization**: Using `next/font/google` for automatic font loading
- **CSS variable injection**: Fonts exposed as CSS variables
- **Metadata export**: For SEO and social sharing
- **Type safety**: Using `Metadata` type from Next.js
- **Template literal classNames**: Combining multiple classes

**Key Design Decisions:**
- **Geist fonts**: Modern, clean font from Vercel
- **Two font variants**: Sans (body) and Mono (code)
- **CSS variables for fonts**: Makes them accessible throughout the app
- **Antialiased text**: Better text rendering
- **Scroll-smooth on html**: Enables smooth anchor scrolling
- **Readonly children**: Type safety for props

**Naming Conventions:**
- Font variable names: camelCase (`geistSans`, `geistMono`)
- Component name: PascalCase (`RootLayout`)
- Props destructuring: Direct destructuring with type annotation

**Component Structure Pattern:**
```tsx
// 1. Imports (types first, then packages, then local)
import type { Metadata } from "next";
import { FontName } from "next/font/google";
import "./styles.css";

// 2. Font configuration (before component)
const fontVariable = FontName({ config });

// 3. Metadata export (before component)
export const metadata: Metadata = { ... };

// 4. Component definition (default export)
export default function ComponentName({ children }) {
  return (
    <html>
      <body className="...">{children}</body>
    </html>
  );
}
```

---

#### File: `/src/app/page.tsx`

**Complete Code:**
```tsx
import AnimatedGradient from '@/components/ui/AnimatedGradient';

import ProjectSection from '@/components/sections/ProjectSection';
import { COMPLETE_CONFIG } from '@/lib/webgl/types';

export default function Home() {
  return (
    <>
      {/* ============================================
          HERO SECTION WITH GRADIENT BACKGROUND
          Gradient and Code Card stay here ONLY
          ============================================ */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Stripe-style gradient background - HERO ONLY */}
        <AnimatedGradient config={COMPLETE_CONFIG} />

        {/* Floating VS Code Card - HERO ONLY */}


        {/* Hero Content */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-20">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Hero Title */}
            <h1 className="text-6xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Your Name
            </h1>

            {/* Subtitle */}
            <p className="text-xl font-medium text-white/90 sm:text-2xl md:text-3xl">
              Full-Stack Developer • AI Engineer • Creative Coder
            </p>

            {/* Description */}
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              Building the future with AI, WebGL, and cutting-edge web technologies.
              Turning complex problems into elegant solutions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="group rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:shadow-2xl"
              >
                View My Work
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
          </div>
        </section>
      </div>

      {/* ============================================
          PROJECTS SECTION - WHITE BACKGROUND
          Separate from hero, clean white page
          ============================================ */}
      <ProjectSection />

      {/* Future sections */}
    </>
  );
}

```

**Design Patterns Identified:**
- **Server component by default**: No 'use client' needed for static content
- **Path alias imports**: Using `@/` for clean imports
- **Section comments**: Clear visual separation with banner comments
- **Fragment wrapper**: Multiple top-level sections without extra div
- **Semantic HTML**: Using `<section>`, `<h1>`, `<p>` appropriately
- **Responsive text sizes**: Using Tailwind breakpoint classes
- **Inline SVG**: For scroll indicator icon
- **Anchor links**: Hash links for smooth scrolling

**Key Design Decisions:**
- **Hero + Projects sections**: Two distinct visual sections
- **Full-screen hero**: `min-h-screen` for impact
- **Gradient background**: Fixed position, lives in hero only
- **White text on dark gradient**: High contrast for readability
- **Glass morphism button**: `backdrop-blur-sm` for modern effect
- **Hover animations**: Scale and shadow effects
- **Group hover**: Arrow animates on button hover
- **Responsive design**: Mobile-first with breakpoint modifiers

**Naming Conventions:**
- Component: PascalCase (`Home`)
- Constants: SCREAMING_SNAKE_CASE (`COMPLETE_CONFIG`)
- HTML semantic tags: lowercase

**Tailwind Pattern - Responsive Typography:**
```tsx
// Base → sm → md → lg → xl
className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
```

**Tailwind Pattern - Opacity Modifiers:**
```tsx
// Using /XX for opacity (Tailwind v4 syntax)
text-white/90  // 90% opacity
text-white/80  // 80% opacity
text-white/60  // 60% opacity
border-white/30  // 30% opacity
bg-white/10  // 10% opacity
```

**Tailwind Pattern - Layout:**
```tsx
// Flexbox centering
className="flex min-h-screen flex-col items-center justify-center"

// Responsive flex direction
className="flex flex-col gap-4 sm:flex-row"
```

**Comment Style:**
- Banner comments with `============` for major sections
- Inline comments for specific elements
- Clear, descriptive, not redundant

---

### Component Files

#### File: `/src/components/sections/ProjectSection.tsx`

**Complete Code:**
```tsx
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
            {/* Changed bg-gray-900 to bg-white */}
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
```

**Design Patterns Identified:**
- **'use client' directive**: Needed because AnimatedProjectCard uses Framer Motion
- **Next Image component**: Optimized image loading
- **fill prop**: Image fills container (with relative parent)
- **priority prop**: Above-the-fold image, load immediately
- **Inline style**: For specific vh-based height (Tailwind doesn't have 85vh utility)
- **ID attribute**: For anchor link from hero section
- **Centered layout**: Flexbox centering with constrained max-width

**Key Design Decisions:**
- **Client component**: Uses Framer Motion animations
- **White background**: Visual separation from hero
- **Max-width constraint**: 1200px for readability
- **85vh image height**: Almost full screen but not overwhelming
- **object-contain**: Preserves image aspect ratio
- **Gradient colors**: Purple to cyan for visual interest
- **Scroll indicator**: Encourages continued scrolling

**Next Image Pattern:**
```tsx
<Image
  src="/image.png"           // Public folder path
  alt="Descriptive text"     // Always include alt for accessibility
  fill                       // Fill parent container
  className="object-contain" // How to fit image
  sizes="1200px"            // Hint for responsive images
  priority                   // Load immediately (above fold)
/>
```

**Naming Conventions:**
- Component: PascalCase (`ProjectSection`)
- Section ID: lowercase (`projects`)
- Gradient colors: Hex with # prefix

---

#### File: `/src/components/ui/AnimatedGradient.tsx`

**Complete Code:**
```tsx
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
    if (!canvas) return;

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
        throw new Error('Failed to initialize WebGL gradient renderer');
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
  }, []); // Only run once on mount

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
```

**Design Patterns Identified:**
- **Comprehensive JSDoc**: Every function, interface, prop documented
- **Usage examples in JSDoc**: Shows developers how to use the component
- **Props interface**: Explicit interface with JSDoc comments
- **useRef for instances**: Canvas DOM ref + renderer instance ref
- **Multiple useEffect hooks**: Separated concerns (init, config, resize, visibility)
- **Cleanup pattern**: Return cleanup function in useEffect
- **Error handling**: Try-catch with error state and fallback UI
- **Callbacks**: onInit and onError for flexibility
- **Preset exports**: Named exports for common use cases
- **Omit utility type**: For preset components that exclude config prop
- **Console logging**: With emojis for easy debugging
- **Visibility API**: Pause animation when tab hidden (performance)

**Key Design Decisions:**
- **Client component**: Uses hooks (useEffect, useRef, useState)
- **Canvas element**: For WebGL rendering
- **Fixed positioning**: Always visible background
- **Pointer events none**: Clicks pass through to content
- **aria-hidden**: Canvas is decorative only
- **Fallback gradient**: CSS gradient if WebGL fails
- **Separate useEffects**: Each handles one concern (separation of concerns)
- **Empty dependency arrays**: Init only runs once
- **Config dependency**: Updates when config changes
- **Visibility optimization**: Saves CPU/battery when tab hidden

**Naming Conventions:**
- Component: PascalCase (`AnimatedGradient`)
- Presets: PascalCase with descriptive names (`DarkGradient`, `WarmGradient`)
- Refs: camelCase with Ref suffix (`canvasRef`, `rendererRef`)
- State: camelCase with is/has prefix for booleans (`isInitialized`, `hasError`)
- Props: camelCase with descriptive names (`autoStart`, `zIndex`)

**Hook Pattern - Multiple useEffect for Separation:**
```tsx
// ❌ DON'T: One giant useEffect
useEffect(() => {
  // Initialize
  // Handle resize
  // Handle visibility
  // Update config
}, [deps]);

// ✅ DO: Separate useEffect for each concern
useEffect(() => { /* Initialize */ }, []);
useEffect(() => { /* Handle resize */ }, [isInitialized]);
useEffect(() => { /* Handle visibility */ }, [isInitialized, autoStart]);
useEffect(() => { /* Update config */ }, [config]);
```

**Ref Pattern:**
```tsx
// DOM reference
const canvasRef = useRef<HTMLCanvasElement>(null);

// Instance reference
const rendererRef = useRef<GradientRenderer | null>(null);

// Access in effects
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const renderer = new GradientRenderer(canvas);
  rendererRef.current = renderer;

  return () => {
    rendererRef.current?.dispose();
    rendererRef.current = null;
  };
}, []);
```

**Cleanup Pattern:**
```tsx
useEffect(() => {
  // Setup
  const handler = () => { /* ... */ };
  window.addEventListener('event', handler);

  // Cleanup (return function)
  return () => {
    window.removeEventListener('event', handler);
  };
}, [deps]);
```

---

#### File: `/src/components/ui/AnimatedProjectCard.tsx`

**Complete Code:**
```tsx
'use client';

/**
 * Animated Project Card Component - STRIPE-STYLE WITH INNER TRACING
 *
 * Animation sequence:
 * 1. Outer + ALL inner outlines trace simultaneously (0.0s - 3.0s)
 * 2. Card pops SLOWLY + Skeleton fades out + Content fades in (3.0s - 6.0s)
 * 3. Animation complete (6.0s)
 */

import { useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';

export interface AnimatedProjectCardProps {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
  className?: string;
}

/**
 * Skeleton Component - Layout only
 */
function CardSkeleton() {
  return (
    <div className="relative h-full w-full bg-gray-900 p-8">
      <div className="flex h-full gap-8">

        {/* LEFT PANEL */}
        <div className="flex flex-1 flex-col items-center justify-between py-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gray-800" />
          </div>
          <div className="relative w-full max-w-[280px]">
            <div className="h-14 w-full rounded-full bg-gray-800" />
          </div>
          <div className="relative w-full space-y-4">
            <div className="h-20 w-full rounded-xl bg-gray-800" />
            <div className="h-32 w-full rounded-xl bg-gray-800" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative">
            <div className="h-12 w-48 rounded-lg bg-gray-800" />
          </div>
          <div className="relative flex-1">
            <div className="h-full w-full rounded-2xl bg-gray-800" />
          </div>
          <div className="relative ml-auto">
            <div className="h-12 w-36 rounded-lg bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * AnimatedProjectCard Component
 */
export default function AnimatedProjectCard({
  children,
  gradientFrom = '#8B5CF6',
  gradientTo = '#06B6D4',
  delay = 0,
  className = '',
}: AnimatedProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const gradientId = useId();

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* ============================================
          ALL SVG OUTLINES - FADE OUT AT 3.0s
          ============================================ */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 2 }}
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          delay: delay + 3.0,
          duration: 0.4,
          ease: 'easeOut',
        }}
      >
        <svg
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>

          {/* OUTER CARD OUTLINE */}
          <motion.rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="24"
            ry="24"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* INNER TRACES */}

          {/* 1. Avatar Circle */}
          <motion.circle
            cx="20%"
            cy="18%"
            r="64"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 2. End Interview Button */}
          <motion.rect
            x="8%"
            y="44%"
            width="32%"
            height="56"
            rx="28"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 3. Title Box */}
          <motion.rect
            x="5%"
            y="62%"
            width="40%"
            height="80"
            rx="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 4. Description Box */}
          <motion.rect
            x="5%"
            y="75%"
            width="40%"
            height="128"
            rx="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 5. Solution Header */}
          <motion.rect
            x="52%"
            y="8%"
            width="24%"
            height="48"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 6. Code Editor Container */}
          <motion.rect
            x="52%"
            y="15%"
            width="43%"
            height="68%"
            rx="16"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />

          {/* 7. Run Code Button */}
          <motion.rect
            x="76%"
            y="87%"
            width="18%"
            height="48"
            rx="8"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              duration: 3.0,
              ease: [0.4, 0, 0.2, 1],
              delay: delay,
            }}
          />
        </svg>
      </motion.div>

      {/* ============================================
          CARD CONTAINER - POPS SLOWLY OVER 3 SECONDS
          ============================================ */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-white shadow-2xl"
        style={{ zIndex: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.95, opacity: 0 }
        }
        transition={{
          delay: delay + 3.0,
          duration: 3.0,        // 🔥 3 SECOND SLOW POP!
          ease: 'easeOut',
        }}
      >
        {/* SKELETON LAYER - Fades out at 3.0s */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            delay: delay + 3.0,
            duration: 0.4,
            ease: 'easeOut',
          }}
          style={{ pointerEvents: 'none' }}
        >
          <CardSkeleton />
        </motion.div>

        {/* REAL CONTENT - Fades in at 3.0s */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            delay: delay + 3.0,
            duration: 0.6,
            ease: 'easeIn',
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
```

**Design Patterns Identified:**
- **Framer Motion animations**: Declarative animation API
- **useInView hook**: Trigger animation when element scrolls into view
- **useId hook**: Generate unique IDs for SVG gradients
- **Multi-layer animation**: SVG outlines, skeleton, content all animate
- **Motion components**: `motion.div`, `motion.rect`, `motion.circle`
- **pathLength animation**: SVG path drawing animation
- **Scroll-triggered**: Only animates once when in view
- **Skeleton loading**: Shows placeholder during animation
- **SVG gradients**: Linear gradient for animated outlines
- **Z-index layering**: Precise control of animation layers
- **Sub-component pattern**: `CardSkeleton` as internal component

**Key Design Decisions:**
- **3-second trace**: All SVG outlines draw simultaneously over 3 seconds
- **3-second pop**: Card scales and fades in over 3 seconds after trace
- **Skeleton fade**: Placeholder content fades out as real content fades in
- **once: true**: Animation only plays once (performance)
- **margin: '-100px'**: Trigger animation slightly before element in view
- **Custom easing**: Using cubic bezier `[0.4, 0, 0.2, 1]`
- **Pointer events none**: SVG doesn't block interactions
- **aria-hidden**: SVG is decorative
- **useId for gradient**: Avoids ID conflicts with multiple cards

**Framer Motion Pattern - Scroll-Triggered:**
```tsx
// 1. Create ref
const ref = useRef<HTMLDivElement>(null);

// 2. Track if in view
const isInView = useInView(ref, {
  once: true,      // Only trigger once
  margin: '-100px' // Offset from viewport edge
});

// 3. Apply to element
<div ref={ref}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
  />
</div>
```

**Framer Motion Pattern - SVG Path Drawing:**
```tsx
<motion.rect
  initial={{ pathLength: 0 }}           // Start at 0% drawn
  animate={{ pathLength: 1 }}           // End at 100% drawn
  transition={{
    duration: 3.0,                      // Over 3 seconds
    ease: [0.4, 0, 0.2, 1],            // Custom cubic bezier
  }}
/>
```

**Naming Conventions:**
- Component: PascalCase (`AnimatedProjectCard`, `CardSkeleton`)
- Hooks: camelCase (`useInView`, `useId`, `useRef`)
- Props: camelCase (`gradientFrom`, `gradientTo`)
- Constants: camelCase (`isInView`, `gradientId`)

**Sub-Component Pattern:**
```tsx
// Internal component (not exported)
function CardSkeleton() {
  return <div>...</div>;
}

// Main component (default export)
export default function MainComponent() {
  return (
    <div>
      <CardSkeleton />
    </div>
  );
}
```

---

### Library Files (WebGL Engine)

#### File: `/src/lib/webgl/types.ts`

**Complete Code:**
```typescript
/**
 * Stripe-style animated gradient types
 * Based on Stripe's COMPLETE color palette (warm + cool phases)
 * WITH IMPROVED COLORS: Rich warm (mango/red/gold) + Dark cool (luxurious purples/blues)
 */


// ============================================
// STRIPE'S COMPLETE COLOR PALETTE
// Warm phase: Rich, bold sunset colors
// Cool phase: Dark, luxurious purples and blues
// ============================================


export const STRIPE_COLORS = {
  // ===== WARM PHASE COLORS (Rich - Mango/Red/Gold!) =====
  magentaPink: '#E85D9A',      // Pink accent
  coral: '#FF7A63',            // Coral transition
  darkMango: '#FF8C00',        // Deep orange/mango
  deepRed: '#DC143C',          // Crimson red
  redOrange: '#FF4500',        // Red + mango blend
  richGold: '#DAA520',         // Dark golden tone

  // ===== COOL PHASE COLORS (DARKENED - Rich & Luxurious!) =====
  deepPurple: '#4316d3',       // Primary deep bluish purple (kept)
  cyan: '#13ffe3',             // Vivid cyan/teal - KEPT BRIGHT (Stripe signature!)
  richViolet: '#6B2FD8',       // Darker, richer violet
  deepLavender: '#9B7FD8',     // Darker lavender (less pastel)
  magenta: '#ff52c1',          // Shimmer magenta (kept)
  warmPink: '#fb7bb8',         // Warm pink accent (transition color)
  darkBlue: '#2916C7',         // Deeper, richer blue
  deepTeal: '#00A3CC',         // Darker teal/aqua
  navyBlue: '#0F1B3D',         // Very dark navy for depth
  midnightBlue: '#1e2635',     // Deepest blue/purple (kept)
} as const;


// Convert hex to RGB for WebGL (values 0-1)
export interface RGB {
  r: number;
  g: number;
  b: number;
}


// Color stop for gradient (position + color)
export interface ColorStop {
  position: number;  // 0.0 to 1.0
  color: RGB;
}


// Gradient animation configuration
export interface GradientConfig {
  // Colors to use in the gradient
  colors: string[];

  // Animation timing
  cycleSpeed: number;        // Speed of transitions between colors
  fullCycleDuration: number; // Full spectrum repeat time

  // Movement behavior
  enableBreathing: boolean;   // Undulating, breathing effect
  enableXInversion: boolean;  // X-shaped color swapping

  // Visual quality
  enableGrain: boolean;       // Subtle texture overlay
  grainIntensity: number;     // 0.0 to 1.0

  // Performance
  targetFPS: number;          // Target 60fps
}


// Mesh vertex data
export interface Vertex {
  x: number;
  y: number;
  z: number;
}


// Noise parameters for organic movement
export interface NoiseConfig {
  frequency: number;   // How "zoomed in" the noise is
  amplitude: number;   // How much movement
  octaves: number;     // Complexity layers
  persistence: number; // How much each octave contributes
}


// WebGL renderer state
export interface RendererState {
  gl: WebGLRenderingContext | null;
  canvas: HTMLCanvasElement | null;
  program: WebGLProgram | null;
  animationFrameId: number | null;
  isRunning: boolean;
  startTime: number;
}


// ============================================
// DEFAULT CONFIGURATIONS
// ============================================


/**
 * Default Stripe gradient (COOL phase - darkened)
 * Rich, luxurious purples and blues
 */
export const DEFAULT_CONFIG: GradientConfig = {
  colors: [
    STRIPE_COLORS.cyan,          // #13ffe3 - Bright cyan (signature)
    STRIPE_COLORS.richViolet,    // #6B2FD8 - Dark violet
    STRIPE_COLORS.deepLavender,  // #9B7FD8 - Deep lavender
    STRIPE_COLORS.deepPurple,    // #4316d3 - Deep purple
    STRIPE_COLORS.darkBlue,      // #2916C7 - Dark blue
    STRIPE_COLORS.deepTeal,      // #00A3CC - Deep teal
    STRIPE_COLORS.navyBlue,      // #0F1B3D - Navy blue
    STRIPE_COLORS.midnightBlue,  // #1e2635 - Midnight blue
  ],
  cycleSpeed: 4.5,
  fullCycleDuration: 37.5,
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};


/**
 * Warm phase gradient (Rich - Mango/Red/Gold!)
 * Sunset, fire, and autumn tones
 */
export const WARM_CONFIG: GradientConfig = {
  colors: [
    STRIPE_COLORS.magentaPink,   // #E85D9A - Pink accent
    STRIPE_COLORS.coral,         // #FF7A63 - Coral transition
    STRIPE_COLORS.darkMango,     // #FF8C00 - Deep mango
    STRIPE_COLORS.deepRed,       // #DC143C - Crimson red
    STRIPE_COLORS.redOrange,     // #FF4500 - Red-orange blend
    STRIPE_COLORS.richGold,      // #DAA520 - Dark gold
  ],
  cycleSpeed: 2.0,
  fullCycleDuration: 20,
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};


/**
 * Complete Stripe gradient (WARM + COOL)
 * Full transition with paint pouring effect
 * Rich warm colors → Dark cool colors
 *
 * Color journey:
 * Pink → Coral → Mango → Red-Orange → Deep Red → Gold
 * → Warm Pink (transition) → Magenta (transition)
 * → Rich Violet → Cyan → Deep Lavender → Deep Purple → Dark Blue → Deep Teal
 */
export const COMPLETE_CONFIG: GradientConfig = {
  colors: [
    // Warm phase (6 colors - Rich sunset/fire tones)
    STRIPE_COLORS.magentaPink,   // #E85D9A - Pink
    STRIPE_COLORS.coral,         // #FF7A63 - Coral
    STRIPE_COLORS.darkMango,     // #FF8C00 - Deep mango
    STRIPE_COLORS.redOrange,     // #FF4500 - Red-orange
    STRIPE_COLORS.deepRed,       // #DC143C - Crimson
    STRIPE_COLORS.richGold,      // #DAA520 - Dark gold

    // Transition colors (2 colors - warm → cool bridge)
    STRIPE_COLORS.warmPink,      // #fb7bb8 - Bridge
    STRIPE_COLORS.magenta,       // #ff52c1 - Bridge

    // Cool phase (6 colors - Dark luxurious tones)
    STRIPE_COLORS.richViolet,    // #6B2FD8 - Rich violet
    STRIPE_COLORS.cyan,          // #13ffe3 - Signature cyan (bright!)
    STRIPE_COLORS.deepLavender,  // #9B7FD8 - Deep lavender
    STRIPE_COLORS.deepPurple,    // #4316d3 - Deep purple
    STRIPE_COLORS.darkBlue,      // #2916C7 - Dark blue
    STRIPE_COLORS.deepTeal,      // #00A3CC - Deep teal
  ],
  cycleSpeed: 4.0,             // 2 seconds per color
  fullCycleDuration: 28,       // 14 colors × 2s = 28 seconds
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};


// Utility type for hex color validation
export type HexColor = `#${string}`;


// Helper function: Convert hex to RGB (0-1 range for WebGL)
export function hexToRGB(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}


// Helper function: Interpolate between two colors
export function interpolateColor(color1: RGB, color2: RGB, t: number): RGB {
  return {
    r: color1.r + (color2.r - color1.r) * t,
    g: color1.g + (color2.g - color1.g) * t,
    b: color1.b + (color2.b - color1.b) * t,
  };
}
```

**Design Patterns Identified:**
- **Type definitions first**: All interfaces and types defined clearly
- **Const assertions**: `as const` for immutable color palette
- **Descriptive comments**: Inline comments explain each color
- **Preset configurations**: DEFAULT, WARM, COMPLETE with JSDoc
- **Helper functions**: Pure utility functions at bottom
- **Template literal types**: `HexColor` type for validation
- **Regex validation**: In hexToRGB function
- **Named exports only**: No default export for type files

**Key Design Decisions:**
- **Centralized types**: All WebGL types in one file
- **Color palette**: Stripe-inspired colors with warm/cool phases
- **Configuration presets**: Ready-to-use gradient configs
- **Hex colors**: Easy to read and modify
- **Type safety**: Strict types for all WebGL data structures

**Naming Conventions:**
- Types/Interfaces: PascalCase (`RGB`, `GradientConfig`, `RendererState`)
- Constants: SCREAMING_SNAKE_CASE (`STRIPE_COLORS`, `DEFAULT_CONFIG`)
- Object properties: camelCase (`cycleSpeed`, `grainIntensity`)
- Functions: camelCase (`hexToRGB`, `interpolateColor`)

**Constant Object Pattern:**
```typescript
export const CONFIG_NAME = {
  property1: value1,
  property2: value2,
} as const;  // ← Makes object deeply readonly
```

**Type Definition Pattern:**
```typescript
// Interface for complex objects
export interface ConfigName {
  property1: type1;
  property2: type2;
}

// Type alias for simple types
export type HexColor = `#${string}`;
```

---

#### File: `/src/lib/webgl/gradient-renderer.ts`

*This file is 410 lines long. Key patterns are extracted below. See full code in previous sections.*

**Design Patterns Identified:**
- **Class-based architecture**: GradientRenderer encapsulates all WebGL logic
- **Private methods**: Implementation details hidden (updateUniforms, cacheUniformLocations)
- **Public API**: Clean interface (initialize, start, stop, resize, updateConfig, dispose)
- **Cached uniforms**: Store uniform locations for performance
- **State management**: Internal state object tracks renderer status
- **Arrow function for render**: Preserves `this` context for requestAnimationFrame
- **Performance tracking**: Logs with performance.now()
- **Cleanup pattern**: dispose() method releases all resources
- **Factory functions**: createStripeGradient, createCustomGradient helpers
- **Console logging**: Extensive logging with emojis for debugging

**Key Design Decisions:**
- **requestAnimationFrame loop**: Smooth 60fps animation
- **Time offset**: startTime tracks animation beginning
- **Viewport resize**: Handles window resize properly
- **WebGL context options**: Alpha, antialias, premultiplied settings
- **Uniform caching**: getUniformLocation called once and cached
- **Mesh abstraction**: Separate mesh module for geometry
- **Shader compilation**: Separate shaders module
- **Type safety**: TypeScript for all public APIs

**Class Pattern:**
```typescript
export class RendererName {
  // Private properties
  private gl: WebGLRenderingContext | null = null;
  private state: StateType;

  // Constructor
  constructor(canvas: HTMLCanvasElement, config: ConfigType) {
    this.canvas = canvas;
    this.config = config;
  }

  // Public methods
  public initialize(): boolean { ... }
  public start(): void { ... }
  public stop(): void { ... }
  public dispose(): void { ... }

  // Private methods
  private updateUniforms(): void { ... }
  private render = (): void => { ... }  // Arrow for 'this' binding
}
```

**Naming Conventions:**
- Class: PascalCase (`GradientRenderer`)
- Private properties: camelCase with private modifier (`gl`, `program`, `uniforms`)
- Public methods: camelCase (`initialize`, `start`, `stop`)
- Private methods: camelCase with private modifier (`updateUniforms`, `cacheUniformLocations`)
- Factory functions: camelCase (`createStripeGradient`, `createCustomGradient`)

---

#### Files: `/src/lib/webgl/mesh.ts`, `/src/lib/webgl/noise.ts`, `/src/lib/webgl/shaders.ts`

*These files follow similar patterns. Key commonalities:*

**Design Patterns Identified:**
- **Functional modules**: Pure functions, no classes
- **Comprehensive JSDoc**: Every function documented
- **Grouped exports**: Related functions exported together
- **Type exports**: Interfaces exported for external use
- **No side effects**: Pure utility functions
- **Template literals for GLSL**: Shaders as template strings with syntax highlighting

**Key Design Decisions:**
- **Modular separation**: Each concern (mesh, noise, shaders) in separate file
- **Reusable functions**: Generic, composable utilities
- **No dependencies**: Each module is self-contained (except types)
- **Performance optimized**: Typed arrays for WebGL data

**Naming Conventions:**
- Functions: camelCase (`createFullScreenQuad`, `perlinNoise2D`, `compileShader`)
- Interfaces: PascalCase (`Mesh`, `MeshBuffers`, `NoiseConfig`)
- Constants: SCREAMING_SNAKE_CASE (`DEFAULT_NOISE_CONFIG`, `BREATHING_PRESET`)

---

## Consolidated Pattern Library

### 1. React Component Template

```tsx
'use client';  // Only if client-side features needed

/**
 * Component Name
 *
 * Brief description of what this component does
 *
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */

import { useEffect, useRef, useState } from 'react';
import type { TypeName } from '@/lib/types';
import ChildComponent from '@/components/ui/ChildComponent';

/**
 * Component props interface
 */
export interface ComponentNameProps {
  /** Prop description */
  propName: string;

  /** Optional prop description (optional) */
  optionalProp?: number;

  /** Callback description (optional) */
  onEvent?: (data: DataType) => void;
}

/**
 * ComponentName Component
 *
 * Detailed description with usage examples
 */
export default function ComponentName({
  propName,
  optionalProp = defaultValue,
  onEvent,
}: ComponentNameProps) {
  // Refs for DOM and instances
  const ref = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<InstanceType | null>(null);

  // State
  const [isReady, setIsReady] = useState(false);

  // Effects (separate by concern)
  useEffect(() => {
    // Initialization

    // Cleanup
    return () => {
      // Cleanup code
    };
  }, []);

  useEffect(() => {
    // Handle prop changes
  }, [propName]);

  // Render
  return (
    <div ref={ref} className="...">
      <ChildComponent />
    </div>
  );
}

/**
 * Preset variant (optional)
 */
export function PresetVariant(props: Omit<ComponentNameProps, 'propName'>) {
  return <ComponentName {...props} propName="preset-value" />;
}
```

### 2. TypeScript Types Pattern

```typescript
/**
 * File description
 */

// ============================================
// SECTION NAME
// ============================================

// Type definitions
export interface TypeName {
  property1: string;
  property2: number;
}

// Constant objects
export const CONSTANT_NAME = {
  key1: 'value1',
  key2: 'value2',
} as const;

// Default configurations
export const DEFAULT_CONFIG: ConfigType = {
  option1: value1,
  option2: value2,
};

// Helper functions (at bottom)
export function helperFunction(param: Type): ReturnType {
  // Implementation
}
```

### 3. Class Pattern (for Complex State)

```typescript
export class ClassName {
  // Private properties
  private property1: Type1;
  private property2: Type2;

  // Constructor
  constructor(param: ParamType) {
    this.property1 = value;
    this.property2 = value;
  }

  // Public methods
  public initialize(): boolean {
    // Setup
    return success;
  }

  public start(): void {
    // Start
  }

  public stop(): void {
    // Stop
  }

  public dispose(): void {
    // Cleanup
  }

  // Private methods
  private helper(): void {
    // Implementation
  }

  // Arrow function for callbacks
  private callback = (): void => {
    // Preserves 'this' context
  }
}

// Factory functions
export function createInstance(config: ConfigType): ClassName {
  return new ClassName(config);
}
```

### 4. Hook Usage Pattern

```tsx
// useRef for DOM elements
const elementRef = useRef<HTMLDivElement>(null);

// useRef for instances
const instanceRef = useRef<InstanceType | null>(null);

// useState for simple state
const [isLoading, setIsLoading] = useState(false);

// useEffect for initialization (once)
useEffect(() => {
  // Setup

  return () => {
    // Cleanup
  };
}, []);

// useEffect for dependencies
useEffect(() => {
  // React to changes
}, [dependency1, dependency2]);

// useEffect for events
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('event', handler);

  return () => {
    window.removeEventListener('event', handler);
  };
}, []);
```

### 5. Framer Motion Animation Pattern

```tsx
import { motion, useInView } from 'framer-motion';

function AnimatedComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          delay: 0.2,
        }}
      >
        Content
      </motion.div>
    </div>
  );
}
```

### 6. Tailwind CSS Pattern

```tsx
// Responsive design (mobile-first)
<div className="text-base sm:text-lg md:text-xl lg:text-2xl">

// Flexbox layouts
<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

// Opacity modifiers (Tailwind v4)
<div className="bg-white/10 text-white/90 border-white/30">

// Hover states
<button className="transition-all hover:scale-105 hover:shadow-2xl">

// Group hover
<a className="group">
  <span className="group-hover:translate-x-1">→</span>
</a>

// Fixed positioning
<div className="fixed top-0 left-0 w-full h-full">

// Absolute positioning
<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
```

### 7. Import Organization Pattern

```tsx
// 1. Type imports (from external packages)
import type { Metadata } from "next";
import type { ConfigType } from "external-package";

// 2. External package imports
import { Package } from "external-package";
import { motion } from "framer-motion";

// 3. Internal type imports (with @/ alias)
import type { InternalType } from '@/lib/types';

// 4. Internal component/function imports
import Component from '@/components/ui/Component';
import { helperFunction } from '@/lib/utils';

// 5. Styles (last)
import "./styles.css";
```

### 8. Error Handling Pattern

```typescript
try {
  console.log('🎨 Starting operation...');

  // Operation
  const result = riskyOperation();

  if (!result) {
    throw new Error('Operation failed');
  }

  console.log('✅ Operation successful');

} catch (error) {
  console.error('❌ Operation failed:', error);

  // Set error state
  setHasError(true);

  // Call error callback
  if (onError && error instanceof Error) {
    onError(error);
  }
}
```

---

## Design System Constants

### Colors

```css
/* CSS Variables */
--background: #0a0a0a     /* Very dark gray, almost black */
--foreground: #ededed     /* Light gray */

/* Stripe Gradient - Warm Phase */
#E85D9A  /* Magenta Pink */
#FF7A63  /* Coral */
#FF8C00  /* Dark Mango */
#DC143C  /* Deep Red (Crimson) */
#FF4500  /* Red-Orange */
#DAA520  /* Rich Gold */

/* Stripe Gradient - Cool Phase */
#6B2FD8  /* Rich Violet */
#13ffe3  /* Cyan (signature) */
#9B7FD8  /* Deep Lavender */
#4316d3  /* Deep Purple */
#2916C7  /* Dark Blue */
#00A3CC  /* Deep Teal */
#0F1B3D  /* Navy Blue */
#1e2635  /* Midnight Blue */

/* UI Colors */
#ffffff  /* White */
rgba(255, 255, 255, 0.9)   /* White 90% */
rgba(255, 255, 255, 0.8)   /* White 80% */
rgba(255, 255, 255, 0.6)   /* White 60% */
rgba(255, 255, 255, 0.3)   /* White 30% (selection) */
rgba(0, 0, 0, 0.1)         /* Black 10% (scrollbar track) */
```

### Typography

```css
/* Fonts */
--font-geist-sans: 'Geist', Arial, Helvetica, sans-serif
--font-geist-mono: 'Geist Mono', monospace

/* Font Sizes (Tailwind Responsive) */
Base:  text-base (16px)
Small: text-sm (14px)
Large: text-lg (18px)
XL:    text-xl (20px)
2XL:   text-2xl (24px)
3XL:   text-3xl (30px)
6XL:   text-6xl (60px)
7XL:   text-7xl (72px)
8XL:   text-8xl (96px)
9XL:   text-9xl (128px)

/* Font Weights */
font-medium   (500)
font-semibold (600)
font-bold     (700)
```

### Spacing

```css
/* Tailwind Spacing Scale */
gap-2   (0.5rem / 8px)
gap-4   (1rem / 16px)
gap-8   (2rem / 32px)

px-8    (2rem / 32px horizontal padding)
py-4    (1rem / 16px vertical padding)
py-8    (2rem / 32px vertical padding)
py-20   (5rem / 80px vertical padding)

mt-8    (2rem / 32px top margin)
```

### Breakpoints

```css
/* Tailwind Breakpoints (Mobile-First) */
sm:  640px  (Small devices)
md:  768px  (Medium devices)
lg:  1024px (Large devices)
xl:  1280px (Extra large)
2xl: 1536px (2X Extra large)

/* Usage: */
text-base sm:text-lg md:text-xl lg:text-2xl
```

### Border Radius

```css
rounded-lg     (0.5rem / 8px)
rounded-xl     (0.75rem / 12px)
rounded-2xl    (1rem / 16px)
rounded-3xl    (1.5rem / 24px)
rounded-full   (9999px - perfect circle/pill)
```

### Shadows

```css
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Animation

```css
/* Tailwind Animations */
animate-bounce: Bouncing animation (scroll indicator)

/* Transition */
transition-all: All properties transition
transition-transform: Only transform properties

/* Durations (Framer Motion) */
0.4s - Fast
0.6s - Medium
3.0s - Slow (dramatic effects)

/* Easing */
ease: 'easeOut'
ease: 'easeIn'
ease: [0.4, 0, 0.2, 1]  /* Custom cubic bezier */
```

---

## Best Practices Observed

### Do's (Things to Replicate)

#### 1. Comprehensive JSDoc Documentation

```typescript
/**
 * AnimatedGradient Component
 *
 * Renders a full-screen Stripe-style animated gradient
 * Perfect for hero sections, backgrounds, and landing pages
 *
 * @example
 * ```tsx
 * <AnimatedGradient />
 * ```
 */
export default function AnimatedGradient({ ... }) {
  // ...
}
```

**Why:** Makes code self-documenting and provides IntelliSense in IDEs.

---

#### 2. Separation of Concerns with Multiple useEffect

```tsx
// ✅ DO: Separate useEffect for each concern
useEffect(() => {
  // Initialize WebGL
  return () => { /* cleanup */ };
}, []);

useEffect(() => {
  // Handle resize
}, [isInitialized]);

useEffect(() => {
  // Handle visibility
}, [isInitialized, autoStart]);
```

**Why:** Easier to understand, test, and maintain. Each effect has one responsibility.

---

#### 3. Cleanup Pattern in useEffect

```tsx
useEffect(() => {
  // Setup
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);

  // Cleanup (always return cleanup function)
  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);
```

**Why:** Prevents memory leaks and ensures proper cleanup when components unmount.

---

#### 4. Path Aliases for Clean Imports

```tsx
// ✅ DO: Use path aliases
import Component from '@/components/ui/Component';
import { CONFIG } from '@/lib/webgl/types';

// ❌ DON'T: Use relative paths
import Component from '../../../components/ui/Component';
```

**Why:** Easier to read, refactor, and maintain. No path hell.

---

#### 5. TypeScript Strict Mode

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Why:** Catches bugs early, improves code quality, better IntelliSense.

---

#### 6. Const Assertions for Immutable Objects

```typescript
export const STRIPE_COLORS = {
  cyan: '#13ffe3',
  purple: '#4316d3',
} as const;  // ← Makes deeply readonly
```

**Why:** Prevents accidental mutations, better type inference.

---

#### 7. Console Logging with Emojis

```typescript
console.log('🎨 Initializing...');
console.log('✅ Success!');
console.error('❌ Error:', error);
console.warn('⚠️ Warning');
console.log('🧹 Cleaning up...');
console.log('📐 Resizing...');
console.log('⏸️ Paused');
console.log('▶️ Playing');
```

**Why:** Makes logs easier to scan and understand at a glance.

---

#### 8. Default Export for Main, Named for Variants

```typescript
// Main component
export default function AnimatedGradient({ ... }) {
  // ...
}

// Preset variants
export function DarkGradient(props) {
  return <AnimatedGradient {...props} config={{ ... }} />;
}

export function WarmGradient(props) {
  return <AnimatedGradient {...props} config={{ ... }} />;
}
```

**Why:** Clear primary export, convenient presets for common use cases.

---

#### 9. Props Interface with JSDoc

```typescript
export interface ComponentProps {
  /** Custom gradient configuration (optional) */
  config?: Partial<GradientConfig>;

  /** CSS class name for the canvas */
  className?: string;

  /** Whether to start animation automatically (default: true) */
  autoStart?: boolean;
}
```

**Why:** Self-documenting, shows up in IDE hints, clear expectations.

---

#### 10. Responsive Design with Mobile-First Tailwind

```tsx
<h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
  Your Name
</h1>
```

**Why:** Works on all screen sizes, progressively enhanced.

---

### Unique Approaches

#### 1. WebGL Gradient Background

**Approach:** Custom WebGL renderer with GLSL shaders for animated gradient, wrapped in React component.

**Files:**
- `/src/lib/webgl/gradient-renderer.ts` - Main engine
- `/src/lib/webgl/shaders.ts` - GLSL shaders
- `/src/lib/webgl/mesh.ts` - Geometry
- `/src/lib/webgl/noise.ts` - Perlin noise
- `/src/components/ui/AnimatedGradient.tsx` - React wrapper

**Why Unique:**
- Most portfolios use static gradients or simple CSS animations
- This creates a Stripe-style "paint pouring" effect
- Smooth, organic movement using Perlin noise
- Highly customizable with multiple color presets

**Key Code:**
```tsx
<AnimatedGradient config={COMPLETE_CONFIG} />
```

---

#### 2. SVG Path Drawing Animation

**Approach:** Framer Motion's `pathLength` property to animate SVG outlines drawing on scroll.

**File:** `/src/components/ui/AnimatedProjectCard.tsx`

**Key Code:**
```tsx
<motion.rect
  initial={{ pathLength: 0 }}
  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
  transition={{ duration: 3.0, ease: [0.4, 0, 0.2, 1] }}
  stroke={`url(#${gradientId})`}
/>
```

**Why Unique:**
- Creates a "drawing" effect like watching someone sketch
- Multiple SVG elements trace simultaneously
- Gradient-colored strokes for visual interest
- Skeleton loader fades out as real content fades in

---

#### 3. Visibility API for Performance

**Approach:** Pause WebGL animation when tab is hidden to save CPU/battery.

**File:** `/src/components/ui/AnimatedGradient.tsx`

**Key Code:**
```tsx
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      renderer.stop();  // Pause when hidden
    } else {
      renderer.start(); // Resume when visible
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

**Why Unique:**
- Most sites don't optimize for hidden tabs
- Saves battery on mobile devices
- Reduces CPU usage when user switches tabs
- Improves overall browser performance

---

#### 4. Inline Tailwind Theme with @theme Directive

**Approach:** Using Tailwind CSS v4's new `@theme inline` directive to extend theme directly in CSS.

**File:** `/src/app/globals.css`

**Key Code:**
```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

**Why Unique:**
- New Tailwind v4 feature (not widely used yet)
- No separate `tailwind.config.js` file needed
- Extends theme directly in CSS with CSS variables
- Cleaner, more modern approach

---

#### 5. Modular WebGL Architecture

**Approach:** Separate files for shaders, mesh, noise, types, renderer - all tied together in a cohesive engine.

**Structure:**
```
lib/webgl/
├── types.ts           # All TypeScript definitions
├── shaders.ts         # GLSL vertex/fragment shaders
├── mesh.ts            # Geometry generation
├── noise.ts           # Perlin noise functions
└── gradient-renderer.ts  # Main renderer class
```

**Why Unique:**
- Most WebGL code is monolithic (everything in one file)
- This is highly modular and reusable
- Each file has a single responsibility
- Easy to test, maintain, and extend
- Can swap out mesh or noise implementations easily

---

#### 6. Custom Scrollbar Styling

**Approach:** Webkit-specific CSS for custom scrollbar design.

**File:** `/src/app/globals.css`

**Key Code:**
```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
```

**Why Unique:**
- Most sites use default scrollbar
- This creates a cohesive, branded experience
- Subtle but polished detail
- Works with the dark theme

---

## Implementation Guidelines for New Projects

### Setup Checklist

- [ ] **Initialize Next.js 15 with App Router**
  ```bash
  npx create-next-app@latest my-project --typescript --tailwind --app
  ```

- [ ] **Install dependencies**
  ```bash
  npm install framer-motion lucide-react
  ```

- [ ] **Configure TypeScript**
  - Enable strict mode in `tsconfig.json`
  - Add path aliases: `"@/*": ["./src/*"]`

- [ ] **Set up Tailwind CSS v4**
  - Install `@tailwindcss/postcss` and `tailwindcss@4`
  - Configure `postcss.config.mjs`
  - Use `@theme inline` in `globals.css`

- [ ] **Configure ESLint**
  - Use Next.js presets
  - Add TypeScript rules

- [ ] **Create folder structure**
  ```
  src/
  ├── app/
  ├── components/
  │   ├── sections/
  │   └── ui/
  └── lib/
  ```

- [ ] **Set up fonts**
  - Use `next/font/google` for optimized loading
  - Export as CSS variables

- [ ] **Configure CSS variables**
  - Define theme colors in `:root`
  - Use `@theme inline` for Tailwind integration

- [ ] **Set up global styles**
  - Smooth scrolling (`scroll-behavior: smooth`)
  - Custom scrollbar
  - Focus styles for accessibility
  - Text selection styling

---

### Code Templates to Use

#### Next.js Page Template

```tsx
import Component from '@/components/ui/Component';
import { CONFIG } from '@/lib/types';

export default function PageName() {
  return (
    <>
      <section className="relative min-h-screen">
        {/* Content */}
      </section>

      {/* Additional sections */}
    </>
  );
}
```

#### Client Component Template

```tsx
'use client';

/**
 * Component description
 */

import { useEffect, useRef, useState } from 'react';
import type { TypeName } from '@/lib/types';

export interface ComponentProps {
  /** Prop description */
  propName: string;
}

export default function ComponentName({ propName }: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Setup
    return () => { /* Cleanup */ };
  }, []);

  return (
    <div ref={ref} className="...">
      {/* Content */}
    </div>
  );
}
```

#### TypeScript Types File Template

```typescript
/**
 * Types for FeatureName
 */

// ============================================
// INTERFACES
// ============================================

export interface TypeName {
  property: string;
}

// ============================================
// CONSTANTS
// ============================================

export const CONSTANT_NAME = {
  key: 'value',
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

export function helperFunction(param: Type): ReturnType {
  // Implementation
}
```

---

## Technical Specifications

### Dependencies and Versions

```json
{
  "dependencies": {
    "framer-motion": "^12.23.24",    // Animation library
    "lucide-react": "^0.545.0",      // Icon library
    "next": "15.5.5",                // React framework
    "react": "19.1.0",               // UI library
    "react-dom": "19.1.0"            // React DOM
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",              // ESLint config
    "@tailwindcss/postcss": "^4",          // Tailwind PostCSS plugin
    "@types/node": "^20",                  // Node types
    "@types/react": "^19",                 // React types
    "@types/react-dom": "^19",             // React DOM types
    "eslint": "^9",                        // Linter
    "eslint-config-next": "15.5.5",        // Next.js ESLint
    "tailwindcss": "^4",                   // CSS framework
    "typescript": "^5"                     // Type system
  }
}
```

**Why these dependencies:**

- **Framer Motion**: Best-in-class React animation library with declarative API
- **Lucide React**: Lightweight, tree-shakeable icon library (better than Font Awesome)
- **Next.js 15**: Latest with App Router, React Server Components, Turbopack
- **React 19**: Latest stable with improved hooks and performance
- **Tailwind CSS v4**: Latest with new @theme directive and improved DX
- **TypeScript 5**: Latest with better type inference and performance

---

### Configuration Files

#### `tsconfig.json` (Complete)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### `eslint.config.mjs` (Complete)

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
```

#### `postcss.config.mjs` (Complete)

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

#### `next.config.ts` (Complete)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

---

## Conclusion

This portfolio codebase demonstrates **professional-grade React development** with:

### Key Takeaways

1. **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
2. **Modular Architecture**: Clear separation of concerns (UI, logic, WebGL engine)
3. **Type Safety**: Comprehensive TypeScript with strict mode
4. **Performance**: Visibility API optimization, cleanup patterns, cached uniforms
5. **Animations**: Framer Motion for declarative animations, WebGL for background
6. **Documentation**: Extensive JSDoc with usage examples
7. **Accessibility**: Semantic HTML, ARIA labels, focus styles
8. **Best Practices**: Path aliases, multiple useEffect, cleanup patterns

### Design Philosophy Summary

- **Modularity**: Every feature is self-contained
- **Documentation**: Code should explain itself
- **Performance**: Optimize by default
- **Type Safety**: Let TypeScript catch bugs
- **Clean Code**: Separation of concerns, single responsibility
- **Modern**: Use latest features and best practices

### How to Apply to New Projects

1. **Copy the folder structure** exactly
2. **Use the component templates** as starting points
3. **Follow the naming conventions** consistently
4. **Replicate the patterns** (hooks, imports, exports)
5. **Keep dependencies minimal** (only add what's needed)
6. **Document everything** with JSDoc
7. **Test as you build** (TypeScript helps catch errors)

---

**This audit report serves as a complete style guide and pattern library.** Use it as a reference when Claude Code helps you build new projects. Every pattern, convention, and decision in this codebase has been documented for easy replication.
