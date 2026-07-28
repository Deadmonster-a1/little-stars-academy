import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlassSphere = ({ position, scale, color }: any) => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial 
          color={color}
          transmission={0.9}
          opacity={1}
          transparent
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const GlossyTorus = ({ position, rotation, scale, color }: any) => {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} floatingRange={[-0.4, 0.4]}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const GlassIcosahedron = ({ position, rotation, scale, color }: any) => {
  return (
    <Float speed={2.5} rotationIntensity={3} floatIntensity={2.5} floatingRange={[-0.6, 0.6]}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color={color}
          transmission={0.9}
          opacity={1}
          transparent
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const SceneGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a scroll-driven timeline to move the 3D objects as user scrolls
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate the entire group's Y position and rotation based on scroll
      gsap.to(groupRef.current!.position, {
        y: 8, // move up
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // smooth scrubbing
        }
      });

      gsap.to(groupRef.current!.rotation, {
        y: Math.PI * 2, // 360 degree spin over the course of the page
        x: Math.PI * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      // Add a slight tilt based on mouse position (on top of the scroll rotation)
      // We apply this to individual items or a nested group, but here we just add to rotation
      // Actually, since GSAP controls groupRef rotation, we should create a nested group for mouse
    }
  });

  return (
    <group ref={groupRef}>
      {/* Abstract playful geometric composition */}
      <GlassSphere position={[-4, 1.5, -2]} scale={1.2} color="#FFC837" /> {/* Marigold */}
      <GlossyTorus position={[4.5, -1, -3]} rotation={[0.5, -0.2, 0]} scale={1.5} color="#FF6B8B" /> {/* Coral/Pink */}
      <GlassIcosahedron position={[-2.5, -2.5, 1]} rotation={[0.2, 0.4, 0]} scale={0.8} color="#4CB5F5" /> {/* Blue */}
      <GlassSphere position={[3.5, 3, -1]} scale={0.9} color="#32D48C" /> {/* Green */}
      
      {/* Tiny floating elements for depth */}
      <GlossyTorus position={[-5.5, -2, -5]} rotation={[1, 1, 0]} scale={0.4} color="#FFC837" />
      <GlassIcosahedron position={[5.5, 2.5, -4]} rotation={[-1, 0, 1]} scale={0.5} color="#ffffff" />
      
      {/* Additional elements spread out vertically so they appear during scroll */}
      <GlassSphere position={[-3, -8, -3]} scale={1.5} color="#FF6B8B" /> 
      <GlossyTorus position={[4, -12, -2]} rotation={[1, 0.5, 0]} scale={1.2} color="#32D48C" />
      <GlassIcosahedron position={[-5, -16, -4]} rotation={[0, 1, 0.5]} scale={1} color="#FFC837" />
    </group>
  );
};

export const Global3DScene: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas dpr={[1, 1.2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#FFB84D" />
        <directionalLight position={[0, -10, 0]} intensity={1} color="#4D94FF" />
        
        <React.Suspense fallback={null}>
          <Environment preset="city" />
          <SceneGroup />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
