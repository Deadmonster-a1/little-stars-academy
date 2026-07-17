# GLSL Shader Patterns Reference

## Setup: vite-plugin-glsl (for .glsl imports)

```bash
npm install vite-plugin-glsl
```

```ts
// vite.config.ts (or next.config.ts via webpack)
import glsl from 'vite-plugin-glsl'
export default { plugins: [glsl()] }

// next.config.ts alternative:
const nextConfig = {
  webpack(config) {
    config.module.rules.push({ test: /\.glsl$/, use: 'raw-loader' })
    return config
  }
}
```

Then use: `import vertexShader from './shaders/vertex.glsl'`

Or inline with template literals: `/* glsl */ \`...\`` (gives syntax highlighting with GLSL Literal plugin in VS Code).

---

## ShaderMaterial Boilerplate (R3F)

```tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const frag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    gl_FragColor = vec4(vUv, sin(uTime) * 0.5 + 0.5, 1.0);
  }
`

export function CustomMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock, pointer }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value  = clock.getElapsedTime()
    matRef.current.uniforms.uMouse.value = pointer // normalized -1 to 1
  })

  return (
    <mesh>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
```

---

## GLSL Noise Functions

### Classic Simplex Noise (2D, 3D, 4D)

```glsl
// --- Simplex 3D noise (by Ashima Arts / Stefan Gustavson) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 =   v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
// Returns value in range [-1, 1]
// Usage: float n = snoise(vec3(vUv * 3.0, uTime * 0.5));
```

### FBM (Fractal Brownian Motion) — layered noise

```glsl
// Requires snoise above
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}
// Usage: float n = fbm(vec3(vUv * 2.0, uTime * 0.2));
// Gives organic, cloud-like turbulence
```

---

## Vertex Displacement Shaders

### Wave Displacement

```glsl
// Vertex shader
uniform float uTime;
uniform float uAmplitude;
uniform float uFrequency;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;

  float elevation =
    sin(pos.x * uFrequency + uTime) * 0.5 +
    sin(pos.y * uFrequency + uTime) * 0.5;
  elevation *= uAmplitude;

  pos.z += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

```glsl
// Fragment shader — color based on elevation
varying float vElevation;

void main() {
  vec3 depthColor = vec3(0.086, 0.086, 0.153);  // dark blue
  vec3 surfaceColor = vec3(0.24, 0.49, 0.99);    // bright blue
  float t = (vElevation + 0.5); // remap -0.5–0.5 → 0–1
  vec3 color = mix(depthColor, surfaceColor, t);
  gl_FragColor = vec4(color, 1.0);
}
```

### Noise-Based Blob / Organic Shape

```glsl
// Vertex shader — requires snoise
uniform float uTime;
uniform float uNoiseStrength;
varying vec3 vNormal;
varying float vNoise;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;

  float noise = snoise(vec3(pos * 0.8 + uTime * 0.3));
  pos += normal * noise * uNoiseStrength;
  vNoise = noise;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

---

## Fresnel Effect

```glsl
// Fragment shader — glowing rim light effect
varying vec3 vNormal;
varying vec3 vViewDir;

uniform vec3 uFresnelColor;
uniform float uFresnelPower;

void main() {
  // vViewDir must be set in vertex shader:
  // vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);

  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFresnelPower);
  vec3 color = uFresnelColor * fresnel;
  gl_FragColor = vec4(color, fresnel); // alpha = fresnel for additive blending
}
```

```tsx
// R3F usage — additive blending for glow
<shaderMaterial
  uniforms={{
    uFresnelColor: { value: new THREE.Color('#4488ff') },
    uFresnelPower:  { value: 2.5 },
  }}
  vertexShader={fresnelVert}
  fragmentShader={fresnelFrag}
  transparent
  blending={THREE.AdditiveBlending}
  depthWrite={false}
/>
```

---

## Holographic Shader

```glsl
// Vertex
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);

  // Glitch offset
  vec4 modelPos = modelMatrix * vec4(position, 1.0);
  float glitchStrength = sin(uTime * 20.0 + position.y * 5.0) * 0.003;
  modelPos.x += glitchStrength * step(0.99, fract(uTime * 3.0));

  gl_Position = projectionMatrix * viewMatrix * modelPos;
}
```

```glsl
// Fragment
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Scan lines
  float scanLine = step(0.5, fract(vUv.y * 30.0 + uTime * 2.0));

  // Fresnel rim
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);

  // Combine
  float alpha = (scanLine * 0.3 + fresnel * 0.7) * 0.85;
  vec3 color = uColor + vec3(scanLine * 0.1);

  gl_FragColor = vec4(color, alpha);
}
```

---

## Particle Shaders

```tsx
// Points / particle system in R3F
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const particleVert = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  varying float vLife;

  void main() {
    vLife = aScale;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * aScale * (300.0 / -mvPosition.z); // perspective scaling
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFrag = /* glsl */ `
  varying float vLife;
  uniform vec3 uColor;

  void main() {
    // Circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = (1.0 - dist * 2.0) * vLife;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export function Particles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      scl[i] = Math.random()
    }
    return [pos, scl]
  }, [count])

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uSize:  { value: 30 },
    uColor: { value: new THREE.Color('#88aaff') },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime()
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

---

## Useful GLSL Utility Functions

```glsl
// Remap value from one range to another
float remap(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

// Smooth minimum (organic blending of SDFs)
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

// Random (hash-based)
float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise 2D
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep
  return mix(
    mix(random(i + vec2(0,0)), random(i + vec2(1,0)), u.x),
    mix(random(i + vec2(0,1)), random(i + vec2(1,1)), u.x),
    u.y
  );
}

// Rotate 2D
vec2 rotate2D(vec2 uv, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
}
```

---

## RawShaderMaterial vs ShaderMaterial

| | ShaderMaterial | RawShaderMaterial |
|---|---|---|
| Built-in uniforms | Auto-injects `projectionMatrix`, `modelViewMatrix`, `normalMatrix`, `uv`, `position`, `normal` | None — you define everything |
| Use case | Standard 3D shaders | Full control, custom attributes, compute-style |
| Precision | Auto `mediump` default | Must declare `precision mediump float;` yourself |

```glsl
// RawShaderMaterial vertex — must declare everything
precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

---

## Mouse Interaction

```tsx
// Pass mouse position to shader
import { useFrame, useThree } from '@react-three/fiber'

useFrame(({ pointer }) => {
  if (matRef.current) {
    // pointer is normalized -1 to 1 already
    matRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y)
  }
})
```

```glsl
// In shader — mouse-repelled vertex displacement
uniform vec2 uMouse;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Project position to screen-like space for mouse comparison
  vec2 pos2D = pos.xy;
  float dist = length(pos2D - uMouse * 2.0); // scale mouse to world space
  float strength = smoothstep(1.0, 0.0, dist);
  pos.z += strength * 0.5; // push toward camera near mouse
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```
