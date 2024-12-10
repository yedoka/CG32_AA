import * as THREE from 'three'

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(15 * Math.cos(Math.PI / 4), 15 * Math.sin(Math.PI / 4), 7);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Draw coordinate system
function drawCoordSystem() {
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

// Draw a cube
function drawCube() {
  const geometry = new THREE.BoxGeometry(1, 4, 0.7);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(geometry, material);
  //first translation
  cube.translateX(2);
  cube.rotateZ(Math.PI / 2);
  
  scene.add(cube);
}

// Initialize
function init() {
  drawCoordSystem();
  drawCube();
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Camera controls (similar to SDL key events)
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 37) {
    // left arrow key
    camera.position.x += 0.5;
  } else if (keyCode == 39) {
    // right arrow key
    camera.position.x -= 0.5;
  } else if (keyCode == 38) {
    // up arrow key
    camera.position.z += 0.5;
  } else if (keyCode == 40) {
    // down arrow key
    camera.position.z -= 0.5;
  }
  camera.lookAt(scene.position);
}

document.addEventListener("keydown", onDocumentKeyDown, false);

init();
animate();
