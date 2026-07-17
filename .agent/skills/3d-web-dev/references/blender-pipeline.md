# Blender → Web Pipeline Reference

## Export Checklist

Before every export from Blender:

- [ ] Apply all transforms: `Ctrl+A → All Transforms` (position, rotation, scale all zeroed)
- [ ] Apply modifiers (Subdivision etc.) or check "Apply Modifiers" in export dialog
- [ ] Remove doubles: `Edit Mode → Mesh → Merge by Distance`
- [ ] Check face orientation: `Overlay → Face Orientation` (all blue = correct normals)
- [ ] Clear parent transforms if exporting individual meshes
- [ ] Check vertex count — realistic web targets:
  - Hero/focal model: 50k–150k triangles
  - Secondary/background: < 10k triangles
  - LOD versions: 50%, 25%, 10% of original
- [ ] All materials are Principled BSDF (GLTF exports other shaders incorrectly)
- [ ] No image textures above 2048×2048 (preferably 1024×1024 for web)
- [ ] UV maps are clean with no overlaps for baked textures

---

## Export Settings (File → Export → glTF 2.0)

```
Format: GLB (Binary — single file, preferred over GLTF+BIN+textures)

Include:
  ✓ Selected Objects (if not exporting entire scene)
  ✓ Custom Properties
  ✓ Cameras (if you need camera data)
  ✗ Lights (handle lighting in Three.js/HDRI)

Transform:
  ✓ Apply Modifiers

Data:
  ✓ UVs
  ✓ Normals
  ✓ Tangents (required for normal maps)
  ✓ Vertex Colors (if used)
  ✗ Loose Edges / Points

Materials:
  ✓ Export Materials
  ✓ Images (embed in GLB)
  Format: JPEG (for albedo), PNG (for normal/roughness with alpha)
  Compression: Draco (enable if available in your Blender version)

Animation:
  ✓ Animations
  ✓ Skinning (if rigged)
  ✓ Shape Keys (morph targets)
  Always Export: On (ensure all frames included)
```

---

## PBR Material Setup in Blender (for correct web export)

Principled BSDF maps to GLTF PBR:

| Principled BSDF Input | GLTF Property | Notes |
|---|---|---|
| Base Color | albedo / baseColorTexture | sRGB color space |
| Metallic | metallicFactor / metallicTexture | Linear, use R channel |
| Roughness | roughnessFactor / roughnessTexture | Linear, use G channel |
| Normal | normalTexture | Tangent space, DirectX vs OpenGL flipping |
| Alpha | alphaCutoff / alphaMode | Set alphaMode = MASK or BLEND |
| Emission | emissiveTexture | sRGB |
| Occlusion | occlusionTexture | Linear, use R channel |

> GLTF packs Metallic (B) + Roughness (G) + AO (R) into a single texture automatically if you use separate Image Texture nodes connected correctly.

### Correct Node Setup

```
[Image: Albedo] ──────────────────────────────────── Base Color
[Image: MetalRoughAO] ─ Separate RGB ─ R ─────────── AO (in ShaderNodeBsdfPrincipled.Subsurface)
                                        G ─────────── Roughness
                                        B ─────────── Metallic
[Image: Normal] ─── Normal Map node ──────────────── Normal
```

---

## Baking Textures

When you have complex procedural materials or multiple texture sets, bake to PBR maps.

### Bake Setup

