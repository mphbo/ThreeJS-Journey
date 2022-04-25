import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

// Debug
const gui = new dat.GUI();

const parameters = {
  color: 0xff0000,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 3, 3, 3);
// const geometry = new THREE.BufferGeometry();

// const count = 200;

// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);

// geometry.setAttribute("position", positionsAttributes);

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreen) canvas.webkitFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
/**
 * Camera
 */
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

camera.position.z = 3;
// camera.position.y = 2;
// camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
// Clock
const clock = new THREE.Clock();

// Animation
const gameLoop = () => {
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime * 2;
  // mesh.rotation.x = elapsedTime;
  // mesh.rotation.z = elapsedTime;

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(gameLoop);
};

gameLoop();
