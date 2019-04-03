export const VANILLA_THREE = `import THREE from 'three'

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(width, height)
canvas.appendChild(renderer.domElement)

cosnt fov = 60 // degrees
const aspectRatio = width / height
const camera = new THREE.PerspectiveCamera(fov, aspectRatio)
camera.position.set(0, 0, 10)

const light = new THREE.PointLight(...)
light.position.set(0, 10, 10)
light.castShadow = true

const geometry = new BoxGeometry()
const material = new MeshPhysicalMaterial(...)
const mesh = new Mesh(geometry, material)

const scene = new Scene()
scene.add(light)
scene.add(mesh)

renderer.render(scene, camera)`