1. Add a new Image Texture node to each material (don't connect it — just select it)
2. Set bake resolution: 1024×1024 for secondary, 2048×2048 for hero
3. In Render Properties → Bake:

```
Render Engine: Cycles (required for baking)
Bake Type:
  - Combined (full lighting — use for emissive scenes)
  - Diffuse (albedo only, no lighting)
  - Normal (tangent space normals)
  - Roughness
  - Emit (emission maps)
  - AO (ambient occlusion)

Settings:
  ✓ Clear (clear image before baking)
  ✓ Selected to Active (for high-to-low poly baking)
  Margin: 8–16px (prevents texture seams)
```

### High-to-Low Poly Baking

```
1. Import/create high-poly mesh (sculpted details)
2. Retopologize → create clean low-poly version
3. Select high-poly, then Shift-select low-poly (low-poly must be active)
4. Enable "Selected to Active" in bake settings
5. Set Extrusion: 0.05–0.1 (ray distance for projection)
6. Bake Normal map → apply to low-poly → huge quality, low cost
```

---

## Animation Export

### NLA Editor (Non-Linear Animation)

For multiple animations in one GLB:

1. Create each animation as an Action in the Action Editor
2. Open NLA Editor → Push Down each action to create NLA strips
3. Name strips clearly: `idle`, `walk`, `run`, `jump`
4. On export: check "Animations" → all NLA tracks export as separate clips

### Playing Animations in R3F

```tsx
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type { Group } from 'three'

export function AnimatedModel() {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF('/models/character.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    console.log('Available clips:', names) // debug: see what exported
    actions['idle']?.play()
    
    // Transition between animations:
    // actions['walk']?.reset().fadeIn(0.3).play()
    // actions['idle']?.fadeOut(0.3)
  }, [actions, names])

  return <group ref={group}><primitive object={scene} /></group>
}
useGLTF.preload('/models/character.glb')
```

### Shape Keys (Morph Targets) in R3F

```tsx
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { useRef } from 'react'

export function MorphModel() {
  const { nodes } = useGLTF('/models/morph.glb')
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current?.morphTargetInfluences) return
    // morphTargetInfluences[index] = 0 to 1
    meshRef.current.morphTargetInfluences[0] = Math.sin(clock.getElapsedTime()) * 0.5 + 0.5
  })

  return (
    <mesh
      ref={meshRef}
      geometry={(nodes.Face as Mesh).geometry}
      material={(nodes.Face as Mesh).material}
      morphTargetInfluences={(nodes.Face as Mesh).morphTargetInfluences}
      morphTargetDictionary={(nodes.Face as Mesh).morphTargetDictionary}
    />
  )
}
```

---

## Post-Export Optimization

### Tool Comparison

| Tool | Best For | Compression | Speed |
|---|---|---|---|
| `gltf-transform` | Fine-grained control | Draco / Meshopt | Medium |
| `gltfpack` | Aggressive overall | Meshopt | Fast |
| `tinygltf` (online) | Quick test | Basic | Instant |
| Blender Draco plugin | Export-time only | Draco | Integrated |

### gltf-transform Recipes

```bash
# Install
npm install -g @gltf-transform/cli

# Basic optimization (Draco + resize textures):
gltf-transform optimize input.glb output.glb --compress draco --texture-size 1024

# WebP textures (better compression, wide browser support):
gltf-transform webp input.glb output.glb

# KTX2/Basis Universal (GPU-compressed, needs BasisLoader):
gltf-transform etc1s input.glb output.glb  # smaller, color textures
gltf-transform uastc input.glb output.glb  # larger, normal/roughness maps

# Full pipeline:
gltf-transform optimize input.glb temp.glb --compress draco --texture-size 1024
gltf-transform webp temp.glb output.glb

# Inspect file (see mesh sizes, texture sizes, etc.):
gltf-transform inspect input.glb
```

### Loading Draco-Compressed GLB in R3F

```tsx
// app/layout.tsx or providers
import { extend } from '@react-three/fiber'

// In Scene component:
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useLoader } from '@react-three/fiber'

// Drei's useGLTF handles Draco automatically with CDN decoder:
// Just use useGLTF — it sets up DRACOLoader with CDN by default
// For custom decoder path:
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
```

---

## HDRI Setup

### In Blender (for baking / reference)

1. World Properties → Color → Environment Texture → select .hdr file
2. Rotate HDRI: Add → Texture Coordinate → Mapping → into Environment Texture Vector input
3. Adjust Strength for intensity

### Recommended Free HDRI Sources

- **Poly Haven** (polyhaven.com) — free CC0, all resolutions
- **HDRI Haven** — same as above (merged into Poly Haven)
- For web: download 1K or 2K resolution (.hdr or .exr)

### In Three.js / R3F

```tsx
// Simple: via Drei
<Environment files="/hdri/studio.hdr" background={false} />

// With background blur:
<Environment files="/hdri/outdoor.hdr" background blur={0.8} />

// Programmatic (Three.js):
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function HDRISetup() {
  const { scene } = useThree()
  const texture = useLoader(RGBELoader, '/hdri/studio.hdr')
  
  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    // scene.background = texture (if you want it as background too)
    return () => { texture.dispose() }
  }, [texture, scene])
  
  return null
}
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|---|---|---|
| Model appears black | Missing env map / outputColorSpace | Add `<Environment>`, set `outputColorSpace: THREE.SRGBColorSpace` |
| Textures washed out | Wrong color space on texture | `texture.colorSpace = THREE.SRGBColorSpace` for albedo maps |
| Model too large/small | Scale not applied | `Ctrl+A → Scale` in Blender before export |
| Normals flipped (inside-out) | Face orientation issue | `Edit Mode → Mesh → Normals → Flip` or `Recalculate Outside` |
| Animations missing | Not pushed to NLA | Push each Action to NLA strip before export |
| Textures missing after export | Not embedded | In export: Data → Images → check format / embed |
| GLB file too large | Unoptimized textures | Run `gltf-transform optimize`, resize to 1024px |
| Model Z-up instead of Y-up | Blender default is Z-up | gltfjsx handles this; or in export set +Y Up |
| Seams visible on model | UV map issues | Increase bake margin, fix UV islands in Blender |
| Physics collider wrong shape | Trimesh vs Convex | Use `colliders="hull"` for convex shapes, `trimesh` for concave |
