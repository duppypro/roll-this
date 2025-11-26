import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-zinc-900 text-white overflow-hidden touch-none">
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none p-6">
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-md">Physics Check</h1>
        <p className="text-zinc-300 max-w-md mt-2 drop-shadow-sm">
          A single cube falling under gravity.
        </p>
      </div>

      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
};

export default App;