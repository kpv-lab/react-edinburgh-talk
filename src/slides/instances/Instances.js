import React from 'react'
import { of } from 'rxjs'
import { map, scan } from 'rxjs/operators'
import { AmbientLight, Color, Mesh, PointLight, Vector3 } from 'three'
import { quadInOut, quadOut } from '../../lib/ease'
import { lerpVector3 } from '../../lib/lerp'
import { Lifecycle } from '../../lib/rxjs/lifecycle'
import { ThreeWrapper } from '../../lib/three-wrapper'
import { InstancesGeometry } from './instances-geometry'
import { InstancesDepthMaterial, InstancesMaterial } from './instances-material'

const GRID = 400
const COLORS = ['#006FBF', '#004A7F', '#0094FF', '#002540', '#0085E5']
const CAMERA_START = new Vector3(-300, 0, -300)
const LOOK_AT = new Vector3(-60, 0, -40)
const CAMERA_LERP = lerpVector3(
  CAMERA_START,
  new Vector3(-150, 150, -150),
  quadOut,
  quadInOut,
  quadOut
)
const LIGHT_LERP = lerpVector3(new Vector3(-100, 0, -100), new Vector3(0, 200, 0))
let FIRST = true

export function Instances() {
  return <ThreeWrapper state={new InstancesSetup()} />
}

class InstancesSetup {
  lifecycle = new Lifecycle()

  enter({ scene, camera, frame }) {
    this.frame = frame.pipe(this.lifecycle.whileAlive)

    this.camera = camera
    this.camera.position.copy(CAMERA_START)
    this.camera.lookAt(LOOK_AT)

    this.mesh = makeInstancesMesh(this.frame.pipe(map(([time]) => time / 10000)))
    this.ambient = new AmbientLight('#ffffff', 1.0)
    this.light = new PointLight('#ffeeee', 0.5)

    scene.add(this.mesh)
    scene.add(this.ambient)
    scene.add(this.light)

    this.animate()
  }

  exit({ scene }) {
    if (this.mesh) {
      scene.remove(this.mesh)
      scene.remove(this.ambient)
      scene.remove(this.light)

      this.mesh = undefined
      this.ambient = undefined
      this.light = undefined
    }
  }

  animate() {
    if (!FIRST) {
      return
    }
    FIRST = true

    this.frame
      .pipe(
        this.lifecycle.whileAlive,
        scan((time, [, dt]) => time + dt, 0),
        map(t => quadOut(Math.max(0, Math.min(t / 10000 - 0.5, 1))))
      )
      .subscribe(p => {
        this.camera.position.copy(CAMERA_LERP(p))
        this.camera.lookAt(LOOK_AT)
        this.light.position.copy(LIGHT_LERP(p))
      })
  }
}

function makeInstancesMesh(timeObs) {
  const geometry = makeGeometry(GRID * GRID)
  const size = GRID
  const material = new InstancesMaterial({ size, timeObs })
  const mesh = new Mesh(geometry, material)
  mesh.customDepthMaterial = new InstancesDepthMaterial({ size, timeObs })
  mesh.receiveShadow = true
  mesh.castShadow = true
  return mesh
}

function makeGeometry(count) {
  return new InstancesGeometry({
    count,
    positionsObs: makePositionObs(),
    scalesObs: makeScalesObs(),
    colorsObs: makeColorObs(COLORS)
  })
}

function makePositionObs() {
  return of(i => {
    const x = Math.floor(i % GRID) + 0.5 - GRID / 2
    const z = Math.floor(i / GRID) + 0.5 - GRID / 2
    return [x, 0.0, z]
  })
}

function makeScalesObs(ticker) {
  return of(i => [0.6, 10, 0.6])
}

function makeColorObs(colors) {
  const list = colors.map(color => new Color(color).toArray())
  return of(() => list[Math.floor(Math.random() * list.length)])
}
