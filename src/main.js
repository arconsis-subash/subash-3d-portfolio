import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('canvas');
const width = window.innerWidth;
const height = window.innerHeight;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0.1);
camera.position.z = 5;

// Create rotating geometry
const geometry = new THREE.IcosahedronGeometry(2, 4);
const material = new THREE.MeshPhongMaterial({ 
  color: 0x3498db,
  emissive: 0x1a5276,
  wireframe: false
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lighting
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xff0000, 0.5);
light2.position.set(-5, -5, 5);
scene.add(light2);

// Add moving lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const lineGeometry = new THREE.BufferGeometry();
const points = [];
for (let i = 0; i < 10; i++) {
  points.push(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));
}
lineGeometry.setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

// Animate lines
gsap.to(line.rotation, {
  x: Math.PI * 2,
  y: Math.PI * 2,
  duration: 10,
  repeat: -1,
  ease: 'power1.inOut'
});

// Animate lights
gsap.to(light1.position, {
  x: -5,
  y: -5,
  z: 5,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
gsap.to(light2.position, {
  x: 5,
  y: 5,
  z: -5,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Interactive camera movement
document.addEventListener('mousemove', (event) => {
  const mouseX = (event.clientX / width) * 2 - 1;
  const mouseY = -(event.clientY / height) * 2 + 1;
  gsap.to(camera.position, {
    x: mouseX * 2,
    y: mouseY * 2,
    duration: 0.5,
    ease: 'power1.out'
  });
});

// Animation loop
function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();