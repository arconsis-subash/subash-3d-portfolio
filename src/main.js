import * as THREE from 'three';
import gsap from 'gsap';

// Canvas and Scene Setup
const canvas = document.getElementById('canvas');
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1); // Black background

// Center the camera
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

// Create a dynamic 3D ball (silver/greyish with repulse effect)
const ballGeometry = new THREE.SphereGeometry(1.5, 64, 64);
const ballMaterial = new THREE.MeshStandardMaterial({
  color: 0xc0c0c0, // Silver
  metalness: 0.9,
  roughness: 0.3,
  emissive: 0x333333, // Subtle glow
});
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Add repulse animation to the ball
gsap.to(ball.scale, {
  x: 1.2,
  y: 1.2,
  z: 1.2,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
});

// Add moving lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const lineGroup = new THREE.Group();
for (let i = 0; i < 50; i++) {
  const points = [];
  for (let j = 0; j < 10; j++) {
    points.push(new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeometry, lineMaterial);
  lineGroup.add(line);
}
scene.add(lineGroup);

// Animate the lines
gsap.to(lineGroup.rotation, {
  x: Math.PI * 2,
  y: Math.PI * 2,
  duration: 20,
  repeat: -1,
  ease: 'linear',
});

// Add moving boxes
const boxGroup = new THREE.Group();
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0x888888, // Greyish
  metalness: 0.8,
  roughness: 0.4,
});
for (let i = 0; i < 30; i++) {
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
  boxGroup.add(box);
}
scene.add(boxGroup);

// Animate the boxes
gsap.to(boxGroup.rotation, {
  x: Math.PI * 2,
  y: Math.PI * 2,
  duration: 15,
  repeat: -1,
  ease: 'linear',
});

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Interactive camera movement
document.addEventListener('mousemove', (event) => {
  const mouseX = (event.clientX / width) * 2 - 1;
  const mouseY = -(event.clientY / height) * 2 + 1;
  gsap.to(camera.position, {
    x: mouseX * 2,
    y: mouseY * 2,
    z: 10,
    duration: 0.5,
    ease: 'power1.out',
  });
});

// Animation loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();