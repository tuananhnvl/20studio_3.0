import { OrbitControls } from './jsm/controls/OrbitControls.js';

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import virtualScroll from 'https://cdn.jsdelivr.net/npm/virtual-scroll@2.2.1/+esm'

let speed = 0
let posYF = 0
const scroller = new virtualScroll()
scroller.on(event => {
  posYF = (-event.y * 0.0002)

})
const loaderAnim = new GLTFLoader();

let scene, renderer, camera, ModelBlender

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.78;
//RERENDER
renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("view-canvas2") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = false
//LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false
const uTime = {
  shared: true,
  mixed: true,
  type:'f',
  value: 0
};
const uScroll = {
  type:'f',
  value: 0
};


let cloneMat, meshfinal
const maskTexture = new THREE.TextureLoader().load('./asset/demo.jpg');
const imgbeforeTexture = new THREE.TextureLoader().load('./asset/textures/Kopnena_vrata_zadar_baseColor.jpeg');
const imgafterTexture = new THREE.TextureLoader().load('./asset/textures/Kopnena_vrata_zadar_baseColor2.jpeg');
console.log(maskTexture, imgafterTexture)
loaderAnim.load('./asset/port.gltf', function (gltf) {
  ModelBlender = gltf;
  const avatar = gltf.scene.getObjectByName("RootNode");


  const uniformToShaderBefore = {
    uMask: { type: "t", value: maskTexture },
    uImageAfter: { type: 't', value: imgafterTexture },
    uScroll,
    uTime,
    offsetScale: {
      mixed: true,    // Uniform will be passed to a derivative material (MeshDepthMaterial below)
      linked: true,   // Similar as shared, but only for derivative materials, so wavingMaterial will have it's own, but share with it's shadow material
      type:'f',
      value: 0
    }
  }

  cloneMat = avatar.children[11].children[0].material
  cloneMat.map = imgbeforeTexture
  cloneMat.needsUpdate = true;
  cloneMat.map.flipY = false
  console.log('=====', cloneMat)
  cloneMat.onBeforeCompile = shader => {

    shader.uniforms.uTime = uniformToShaderBefore.uTime;
    shader.uniforms.offsetScale = uniformToShaderBefore.offsetScale;
    shader.uniforms.uScroll = uniformToShaderBefore.uScroll
    shader.uniforms.uMask = uniformToShaderBefore.uMask
    shader.uniforms.uImageAfter = uniformToShaderBefore.uImageAfter
    shader.vertexShader = `
            varying vec3 vPos;
            uniform float offsetScale;
            uniform float uTime;
          ${shader.vertexShader}
        `.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
       // transformed += normal * offsetScale;
       transformed.x += sin( position.y * 4.0 + uTime ) * 0.025;
      //  transformed.y += sin( position.x * 4.0 + uTime ) * 0.025;
       // transformed.z += sin( position.x + uTime ) * 0.0025;
        vPos = transformed;
       
        `
    );
    shader.fragmentShader = `
    uniform sampler2D uMask;
    uniform sampler2D uImageAfter;
       
          uniform float uTime;
          uniform float uScroll;
         
          varying vec3 vPos;
          ${shader.fragmentShader}
        `.replace(
      `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
      `
      vec4 save = vec4( outgoingLight, diffuseColor.a );
      float th = cos( uScroll * 2.0);
      vec4 demo = texture2D(uMask, vPos.xy );
      float tex = ((texture2D(uImageAfter, outgoingLight.xy).x) + vPos.x  - 0.42);
      float mask = smoothstep( th + .1, th, tex); 
      float dist = smoothstep( th, th - .05, tex);
      float colcc = step( th - .15, tex);
      vec4 color = texture2D(uImageAfter, vNormal.xy);

   
      //vec3 color = save.rgb;
   
      
      gl_FragColor = vec4( mix(outgoingLight.rgb, color.rgb, colcc) * (1.0/mask), diffuseColor.a); // (1.0/mask)
    //gl_FragColor = color;
      `
    );
    console.log(shader.vertexShader);
    console.log(shader.fragmentShader);
  }


  console.log(cloneMat, avatar.children[11].children[0], avatar.children[11].children[0].material)
  meshfinal = avatar.children[11].children[0]
  meshfinal.material = cloneMat
  meshfinal.material.wireframe = false
  meshfinal.position.set(0, -0.25, 0);
  meshfinal.up.y = 0
  meshfinal.rotation.x = 4.8
  scene.add(meshfinal);




}, undefined, function (e) {

  console.error(e);

});
let t = 0
animate()

function animate() {
  requestAnimationFrame(animate);
  render();
  //controls.update();


  console.log(posYF)
  t += 0.05;
  uScroll.value = posYF
  uTime.value = t;

}


function render() {
  renderer.render(scene, camera);
}
