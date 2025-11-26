import React from 'react';
import { useBox } from '@react-three/cannon';

interface DieProps {
  position: [number, number, number];
}

const Die: React.FC<DieProps> = ({ position }) => {
  // Simple Box physics body
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [2, 2, 2], // 2x2x2 cube
    rotation: [Math.random(), Math.random(), Math.random()], // Random initial spin
    material: { friction: 0.3, restitution: 0.7 }, // Bouncy
  }));

  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#e11d48" roughness={0.2} metalness={0.1} />
    </mesh>
  );
};

export default Die;