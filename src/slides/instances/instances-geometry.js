import { combineLatest } from 'rxjs'
import { skip, take } from 'rxjs/operators'
import {
  BoxGeometry,
  BufferGeometry,
  InstancedBufferAttribute,
  InstancedBufferGeometry
} from 'three'

export class InstancesGeometry extends InstancedBufferGeometry {
  constructor(props) {
    super()
    this.count = props.count
    this.setupFormAttributes()
    this.setupInstanceAttributes(props)
  }

  setupFormAttributes() {
    const box = new BoxGeometry(1.0, 1.0, 1.0)
    const attributes = new BufferGeometry().fromGeometry(box).attributes
    for (let key in attributes) {
      this.attributes[key] = attributes[key]
    }
  }

  setupInstanceAttributes({ positionsObs, scalesObs, colorsObs }) {
    const positions = []
    const scales = []
    const colors = []

    combineLatest(positionsObs, scalesObs, colorsObs)
      .pipe(take(1))
      .subscribe(([getPosition, getScale, getColor]) => {
        for (let i = 0; i < this.count; i++) {
          positions.push(...getPosition(i))
          scales.push(...getScale(i))
          colors.push(...getColor(i))
        }

        this.addAttribute('iPosition', new InstancedBufferAttribute(new Float32Array(positions), 3))
        this.addAttribute('iScale', new InstancedBufferAttribute(new Float32Array(scales), 3))
        this.addAttribute('iColor', new InstancedBufferAttribute(new Float32Array(colors), 3))
      })

    positionsObs.pipe(skip(1)).subscribe(getPosition => {
      const attr = this.getAttribute('iPosition')
      updateAttribute(attr, getPosition, 3, this.count)
    })

    scalesObs.pipe(skip(1)).subscribe(getScale => {
      const attr = this.getAttribute('iScale')
      updateAttribute(attr, getScale, 3, this.count)
    })

    colorsObs.pipe(skip(1)).subscribe(getColor => {
      const attr = this.getAttribute('iColor')
      updateAttribute(attr, getColor, 3, this.count)
    })
  }
}

function updateAttribute(attribute, fn, step, count) {
  const data = attribute.array
  for (let i = 0; i < count; i++) {
    const value = fn(i)
    for (let j = 0; j < step; j++) {
      data[step * i + j] = value[j]
    }
  }
  attribute.needsUpdate = true
}
