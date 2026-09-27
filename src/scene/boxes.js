import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
import { Group } from 'three/src/objects/Group.js';
import { Mesh } from 'three/src/objects/Mesh.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import gsap from 'gsap';

export function createBoxes(scene) {
  const boxGroup = new Group();
  const boxMaterial = new MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.8,
    roughness: 0.4,
  });

  for (let i = 0; i < 30; i++) {
    const box = new Mesh(new BoxGeometry(0.5, 0.5, 0.5), boxMaterial);
    box.position.set(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
    );
    boxGroup.add(box);
  }

  scene.add(boxGroup);
  gsap.to(boxGroup.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    duration: 15,
    repeat: -1,
    ease: 'linear',
  });
}
