import { AmbientLight } from 'three/src/lights/AmbientLight.js';
import { PointLight } from 'three/src/lights/PointLight.js';

export function addLighting(scene) {
  scene.add(new AmbientLight(0x404040, 1.5));

  const pointLight = new PointLight(0xffffff, 1.5);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
}
