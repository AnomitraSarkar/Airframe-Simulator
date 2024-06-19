import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let force = [10, 10, 0]; // x,y,z
let mass = 1000;

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
  if (e.key == 2) camera.rotation.x += 0.05;
  if (e.key == 8) camera.rotation.x -= 0.05;
  if (e.key == 4) camera.rotation.y -= 0.05;
  if (e.key == 6) camera.rotation.y += 0.05;
  if (e.key == "ArrowLeft") camera.rotation.z += 0.05;
  if (e.key == "ArrowRight") camera.rotation.z -= 0.05;
});

var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
let aspectRatio = WIDTH / HEIGHT;
var windowHalfX = WIDTH / 2;
var windowHalfY = HEIGHT / 2;
let model = [];

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometryBody = new THREE.CylinderGeometry(2, 2, 20, 64, 12);
const materialBody = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinder = new THREE.Mesh(geometryBody, materialBody);
scene.add(cylinder);
model.push(cylinder);

const geometryHead = new THREE.CylinderGeometry(0, 2, 5, 64, 12);
const materialHead = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometryHead, materialHead);
cone.position.y = 12.5;
scene.add(cone);
model.push(cone);

const light = new THREE.DirectionalLight();
light.position.set(0.2, 1, 1);
scene.add(light);

const gui = new GUI();

const geometryFolder = gui.addFolder("Mesh Geometry");
geometryFolder.open();
const rotationFolder = geometryFolder.addFolder("Rotation");
rotationFolder.add(cone.rotation, "x", 0, Math.PI).name("Rotate X Axis");
rotationFolder.add(cone.rotation, "y", 0, Math.PI).name("Rotate Y Axis");
rotationFolder.add(cone.rotation, "z", 0, Math.PI).name("Rotate Z Axis");
const scaleFolder = geometryFolder.addFolder("Scale");
scaleFolder.add(cone.scale, "x", 0, 2).name("Scale X Axis");
scaleFolder.add(cone.scale, "y", 0, 2).name("Scale Y Axis");
scaleFolder.add(cone.scale, "z", 0, 2).name("Scale Z Axis");
scaleFolder.open();

const materialFolder = gui.addFolder("Mesh Material");
const materialParams={coneColor:cone.material.color.getHex()};
materialFolder.add(cone.material, 'wireframe');
materialFolder.addColor(materialParams,'coneColor')
   .onChange((value) =>cone.material.color.set(value));

function animate() {
  requestAnimationFrame(animate);
  modelupdate(model, (0, 0, -1), (0, 0, 0));
  renderer.render(scene, camera);
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

//enter updation algorithm here to run at every time step

function modelupdate(model, pos, angle) {
  console.log(model, pos, angle);
  for (let i = 0; i < model.length; i++) {
    // console.log(i)
    model[i].position.x += 0;
    model[i].position.y += 0;
    model[i].position.z += -0.1;
    // model[i].rotation.x += angle[0];
    // model[i].rotation.y += angle[1];
    // model[i].rotation.z += angle[2];
    console.log(model[i].position);
  }
}
