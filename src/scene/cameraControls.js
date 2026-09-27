import gsap from 'gsap';

export function addCameraControls(camera, width, height) {
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
}
