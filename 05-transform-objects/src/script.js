import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

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
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
console.log(camera);
camera.lookAt(mesh.position);
scene.add(camera);

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
  mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(gameLoop);
};

gameLoop();
