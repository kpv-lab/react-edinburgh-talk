import React from 'react'
import {
  AmbientLight,
  Color,
  DodecahedronGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PlaneGeometry,
  PointLight
} from 'three'
import { Lifecycle } from '../../lib/rxjs/lifecycle'
import { ThreeWrapper } from '../../lib/three-wrapper'

export function HelloThree() {
  return <ThreeWrapper state={new HelloThreeSetup()} />
}

class HelloThreeSetup {
  lifecycle = new Lifecycle()

  enter({ renderer, scene, camera, frame }) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap

    camera.position.set(0, 0, 6)

    const plane = new Mesh(new PlaneGeometry(30, 30), new MeshPhysicalMaterial(0xffffff))
    plane.position.set(0, 0, -5)
    plane.receiveShadow = true
    scene.add(plane)

    const ambient = new AmbientLight('#ffffff', 1.0)
    scene.add(ambient)

    const light = new PointLight('#ffeeee', 0.5)
    light.position.set(-3, 4, 10)
    light.intensity = 0.3
    light.shadow.mapSize.set(2048, 2048)
    light.shadow.radius = 1
    light.castShadow = true
    scene.add(light)

    const solids = makePlatonicSolids({ frame })
    solids.forEach(s => scene.add(s))
  }
}

function makePlatonicSolids({ frame }) {
  return [
    // makePlatonicSolid({
    //   geometry: new TetrahedronGeometry(),
    //   material: makeMaterial('#ff0000'),
    //   position: [-2.5, +1.5, 0],
    //   frame
    // }),
    // makePlatonicSolid({
    //   geometry: new OctahedronGeometry(),
    //   material: makeMaterial('#f8f8ff'),
    //   position: [+2.5, +1.5, 0],
    //   frame
    // }),
    // makePlatonicSolid({
    //   geometry: new BoxGeometry(3, 3, 3),
    //   position: [0, 0.5, 0],
    //   rotation: [0.5, 0, 0],
    //   material: makeMaterial('#03A9FC'),
    //   frame
    // })
    // makePlatonicSolid({
    //   geometry: new IcosahedronGeometry(),
    //   position: [+2.5, -1.5, 0],
    //   material: makeMaterial('#1e90ff'),
    //   frame
    // }),
    makePlatonicSolid({
      geometry: new DodecahedronGeometry(2.2),
      position: [0, 0.2, 0],
      rotation: [0.5, 0, 0],
      material: makeMaterial('#03A9FC'),
      frame
    })
  ]
}

function makePlatonicSolid({ frame, geometry, position, rotation, material }) {
  const mesh = new Mesh(geometry, material)
  mesh.castShadow = true
  mesh.position.set(...position)
  mesh.rotation.set(...(rotation || [0, 0, 0]))
  frame.subscribe(([, dt]) => mesh.rotateY(dt / 1000))
  return mesh
}

function makeMaterial(color) {
  return new MeshPhysicalMaterial({
    color: new Color(color)
  })
}
