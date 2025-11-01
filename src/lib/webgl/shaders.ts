export const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_cycleSpeed;
  uniform float u_grainIntensity;

  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  uniform vec3 u_color5;
  uniform vec3 u_color6;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  vec3 blendColors(float t) {
    float normalizedTime = mod(t, 1.0);

    float colorCount = 6.0;
    float colorIndex = normalizedTime * colorCount;
    float colorT = fract(colorIndex);

    int index = int(floor(colorIndex));

    vec3 color;

    if (index == 0) {
      color = mix(u_color1, u_color2, colorT);
    } else if (index == 1) {
      color = mix(u_color2, u_color3, colorT);
    } else if (index == 2) {
      color = mix(u_color3, u_color4, colorT);
    } else if (index == 3) {
      color = mix(u_color4, u_color5, colorT);
    } else if (index == 4) {
      color = mix(u_color5, u_color6, colorT);
    } else {
      color = mix(u_color6, u_color1, colorT);
    }

    return color;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 st = uv;
    st.x *= u_resolution.x / u_resolution.y;

    float slowTime = u_time / u_cycleSpeed;
    float mediumTime = slowTime * 1.3;
    float fastTime = slowTime * 2.5;

    float pourHeight = (1.0 - st.y) + sin(slowTime * 1.5) * 0.3;

    float pourVariation = sin(st.x * 8.0 + slowTime * 2.0) * 0.15;
    float paintPour = pourHeight + pourVariation;

    float dripLeft = (1.0 - st.y) + sin(slowTime * 2.2 + st.x * 2.0) * 0.4;

    float dripRight = (1.0 - st.y) + cos(slowTime * 1.7 + st.x * 3.0) * 0.35;

    float dripCenter = (1.0 - st.y) + sin(slowTime * 1.9 + st.x * 4.0) * 0.38;

    float spread = st.x + sin((1.0 - st.y) * 6.0 + slowTime * 2.5) * 0.4;

    float spreadWave = st.x + cos(st.y * 10.0 - slowTime * 3.0) * 0.3;

    float riseUp = st.y + sin(slowTime * 1.8 + st.x * 5.0) * 0.35;

    float risingColumn = st.y + cos(st.x * 7.0 - slowTime * 1.5) * 0.3;

    vec2 mixCoord = st + vec2(sin(slowTime * 2.0), cos(slowTime * 1.8)) * 0.2;
    float mixing = fbm(mixCoord * 3.0, 4) * 0.5;

    float swirl = atan(st.y - 0.5, st.x - 0.5) + slowTime * 1.2;
    float swirlMix = sin(swirl * 4.0) * 0.25;

    float diagonalPour1 = (st.x + (1.0 - st.y)) * 0.5 + sin(slowTime * 1.6) * 0.3;

    float diagonalPour2 = ((1.0 - st.x) + (1.0 - st.y)) * 0.5 + cos(slowTime * 1.9) * 0.3;

    float noiseScale = 2.0;
    float noiseSpeed = 0.5;

    vec2 noiseCoord1 = st * noiseScale + vec2(slowTime * noiseSpeed, slowTime * noiseSpeed * 0.7);
    float breathing1 = fbm(noiseCoord1, 4) * 0.25;

    vec2 noiseCoord2 = st * (noiseScale * 1.5) + vec2(mediumTime * noiseSpeed * 0.6, mediumTime * noiseSpeed * 0.8);
    float breathing2 = fbm(noiseCoord2, 3) * 0.15;

    vec2 noiseCoord3 = st * (noiseScale * 2.5) + vec2(fastTime * noiseSpeed * 0.4, fastTime * noiseSpeed * 0.5);
    float breathing3 = fbm(noiseCoord3, 2) * 0.08;

    float breathing = breathing1 + breathing2 + breathing3;

    float gradientPosition =
      paintPour * 0.35 +

      dripLeft * 0.10 +
      dripRight * 0.08 +
      dripCenter * 0.07 +

      spread * 0.08 +
      spreadWave * 0.07 +

      riseUp * 0.07 +
      risingColumn * 0.05 +

      mixing * 0.06 +
      swirlMix * 0.04 +

      diagonalPour1 * 0.05 +
      diagonalPour2 * 0.03 +

      breathing * 0.15;

    gradientPosition = fract(gradientPosition + slowTime * 0.12);

    vec3 finalColor = blendColors(gradientPosition);

    float grain = random(uv * 100.0 + u_time * 0.01) * u_grainIntensity;
    finalColor += vec3(grain);

    vec2 glowCenter1 = vec2(0.5 + sin(slowTime * 1.0) * 0.35, 0.7 + cos(slowTime * 0.8) * 0.25);
    float glow1 = 1.0 - smoothstep(0.0, 1.5, distance(uv, glowCenter1));

    vec2 glowCenter2 = vec2(0.5 + sin(slowTime * 1.4) * 0.30, 0.3 + cos(slowTime * 1.1) * 0.20);
    float glow2 = 1.0 - smoothstep(0.0, 1.8, distance(uv, glowCenter2));

    vec2 glowCenter3 = vec2(0.5 + sin(fastTime * 0.6) * 0.20, 0.5 + cos(fastTime * 0.7) * 0.15);
    float glow3 = 1.0 - smoothstep(0.0, 1.2, distance(uv, glowCenter3));

    float radialGlow = (glow1 * 0.12 + glow2 * 0.10 + glow3 * 0.06);
    finalColor += vec3(radialGlow);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error('Failed to create shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    const shaderType = type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT';
    console.error(`${shaderType} Shader compilation error:`, error || 'Unknown error');
    console.error('Shader source:', source);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) {
    console.error('Failed to create program');
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}
