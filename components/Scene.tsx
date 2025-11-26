import React from 'react';
import { Physics } from '@react-three/cannon';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Table from './Table';
import Die from './Die';

const Scene: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={50} />
      <OrbitControls target={[0, 0, 0]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Environment preset="city" />

      <Physics gravity={[0, -9.82, 0]}>
        <Table />
        {/* Place a single die high above the table */}
        <Die position={[0, 8, 0]} />
      </Physics>
    </>
  );
};

export default Scene;