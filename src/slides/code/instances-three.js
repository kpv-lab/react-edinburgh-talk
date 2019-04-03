export const INSTANCES_THREE = `// A special geometry that sets WebGL expectations
const geometry = new InstancedBufferGeometry()

const box = new BoxBufferGeometry()
Object.assign(geometry.attributes, box.attributes)

const iPosData = new Float32Array(POSITION_DATA)
const iPos = new InstancedBufferAttribute(iPosData, 3)
geometry.addAttribute('iPos', iPos)

const iColData = new Float32Array(COLOR_DATA)
const iCol = new InstancedBufferAttribute(iCol, 3)
geometry.addAttribute('iCol', iCol)

const material = new MeshStandardMaterial()
material.onBeforeCompile = shader => {
  // rewrite the WebGL source code!
}`
