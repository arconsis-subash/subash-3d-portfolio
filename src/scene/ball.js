import { Mesh } from 'three/src/objects/Mesh.js';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
import { SphereGeometry } from 'three/src/geometries/SphereGeometry.js';
import gsap from 'gsap';

export function createBall(scene) {
  const ballGeometry = new SphereGeometry(1.5, 64, 64);
  const ballMaterial = new MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.9,
    roughness: 0.3,
    emissive: 0x333333,
  });
  const ball = new Mesh(ballGeometry, ballMaterial);

  scene.add(ball);
  gsap.to(ball.scale, {
    x: 1.2,
    y: 1.2,
    z: 1.2,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
}
