
import React, { useEffect, useMemo } from 'react';
import { useSphere, useSpring } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { LIFT_HEIGHT } from '../constants';

interface DragManagerProps {
  dragRef: React.RefObject<THREE.Object3D>;
  setDragTarget: (id: string | null, ref: React.RefObject<THREE.Object3D> | null) => void;
}

const DragManager: React.FC<DragManagerProps> = ({ dragRef, setDragTarget }) => {
  const { raycaster } = useThree();

  // Kinematic cursor body that pulls the die
  const [cursorRef, cursorApi] = useSphere(() => ({
    type: 'Kinematic',
    args: [0.1],
    position: [0, LIFT_HEIGHT, 0],
    collisionFilterGroup: 0, // Don't collide with world
  }), undefined, []);

  // Connect the cursor to the dragged die with a spring
  useSpring(cursorRef, dragRef, {
    restLength: 0,
    stiffness: 80,
    damping: 4,
    localAnchorA: [0, 0, 0],
    localAnchorB: [0, 0, 0],
  }, []);

  // Mathematical plane for raycasting (y = LIFT_HEIGHT)
  // Using a mathematical plane in useFrame is more robust for touch than event listeners on meshes
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -LIFT_HEIGHT), []);
  const intersection = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // Intersect the global raycaster (updated by R3F automatically) with our mathematical plane
    if (raycaster && raycaster.ray.intersectPlane(plane, intersection)) {
        cursorApi.position.set(intersection.x, LIFT_HEIGHT, intersection.z);
        cursorApi.velocity.set(0, 0, 0);
    }
  });

  // Handle global pointer up to drop the die
  useEffect(() => {
    const handleUp = () => {
      setDragTarget(null, null);
    };
    
    // Listen to both pointerup and pointercancel to catch all touch end scenarios
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
    return () => {
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
    };
  }, [setDragTarget]);

  return (
    <mesh ref={cursorRef as any} visible={false}>
      <sphereGeometry args={[0.1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default DragManager;
