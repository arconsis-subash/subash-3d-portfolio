import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { Group } from 'three/src/objects/Group.js';
import { Line } from 'three/src/objects/Line.js';
import { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
import { Vector3 } from 'three/src/math/Vector3.js';
import gsap from 'gsap';

export function createLines(scene) {
  const lineMaterial = new LineBasicMaterial({ color: 0x555555 });
  const lineGroup = new Group();

  for (let i = 0; i < 50; i++) {
    const points = [];

    for (let j = 0; j < 10; j++) {
      points.push(new Vector3(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
      ));
    }

    const lineGeometry = new BufferGeometry().setFromPoints(points);
    lineGroup.add(new Line(lineGeometry, lineMaterial));
  }

  scene.add(lineGroup);
  gsap.to(lineGroup.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    duration: 20,
    repeat: -1,
    ease: 'linear',
  });
}
