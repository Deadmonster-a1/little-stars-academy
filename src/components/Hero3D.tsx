import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const ToyShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Mouse parallax
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.x += (mouseY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.05;
    }
  });

  const toyMaterialProps = {
    roughness: 0.1,
    transmission: 0.6,
    thickness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 1.5,
  };

  return (
    <group ref={groupRef}>
      {/* Play Ball */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
        <Sphere args={[1.2, 64, 64]} position={[-4, 2, -3]}>
          <meshPhysicalMaterial color="#FFB84D" {...toyMaterialProps} />
        </Sphere>
      </Float>

      {/* Building Block (Cube) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} floatingRange={[-1, 1]}>
        <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.2} smoothness={4} position={[5, -1, -4]}>
          <meshPhysicalMaterial color="#FF7A6B" {...toyMaterialProps} />
        </RoundedBox>
      </Float>

      {/* Stacking Ring */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
        <Torus args={[1, 0.35, 32, 64]} position={[-2, -3, -1]} rotation={[Math.PI / 4, 0, 0]}>
          <meshPhysicalMaterial color="#4FA179" {...toyMaterialProps} />
        </Torus>
      </Float>

      {/* Little Star (Octahedron/Gem) */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={2} floatingRange={[-0.8, 0.8]}>
        <Octahedron args={[1]} position={[3, 4, -2]}>
          <meshPhysicalMaterial color="#5E7CE2" {...toyMaterialProps} />
        </Octahedron>
      </Float>
    </group>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FFB84D" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
        
        <ToyShapes />
      </Canvas>
    </div>
  );
};
