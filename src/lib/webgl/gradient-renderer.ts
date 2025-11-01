/**
 * Main WebGL gradient renderer
 * Ties together shaders, mesh, noise, and animation
 * This is the core engine that creates the Stripe-style gradient
 */

import type { GradientConfig, RendererState } from './types';
import { DEFAULT_CONFIG, hexToRGB } from './types';
import {
  vertexShaderSource,
  fragmentShaderSource,
  compileShader,
  createProgram,
} from './shaders';
import {
  getGradientMesh,
  createMeshBuffers,
  bindMeshBuffers,
  renderMesh,
  deleteMeshBuffers,
  type MeshBuffers,
} from './mesh';

/**
 * ============================================
 * GRADIENT RENDERER CLASS
 * ============================================
 */

export class GradientRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private meshBuffers: MeshBuffers | null = null;
  private config: GradientConfig;
  private state: RendererState;
  
  // Uniform locations (cached for performance)
  private uniforms: {
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    cycleSpeed: WebGLUniformLocation | null;
    grainIntensity: WebGLUniformLocation | null;
    color1: WebGLUniformLocation | null;
    color2: WebGLUniformLocation | null;
    color3: WebGLUniformLocation | null;
    color4: WebGLUniformLocation | null;
    color5: WebGLUniformLocation | null;
    color6: WebGLUniformLocation | null;
  } = {
    time: null,
    resolution: null,
    cycleSpeed: null,
    grainIntensity: null,
    color1: null,
    color2: null,
    color3: null,
    color4: null,
    color5: null,
    color6: null,
  };

  /**
   * Create a new gradient renderer
   * 
   * @param canvas - Canvas element to render to
   * @param config - Gradient configuration (optional)
   */
  constructor(canvas: HTMLCanvasElement, config: Partial<GradientConfig> = {}) {
    this.canvas = canvas;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = {
      gl: null,
      canvas: null,
      program: null,
      animationFrameId: null,
      isRunning: false,
      startTime: 0,
    };
  }

  /**
   * Initialize WebGL and set up rendering
   * 
   * @returns Success status
   */
  public initialize(): boolean {
    console.log('🎨 Initializing Stripe-style gradient renderer...');

    // Check if canvas exists
    if (!this.canvas) {
      console.error('❌ Canvas element not found');
      return false;
    }

    // Get WebGL context
    this.gl = this.canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!this.gl) {
      console.error('❌ WebGL not supported or context creation failed');
      console.error('Canvas:', this.canvas);
      return false;
    }

    console.log('✅ WebGL context created');

    // Compile shaders
    const vertexShader = compileShader(
      this.gl,
      vertexShaderSource,
      this.gl.VERTEX_SHADER
    );

    const fragmentShader = compileShader(
      this.gl,
      fragmentShaderSource,
      this.gl.FRAGMENT_SHADER
    );

    if (!vertexShader || !fragmentShader) {
      console.error('❌ Failed to compile shaders');
      return false;
    }

    console.log('✅ Shaders compiled');

    // Create shader program
    this.program = createProgram(this.gl, vertexShader, fragmentShader);

    if (!this.program) {
      console.error('❌ Failed to create shader program');
      return false;
    }

    console.log('✅ Shader program created');

    // Use the program
    this.gl.useProgram(this.program);

    // Get uniform locations
    this.cacheUniformLocations();

    // Create mesh and buffers
    const mesh = getGradientMesh();
    this.meshBuffers = createMeshBuffers(this.gl, mesh);

    if (!this.meshBuffers) {
      console.error('❌ Failed to create mesh buffers');
      return false;
    }

    console.log('✅ Mesh created');

    // Bind mesh buffers
    bindMeshBuffers(this.gl, this.program, this.meshBuffers);

    // Set up viewport
    this.resize();

    // Set initial uniforms
    this.updateUniforms(0);

    console.log('🚀 Gradient renderer initialized successfully!');

    return true;
  }

  /**
   * Cache uniform locations for performance
   */
  private cacheUniformLocations(): void {
    if (!this.gl || !this.program) return;

    this.uniforms.time = this.gl.getUniformLocation(this.program, 'u_time');
    this.uniforms.resolution = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.uniforms.cycleSpeed = this.gl.getUniformLocation(this.program, 'u_cycleSpeed');
    this.uniforms.grainIntensity = this.gl.getUniformLocation(this.program, 'u_grainIntensity');
    this.uniforms.color1 = this.gl.getUniformLocation(this.program, 'u_color1');
    this.uniforms.color2 = this.gl.getUniformLocation(this.program, 'u_color2');
    this.uniforms.color3 = this.gl.getUniformLocation(this.program, 'u_color3');
    this.uniforms.color4 = this.gl.getUniformLocation(this.program, 'u_color4');
    this.uniforms.color5 = this.gl.getUniformLocation(this.program, 'u_color5');
    this.uniforms.color6 = this.gl.getUniformLocation(this.program, 'u_color6');
  }

  /**
   * Update shader uniforms
   * 
   * @param time - Current time in seconds
   */
  private updateUniforms(time: number): void {
    if (!this.gl) return;

    // Time
    if (this.uniforms.time) {
      this.gl.uniform1f(this.uniforms.time, time);
    }

    // Resolution
    if (this.uniforms.resolution) {
      this.gl.uniform2f(
        this.uniforms.resolution,
        this.canvas.width,
        this.canvas.height
      );
    }

    // Cycle speed (Stripe uses 12-15 seconds)
    if (this.uniforms.cycleSpeed) {
      this.gl.uniform1f(this.uniforms.cycleSpeed, this.config.cycleSpeed);
    }

    // Grain intensity
    if (this.uniforms.grainIntensity) {
      this.gl.uniform1f(this.uniforms.grainIntensity, this.config.grainIntensity);
    }

    // Colors (convert hex to RGB)
    const colors = this.config.colors.map(hexToRGB);
    
    if (this.uniforms.color1 && colors[0]) {
      this.gl.uniform3f(this.uniforms.color1, colors[0].r, colors[0].g, colors[0].b);
    }
    if (this.uniforms.color2 && colors[1]) {
      this.gl.uniform3f(this.uniforms.color2, colors[1].r, colors[1].g, colors[1].b);
    }
    if (this.uniforms.color3 && colors[2]) {
      this.gl.uniform3f(this.uniforms.color3, colors[2].r, colors[2].g, colors[2].b);
    }
    if (this.uniforms.color4 && colors[3]) {
      this.gl.uniform3f(this.uniforms.color4, colors[3].r, colors[3].g, colors[3].b);
    }
    if (this.uniforms.color5 && colors[4]) {
      this.gl.uniform3f(this.uniforms.color5, colors[4].r, colors[4].g, colors[4].b);
    }
    if (this.uniforms.color6 && colors[5]) {
      this.gl.uniform3f(this.uniforms.color6, colors[5].r, colors[5].g, colors[5].b);
    }
  }

  /**
   * Handle canvas resize
   */
  public resize(): void {
    if (!this.gl) return;

    // Set canvas size to match display size
    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    // Check if canvas needs resizing
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;

      // Update WebGL viewport
      this.gl.viewport(0, 0, displayWidth, displayHeight);

      console.log(`📐 Canvas resized to ${displayWidth}x${displayHeight}`);
    }
  }

  /**
   * Render one frame
   * 
   * @param time - Current time in milliseconds (from requestAnimationFrame)
   */
  private render = (time: number): void => {
    if (!this.gl || !this.meshBuffers || !this.state.isRunning) return;

    // Convert to seconds and offset by start time
    const currentTime = (time - this.state.startTime) * 0.001;

    // Clear canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Update uniforms with current time
    this.updateUniforms(currentTime);

    // Render the mesh
    renderMesh(this.gl, this.meshBuffers.indexCount);

    // Request next frame
    this.state.animationFrameId = requestAnimationFrame(this.render);
  };

  /**
   * Start the animation
   */
  public start(): void {
    if (this.state.isRunning) {
      console.warn('⚠️ Renderer already running');
      return;
    }

    console.log('▶️ Starting gradient animation...');

    this.state.isRunning = true;
    this.state.startTime = performance.now();
    this.state.animationFrameId = requestAnimationFrame(this.render);
  }

  /**
   * Stop the animation
   */
  public stop(): void {
    if (!this.state.isRunning) {
      console.warn('⚠️ Renderer not running');
      return;
    }

    console.log('⏸️ Stopping gradient animation...');

    this.state.isRunning = false;

    if (this.state.animationFrameId !== null) {
      cancelAnimationFrame(this.state.animationFrameId);
      this.state.animationFrameId = null;
    }
  }

  /**
   * Update configuration
   * 
   * @param config - New configuration (partial)
   */
  public updateConfig(config: Partial<GradientConfig>): void {
    this.config = { ...this.config, ...config };
    console.log('⚙️ Configuration updated', this.config);
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    console.log('🧹 Cleaning up gradient renderer...');

    // Stop animation
    this.stop();

    // Delete buffers
    if (this.gl && this.meshBuffers) {
      deleteMeshBuffers(this.gl, this.meshBuffers);
      this.meshBuffers = null;
    }

    // Delete program
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    // Lose context
    const loseContext = this.gl?.getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }

    this.gl = null;

    console.log('✅ Cleanup complete');
  }

  /**
   * Get current state
   */
  public getState(): RendererState {
    return { ...this.state };
  }

  /**
   * Check if renderer is running
   */
  public isRunning(): boolean {
    return this.state.isRunning;
  }
}

/**
 * ============================================
 * HELPER FUNCTIONS
 * ============================================
 */

/**
 * Create a gradient renderer with Stripe's default settings
 * 
 * @param canvas - Canvas element
 * @returns Configured gradient renderer
 */
export function createStripeGradient(canvas: HTMLCanvasElement): GradientRenderer {
  return new GradientRenderer(canvas, DEFAULT_CONFIG);
}

/**
 * Create a gradient renderer with custom colors
 * 
 * @param canvas - Canvas element
 * @param colors - Custom color palette (hex strings)
 * @returns Configured gradient renderer
 */
export function createCustomGradient(
  canvas: HTMLCanvasElement,
  colors: string[]
): GradientRenderer {
  return new GradientRenderer(canvas, {
    ...DEFAULT_CONFIG,
    colors,
  });
}

