/**
 * Mesh geometry for WebGL gradient rendering
 * Creates the surface that the gradient shader renders on
 */

/**
 * ============================================
 * MESH GENERATION
 * ============================================
 */

/**
 * Mesh data structure
 * Contains vertices and indices for WebGL rendering
 */
export interface Mesh {
  vertices: Float32Array;    // Vertex positions (x, y)
  indices: Uint16Array;      // Triangle indices
  vertexCount: number;       // Number of vertices
  indexCount: number;        // Number of indices
}

/**
 * Create a full-screen quad mesh
 * 
 * Simple 2-triangle quad that covers the entire canvas
 * Perfect for full-screen shader effects like Stripe's gradient
 * 
 * This is the simplest approach - just 4 vertices, 2 triangles
 * The shader does all the heavy lifting
 * 
 * @returns Full-screen quad mesh
 */
export function createFullScreenQuad(): Mesh {
  // Two triangles forming a rectangle covering the screen
  // Coordinates in clip space (-1 to 1)
  const vertices = new Float32Array([
    // Triangle 1       Triangle 2
    -1.0, -1.0,  // Bottom-left
     1.0, -1.0,  // Bottom-right
    -1.0,  1.0,  // Top-left
     1.0,  1.0,  // Top-right
  ]);

  // Indices define two triangles
  // Triangle 1: 0, 1, 2 (bottom-left, bottom-right, top-left)
  // Triangle 2: 1, 3, 2 (bottom-right, top-right, top-left)
  const indices = new Uint16Array([
    0, 1, 2,  // First triangle
    1, 3, 2,  // Second triangle
  ]);

  return {
    vertices,
    indices,
    vertexCount: 4,
    indexCount: 6,
  };
}

/**
 * Create a subdivided plane mesh
 * 
 * Higher resolution mesh for more complex effects
 * Can be useful if we want vertex-based animations in the future
 * 
 * @param subdivisions - Number of subdivisions per axis (higher = more detail)
 * @returns Subdivided plane mesh
 */
export function createSubdividedPlane(subdivisions: number = 32): Mesh {
  const vertices: number[] = [];
  const indices: number[] = [];
  
  // Generate grid of vertices
  for (let y = 0; y <= subdivisions; y++) {
    for (let x = 0; x <= subdivisions; x++) {
      // Map from [0, subdivisions] to [-1, 1] (clip space)
      const xPos = (x / subdivisions) * 2.0 - 1.0;
      const yPos = (y / subdivisions) * 2.0 - 1.0;
      
      vertices.push(xPos, yPos);
    }
  }
  
  // Generate triangle indices
  for (let y = 0; y < subdivisions; y++) {
    for (let x = 0; x < subdivisions; x++) {
      const topLeft = y * (subdivisions + 1) + x;
      const topRight = topLeft + 1;
      const bottomLeft = (y + 1) * (subdivisions + 1) + x;
      const bottomRight = bottomLeft + 1;
      
      // First triangle (top-left, bottom-left, top-right)
      indices.push(topLeft, bottomLeft, topRight);
      
      // Second triangle (top-right, bottom-left, bottom-right)
      indices.push(topRight, bottomLeft, bottomRight);
    }
  }
  
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    vertexCount: vertices.length / 2,
    indexCount: indices.length,
  };
}

/**
 * ============================================
 * WEBGL BUFFER CREATION
 * ============================================
 */

/**
 * WebGL buffer objects for rendering
 */
export interface MeshBuffers {
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  indexCount: number;
}

/**
 * Create WebGL buffers from mesh data
 * 
 * Sets up vertex and index buffers for efficient GPU rendering
 * 
 * @param gl - WebGL rendering context
 * @param mesh - Mesh data to upload to GPU
 * @returns WebGL buffer objects
 */
export function createMeshBuffers(
  gl: WebGLRenderingContext,
  mesh: Mesh
): MeshBuffers | null {
  // Create vertex buffer
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error('Failed to create vertex buffer');
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

  // Create index buffer
  const indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.error('Failed to create index buffer');
    return null;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

  return {
    vertexBuffer,
    indexBuffer,
    indexCount: mesh.indexCount,
  };
}

/**
 * Bind mesh buffers and set up vertex attributes
 * 
 * Prepares the mesh for rendering by binding buffers
 * and configuring vertex attribute pointers
 * 
 * @param gl - WebGL rendering context
 * @param program - Shader program
 * @param buffers - Mesh buffers to bind
 */
