import { addCameraControls } from './scene/cameraControls.js';
import { createBall } from './scene/ball.js';
import { createBoxes } from './scene/boxes.js';
import { addLighting } from './scene/lighting.js';
import { createLines } from './scene/lines.js';
import { setupScene } from './scene/setupScene.js';
import { startRenderLoop } from './scene/startRenderLoop.js';

const canvas = document.getElementById('canvas');
const width = window.innerWidth;
const height = window.innerHeight;

const { scene, camera, renderer } = setupScene(canvas, width, height);

createBall(scene);
createLines(scene);
createBoxes(scene);
addLighting(scene);
addCameraControls(camera, width, height);
startRenderLoop(renderer, scene, camera);
