export interface Mesh {
  vertices: Float32Array;
  indices: Uint16Array;
  vertexCount: number;
  indexCount: number;
}

export function createFullScreenQuad(): Mesh {
  const vertices = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0,
  ]);

  const indices = new Uint16Array([
    0, 1, 2,
    1, 3, 2,
  ]);

  return {
    vertices,
    indices,
    vertexCount: 4,
    indexCount: 6,
  };
}

export function createSubdividedPlane(subdivisions: number = 32): Mesh {
  const vertices: number[] = [];
  const indices: number[] = [];

  for (let y = 0; y <= subdivisions; y++) {
    for (let x = 0; x <= subdivisions; x++) {
      const xPos = (x / subdivisions) * 2.0 - 1.0;
      const yPos = (y / subdivisions) * 2.0 - 1.0;

      vertices.push(xPos, yPos);
    }
  }

  for (let y = 0; y < subdivisions; y++) {
    for (let x = 0; x < subdivisions; x++) {
      const topLeft = y * (subdivisions + 1) + x;
      const topRight = topLeft + 1;
      const bottomLeft = (y + 1) * (subdivisions + 1) + x;
      const bottomRight = bottomLeft + 1;

      indices.push(topLeft, bottomLeft, topRight);

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

export interface MeshBuffers {
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  indexCount: number;
}

export function createMeshBuffers(
  gl: WebGLRenderingContext,
  mesh: Mesh
): MeshBuffers | null {
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error('Failed to create vertex buffer');
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

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

export function bindMeshBuffers(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  buffers: MeshBuffers
): void {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);

  const positionLocation = gl.getAttribLocation(program, 'a_position');

  if (positionLocation === -1) {
    console.warn('Could not find a_position attribute');
    return;
  }

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer);
}

export function calculateMeshBounds(mesh: Mesh): {
  min: { x: number; y: number };
  max: { x: number; y: number };
} {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

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
    indices: mesh.indices,
    vertexCount: mesh.vertexCount,
    indexCount: mesh.indexCount,
  };
}

export function renderMesh(
  gl: WebGLRenderingContext,
  indexCount: number
): void {
  gl.drawElements(
    gl.TRIANGLES,
    indexCount,
    gl.UNSIGNED_SHORT,
    0
  );
}

export function getGradientMesh(): Mesh {
  return createFullScreenQuad();
}

export function getHighQualityMesh(quality: number = 3): Mesh {
  const subdivisions = Math.max(1, Math.min(5, quality)) * 16;
  return createSubdividedPlane(subdivisions);
}

export function deleteMeshBuffers(
  gl: WebGLRenderingContext,
  buffers: MeshBuffers
): void {
  gl.deleteBuffer(buffers.vertexBuffer);
  gl.deleteBuffer(buffers.indexBuffer);
}
