# CODEBASE AUDIT REPORT
## Deep Analysis for Implementing Dual Tracing Animation System

---

## 1. ANIMATION DNA

### 1.1 Core Timing Values
**Your signature easing curve (used everywhere):**
```typescript
ease: [0.4, 0, 0.2, 1]  // Cubic bezier - appears in 15+ locations
```

**Standard durations:**
- **Fast**: `0.3-0.6s` - Quick interactions, fades
- **Medium**: `0.8-1.5s` - Element entrances, transforms
- **Slow**: `2.5-3.0s` - SVG stroke animations, complex sequences
- **Very Slow**: `3.0-8.0s` - Continuous color cycling

**Delay patterns:**
- Character animation: `0.03s` per character
- Word animation: `0.1s` per word
- Staggered elements: `0.05-0.1s` between items
- Organic delays: Uses Math.sin/cos for variation

### 1.2 Framer Motion Patterns

**Pattern 1: Basic Fade + Slide (used 10+ times)**
```typescript
initial={{ opacity: 0, y: 30 }}
animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
```

**Pattern 2: useInView Hook (standard config)**
```typescript
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });
```
- Always uses `once: true`
- Always uses `margin: '-100px'` for early trigger
- Ref always named `ref` or descriptive like `heroRef`

**Pattern 3: SVG Path Animation (hero title)**
```typescript
initial={{ pathLength: 0, opacity: 0 }}
animate={{ pathLength: 1, opacity: 1 }}
transition={{
  pathLength: { duration: 2.5, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.3 },
}}
style={{
  strokeDasharray: '1000',  // Large number
  strokeDashoffset: '1000',
}}
```

**Pattern 4: Glitch Character Animation**
```typescript
// For each character:
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: baseDelay + charIndex * 0.03,
    duration: 0.1,
  }}
>
  {/* Glitch overlay */}
  <motion.span
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{
      delay: baseDelay + charIndex * 0.03,
      duration: 0.05,
    }}
    style={{ position: 'absolute' }}
  >
    {glitchChar}
  </motion.span>
  {actualChar}
</motion.span>
```

**Pattern 5: Button Hover (hero CTAs)**
```typescript
<motion.a
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Shine effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
    initial={{ x: '-100%' }}
    whileHover={{
      x: '100%',
      transition: { duration: 0.6 },
    }}
  />
</motion.a>
```

**Pattern 6: Liquid Morphing Entrance**
```typescript
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
```

---

## 2. SVG & STROKE ANIMATION SYSTEM

### 2.1 Hero Title SVG Structure (page.tsx lines 70-279)

**Gradient Definition Pattern:**
```typescript
<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
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
```
**Key observations:**
- 3 stop colors cycling through your palette
- 8-second animation duration (consistent)
- Colors: #E85D9A (pink), #13ffe3 (cyan), #6B2FD8 (purple)

**Filter Pattern (Glow Effect):**
```typescript
<filter id="chromeGlow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
  <feFlood floodColor="#06b6d4" floodOpacity="0.6" result="floodColor" />
  <feComposite in="floodColor" in2="coloredBlur" operator="in" result="coloredGlow" />
  <feMerge>
    <feMergeNode in="coloredGlow" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
```
**Standard values:**
- Blur: `stdDeviation="4"`
- Glow color: Cyan `#06b6d4`
- Opacity: `0.6`
- Filter bounds: `-50%` with `200%` width/height

**Liquid Metal Gradient (Hero specific):**
```typescript
<linearGradient id="liquidMetalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stopColor="#4a5568" />
  <stop offset="20%" stopColor="#cbd5e0" />
  <stop offset="40%" stopColor="#ffffff" />
  <stop offset="50%" stopColor="#e2e8f0" />
  <stop offset="60%" stopColor="#ffffff" />
  <stop offset="80%" stopColor="#cbd5e0" />
  <stop offset="100%" stopColor="#4a5568" />
</linearGradient>
```

### 2.2 Chromatic Aberration Effect (Hero)

```typescript
{/* Red channel */}
<motion.div
  className="absolute inset-0 text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl pointer-events-none"
  initial={{ x: -3, opacity: 0.7 }}
  animate={{ x: 0, opacity: 0 }}
  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
  style={{ color: '#ff0040', mixBlendMode: 'screen' }}
>
  {text}
</motion.div>

{/* Cyan channel */}
<motion.div
  className="absolute inset-0 ..."
  initial={{ x: 3, opacity: 0.7 }}
  animate={{ x: 0, opacity: 0 }}
  style={{ color: '#00ffff', mixBlendMode: 'screen' }}
>
  {text}
</motion.div>
```
**Values:**
- Offset: `±3px`
- Initial opacity: `0.7`
- Blend mode: `'screen'`
- Red: `#ff0040`, Cyan: `#00ffff`

