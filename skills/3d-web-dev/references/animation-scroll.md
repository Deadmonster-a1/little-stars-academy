# Animation & Scroll Reference

## Architecture: Lenis + GSAP + R3F

The three systems need to talk to each other:

```
Lenis (smooth scroll) ──→ updates ScrollTrigger position
GSAP ticker ──────────→ drives Lenis RAF
ScrollTrigger ─────────→ scrubs GSAP timelines
R3F useFrame ──────────→ reads scroll.offset OR separate gsap refs
```

---

## Root Setup (do this once in layout)

```tsx
// app/providers.tsx
'use client'
import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Connect lenis scroll position to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Run lenis inside GSAP's ticker so they sync
    const ticker = gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
    }
  }, [])

  return <>{children}</>
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

---

## R3F Scroll Integration

### Option A: Drei's ScrollControls (recommended for scroll-linked 3D)

```tsx
// Wraps R3F scene with a virtual scroll container
import { ScrollControls, useScroll, Scroll } from '@react-three/drei'

// In Canvas:
<ScrollControls pages={5} damping={0.15}>
  <Scene3D />
  {/* HTML that scrolls with the 3D scene */}
  <Scroll html>
    <div style={{ position: 'absolute', top: '100vh', left: '10vw' }}>
      <h2>Section 2</h2>
    </div>
  </Scroll>
</ScrollControls>

// Inside Scene3D:
function Scene3D() {
  const scroll = useScroll()
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const t = scroll.offset // 0 → 1 over all pages

    // Use range() to get progress within a specific page range:
    const section1 = scroll.range(0, 1/5)    // 0→1 during page 0–1
    const section2 = scroll.range(1/5, 2/5)  // 0→1 during page 1–2

    ref.current.rotation.y = t * Math.PI * 4
    ref.current.position.x = section2 * -3
  })

  return <group ref={ref}>...</group>
}
```

### Option B: Reading window scroll in useFrame (for mixed HTML + 3D)

```tsx
'use client'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function ScrollLinked3D() {
  const ref = useRef<THREE.Mesh>(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const progress = scrollRef.current / (document.body.scrollHeight - window.innerHeight)
    ref.current.rotation.y = progress * Math.PI * 2
  })
}
```

---

## GSAP Timelines for HTML Sections

```tsx
// components/HeroSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,      // false = plays once; true = scrubs with scroll
          toggleActions: 'play none none reverse',
        }
      })

      tl.from(headingRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' })
        .from(subRef.current,     { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    }, sectionRef)

    return () => ctx.revert() // cleanup on unmount
  }, [])

  return (
    <section ref={sectionRef} className="h-screen flex flex-col items-center justify-center">
      <h1 ref={headingRef} className="text-8xl font-bold text-white">GRAVIT</h1>
      <p ref={subRef} className="text-xl text-gray-400 mt-4">Digital Experiences</p>
    </section>
  )
}
```

---

## Pinned Scroll Sections

```tsx
// Horizontal scroll panel pinned on screen
useEffect(() => {
  const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.panel')

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,             // pin the trigger element during animation
        scrub: 1,              // smooth scrubbing, 1s lag
        snap: 1 / (panels.length - 1), // snap to each panel
        end: () => `+=${containerRef.current!.offsetWidth}`,
      }
    })
  }, containerRef)

  return () => ctx.revert()
}, [])
```

---

## Camera Rig Animation

### Camera Path Along a Curve

```tsx
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function CameraRig() {
  const { camera } = useThree()
  const scroll = useScroll()

  // Define camera path
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 8),
    new THREE.Vector3(3, 2, 5),
    new THREE.Vector3(0, 1, 2),
    new THREE.Vector3(-3, 0, 4),
    new THREE.Vector3(0, 0, 8),
  ], true), []) // true = closed loop

  useFrame(() => {
    const t = scroll.offset
    const point = curve.getPoint(t)
    const tangent = curve.getTangent(t)

    camera.position.copy(point)
    camera.lookAt(0, 0, 0) // always look at center
    // Or: camera.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,-1), tangent)
  })

  return null
}
```

### Smooth Mouse-Follow Camera

```tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function CameraMouseRig() {
  const { camera, pointer } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    // Update target based on mouse
    targetPosition.current.set(pointer.x * 0.5, pointer.y * 0.3, 5)

    // Smooth lerp toward target
    camera.position.lerp(targetPosition.current, 0.05)
    
    // Smooth lookAt
    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    currentLook.lerp(targetLook.current, 0.05)
    camera.lookAt(targetLook.current)
  })

  return null
}
```

---

## Scroll-Synced 3D + GSAP Text

Pattern: GSAP controls HTML, R3F reads the same scroll progress, they stay in sync.

```tsx
// Shared scroll progress via Zustand (or context)
import { create } from 'zustand'

interface ScrollStore {
  progress: number
  setProgress: (p: number) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}))

// In HTML component:
useEffect(() => {
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress }) => useScrollStore.getState().setProgress(progress),
  })
}, [])

// In R3F component:
function Model() {
  const ref = useRef<THREE.Mesh>(null)
  const progress = useScrollStore((s) => s.progress)

  useFrame(() => {
    if (ref.current) ref.current.rotation.y = progress * Math.PI * 2
  })
}
```

---

## Text Animation Patterns

### Split Text (character by character)

```tsx
// Using GSAP's SplitText (club membership) or manual split:
useEffect(() => {
  const chars = headingRef.current?.textContent?.split('') ?? []
  if (!headingRef.current) return
  
  // Manual split
  headingRef.current.innerHTML = chars
    .map((c) => `<span class="char inline-block">${c === ' ' ? '&nbsp;' : c}</span>`)
    .join('')

  gsap.from('.char', {
    y: 100,
    opacity: 0,
    stagger: 0.03,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: headingRef.current,
      start: 'top 85%',
    }
  })
}, [])
```

---

## Three.js Object Animation (non-scroll)

### useFrame Animation Patterns

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

// Float animation
function FloatingMesh() {
  const ref = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 0.8) * 0.3
    ref.current.rotation.y = t * 0.3
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.05
  })

  return <mesh ref={ref}>...</mesh>
}

// Spring-like lerp toward target
function SpringMesh({ target }: { target: THREE.Vector3 }) {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.position.lerp(target, 1 - Math.pow(0.001, delta))
    // Math.pow(0.001, delta) gives frame-rate independent lerp
  })
}
```

### GSAP → R3F Object (use gsap refs, not state)

```tsx
import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

function GSAPModel() {
  const groupRef = useRef<Group>(null)
  const posY = useRef({ value: 0 }) // mutable ref, not state

  useEffect(() => {
    gsap.to(posY.current, {
      value: 3,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, [])

  useFrame(() => {
    if (groupRef.current) groupRef.current.position.y = posY.current.value
  })

  return <group ref={groupRef}>...</group>
}
```

---

## Page Transitions (Next.js + GSAP)

```tsx
// components/PageTransition.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page enter
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, ref)

    return () => ctx.revert()
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
```

---

## Performance Notes for Animations

1. **Never update React state in `useFrame`** — causes re-renders. Use refs.
2. **GSAP on refs only** — `gsap.to(ref.current, ...)` not `gsap.to(element, ...)` for 3D objects
3. **Disconnect ScrollTrigger on unmount** — use `gsap.context(() => {...}).revert()` pattern
4. **Frame-rate independent lerp**: `lerp(current, target, 1 - Math.pow(damping, delta))` instead of fixed 0.1
5. **Kill timelines** when component unmounts: `timeline.kill()` in return of useEffect
6. **Avoid `pointer-events`** on Canvas overlay HTML unless needed — they block scroll
