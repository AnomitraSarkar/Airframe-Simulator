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
  if (e.key == "a") camera.position.x += 1;
  if (e.key == "d") camera.position.x -= 1;
  if (e.key == "w") camera.position.y -= 1;
  if (e.key == "s") camera.position.y += 1;
  if (e.key == "ArrowUp") camera.position.z -= 5;
  if (e.key == "ArrowDown") camera.position.z += 5;
  if (e.key == 2) camera.rotation.x += 0.05;
  if (e.key == 8) camera.rotation.x -= 0.05;
  if (e.key == 4) camera.rotation.y -= 0.05;
  if (e.key == 6) camera.rotation.y += 0.05;
  if (e.key == "ArrowLeft") camera.rotation.z -= 0.05;
  if (e.key == "ArrowRight") camera.rotation.z += 0.05;
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
const materialHead = new THREE.MeshBasicMaterial({ color: 0xfe6298 });
const cone = new THREE.Mesh(geometryHead, materialHead);
cone.position.y = 12.5;
scene.add(cone);
model.push(cone);

const light = new THREE.DirectionalLight();
light.position.set(0.2, 1, 1);
scene.add(light);

const gui = new GUI();

//Head
const geometryFolderH = gui.addFolder("Head Geometry");
geometryFolderH.open();
const rotationFolderH = geometryFolderH.addFolder("Rotation");
rotationFolderH.add(cone.rotation, "x", 0, Math.PI).name("Rotate X Axis");
rotationFolderH.add(cone.rotation, "y", 0, Math.PI).name("Rotate Y Axis");
rotationFolderH.add(cone.rotation, "z", 0, Math.PI).name("Rotate Z Axis");
const scaleFolderH = geometryFolderH.addFolder("Scale");
scaleFolderH.add(cone.scale, "x", 0, 2).name("Scale X Axis");
scaleFolderH.add(cone.scale, "y", 0, 2).name("Scale Y Axis");
scaleFolderH.add(cone.scale, "z", 0, 2).name("Scale Z Axis");
scaleFolderH.open();

const materialFolderH = gui.addFolder("Head Material");
const materialParamsH={coneColor:cone.material.color.getHex()};
materialFolderH.add(cone.material, 'wireframe');
materialFolderH.addColor(materialParamsH,'coneColor')
   .onChange((value) =>cone.material.color.set(value));

//Body
const geometryFolderB = gui.addFolder("Body Geometry");
geometryFolderB.open();
const rotationFolderB = geometryFolderB.addFolder("Rotation");
rotationFolderB.add(cylinder.rotation, "x", 0, Math.PI).name("Rotate X Axis");
rotationFolderB.add(cylinder.rotation, "y", 0, Math.PI).name("Rotate Y Axis");
rotationFolderB.add(cylinder.rotation, "z", 0, Math.PI).name("Rotate Z Axis");
const scaleFolderB = geometryFolderB.addFolder("Scale");
scaleFolderB.add(cylinder.scale, "x", 0, 2).name("Scale X Axis");
scaleFolderB.add(cylinder.scale, "y", 0, 2).name("Scale Y Axis");
scaleFolderB.add(cylinder.scale, "z", 0, 2).name("Scale Z Axis");
scaleFolderB.open();

const materialFolderB = gui.addFolder("Body Material");
const materialParamsB={cylinderColor:cone.material.color.getHex()};
materialFolderB.add(cylinder.material, 'wireframe');
materialFolderB.addColor(materialParamsB,'cylinderColor')
   .onChange((value) =>cylinder.material.color.set(value));

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
    model[i].position.z = -21;
    // model[i].rotation.x += angle[0];
    // model[i].rotation.y += angle[1];
    // model[i].rotation.z += angle[2];
    console.log(model[i].position);
  }
}
