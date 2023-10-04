var scene;
var camera;

var renderer;
var bufferScene;
var textureA;
var textureB;
var bufferMaterial;
var plane;
var bufferObject;
var finalMaterial;
var quad;
var video;
var videoTexture;


function sceneSetup() {
    scene = new THREE.Scene();
    scene.background  = 0xFFFFFF
    var width = window.innerWidth;
    var height = window.innerHeight;
 //camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
 camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 9000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("view-canvas4") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);

    sampleObj()
}

function sampleObj() {

}

function bufferTextureSetup() {
    //Create buffer scene
    bufferScene = new THREE.Scene();
    //Create 2 buffer textures
    textureA = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter });
    textureB = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter });
    //Pass textureA to shader
    bufferMaterial = new THREE.ShaderMaterial({
        uniforms: {
            bufferTexture: { type: "t", value: textureA.texture },
            res: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            //Keeps the resolution
            videoTexture: { type: "t", value: new THREE.TextureLoader().load('./asset/demo.jpg') },
            time: { type: "f", value:0 }
        },
        vertexShader: document.getElementById('vertShader').innerHTML,
        fragmentShader: document.getElementById('fragShader').innerHTML
    });
    plane = new THREE.PlaneGeometry(window.innerWidth/1.2, window.innerHeight/1.2,32,32);
   
    bufferObject = new THREE.Mesh(plane, bufferMaterial);
   // bufferObject.material.wireframe = true
    bufferScene.add(bufferObject);

    //Draw textureB to screen 
    finalMaterial = new THREE.MeshBasicMaterial({ map: textureB });
    quad = new THREE.Mesh(plane, finalMaterial);
    scene.add(quad);
}

//Initialize the Threejs scene
sceneSetup();


bufferTextureSetup();
let speed = 0
let posCurrent = 0
window.addEventListener('wheel', (e) => {
    speed += e.deltaY * .002
})
function loopAnim() {
    speed *= 0.8
    posCurrent += speed
    
    console.log(posCurrent)
    camera.position.z = 700
   // camera.rotation.x = posCurrent/50
}
function render() {

    requestAnimationFrame(render);
  
    //Draw to textureB
    renderer.render(bufferScene, camera, textureB, true);

    //Swap textureA and B
    var t = textureA;
    textureA = textureB;
    textureB = t;
    quad.material.map = textureB.texture;
    bufferMaterial.uniforms.bufferTexture.value = textureA.texture;

    //Update time
    bufferMaterial.uniforms.time.value += 0.012;

    //Finally, draw to the screen
    renderer.render(scene, camera);

    loopAnim()
}
render();
