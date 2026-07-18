import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars as DreiStars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingStar = ({ position, rotation, color, scale, speed }: any) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / 5;
      if (i === 0) {
        shape.moveTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
      } else {
        shape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
      }
    }
    shape.closePath();
    
    // Extrude the 2D star into 3D
    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };
    
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center(); // Center the geometry for proper rotation
    return geo;
  }, []);

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
      <mesh position={position} rotation={rotation} scale={scale} geometry={geometry}>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const StarField = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.x += (mouseY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (mouseX - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background stardust */}
      <DreiStars radius={15} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />

      {/* Large Floating Stars */}
      <FloatingStar 
        position={[0, 0, 0]} 
        rotation={[0.2, 0.4, 0]} 
        scale={0.8} 
        color="#FFB84D" // Marigold
        speed={1} 
      />
      <FloatingStar 
        position={[-3, 2, -2]} 
        rotation={[-0.2, 0.8, 0.1]} 
        scale={0.5} 
        color="#FF7A6B" // Coral
        speed={1.2} 
      />
      <FloatingStar 
        position={[4, -1.5, -3]} 
        rotation={[0.5, -0.4, 0.2]} 
        scale={0.6} 
        color="#4D94FF" // Blue
        speed={0.8} 
      />
      <FloatingStar 
        position={[-2, -2.5, 1]} 
        rotation={[0.1, 0.1, -0.2]} 
        scale={0.4} 
        color="#4FA179" // Green
        speed={1.4} 
      />
      <FloatingStar 
        position={[3, 2.5, -1]} 
        rotation={[-0.4, -0.2, 0.4]} 
        scale={0.3} 
        color="#FFB84D" 
        speed={1.1} 
      />
    </group>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#FFB84D" />
        
        <StarField />
      </Canvas>
    </div>
  );
};
