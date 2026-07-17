---
name: 3d-web-dev
description: Expert guidance for building cinematic 3D interactive web experiences using the modern R3F stack — Next.js 15, React 19, TypeScript, Tailwind CSS v4, Three.js, React Three Fiber, Drei, GSAP + ScrollTrigger, Lenis, Rapier Physics, React Postprocessing, Custom GLSL Shaders, Blender, Spline, GLTF/GLB models, HDRI Lighting, WebGPU Renderer, and Vercel deployment. USE THIS SKILL whenever the user mentions Three.js, R3F, React Three Fiber, Drei, GLSL shaders, 3D web, WebGL, WebGPU, Spline, GLB/GLTF models, Blender-to-web, scroll animations with GSAP, Lenis smooth scroll, Rapier physics, post-processing effects, HDRI lighting, canvas performance, instancing, draw calls, ShaderMaterial, or any combination of 3D graphics + React/Next.js. Also trigger for project setup questions involving this stack, even if the user doesn't say "3D" explicitly. When in doubt, use this skill.
---

# 3D Interactive Web Development

Full-stack guidance for cinematic, high-performance 3D web experiences — from Blender/Spline model to deployed Next.js site.

## Tech Stack Reference

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Engine | Three.js + React Three Fiber (R3F) + Drei |
| Shaders | Custom GLSL (ShaderMaterial / RawShaderMaterial) |
| Animation | GSAP + ScrollTrigger + Lenis |
| Physics | @react-three/rapier (Rapier WASM) |
| Post-FX | @react-three/postprocessing |
| Assets | Blender, Spline, GLTF/GLB, HDRI |
| Renderer | WebGL (default) → WebGPU (progressive) |
| Deploy | Vercel |

---

## Primary Workflow: Blender / Spline → Web

This is the canonical pipeline when starting from a 3D asset.

### Step 1 — Prepare in Blender

Before exporting:
1. Apply all transforms: `Ctrl+A → All Transforms`
2. Merge vertices by distance: `Edit Mode → Mesh → Merge by Distance`
3. Bake textures to PBR maps: Albedo, Normal, Roughness, Metalness, AO (pack into GLB)
4. Keep polygon count reasonable: 10k–100k tris for hero models; < 5k for secondary
5. Name every mesh and material clearly — these become TypeScript keys via `gltfjsx`

> For detailed Blender export checklist, material baking, rigging, and GLTF troubleshooting → read `references/blender-pipeline.md`

### Step 2 — Export & Optimize

```bash
# Export from Blender: File → Export → glTF 2.0
# Settings: Format = GLB, Apply Modifiers ✓, Draco Compression ✓, Textures ✓

# Then optimize the GLB:
npm install -g @gltf-transform/cli
gltf-transform optimize input.glb output.glb --compress draco --texture-size 1024

# Or for aggressive compression (smaller file, slightly slower decode):
npx gltfpack -i input.glb -o output.glb -cc -tc

# Place final GLB in Next.js public folder:
# public/models/hero.glb
```

### Step 3 — Generate Typed Hook

```bash
# Auto-generate a fully typed React component from GLB:
npx gltfjsx public/models/hero.glb -t -s -r public
# -t = TypeScript, -s = Suspense, -r = root path (strips /public prefix)
```

This outputs a `Hero.tsx` like:

```tsx
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { Mesh, MeshStandardMaterial } from 'three'

type GLTFResult = GLTF & {
  nodes: { Body: Mesh; Wings: Mesh }
  materials: { PBR_Main: MeshStandardMaterial }
}

export function Hero(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/hero.glb') as GLTFResult
  return (
    <group {...props}>
      <mesh geometry={nodes.Body.geometry} material={materials.PBR_Main} castShadow />
      <mesh geometry={nodes.Wings.geometry} material={materials.PBR_Main} castShadow />
    </group>
  )
}
useGLTF.preload('/models/hero.glb')
```

### Step 4 — Spline Option

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

