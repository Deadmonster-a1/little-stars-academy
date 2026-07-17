# Performance Optimization Reference

## Performance Budgets

| Metric | Mobile Target | Desktop Target |
|---|---|---|
| Draw calls | < 30 | < 150 |
| Triangles | < 200k | < 2M |
| Texture memory | < 50MB | < 200MB |
| GLB file size | < 3MB | < 15MB |
| Initial FPS | 55–60 | 60 |
| DPR | 1–1.5 | 1–2 |

---

## Profiling Tools

### In-browser Debug

```tsx
// Add to Scene during development
import { Perf } from 'r3f-perf'

<Canvas>
  {process.env.NODE_ENV === 'development' && <Perf position="top-left" />}
  ...
</Canvas>
```

```bash
npm install r3f-perf
```

### Check Draw Calls Programmatically

```tsx
import { useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

function DebugStats() {
  const { gl } = useThree()
  useFrame(() => {
    if (process.env.NODE_ENV !== 'development') return
    console.log({
      drawCalls: gl.info.render.calls,
      triangles: gl.info.render.triangles,
      textures:  gl.info.memory.textures,
      geometries: gl.info.memory.geometries,
    })
  })
  return null
}
```

### Chrome DevTools

- **Performance tab** → record 5s → look for long frames
- **Layers panel** → spot compositing issues
- **Memory tab** → detect leaks (heap snapshots)
- `about:tracing` → GPU trace in Chrome

---

## Instancing (most impactful optimization)

Every separate mesh = 1 draw call. Use `<Instances>` for repeated geometry.

### Drei Instances (easy)

```tsx
import { Instances, Instance } from '@react-three/drei'

// 1 draw call for all cubes!
function CubeField() {
  const positions = useMemo(() =>
    Array.from({ length: 1000 }, () => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ] as [number, number, number]),
  [])

  return (
    <Instances limit={1000} range={1000}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="orange" />
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  )
}
```

### Raw InstancedMesh (maximum control)

```tsx
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function InstancedSpheres({ count = 5000 }) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (!ref.current) return
    const dummy = new THREE.Object3D()
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      )
      dummy.scale.setScalar(Math.random() * 0.5 + 0.1)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#4488ff" />
    </instancedMesh>
  )
}
```

---

## Geometry Optimization

### LOD (Level of Detail)

```tsx
import { Lod } from '@react-three/drei'
// Note: it's useLOD or LOD depending on Drei version; check docs

// Manual LOD with Three.js
import { useMemo } from 'react'
import * as THREE from 'three'

function LODMesh() {
  const lod = useMemo(() => {
    const l = new THREE.LOD()
    
    const high   = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), mat)
    const medium = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), mat)
    const low    = new THREE.Mesh(new THREE.SphereGeometry(1, 4, 4), mat)
    
    l.addLevel(high,   0)   // show high detail when < 5 units away
    l.addLevel(medium, 5)
    l.addLevel(low,    20)
    
    return l
  }, [])

  return <primitive object={lod} />
}
```

### Merge Geometries (static scenes)

```tsx
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { useMemo } from 'react'

function MergedBuildings() {
  const mergedGeo = useMemo(() => {
    const geos = buildings.map((b) => {
      const g = new THREE.BoxGeometry(b.w, b.h, b.d)
      g.translate(b.x, b.y / 2, b.z)
      return g
    })
    return mergeGeometries(geos)
  }, [])

  return (
    <mesh geometry={mergedGeo}>
      <meshStandardMaterial color="#333" />
    </mesh>
  )
}
```

---

## Texture Optimization

### Texture Compression (KTX2/Basis Universal)

```bash
# Install encoder
npm install -g @gltf-transform/cli

# Convert textures to KTX2 (GPU-compressed, much less VRAM)
gltf-transform uastc input.glb output.glb   # for normal/roughness maps
gltf-transform etc1s input.glb output.glb   # for color textures (smaller)
```

```tsx
// Load KTX2 textures — need KTX2Loader in R3F
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { useThree } from '@react-three/fiber'

function KTX2Setup() {
  const { gl } = useThree()
  useEffect(() => {
    const loader = new KTX2Loader()
    loader.setTranscoderPath('/basis/')
    loader.detectSupport(gl)
    // Then use loader.load('texture.ktx2', ...)
  }, [gl])
  return null
}
```

### Texture Atlas

Combine multiple small textures into one large texture — fewer texture binds = fewer draw calls.

### Mipmap Best Practices

```tsx
// Enable mipmaps for non-screen-space textures
texture.generateMipmaps = true
texture.minFilter = THREE.LinearMipmapLinearFilter
texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

// Disable for post-processing targets / render targets:
const rt = new THREE.WebGLRenderTarget(w, h, { generateMipmaps: false })
```

---

## Code Splitting & Lazy Loading

### Lazy Load Heavy 3D Scenes

```tsx
// Only load the 3D scene when in viewport
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'

const HeavyScene = dynamic(() => import('./HeavyScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black animate-pulse" />,
})

export function LazySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="h-screen">
      {inView && <HeavyScene />}
    </div>
  )
}
```

### Preload Models (start loading before needed)

```tsx
// Trigger preloads at app level
useGLTF.preload('/models/hero.glb')
useGLTF.preload('/models/section2.glb')

// Or preload in parallel at page level:
import { preload } from '@react-three/drei'
preload(() => import('./models/Hero'))
```

---

## useFrame Optimization

