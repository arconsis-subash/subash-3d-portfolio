import gsap from 'gsap';

export function addCameraControls(camera) {
  document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(camera.position, {
      x: mouseX * 2,
      y: mouseY * 2,
      z: 10,
      duration: 0.5,
      ease: 'power1.out',
    });
  });
}
