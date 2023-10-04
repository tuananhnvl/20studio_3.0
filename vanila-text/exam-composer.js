import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.120.0/build/three.module.js";
import {
	OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.120.0/examples/jsm/controls/OrbitControls.js";
import {
	EffectComposer
} from "https://cdn.jsdelivr.net/npm/three@0.120.0/examples/jsm/postprocessing/EffectComposer.js";
import {
	RenderPass
} from "https://cdn.jsdelivr.net/npm/three@0.120.0/examples/jsm/postprocessing/RenderPass.js";
import {
	ShaderPass
} from "https://cdn.jsdelivr.net/npm/three@0.120.0/examples/jsm/postprocessing/ShaderPass.js";
import {
	UnrealBloomPass
} from "https://cdn.jsdelivr.net/npm/three@0.120.0/examples/jsm/postprocessing/UnrealBloomPass.js";


import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module'
//postprocessing
let materials, bloom_pass, bloom_composer, render_scene, final_pass, bloom_layer, dark_material, final_composer;

var enemy = [];
var floor;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const renderer = new THREE.WebGLRenderer({
	antialias: false,
	alpha: true,
	canvas: document.getElementById("view-c") 
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 4, 1, 0.1);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
// controls.maxPolarAngle = Math.PI * 0.5;

// controls.addEventListener('change', render);
// camera.addEventListener('change', render);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.domElement);

scene.add(new THREE.AmbientLight(0xffffff));

const gridHelper = new THREE.GridHelper(300, 100);
scene.add(gridHelper);
// crée les axes 
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);


init();
animate()

window.onresize = function () {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	renderer.setSize(width, height);
	bloom_composer.setSize(width, height);
	final_composer.setSize(width, height);
};

function init() {
	//css declarations

	Post_processing();
	create_enemy();

}

function render() {
	render_with_bloom();
	// render the entire scene, then render bloom scene on top
	final_composer.render();
	controls.update()
}



function animate() {
	render()
	stats.update()
	enemy.forEach((i) => {
		i.rotation.z += 0.1
		i.rotation.y += 0.1
	})
	camera.updateMatrixWorld();
	
	requestAnimationFrame(animate);
}


function create_enemy() {
	for (let i = 0; i < 20; i++) {
		enemy[i] = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshLambertMaterial({
			color: "black",
			wireframe: false
		}));

		enemy[i].position.z = 0;
		scene.add(enemy[i]);

		var objBack = new THREE.Mesh(new THREE.BoxGeometry(5, 5, .1), new THREE.MeshBasicMaterial({
			color: "white",
			wireframe: false,
			transparent: false,
			opacity: 1,
		}));
		objBack.position.z = -2.51;
		objBack.layers.enable(1);
		enemy[i].add(objBack);

		let pos = random(-50, 50)
		let pos2 = random(-50, 50)
		enemy[i].position.set(pos, random(-50, 50), pos2)
		enemy[i].rotation.y = random(0, 2);
	};
};


///////////////////////////////////////////////////////////////////////////////
// POST PROCESSS
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function Post_processing() {
	///////////////////////////////////////////////////////////////////////////////
	// postprocessing
	///////////////////////////////////////////////////////////////////////////////
	/*
	bloom_pass
	bloom_composer
	render_scene
	final_pass
	bloom_layer
	dark_material

	*/

	bloom_layer = new THREE.Layers();
	bloom_layer.set(1);

	dark_material = new THREE.MeshBasicMaterial({
		color: 'blue'
	});
	materials = {};

	bloom_pass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 1, 0.1);
	// bloom_pass.threshold = params.bloomThreshold;
	// bloom_pass.strength = params.bloomStrength;
	// bloom_pass.radius = params.bloomRadius;

	bloom_composer = new EffectComposer(renderer);
	bloom_composer.renderToScreen = false;
	render_scene = new RenderPass(scene, camera);
	bloom_composer.addPass(render_scene);
	bloom_composer.addPass(bloom_pass);
	console.log(bloom_composer)
	final_pass = new ShaderPass(
		new THREE.ShaderMaterial({
			uniforms: {
				baseTexture: {
					value: null
				},
				bloomTexture: {
					value: bloom_composer.renderTarget2.texture
				}
			},
			vertexShader: document.getElementById('vertexshader').textContent,
			fragmentShader: document.getElementById('fragmentshader').textContent,
			defines: {}
		}), 'baseTexture'
	);
	final_pass.needsSwap = true;

	final_composer = new EffectComposer(renderer);
	final_composer.addPass(render_scene);
	final_composer.addPass(final_pass);
	///////////////////////////////////////////////////////////////////////////////
}

///////////////////////////////////////////////////////////////////////////////
// pour que les objets restent opaques sinon on voit à travers
///////////////////////////////////////////////////////////////////////////////
function render_with_bloom() {

	scene.traverse(darken_non_bloomed);
	bloom_composer.render();
			scene.traverse(restore_material);
}
///////////////////////////////////////////////////////////////////////////////

function darken_non_bloomed(obj) {
	if (obj.isMesh && bloom_layer.test(obj.layers) === false) {
		materials[obj.uuid] = obj.material;
		obj.material = dark_material;
	}
}

///////////////////////////////////////////////////////////////////////////////
// pour restaurer les matériaux sinon tout noir
///////////////////////////////////////////////////////////////////////////////

function restore_material(obj) {
	if (materials[obj.uuid]) {

		obj.material = materials[obj.uuid];
		delete materials[obj.uuid];

	}
}
///////////////////////////////////////////////////////////////////////////////