```tsx
// ❌ Bad — creates garbage every frame
useFrame(({ clock }) => {
  mesh.current.position.set(
    new THREE.Vector3(Math.sin(clock.getElapsedTime()), 0, 0) // new object every frame!
  )
})

// ✅ Good — reuse vectors
const tempVec = new THREE.Vector3()
useFrame(({ clock }) => {
  const t = clock.getElapsedTime()
  tempVec.set(Math.sin(t), 0, 0)
  mesh.current.position.copy(tempVec)
})

// ✅ Better — use direct property assignment
useFrame(({ clock }) => {
  mesh.current.position.x = Math.sin(clock.getElapsedTime())
})

// Pause animation when not visible
import { useIntersect } from '@react-three/drei'
const ref = useIntersect<THREE.Mesh>((visible) => { isVisible.current = visible })
useFrame(() => {
  if (!isVisible.current) return // skip when off-screen
  // ... animation
})
```

---

## Memory Management

```tsx
// Dispose on unmount
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

function DisposableScene() {
  const { scene, gl } = useThree()

  useEffect(() => {
    return () => {
      // Traverse and dispose everything
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => {
              m.map?.dispose()
              m.normalMap?.dispose()
              m.roughnessMap?.dispose()
              m.dispose()
            })
          } else {
            obj.material.map?.dispose()
            obj.material.dispose()
          }
        }
      })
    }
  }, [scene])
}

// Or use Drei's cleanup:
import { dispose } from '@react-three/drei'
// dispose(object) — traverses and disposes geometry/materials/textures
```

---

## Mobile-Specific Optimizations

```tsx
// Detect mobile and adjust settings
import { isMobile } from 'react-device-detect'

<Canvas
  dpr={isMobile ? [1, 1.5] : [1, 2]}
  gl={{
    powerPreference: 'high-performance',
    antialias: !isMobile, // mobile has hardware AA usually
  }}
>
  <AdaptiveDpr pixelated />  {/* auto-reduces DPR when FPS drops */}
  <AdaptiveEvents />         {/* disables events when not interactive */}
```

```tsx
// Reduce quality on mobile
function Quality() {
  const isMobileDevice = isMobile
  return (
    <EffectComposer multisampling={0}>
      <SMAA />
      {!isMobileDevice && <Bloom ... />}
      {!isMobileDevice && <ChromaticAberration ... />}
      <Vignette ... />
    </EffectComposer>
  )
}
```

---

## WebGPU Migration Guide

> WebGPU is Chrome-only as of 2025. Always ship WebGL fallback.

### What WebGPU Enables

- Compute shaders (particles, simulation on GPU)
- Multi-draw indirect (massive instancing)
- Better performance for complex scenes
- TSL (Three.js Shading Language) — write shaders in JS/TS instead of GLSL

### Migration Steps

```tsx
// 1. Install WebGPU renderer (three 0.163+, still addons)
import WebGPU from 'three/addons/capabilities/WebGPU.js'
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js'

// 2. Canvas with fallback
<Canvas
  gl={(canvas) => {
    if (WebGPU.isAvailable()) {
      const renderer = new WebGPURenderer({ canvas, antialias: true })
      renderer.init() // async init
      return renderer as unknown as THREE.WebGLRenderer
    }
    return new THREE.WebGLRenderer({ canvas, antialias: true })
  }}
>

// 3. TSL Shaders (WebGPU only)
import { positionLocal, normalLocal, sin, time, uniform, vec4 } from 'three/tsl'
import { MeshBasicNodeMaterial } from 'three/webgpu'

const mat = new MeshBasicNodeMaterial()
const uStrength = uniform(0.5)
mat.positionNode = positionLocal.add(
  normalLocal.mul(sin(positionLocal.y.mul(5).add(time)).mul(uStrength))
)
```

### TSL vs GLSL

| | GLSL | TSL |
|---|---|---|
| Language | C-like | JavaScript/TypeScript |
| Renderer | WebGL + WebGPU | WebGPU only |
| Editor support | GLSL extensions | Native TS |
| Compute | No | Yes |
| R3F support | Full | Partial (growing) |

---

## Render Targets & Off-Screen Rendering

```tsx
import { useFBO } from '@react-three/drei'
import { useFrame, createPortal } from '@react-three/fiber'

function OffscreenScene() {
  const target = useFBO(512, 512)
  const offscreenScene = useMemo(() => new THREE.Scene(), [])
  const offscreenCamera = useMemo(() =>
    new THREE.PerspectiveCamera(45, 1, 0.1, 100), [])

  useFrame(({ gl }) => {
    gl.setRenderTarget(target)
    gl.render(offscreenScene, offscreenCamera)
    gl.setRenderTarget(null) // restore main render
  })

  return (
    <>
      {/* Render into offscreen scene */}
      {createPortal(<MyOffscreenContent />, offscreenScene)}

      {/* Use the render target texture on a mesh */}
      <mesh>
        <planeGeometry />
        <meshBasicMaterial map={target.texture} />
      </mesh>
    </>
  )
}
```

---

## Vercel-Specific Performance

### Large Asset Delivery

```
Hobby plan: 100MB public folder limit, 10MB per file
Pro plan: No hard limits, but use CDN for assets > 5MB
```

```ts
// next.config.ts — configure image domains and asset prefixes
const nextConfig = {
  images: {
    domains: ['your-cdn.com'],
  },
  // For Vercel Blob:
  // store assets with @vercel/blob, stream from blob URL
}
```

### Edge Runtime Considerations

```ts
// Don't use Three.js in edge runtime (no canvas API)
// API routes that deal with 3D data should use Node.js runtime:
export const runtime = 'nodejs' // in API route files
```

### Bundle Size

```bash
# Analyze bundle
npm install @next/bundle-analyzer
# Add to next.config.ts and run ANALYZE=true npm run build

# Three.js is large (~600kb gzipped for full import)
# Use specific imports where possible:
import { WebGLRenderer } from 'three'  // ✓ tree-shakeable
import * as THREE from 'three'         // ✗ imports everything
```
