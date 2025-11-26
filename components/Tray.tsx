
import React from 'react';
import { useBox } from '@react-three/cannon';
import { TABLE_SIZE, TRAY_DEPTH, TRAY_Z_OFFSET } from '../constants';

const Tray: React.FC = () => {
  const [width, , ] = TABLE_SIZE;
  
  // The tray is just a slightly raised platform at the back (top edge of viewport/table)
  // Let's make it a static physics object so dice can rest on it.
  
  const [ref] = useBox(() => ({
    type: 'Static',
    args: [width - 2, 0.5, TRAY_DEPTH],
    position: [0, 0.25, TRAY_Z_OFFSET],
    material: { friction: 0.5 },
  }));

  return (
    <mesh ref={ref as any} receiveShadow castShadow>
      <boxGeometry args={[width - 2, 0.5, TRAY_DEPTH]} />
      <meshStandardMaterial color="#3f3f46" />
    </mesh>
  );
};

export default Tray;
