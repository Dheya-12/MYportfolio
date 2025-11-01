export const STRIPE_COLORS = {
  magentaPink: '#E85D9A',
  coral: '#FF7A63',
  darkMango: '#FF8C00',
  deepRed: '#DC143C',
  redOrange: '#FF4500',
  richGold: '#DAA520',

  deepPurple: '#4316d3',
  cyan: '#13ffe3',
  richViolet: '#6B2FD8',
  deepLavender: '#9B7FD8',
  magenta: '#ff52c1',
  warmPink: '#fb7bb8',
  darkBlue: '#2916C7',
  deepTeal: '#00A3CC',
  navyBlue: '#0F1B3D',
  midnightBlue: '#1e2635',
} as const;

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorStop {
  position: number;
  color: RGB;
}

export interface GradientConfig {
  colors: string[];

  cycleSpeed: number;
  fullCycleDuration: number;

  enableBreathing: boolean;
  enableXInversion: boolean;

  enableGrain: boolean;
  grainIntensity: number;

  targetFPS: number;
}

export interface Vertex {
  x: number;
  y: number;
  z: number;
}

export interface NoiseConfig {
  frequency: number;
  amplitude: number;
  octaves: number;
  persistence: number;
}

export interface RendererState {
  gl: WebGLRenderingContext | null;
  canvas: HTMLCanvasElement | null;
  program: WebGLProgram | null;
  animationFrameId: number | null;
  isRunning: boolean;
  startTime: number;
}

export const DEFAULT_CONFIG: GradientConfig = {
  colors: [
    STRIPE_COLORS.cyan,
    STRIPE_COLORS.richViolet,
    STRIPE_COLORS.deepLavender,
    STRIPE_COLORS.deepPurple,
    STRIPE_COLORS.darkBlue,
    STRIPE_COLORS.deepTeal,
    STRIPE_COLORS.navyBlue,
    STRIPE_COLORS.midnightBlue,
  ],
  cycleSpeed: 4.5,
  fullCycleDuration: 37.5,
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};

export const WARM_CONFIG: GradientConfig = {
  colors: [
    STRIPE_COLORS.magentaPink,
    STRIPE_COLORS.coral,
    STRIPE_COLORS.darkMango,
    STRIPE_COLORS.deepRed,
    STRIPE_COLORS.redOrange,
    STRIPE_COLORS.richGold,
  ],
  cycleSpeed: 2.0,
  fullCycleDuration: 20,
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};

export const COMPLETE_CONFIG: GradientConfig = {
  colors: [
    STRIPE_COLORS.magentaPink,
    STRIPE_COLORS.coral,
    STRIPE_COLORS.darkMango,
    STRIPE_COLORS.redOrange,
    STRIPE_COLORS.deepRed,
    STRIPE_COLORS.richGold,

    STRIPE_COLORS.warmPink,
    STRIPE_COLORS.magenta,

    STRIPE_COLORS.richViolet,
    STRIPE_COLORS.cyan,
    STRIPE_COLORS.deepLavender,
    STRIPE_COLORS.deepPurple,
    STRIPE_COLORS.darkBlue,
    STRIPE_COLORS.deepTeal,
  ],
  cycleSpeed: 4.0,
  fullCycleDuration: 28,
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.03,
  targetFPS: 60,
};

export type HexColor = `#${string}`;

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

export function interpolateColor(color1: RGB, color2: RGB, t: number): RGB {
  return {
    r: color1.r + (color2.r - color1.r) * t,
    g: color1.g + (color2.g - color1.g) * t,
    b: color1.b + (color2.b - color1.b) * t,
  };
}