```tsx
// components/SplineScene.tsx — always dynamic import to avoid SSR crash
import dynamic from 'next/dynamic'
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export function SplineScene() {
  return (
    <Spline
      scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
      className="w-full h-full"
    />
  )
}
// Or: export GLB from Spline → optimize → use as GLTF in R3F for more control
```

---

## Canonical Scene Architecture (Next.js 15 + R3F)

### App Page

```tsx
// app/page.tsx
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Canvas fixed behind all content */}
      <Scene />
      {/* HTML layers on top */}
      <main className="relative z-10 pointer-events-none">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white pointer-events-auto">
            Hero Text
          </h1>
        </section>
      </main>
    </>
  )
}
```

### Scene Component

```tsx
// components/three/Scene.tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents, ScrollControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Hero } from './Hero'

export default function Scene() {
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 6] }}
      gl={{
        antialias: false, // disable when using SMAA post-process
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      shadows
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <Suspense fallback={null}>
        <ScrollControls pages={4} damping={0.1}>
          <Environment files="/hdri/studio.hdr" background={false} />
          <Hero />
          
          <EffectComposer multisampling={0}>
            <SMAA />
            <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </ScrollControls>
      </Suspense>

      <Preload all />
    </Canvas>
  )
}
```

### Stable Package Versions

```json
{
  "three": "^0.168.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.112.0",
  "@react-three/postprocessing": "^2.16.0",
  "@react-three/rapier": "^1.4.0",
  "gsap": "^3.12.5",
  "lenis": "^1.1.14",
  "postprocessing": "^6.36.0",
  "@types/three": "^0.168.0"
}
```

---

## Animation & Scroll

> For deep patterns (camera paths, pinned sections, timeline sequencing, R3F + GSAP sync) → read `references/animation-scroll.md`

### Lenis + GSAP Setup (required once at root)

```tsx
// hooks/useSmoothScroll.ts
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy(); gsap.ticker.remove(raf) }
  }, [])
}
```

### Scroll-Linked R3F Animation

```tsx
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

export function ScrollModel() {
  const ref = useRef<Group>(null)
  const scroll = useScroll() // must be inside <ScrollControls>

  useFrame(() => {
    if (!ref.current) return
    const t = scroll.offset // 0 → 1 as user scrolls
    ref.current.rotation.y = t * Math.PI * 2
    ref.current.position.y = -t * 4
  })

  return <group ref={ref}>...</group>
}
```

---

## GLSL Shaders

> For full GLSL patterns (noise functions, vertex displacement, Fresnel, holographic, particle shaders, uniforms in useFrame) → read `references/shader-patterns.md`

### ShaderMaterial in R3F (quick pattern)

```tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(pos.x * 3.0 + uTime) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec3 color = vec3(vUv, sin(uTime) * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`

export function WaveMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
```

---

## Post-Processing

```tsx
import {
  EffectComposer, Bloom, ChromaticAberration,
  Vignette, DepthOfField, SMAA, Noise
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// Cinematic preset (dark aesthetic):
<EffectComposer multisampling={0}>
  <SMAA />
  <Bloom
    luminanceThreshold={0.85}
    luminanceSmoothing={0.9}
    intensity={2.0}
    mipmapBlur
    radius={0.8}
  />
  <ChromaticAberration offset={[0.0008, 0.0008]} radialModulation />
  <Vignette offset={0.15} darkness={1.2} />
  <Noise opacity={0.03} blendFunction={BlendFunction.ADD} />
  <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} />
</EffectComposer>
```

---

## Physics (Rapier)

```tsx
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier'

<Physics gravity={[0, -9.81, 0]} debug={process.env.NODE_ENV === 'development'}>
  {/* Dynamic object */}
  <RigidBody type="dynamic" restitution={0.8} friction={0.3} colliders="hull">
    <mesh castShadow>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  </RigidBody>

  {/* Static floor */}
  <RigidBody type="fixed">
    <CuboidCollider args={[20, 0.1, 20]} position={[0, -3, 0]} />
  </RigidBody>

  {/* Your GLTF model with auto collider */}
  <RigidBody type="fixed" colliders="trimesh">
    <Hero />
  </RigidBody>
