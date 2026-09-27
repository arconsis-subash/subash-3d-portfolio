export function startRenderLoop(renderer, scene, camera) {
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}
