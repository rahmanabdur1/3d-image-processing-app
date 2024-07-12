
import * as THREE from 'three';

export const templates = {
  cube: new THREE.BoxGeometry(),
  sphere: new THREE.SphereGeometry(1, 32, 32),
  cylinder: new THREE.CylinderGeometry(1, 1, 2, 32),
  torus: new THREE.TorusGeometry(1, 0.4, 16, 100),
  
};
