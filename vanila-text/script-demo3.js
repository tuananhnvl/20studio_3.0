import * as THREE from 'http://127.0.0.1:5501/vanila-text/core-three/threev132.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js'
import virtualScroll from 'https://cdn.jsdelivr.net/npm/virtual-scroll@2.2.1/+esm'
let time = 0
let scrollPos = 0
const scroller = new virtualScroll()
scroller.on(event => {
  scrollPos = (-event.y * 0.0002)
})


let scene, renderer, camera, meshBubble, meshCurve, shaderBubble, shaderCurve, shaderSphereFlow, meshSphereFlow
let shark, textureShark, cloneMat, materialShader , textureBase 

scene = new THREE.Scene();
//scene.background = new THREE.Color(0x031e33);
//CAMERA
camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 1;
//RERENDER
//renderer.setClearColor( 0x000000, 0 ); // the default
renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("view-canvas3") ,alpha:true});

const too = renderer.getContext()
console.log(too)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.antialias = false
//LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
//scene.add(directionalLight);
const light = new THREE.AmbientLight(0xffffff); // soft white light
//scene.add(light);

const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true

addBuddle()
addCurveFlow()
//addButtonSphere()
//initPathShader()
//curveForShark()

animate()

function animate() {
  requestAnimationFrame(animate);
  render();
  time++
  if(materialShader) {
    materialShader.uniforms.time.value = time / 2000
 
  }
  
  shaderBubble.uniforms.time.value = time / 2000
  shaderCurve.uniforms.time.value = time / 2000
 // shaderSphereFlow.uniforms.time.value = time / 1000
}

function render() {
  renderer.render(scene, camera);
}

