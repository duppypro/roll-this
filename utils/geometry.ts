
import * as THREE from 'three';
import { DieType } from '../types';

// Cache geometries to avoid recreation
const geometryCache: Partial<Record<DieType, THREE.BufferGeometry>> = {};

// Helper to create D10 Geometry (Pentagonal Trapezohedron)
const createD10Geometry = (radius: number): THREE.BufferGeometry => {
  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];

  // Golden ratio-ish for d10 proportions
  const h = radius * 1.2; // Height of tips
  const r = radius * 0.7; // Radius of equator rings
  const angleStep = (Math.PI * 2) / 5;
  const offset = angleStep / 2;

  // Tips
  const top = new THREE.Vector3(0, h, 0);
  const bottom = new THREE.Vector3(0, -h, 0);

  // Top Ring
  const topRing: THREE.Vector3[] = [];
  for (let i = 0; i < 5; i++) {
    topRing.push(new THREE.Vector3(r * Math.cos(i * angleStep), 0.3, r * Math.sin(i * angleStep)));
  }

  // Bottom Ring (rotated)
  const bottomRing: THREE.Vector3[] = [];
  for (let i = 0; i < 5; i++) {
    bottomRing.push(new THREE.Vector3(r * Math.cos(i * angleStep + offset), -0.3, r * Math.sin(i * angleStep + offset)));
  }

  const allVerts = [top, bottom, ...topRing, ...bottomRing];
  
  // Flatten vertices
  allVerts.forEach(v => {
    // v is guaranteed to be a Vector3 here, but we add a null check just in case
    if (v) {
        vertices.push(v.x, v.y, v.z);
    } else {
        vertices.push(0, 0, 0);
    }
  });

  // Indices construction
  // 0: Top, 1: Bottom
  // 2-6: TopRing
  // 7-11: BottomRing
  
  for(let i=0; i<5; i++) {
     const trCurrent = 2 + i;
     const trNext = 2 + ((i+1)%5);
     const brCurrent = 7 + i;
     const brNext = 7 + ((i+1)%5);
     
     // Top Half Faces
     indices.push(0, trCurrent, brCurrent);
     indices.push(0, brCurrent, trNext);
     
     // Bottom Half Faces
     indices.push(1, trNext, brCurrent);
     indices.push(1, brNext, trNext);
  }
  
  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
};

export const getDieGeometry = (type: DieType, radius: number = 1): THREE.BufferGeometry => {
  if (!geometryCache[type]) {
    let geom: THREE.BufferGeometry;

    switch (type) {
      case 'd4':
        geom = new THREE.TetrahedronGeometry(radius);
        break;
      case 'd6':
        geom = new THREE.BoxGeometry(radius * 1.5, radius * 1.5, radius * 1.5);
        break;
      case 'd8':
        geom = new THREE.OctahedronGeometry(radius);
        break;
      case 'd10':
        geom = createD10Geometry(radius);
        break;
      case 'd12':
        geom = new THREE.DodecahedronGeometry(radius);
        break;
      case 'd20':
        geom = new THREE.IcosahedronGeometry(radius);
        break;
      default:
        geom = new THREE.BoxGeometry(radius, radius, radius);
    }
    geometryCache[type] = geom;
  }

  // Always return a clone to ensure independent instances for R3F/Physics
  const cached = geometryCache[type];
  return cached ? cached.clone() : new THREE.BoxGeometry(radius, radius, radius);
};
