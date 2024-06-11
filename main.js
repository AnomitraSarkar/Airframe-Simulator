import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// document.addEventListener("keypress",(e)=>{
//     if(e.key == "a") camera.position.y += 1
// })
document.addEventListener("keydown", (e) => {
  if (e.key == "a") {
    camera.position.x -= 1;
    console.log("-x");
  }
  if (e.key == "d") camera.position.x += 1;
  if (e.key == "w") camera.position.y += 1;
  if (e.key == "s") camera.position.y -= 1;
  if (e.key == "ArrowUp") camera.position.z -= 1;
  if (e.key == "ArrowDown") camera.position.z += 1;
  if (e.key == 2) camera.rotation.x += 0.01;
  if (e.key == 8) camera.rotation.x -= 0.01;
  if (e.key == 4) camera.rotation.y -= 0.01;
  if (e.key == 6) camera.rotation.y += 0.01;
  if (e.key == "ArrowLeft") camera.rotation.z += 0.01;
  if (e.key == "ArrowRight") camera.rotation.z -= 0.01;
});

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
let aspectRatio = WIDTH / HEIGHT;
var windowHalfX = WIDTH / 2;
var windowHalfY = HEIGHT / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometryBody = new THREE.CylinderGeometry(2, 2, 20, 64, 12);
const materialBody = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinder = new THREE.Mesh(geometryBody, materialBody);
scene.add(cylinder);

const geometryHead = new THREE.CylinderGeometry(0, 2, 5, 64, 12);
const materialHead = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometryHead, materialHead);
cone.position.y = 12.5;
scene.add(cone);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  algo()
}

animate();

function onWindowResize() {
  var WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  aspectRatio = WIDTH / HEIGHT;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(WIDTH, HEIGHT);
}

function algo(){
    cylinder.position.y += 0.01
    cone.position.y += 0.01
}