function addButtonSphere() {
  let planeGeo = new THREE.SphereGeometry(1.4, 32, 16);

  let textureSphereFlow = new THREE.TextureLoader().load('./asset/noise-wave1.jpg')
  textureSphereFlow.wrapS = THREE.RepeatWrapping
  textureSphereFlow.wrapT = THREE.RepeatWrapping
  shaderSphereFlow = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    uniforms: {
      time: { type: 'f', value: 0.0 },
      sampleSphereFlow: { type: 't', value: textureSphereFlow }
    },

    vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
    `,
    fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    uniform sampler2D sampleSphereFlow;
    void main() {
      float texture1 = texture2D(sampleSphereFlow,vUv + time).b;
      gl_FragColor = vec4(vec3(1.),texture1 - 0.2); 
    }
    `
  });
  meshSphereFlow = new THREE.Mesh(planeGeo, shaderSphereFlow)
  scene.add(meshSphereFlow)
}
function addCurveFlow() {
  let pointsCurve = []
  for (let e = 0; e < 100; e++) {
    let angell = 2 * Math.PI * e / 100
    let x = Math.sin(angell) + 2. * Math.sin(2. * angell);
    let y = Math.cos(angell) - 2. * Math.cos(2. * angell);
    let z = -Math.sin(3. * angell);
    pointsCurve.push(new THREE.Vector3(x, y, z))
  }
  let curve = new THREE.CatmullRomCurve3(pointsCurve)
  let curveGeo = new THREE.TubeGeometry(curve, 100, .42, 100, false);
  let sampleWater = new THREE.TextureLoader().load('./asset/sample-water.png')
  sampleWater.wrapS = THREE.RepeatWrapping
  sampleWater.wrapT = THREE.RepeatWrapping
  shaderCurve = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    uniforms: {
      time: { type: 'f', value: 0.0 },
      sampleWater: { type: 't', value: sampleWater }
    },

    vertexShader: `
    uniform float time;
    varying vec3 vPosition;
    varying vec2 vUv;
    attribute vec3 aRandom;
    float PI = 3.1415926535;
    

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);

    }
    `,
    fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform sampler2D sampleWater;
    void main() {
      float texture1 = texture2D(sampleWater,vUv - time).r;
      gl_FragColor = vec4(vec3(1.),texture1); //revret img seem like transperset

    }
    `
  });
  meshCurve = new THREE.Mesh(curveGeo, shaderCurve)
  scene.add(meshCurve)
}
function addBuddle() {
  let count = 20000
  let geoC = new THREE.BufferGeometry()
  let posofC = new Float32Array(count * 3)
  let randomofC = new Float32Array(count * 3)
  let sizeofC = new Float32Array(count * 1)

  for (let i = 0; i < count * 3; i += 3) {
    posofC[i + 0] = (Math.random() - .5)
    posofC[i + 1] = (Math.random() - .5)
    posofC[i + 2] = (Math.random() - .5)

    randomofC[i + 0] = (Math.random())
    randomofC[i + 1] = (Math.random())
    randomofC[i + 2] = (Math.random())

    sizeofC[i + 0] = .5 * (.5 * Math.random())
  }
  geoC.setAttribute("position", new THREE.BufferAttribute(posofC, 3))
  geoC.setAttribute("aRandom", new THREE.BufferAttribute(randomofC, 3))
  geoC.setAttribute("size", new THREE.BufferAttribute(sizeofC, 1))
  console.log(geoC)
  shaderBubble = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    uniforms: {
      time: { type: 'f', value: 0.0 },
      buddleTexture: { type: 't', value: new THREE.TextureLoader().load('./asset/bubble.png') }
    },

    vertexShader: `
      uniform float time;
      varying vec3 vPosition;
      varying vec2 vUv;
      attribute vec3 aRandom;
      attribute vec3 size;
      float PI = 3.1415926535;
      vec3 getPos(float procress) {
        float angle = procress * PI * 2.;
        float x = sin(angle) + 2. * sin(2. * angle);
        float y = cos(angle) - 2. * cos(2. * angle);
        float z = -sin(3. * angle);
        return vec3(x,y,z);
      }
      vec3 getTagent(float procress) {
      
        float angle = procress * PI * 2.;
        float x = cos(angle) + 4. * cos(2. * angle);
        float y = -sin(angle) + 4. * sin(2. * angle);
        float z = 3.-cos(3. * angle);
        return normalize(vec3(x,y,z));
    }
      vec3 getNormal(float procress) {
   
          float angle = procress * PI * 2.;
          float x = sin(angle) - 8. * sin(2. * angle);
          float y = -cos(angle) + 8. * cos(2. * angle);
          float z =  9.*sin(3. * angle);
          return normalize(vec3(x,y,z));
      }
  
      void main() {
          vec3 pos = position; 
          float pro =  fract(time + aRandom.x);
          pos = getPos(pro);
          vec3 normal = getNormal(pro);
          vec3 tagent = getTagent(pro);
          vec3 binormal = normalize(cross(normal,tagent));
  
  
          float radius = 0.3 + aRandom.y * .2;
          float cx = radius * cos(aRandom.z * PI * 2.0 * time + aRandom.z * 6.);
          float cy = radius * sin(aRandom.z * PI * 2.0 * time + aRandom.z* 6.);
  
          pos += (normal  * cx + binormal * cy);
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(pos,1.);
          gl_PointSize =  (size.x * 1.) * (mvPosition.z * 4.);
          gl_PointSize =  (1.42) * (5. / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
  
      }
      `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform sampler2D buddleTexture;
      void main() {
        vec2 st = gl_PointCoord.xy;
  
        float dist = length(st - vec2(.5));
        float alpha = smoothstep(.5,.48,dist);
  
        vec4 normalTexture = texture2D(buddleTexture,st);
  
        gl_FragColor = vec4(normalTexture.rgb,alpha);
        gl_FragColor = texture2D(buddleTexture,st);
      }
      `
  });
  meshBubble = new THREE.Points(geoC, shaderBubble)
  scene.add(meshBubble)
}



/* HOOK */


function initTexture() {
  if ( ! renderer.extensions.get( "OES_texture_float" ) ) {
    console.log("No OES_texture_float support for float textures.");
}

if ( renderer.capabilities.maxVertexTextures === 0 ) {
    console.log("No support for vertex shader textures.");
}

const height = 4;
const TEXTURE_WIDTH = 256
const dataArray = new Float32Array( 256 * 4 * 3 );
const dataTexture = new THREE.DataTexture(
    dataArray,
    TEXTURE_WIDTH ,
    height,
    THREE.RGBFormat,
    THREE.FloatType
);

dataTexture.wrapS = THREE.RepeatWrapping;
dataTexture.wrapY = THREE.RepeatWrapping;
dataTexture.magFilter = THREE.LinearFilter;
dataTexture.needsUpdate = true;

return dataTexture;
}

let bufferUniforms = {}
let uniforms
function modifyShader(material) {
  if (material.__ok) return;
  material.__ok = true;
  console.log('hi')

}

