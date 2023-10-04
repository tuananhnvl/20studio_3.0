console.clear()

const LABEL_TEXT = '20 STUDIO'

const clock = new THREE.Clock()
const scene = new THREE.Scene()

// Create a new framebuffer we will use to render to
// the video card memory
let renderBufferA = new THREE.WebGLRenderTarget(
  innerWidth * devicePixelRatio,
  innerHeight * devicePixelRatio
)
// Create a second framebuffer
let renderBufferB = new THREE.WebGLRenderTarget(
  innerWidth * devicePixelRatio,
  innerHeight * devicePixelRatio
)

// Create a threejs renderer:
// 1. Size it correctly
// 2. Set default background color
// 3. Append it to the page
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x222222)
renderer.setClearAlpha(0)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio || 1)
document.body.appendChild(renderer.domElement)

// Create an orthographic camera that covers the entire screen
// 1. Position it correctly in the positive Z dimension
// 2. Orient it towards the scene center
const orthoCamera = new THREE.OrthographicCamera(
  -innerWidth / 2,
  innerWidth / 2,
  innerHeight / 2,
  -innerHeight / 2,
  0.000001,
  4000,
)
orthoCamera.position.set(0, 0, 1)
orthoCamera.lookAt(new THREE.Vector3(0, 0, 0))

// Create a plane geometry that spawns either the entire
// viewport height or width depending on which one is bigger
const labelMeshSize = innerWidth > innerHeight ? innerHeight : innerWidth
const labelGeometry = new THREE.PlaneBufferGeometry(420, 420, 16, 16)

// Programmaticaly create a texture that will hold the text
let labelTextureCanvas
{
  // Canvas and corresponding context2d to be used for drawing the text
  labelTextureCanvas = document.createElement('canvas')
  const labelTextureCtx = labelTextureCanvas.getContext('2d')
  // Dynamic texture size based on the device capabilities
  const textureSize = Math.min(renderer.capabilities.maxTextureSize, 2048)
  const relativeFontSize = 20
  // Size our text canvas
  labelTextureCanvas.width = textureSize
  labelTextureCanvas.height = textureSize
  labelTextureCtx.textAlign = 'center'
  labelTextureCtx.textBaseline = 'middle'
  // Dynamic font size based on the texture size (based on the device capabilities)
  labelTextureCtx.font = `${relativeFontSize}px Helvetica`
  const textWidth = labelTextureCtx.measureText(LABEL_TEXT).width
  const widthDelta = labelTextureCanvas.width / textWidth
  const fontSize = relativeFontSize * widthDelta
  labelTextureCtx.font = `${fontSize}px Helvetica`
  labelTextureCtx.fillStyle = 'white'
  labelTextureCtx.fillText(LABEL_TEXT, labelTextureCanvas.width / 2, labelTextureCanvas.height / 2)
} const textureImg = new THREE.TextureLoader().load('./asset/demo.jpg');
// Create a material with our programmaticaly created text texture as input
const labelMaterial = new THREE.MeshBasicMaterial({
  //map: new THREE.CanvasTexture(labelTextureCanvas),
  map: textureImg,
  transparent: false,
  wireframe: false
})

// Create a plane mesh, add it to the scene
const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial)

scene.add(labelMesh)
// Create a second scene that will hold our fullscreen plane
const postFXScene = new THREE.Scene()
// Create a plane geometry that covers the entire screen
const postFXGeometry = new THREE.PlaneBufferGeometry(innerWidth, innerHeight, 16, 16)
// Create a plane material that expects a sampler texture input
// We will pass our generated framebuffer texture to it



const postFXMaterial = new THREE.ShaderMaterial({
  uniforms: {
    sampler: { value: null },
    time: { value: 0 },
    mousePos: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0.0 }
  },
  // vertex shader will be in charge of positioning our plane correctly
  vertexShader: `
      varying vec2 v_uv;
	  uniform vec2 mousePos;
  	  uniform float uTime;

      void main () {
        // Set the correct position of each plane vertex
        vec3 pos = position;

        pos.z += cos(pos.x + uTime * 5.0);
        pos.x += cos(pos.x + uTime/5.0);
        pos.y += cos(pos.x + uTime/10.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

        // Pass in the correct UVs to the fragment shader
        v_uv = uv;
      }
    `,
  fragmentShader: `
      // Pass in time
      uniform float uTime;
      
      // Pass in normalised mouse coordinates
      uniform vec2 mousePos;
  
      // Declare our texture input as a "sampler" variable
      uniform sampler2D sampler;
	  varying vec2 v_uv;

      void main () {

        // Sample the correct color from the generated texture
        vec4 inputColor = texture2D(sampler, v_uv + mousePos * 0.005);
        // Set the correct color of each pixel that makes up the plane
        gl_FragColor = vec4(inputColor * 0.9972);
      }
    `,
  transparent: true
})
const postFXMesh = new THREE.Mesh(postFXGeometry, postFXMaterial)
postFXScene.add(postFXMesh)

// Start out animation render loop
renderer.setAnimationLoop(onAnimLoop)
// Attach mousemove event listener
document.addEventListener('mousemove', onMouseMove)

function onMouseMove(e) {
  const x = (e.pageX / innerWidth) * 2 - 1
  const y = (1 - e.pageY / innerHeight) * 2 - 1
  postFXMesh.material.uniforms.mousePos.value.set(x, y)
}
let time = 0
function onAnimLoop() {
  time++

  postFXMesh.material.uniforms.uTime.value = time 
  // Do not clear the contents of the canvas on each render
  // In order to achieve our effect, we must draw the new frame
  // on top of the previous one!
  renderer.autoClearColor = false

  // Explicitly set renderBufferA as the framebuffer to render to
  renderer.setRenderTarget(renderBufferA)

  // On each new frame, render the scene to renderBufferA
  renderer.render(postFXScene, orthoCamera)
  renderer.render(scene, orthoCamera)

  // Set the device screen as the framebuffer to render to
  // In WebGL, framebuffer "null" corresponds to the default framebuffer!
  renderer.setRenderTarget(null)

  // Assign the generated texture to the sampler variable used
  // in the postFXMesh that covers the device screen
  postFXMesh.material.uniforms.sampler.value = renderBufferA.texture

  // Render the postFX mesh to the default framebuffer
  //renderer.render(postFXScene, orthoCamera)

  // Ping-pong our framebuffers by swapping them
  // at the end of each frame render
  const temp = renderBufferA
  renderBufferA = renderBufferB
  renderBufferB = temp
}