export function bindMeshBuffers(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  buffers: MeshBuffers
): void {
  // Bind vertex buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);

  // Get attribute location
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  
  if (positionLocation === -1) {
    console.warn('Could not find a_position attribute');
    return;
  }

  // Enable and configure vertex attribute
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(
    positionLocation,
    2,              // 2 components per vertex (x, y)
    gl.FLOAT,       // Data type
    false,          // Don't normalize
    0,              // Stride (0 = tightly packed)
    0               // Offset
  );

  // Bind index buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer);
}

/**
 * ============================================
 * MESH UTILITIES
 * ============================================
 */

/**
 * Calculate mesh bounds
 * 
 * @param mesh - Mesh to calculate bounds for
 * @returns Min and max coordinates
 */
export function calculateMeshBounds(mesh: Mesh): {
  min: { x: number; y: number };
  max: { x: number; y: number };
} {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  // Iterate through vertices (2 floats per vertex: x, y)
  for (let i = 0; i < mesh.vertices.length; i += 2) {
    const x = mesh.vertices[i];
    const y = mesh.vertices[i + 1];

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  return {
    min: { x: minX, y: minY },
    max: { x: maxX, y: maxY },
  };
}

/**
 * Transform mesh vertices
 * 
 * Apply a transformation function to all vertices
 * Useful for animations or effects
 * 
 * @param mesh - Mesh to transform
 * @param transform - Transformation function
 * @returns New mesh with transformed vertices
 */
export function transformMesh(
  mesh: Mesh,
  transform: (x: number, y: number) => { x: number; y: number }
): Mesh {
  const newVertices = new Float32Array(mesh.vertices.length);

  for (let i = 0; i < mesh.vertices.length; i += 2) {
    const x = mesh.vertices[i];
    const y = mesh.vertices[i + 1];
    
    const transformed = transform(x, y);
    
    newVertices[i] = transformed.x;
    newVertices[i + 1] = transformed.y;
  }

  return {
    vertices: newVertices,
    indices: mesh.indices, // Indices stay the same
    vertexCount: mesh.vertexCount,
    indexCount: mesh.indexCount,
  };
}

/**
 * ============================================
 * RENDERING UTILITIES
 * ============================================
 */

/**
 * Render a mesh
 * 
 * Simple helper to draw the mesh
 * Assumes buffers are already bound
 * 
 * @param gl - WebGL rendering context
 * @param indexCount - Number of indices to render
 */
export function renderMesh(
  gl: WebGLRenderingContext,
  indexCount: number
): void {
  gl.drawElements(
    gl.TRIANGLES,           // Drawing mode
    indexCount,             // Number of indices
    gl.UNSIGNED_SHORT,      // Index type
    0                       // Offset
  );
}

/**
 * ============================================
 * PRESET MESHES
 * ============================================
 */

/**
 * Get the recommended mesh for Stripe-style gradient
 * 
 * For full-screen shader effects, a simple quad is perfect
 * All the magic happens in the fragment shader
 * 
 * @returns Optimized mesh for gradient rendering
 */
export function getGradientMesh(): Mesh {
  // Simple quad is best for full-screen shader effects
  // The fragment shader handles all the complexity
  return createFullScreenQuad();
}

/**
 * Get a high-quality mesh for complex animations
 * 
 * Use this if you want vertex-based animations
 * or need more geometry detail
 * 
 * @param quality - Quality level (1-5, where 5 is highest)
 * @returns High-quality subdivided mesh
 */
export function getHighQualityMesh(quality: number = 3): Mesh {
  // Map quality to subdivision count
  const subdivisions = Math.max(1, Math.min(5, quality)) * 16;
  return createSubdividedPlane(subdivisions);
}

/**
 * ============================================
 * CLEANUP
 * ============================================
 */

/**
 * Delete mesh buffers and free GPU memory
 * 
 * @param gl - WebGL rendering context
 * @param buffers - Buffers to delete
 */
export function deleteMeshBuffers(
  gl: WebGLRenderingContext,
  buffers: MeshBuffers
): void {
  gl.deleteBuffer(buffers.vertexBuffer);
  gl.deleteBuffer(buffers.indexBuffer);
}