function initPathShader() {

  var loader = new OBJLoader();
  loader.load(
    // resource URL
    './asset/ORCA.OBJ',

    // called when resource is loaded
    onLoad,
    // called when loading is in progresses
    function onProgress(xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function onError(error) {

      console.log(error, 'An error happened');

    }
  );
}

function onLoad(object) {
  if (shark) scene.remove(shark);

  shark = object;
 
  textureBase = initTexture()

  object.children[0].material = new THREE.MeshStandardMaterial({color: 0xffddff, skinning: true});
  object.children[0].material.color.set(0xff00ff);
  const textureShark = new THREE.TextureLoader().load('./asset/noise-wave1.jpg')
  console.log(textureBase,textureShark)
  object.children[0].material.onBeforeCompile = (shader) => {
 

    shader.uniforms.textureBase = {value:textureBase}
    shader.uniforms.textureSharkk = {value: textureShark };
    shader.uniforms.pathOffset = {value: 0 }, // time of path curve
      shader.uniforms.pathSegment = { value: 0.5 }, // fractional length of path
      shader.uniforms.spineOffset = {value: 161 },
      shader.uniforms.spineLength = { value: 100 },
      shader.uniforms.time = {value: 0.0 },
      shader.uniforms.flow = {value: 0. },
      shader.vertexShader = `
      uniform sampler2D textureBase;
      uniform float pathOffset;
      uniform float pathSegment;
      uniform float spineOffset;
      uniform float spineLength;
      uniform int flow;
      uniform float time;
      varying vec3 v_pos;
      float textureLayers = 4.; // look up takes (i + 0.5) / textureLayers
        ${shader.vertexShader}
      `.replace(
        '#include <defaultnormal_vertex>',
        `
        vec4 worldPos = modelMatrix * vec4(position, 1.);

        bool bend = flow > 0;
        float spinePortion = bend ? (worldPos.x + spineOffset) / spineLength : 0.;
        float xWeight = bend ? 0. : 0.5;
        float mt = spinePortion * pathSegment + pathOffset;

        vec3 spinePos = texture2D(textureBase, vec2(mt, (0.5) / textureLayers)).xyz;
        vec3 a = texture2D(textureBase, vec2(mt, (1. + 0.5) / textureLayers)).xyz;
        vec3 b = texture2D(textureBase, vec2(mt, (2. + 0.5) / textureLayers)).xyz;
        vec3 c = texture2D(textureBase, vec2(mt, (3. + 0.5) / textureLayers)).xyz;
        mat3 basis = mat3(a, b, c);

        vec3 transformed = basis * vec3(worldPos.x * xWeight, worldPos.y * 1., worldPos.z * 1.)+ spinePos + time;
   
        vec3 transformedNormal = normalMatrix * (basis * objectNormal);
       
        `
    ).replace(
        '#include <begin_vertex>',
        ''
    ).replace(
      '#include <project_vertex>',
      ` 
      v_pos = position;
    vec4 mvPosition = viewMatrix * vec4( position * 0.05 + transformed, 1.0 );
    // vec4 mvPosition = viewMatrix * worldPos;
    
    gl_Position = projectionMatrix * mvPosition;
    `
    );
    shader.fragmentShader = `
    uniform sampler2D textureSharkk;
    uniform sampler2D textureBase;
    uniform float time;
    varying vec3 v_pos;
    varying vec4 vWorldPosition;
    ${shader.fragmentShader}`.replace(
      '#include <dithering_fragment>',
      ` 

          gl_FragColor = texture2D(textureSharkk,v_pos.xy);
         
          `
    );
    materialShader = shader;
 //   console.log(shader.vertexShader,shader.fragmentShader)
  }



  let geoms = shark.children.map(child => child.geometry);
  let bbs = geoms.map(geo => {
    geo.computeBoundingBox();
    return geo.boundingBox;
  });

  console.log('boundingbox', bbs);
  /* referenceGeometry -- free mesh */
  /*  referenceGeometry.vertices[0].set(
       Math.min(...bbs.map(bb => bb.min.x)),
       Math.min(...bbs.map(bb => bb.min.y)),
       Math.min(...bbs.map(bb => bb.min.z))
   )
 
   referenceGeometry.vertices[1].set(
       Math.max(...bbs.map(bb => bb.max.x)),
       Math.max(...bbs.map(bb => bb.max.y)),
       Math.max(...bbs.map(bb => bb.max.z))
   )
 
   */
  

   console.log(shark)
  scene.add(shark);
}







function curveForShark() {
  
const curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( -1, 0.15, 1 ),
  new THREE.Vector3( -1, 0.15, -1 ),
  new THREE.Vector3( 0, 0.15, 0 ),
  new THREE.Vector3( 1, 0.15, -1 ),
  new THREE.Vector3( 2, 0.15, 2 )
] );

curve.curveType = 'centripetal';
curve.closed = true;

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0x00ff00 } );

// Create the final object to add to the scene
const line = new THREE.Line( geometry, material );

scene.add(line);
}