---

## 3. ANIMATED PROJECT CARD DEEP DIVE

### 3.1 Core Architecture (AnimatedProjectCard.tsx)

**Props interface:**
```typescript
export interface AnimatedProjectCardProps {
  children: React.ReactNode;
  gradientFrom?: string;        // Default: '#8B5CF6'
  gradientTo?: string;          // Default: '#06B6D4'
  delay?: number;               // Default: 0
  className?: string;
}
```

**Animation Sequence (CRITICAL):**
```
0.0s - 3.0s:  SVG outlines trace (ALL simultaneously)
3.0s - 3.4s:  Outlines fade out (duration: 0.4s)
3.0s - 6.0s:  Card scales 0.95 → 1 (duration: 3.0s, SLOW POP)
3.0s - 3.4s:  Skeleton fades out (duration: 0.4s)
3.0s - 3.6s:  Real content fades in (duration: 0.6s)
```

**Standard gradient pair:**
- Purple to Cyan: `#8B5CF6` → `#06B6D4`
- Used in ProjectSection line 16-17

### 3.2 SVG Outline Configuration

**Outer card outline:**
```typescript
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
```
**Key values:**
- Inset: `2px` from edges
- Border radius: `24px` (matches rounded-3xl)
- Stroke width: `3px`
- Duration: `3.0s` (all paths)

