"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ReactNode, useMemo, useRef, useEffect, useState } from "react";

interface RotatingGroupProps {
  children: ReactNode;
}

const RotatingGroup: React.FC<RotatingGroupProps> = ({ children }) => {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Rotate only on Y-axis
      groupRef.current.children.forEach((child) => {
        if ((child as THREE.Object3D).lookAt) {
          (child as THREE.Object3D).lookAt(camera.position);
        }
      });
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

interface SphericalTextProps {
  skills: string[];
}

const SphericalText: React.FC<SphericalTextProps> = ({ skills }) => {
  const [radius, setRadius] = useState<number>(6);

  useEffect(() => {
    const handleResize = () => {
      const newRadius =
        window.innerWidth < 768 ? 3 : window.innerWidth > 1200 ? 7 : 6;
      setRadius(newRadius);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const positions: [number, number, number][] = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ] as [number, number, number]; // ✅ Explicitly typing as a tuple
    });
  }, [radius, skills]);

  return (
    <Canvas camera={{ position: [0, 0, radius * 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      <RotatingGroup>
        {skills.map((text, i) => (
          <Text
            key={i}
            position={positions[i]}
            fontSize={0.15 * radius}
            color="white"
          >
            {text}
          </Text>
        ))}
      </RotatingGroup>
    </Canvas>
  );
};

export default SphericalText;
