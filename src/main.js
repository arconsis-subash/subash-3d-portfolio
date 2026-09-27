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

const light2 = new THREE.PointLight(0xff00ff, 0.5);
light2.position.set(-5, -5, 5);
scene.add(light2);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
}

// Scroll animation
ScrollTrigger.create({
  trigger: '.hero',
  onUpdate: (self) => {
    camera.position.z = 5 + self.getVelocity() * 0.01;
  }
});

// Handle resize
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

animate();