**Inner traces (hardcoded for Intervyn screenshot):**
```typescript
// 1. Avatar Circle
<motion.circle
  cx="20%"
  cy="18%"
  r="64"
  stroke={`url(#${gradientId})`}
  strokeWidth="2"
  // ... same animation
/>

// 2. End Interview Button
<motion.rect
  x="8%"
  y="44%"
  width="32%"
  height="56"
  rx="28"
  // ... same animation
/>

// 3-7. Additional shapes...
```

### 3.3 Skeleton Pattern

```typescript
function CardSkeleton() {
  return (
    <div className="relative h-full w-full bg-gray-900 p-8">
      <div className="flex h-full gap-8">
        {/* LEFT PANEL */}
        <div className="flex flex-1 flex-col items-center justify-between py-8">
          <div className="h-32 w-32 rounded-full bg-gray-800" />
          <div className="h-14 w-full max-w-[280px] rounded-full bg-gray-800" />
          <div className="space-y-4 w-full">
            <div className="h-20 w-full rounded-xl bg-gray-800" />
            <div className="h-32 w-full rounded-xl bg-gray-800" />
          </div>
        </div>
        {/* RIGHT PANEL */}
        {/* ... */}
      </div>
    </div>
  );
}
```
**Colors:**
- Background: `bg-gray-900`
- Skeleton blocks: `bg-gray-800`
- Border radius: `rounded-full`, `rounded-xl`

### 3.4 Card Container Animation

```typescript
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
```
**Standard card styling:**
- `rounded-3xl` (24px)
- `bg-white`
- `shadow-2xl`
- `overflow-hidden`

---

## 4. STYLING SYSTEM

### 4.1 Consistent Tailwind Patterns

**Section structure (appears 3+ times):**
```typescript
<section className="relative min-h-screen bg-white">
  <div className="flex items-center justify-center min-h-screen px-8 py-20">
    <div className="w-full max-w-[1200px]">
      {/* Content */}
    </div>
  </div>
</section>
```

**Spacing patterns:**
- Section padding: `px-8 py-20`
- Max width: `max-w-[1200px]` (exact value, always)
- Element gaps: `gap-4` (16px), `gap-8` (32px), `gap-12` (48px)
- Margins: `mb-8`, `mb-16`, `mb-32` (large sections)

**Border radius hierarchy:**
- Small: `rounded-xl` (12px) - Badges, small cards
- Medium: `rounded-2xl` (16px) - Medium cards
- Large: `rounded-3xl` (24px) - Major cards, sections
- Full: `rounded-full` - Buttons, pills, avatars

**Shadow usage:**
- Cards: `shadow-2xl`
- Hover effects: `shadow-lg`
- No shadows on gradient backgrounds

### 4.2 Color System

**Text colors (on white background):**
- Headings: `text-gray-900`
- Body: `text-gray-600`
- Muted: `text-gray-400`

**Text colors (on gradient/dark):**
- Primary: `text-white`
- Slight fade: `text-white/90`
- Body: `text-white/80`

**Background colors:**
- Primary sections: `bg-white`
- Subtle variations: `bg-gray-50`
- Dark accents: `bg-gray-900`, `bg-gray-800`

**Your signature gradient colors:**
```typescript
// Main palette (from types.ts)
'#E85D9A' // Magenta Pink
'#FF7A63' // Coral
'#FF8C00' // Dark Mango
'#DC143C' // Deep Red
'#13ffe3' // Cyan (SIGNATURE)
'#6B2FD8' // Rich Violet
'#4316d3' // Deep Purple
'#8B5CF6' // Standard Purple
'#06B6D4' // Standard Cyan
```

**Common gradient pairs:**
- Purple → Cyan: `#8B5CF6` → `#06B6D4`
- Pink → Cyan: `#E85D9A` → `#13ffe3`
- Cyan → Purple: `#13ffe3` → `#6B2FD8`
- Purple → Deep Purple: `#6B2FD8` → `#8B5CF6`

### 4.3 Typography Scale

**From hero and sections:**
```typescript
// Massive (hero name)
'text-6xl sm:text-7xl md:text-8xl lg:text-9xl'

// Large titles
'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'

// Section headings
'text-4xl sm:text-5xl'

// Subsection headings
'text-3xl sm:text-4xl'

// Card titles
'text-xl sm:text-2xl'

// Body text
'text-base sm:text-lg'

// Small text
'text-sm'
```

**Font weights:**
- Headings: `font-bold` (700)
- Subheadings: `font-semibold` (600)
- Body: `font-medium` (500) or default (400)

**Line height:**
- Body text: `leading-relaxed`
- No specific leading for headings (default)

### 4.4 Responsive Breakpoints

**Standard pattern:**
```typescript
// Mobile first, scale up
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
```

**Breakpoints (from Tailwind defaults):**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- Used consistently across codebase

**Grid responsive:**
```typescript
'grid md:grid-cols-2 gap-8'
'grid md:grid-cols-3 gap-8'
'grid grid-cols-2 md:grid-cols-3'
```

---

## 5. BUTTON & INTERACTION PATTERNS

### 5.1 Primary Button (Hero style - line 394-436)

```typescript
<motion.a
  className="group relative rounded-full bg-white px-8 py-4 font-semibold text-black overflow-hidden"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  {/* Shine effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
    initial={{ x: '-100%' }}
    whileHover={{
      x: '100%',
      transition: { duration: 0.6 },
    }}
  />
  <span className="relative z-10 flex items-center">
    Button Text
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
```

**Standard button values:**
- Padding: `px-8 py-4`
- Border radius: `rounded-full`
- Hover scale: `1.05`
- Tap scale: `0.98`
- Shine duration: `0.6s`
- Arrow animation: `x: [0, 4, 0]` over `1.5s`

### 5.2 Secondary Button (Hero - line 438-464)

```typescript
<motion.a
  className="group relative rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm overflow-hidden"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  <motion.div
    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      boxShadow: '0 0 30px rgba(19, 255, 227, 0.6)',
    }}
  />
  <span className="relative z-10">Button Text</span>
</motion.a>
```

**Glass button characteristics:**
- Border: `border-2 border-white/30`
- Background: `bg-white/10`
- Backdrop: `backdrop-blur-sm`
- Glow: Cyan `rgba(19, 255, 227, 0.6)` with `30px` spread

---

## 6. COMPONENT ARCHITECTURE

### 6.1 File Structure Pattern

```
src/
  components/
    ui/               # Reusable UI components
      AnimatedProjectCard.tsx
      AnimatedGradient.tsx
      WaveDivider.tsx
      EmergenceText.tsx
      GradientFade.tsx
    sections/         # Page sections
      ProjectSection.tsx
      IntervynDetailSection.tsx
  lib/
    webgl/            # WebGL utilities
      types.ts
      shaders.ts
      gradient-renderer.ts
```

**Naming conventions:**
- Components: PascalCase (AnimatedProjectCard)
- Files match component names exactly
- No index.ts files
- Props interface: `{ComponentName}Props`

### 6.2 Component Structure Template

```typescript
'use client';

/**
 * Component Name
 *
 * Description
 *
 * Features:
 * - Feature 1
 * - Feature 2
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface ComponentNameProps {
  // Props
}

export default function ComponentName({
  // Destructured props with defaults
}: ComponentNameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    // JSX
  );
}
```

**Patterns:**
- Always `'use client';` at top
- Detailed JSDoc comments
- Named exports for interfaces
- Default export for component
- useRef + useInView pattern for scroll animations

### 6.3 Props Pattern

**Standard props you use:**
```typescript
interface StandardProps {
  children?: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
}
```

**Default values in destructuring:**
```typescript
function Component({
  gradientFrom = '#8B5CF6',
  gradientTo = '#06B6D4',
  delay = 0,
  className = '',
}: Props) {
  // ...
}
```

---

## 7. USAGE MAP

### 7.1 Current AnimatedProjectCard Usage

**Location 1: ProjectSection.tsx (lines 15-30)**
```typescript
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
```
**Container:**
- Section: `bg-white min-h-screen`
- Wrapper: `max-w-[1200px]`
- Content: `bg-white rounded-3xl` with image

**Location 2: IntervynDetailSection.tsx (multiple uses)**
```typescript
// Large card
<AnimatedProjectCard gradientFrom="#E85D9A" gradientTo="#13ffe3">
  <div className="bg-white rounded-3xl p-12 h-full">
    {/* Content */}
  </div>
</AnimatedProjectCard>

// Tech stack card
<AnimatedProjectCard gradientFrom="#13ffe3" gradientTo="#6B2FD8" delay={0.2}>
  <div className="bg-white rounded-3xl p-8 h-full flex flex-col">
    {/* Content */}
  </div>
</AnimatedProjectCard>

// Feature cards (3x)
<AnimatedProjectCard
  gradientFrom="#FF8C00"
  gradientTo="#DC143C"
  delay={0.4}
>
  <div className="bg-white rounded-3xl p-8 h-full">
    {/* Content */}
  </div>
</AnimatedProjectCard>
```

**Pattern observations:**
- Always wraps: `bg-white rounded-3xl`
- Padding varies: `p-8`, `p-12`
- Uses different gradient pairs for variety
- Staggers with delay

---

## 8. WAVE DIVIDER SYSTEM

### 8.1 WaveDivider Component

**Usage in page.tsx (lines 498-506):**
```typescript
<WaveDivider
  variant="layered"
  fillColor="#ffffff"
  position="bottom"
  animated
  className="h-32 sm:h-40 md:h-48"
/>
```

**Variants available:**
- `subtle` - Gentle minimal wave
- `bold` - Pronounced single wave
- `layered` - Multiple layered waves (USED)
- `organic` - Flowing wave

**Standard config:**
- Variant: `"layered"`
- Fill: `"#ffffff"` (section below color)
- Position: `"bottom"` of section
- Animated: `true`
- Height: Responsive `h-32 sm:h-40 md:h-48`

---

## 9. RECOMMENDATIONS FOR NEW IMPLEMENTATION

Based on this audit, here's how to implement the dual tracing system:

### 9.1 Create Two New Components

**Component 1: `AnimatedIntervynCard.tsx`**
- Copy AnimatedProjectCard structure EXACTLY
- Keep same animation timing (3s trace, 3s pop)
- Hardcode SVG shapes for Intervyn screenshot layout
- Use same skeleton pattern
- Props: `gradientFrom`, `gradientTo`, `delay`, `children`

**Component 2: `AnimatedContentCard.tsx`**
- NEW component for content-aware tracing
- Uses React.Children to detect content structure
- Traces visible elements dynamically
- More complex: needs content measurement
- Falls back to simple outer rect if content too complex

### 9.2 SVG Shape Positions (for AnimatedIntervynCard)

Based on screenshot analysis, hardcode these shapes:
```typescript
// Left panel
<motion.circle cx="20%" cy="18%" r="64" />  // Avatar
<motion.rect x="8%" y="44%" width="32%" height="56" rx="28" />  // End button
<motion.rect x="5%" y="62%" width="40%" height="80" rx="12" />  // Title
<motion.rect x="5%" y="75%" width="40%" height="128" rx="12" />  // Description

// Right panel
<motion.rect x="52%" y="8%" width="24%" height="48" rx="8" />  // Header
<motion.rect x="52%" y="15%" width="43%" height="68%" rx="16" />  // Code area
<motion.rect x="76%" y="87%" width="18%" height="48" rx="8" />  // Run button
```

### 9.3 Animation Sequence

**Keep your exact timing:**
```typescript
// Phase 1: Trace (0-3s)
<motion.rect
  initial={{ pathLength: 0 }}
  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
  transition={{
    duration: 3.0,
    ease: [0.4, 0, 0.2, 1],
    delay: delay,
  }}
/>

// Phase 2: Fade SVG (3.0-3.4s)
<motion.div
  initial={{ opacity: 1 }}
  animate={isInView ? { opacity: 0 } : { opacity: 1 }}
  transition={{
    delay: delay + 3.0,
    duration: 0.4,
    ease: 'easeOut',
  }}
>

// Phase 3: Pop Card (3.0-6.0s)
<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
  transition={{
    delay: delay + 3.0,
    duration: 3.0,
    ease: 'easeOut',
  }}
>
```

### 9.4 Gradient Pairs to Use

**For variety, rotate through:**
```typescript
const GRADIENT_PAIRS = [
  ['#8B5CF6', '#06B6D4'],  // Purple → Cyan (default)
  ['#E85D9A', '#13ffe3'],  // Pink → Cyan
  ['#13ffe3', '#6B2FD8'],  // Cyan → Purple
  ['#FF8C00', '#DC143C'],  // Orange → Red
  ['#4316d3', '#00A3CC'],  // Deep Purple → Teal
  ['#6B2FD8', '#8B5CF6'],  // Violet → Purple
];
```

### 9.5 File Locations

```
src/components/ui/AnimatedIntervynCard.tsx    // Hardcoded Intervyn layout
src/components/ui/AnimatedContentCard.tsx     // Content-aware tracing
src/components/ui/AnimatedProjectCard.tsx     // Keep existing
```

### 9.6 Usage Example

```typescript
// In IntervynDetailSection:
<AnimatedIntervynCard
  gradientFrom="#E85D9A"
  gradientTo="#13ffe3"
>
  <div className="bg-white rounded-3xl p-12">
    {/* Intervyn screenshot content */}
  </div>
</AnimatedIntervynCard>

// For tech stack:
<AnimatedContentCard
  gradientFrom="#13ffe3"
  gradientTo="#6B2FD8"
  delay={0.2}
>
  <div className="bg-white rounded-3xl p-8">
    <h3>Built With</h3>
    <div className="flex flex-col gap-3">
      {techStack.map(tech => <Badge />)}
    </div>
  </div>
</AnimatedContentCard>
```

### 9.7 Key Principles

1. **Maintain exact timing** - Don't change 3s trace, 3s pop
2. **Use your easing** - `[0.4, 0, 0.2, 1]` everywhere
3. **Match styling** - `rounded-3xl bg-white shadow-2xl`
4. **Keep z-index pattern** - SVG layer z:2, card z:1
5. **Use same hooks** - `useInView(ref, { once: true, margin: '-100px' })`
6. **Apply your gradients** - Rotate through your color pairs
7. **Maintain skeleton** - `bg-gray-900` with `bg-gray-800` blocks

---

## 10. ANTI-PATTERNS TO AVOID

**DON'T:**
- ❌ Change easing curves (always use `[0.4, 0, 0.2, 1]`)
- ❌ Use different timing (keep 3s trace, 3s pop)
- ❌ Add new colors outside your palette
- ❌ Use `rounded-lg` or `rounded-2xl` for main cards (use `rounded-3xl`)
- ❌ Forget `once: true` on useInView
- ❌ Omit `margin: '-100px'` on useInView
- ❌ Use different stroke widths (keep 2-3px)
- ❌ Change shadow from `shadow-2xl`

**DO:**
- ✅ Copy entire component structure from AnimatedProjectCard
- ✅ Use exact same prop interface pattern
- ✅ Maintain JSDoc comment style
- ✅ Keep same file organization
- ✅ Use your gradient pairs
- ✅ Follow your spacing patterns
- ✅ Maintain responsive breakpoints

---

## SUMMARY

Your design system is **highly consistent** with clear patterns:

**Strengths:**
- Uniform timing and easing
- Consistent color palette
- Well-defined spacing system
- Reusable component architecture
- Clear animation sequencing

**To implement dual tracing:**
1. Clone AnimatedProjectCard → AnimatedIntervynCard
2. Hardcode SVG shapes for Intervyn layout
3. Keep ALL timing, easing, and styling identical
4. Use your gradient color pairs
5. Maintain z-index and layer structure

The key is: **Copy your existing patterns exactly, don't invent new ones.**
