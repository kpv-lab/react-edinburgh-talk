export const REACT_THREE_FIBER = `import { Canvas, useThree } from 'react-three-fiber'

function Platonic(props) {
  const { light, geo, material } = props
  
  useThree(({gl, scene, camera}) => {
    // hook to access boilerplate entities
  })
  
  return (
    <Canvas>
      <pointLight {...light}/>
      <mesh>
        <boxGeometry {...geometry} />
        <meshPhysicalMaterial {...material} />
      </mesh>
    </Canvas>
  )
}`