</Physics>
```

---

## HDRI Lighting

```tsx
import { Environment, Lightformer } from '@react-three/drei'

{/* Simple HDRI (file in /public/hdri/) */}
<Environment files="/hdri/studio.hdr" background={false} />

{/* Custom studio rig */}
<Environment resolution={256}>
  <Lightformer intensity={3} rotation-x={Math.PI / 2} position={[0, 5, -8]} scale={[12, 1, 1]} />
  <Lightformer intensity={1} rotation-y={Math.PI / 2} position={[-6, 1, -2]} scale={[20, 0.1, 1]} />
  <Lightformer intensity={0.5} rotation-y={-Math.PI / 2} position={[6, 1, -2]} scale={[20, 0.1, 1]} />
</Environment>
```

---

## WebGPU Renderer

> For migration guide and WebGPU-specific patterns → read `references/performance.md`

```tsx
// Canvas with WebGPU + WebGL fallback
import WebGPU from 'three/addons/capabilities/WebGPU.js'
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js'

<Canvas
  gl={(canvas) => {
    if (WebGPU.isAvailable()) {
      const renderer = new WebGPURenderer({ canvas, antialias: true })
      renderer.init()
      return renderer
    }
    return new THREE.WebGLRenderer({ canvas, antialias: true })
  }}
>
```

---

## Common Gotchas & Quick Fixes

### SSR / Hydration
- **Always** `dynamic(() => import(...), { ssr: false })` for Canvas, Spline, any file importing Three.js
- Add `'use client'` to every file that imports from `@react-three/*`
- Never import Three.js at module level in Server Components

### Performance
- Check draw calls: `renderer.info.render.calls` — target < 50 mobile, < 200 desktop
- **Never** create new objects (vectors, matrices) inside `useFrame` — declare outside with `useRef` or `useMemo`
- Use `<Instances>` for repeated geometry (trees, particles, tiles)
- Set `dpr={[1, 1.5]}` on mobile, `[1, 2]` desktop
- `dispose()` geometries + materials on component unmount

> For full optimization checklist → read `references/performance.md`

### Materials & Colors
- Black/wrong materials → missing `outputColorSpace: THREE.SRGBColorSpace` on renderer
- Textures look washed out → check `texture.colorSpace = THREE.SRGBColorSpace` for albedo maps
- Metalness not showing → need environment map or at least `<ambientLight>`

### TypeScript + R3F
- Extend JSX for custom elements: `extend({ MyCustomGeometry })` then declare in JSX namespace
- Use `useRef<THREE.Mesh>(null)` — not `useRef(null)`
- Import types separately: `import type { Mesh, Group, MeshStandardMaterial } from 'three'`
- `JSX.IntrinsicElements['group']` for component prop types

### GLTF Problems
- Model not loading → check path starts with `/`, file is in `public/`
- Animations not playing → use `useAnimations` from Drei, check clip names match exactly
- Textures too dark → gamma correction, check export color space in Blender
- File too large → run `gltf-transform optimize`, target < 5MB for web

### Vercel Deployment
- Large models → use Vercel Blob Storage or a CDN, not `/public` (10MB limit on hobby)
- WebGPU → Chrome-only, always ship WebGL fallback
- Environment variables → `NEXT_PUBLIC_` prefix for client-side, set in Vercel dashboard

---

## Reference Files

| File | Domain |
|---|---|
| `references/blender-pipeline.md` | Export checklist, PBR baking, rigging, GLB troubleshooting |
| `references/shader-patterns.md` | GLSL vertex/fragment patterns, noise functions, Fresnel, holographic, particles |
| `references/animation-scroll.md` | GSAP timelines, ScrollTrigger, camera rigs, Lenis, R3F useFrame patterns |
| `references/performance.md` | Draw call budget, instancing, LOD, texture compression, WebGPU migration, profiling |
