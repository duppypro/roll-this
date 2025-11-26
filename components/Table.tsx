import React from 'react';
import { usePlane } from '@react-three/cannon';

const Table: React.FC = () => {
  // Infinite static floor plane
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Rotate to be flat on ground
    type: 'Static',
    material: { friction: 0.3, restitution: 0.3 },
  }));

  return (
    <mesh ref={ref as any} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#27272a" roughness={0.8} />
    </mesh>
  );
};

export default Table;