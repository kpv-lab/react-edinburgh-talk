import { Node, Shaders } from 'gl-react'
import { Surface } from 'gl-react-dom'
import React, { PureComponent } from 'react'
import { S, Text } from 'spectacle'
import { Color } from 'three'
import { eachFrame } from '../../lib/rxjs/each-frame.js'
import { Lifecycle } from '../../lib/rxjs/lifecycle.js'
import { SHADER } from './isosurface-pbr.js'
import './kpv.css'
import { Logo } from './logo.js'

const UNIFORMS = {
  ambientColor: new Color('#f6f8ff').toArray(),
  ambientIntensity: 2,
  color1: new Color('#d0d0d0').toArray(),
  color2: new Color('#ffffff').toArray(),
  contourColor: new Color('#000000').toArray(),
  contourIntensity: 1,
  contourOffset: -0.04,
  contourThickness: 0.51,
  contourVariation: 0.5,
  contours: 51,
  elevation: 1,
  exposure: 0.66,
  fogColor: new Color('#000000').toArray(),
  fogIntensity: 0,
  fogHeight: 0.5,
  layerOffset: [-0.05, 0.1],
  maxLevel: 0.8,
  metalness1: 0.02,
  metalness2: 0,
  metalness3: 0,
  minLevel: 0.15,
  roughness1: 0.58,
  roughness2: 0.22,
  roughness3: 1,
  saturation: 1,
  scale: 2.5,
  scaleOffset: -1.2991124975769708e-7,
  striped: false,
  terrainShift: 0.0,
  stripedMaterial: false,
  sunColor: new Color('#fff6e7').toArray(),
  sunElevation: 35,
  sunIntensity: 2.56,
  sunRotation: -55,
  pixelRatio: window.devicePixelRatio || 1,
  position: [0, 0],
  offset: [0, 0]
}

export function Kpv() {
  return (
    <div>
      <Background uniforms={UNIFORMS} />
      <div className="overlay">
        <Logo width="80%" className="logo" />
        <Text textColor="secondary" size={1} lineHeight={3} bold>
          <S type="underline">www.kpv-lab.co.uk</S>
        </Text>
      </div>
    </div>
  )
}

class Background extends PureComponent {
  lifecycle = new Lifecycle()

  webglContextAttributes = {
    preserveDrawingBuffer: true
  }

  constructor(props) {
    super(props)

    this.state = {
      uniforms: {
        ...props.uniforms,
        threshold: 1,
        time: 0
      }
    }

    this.shaders = Shaders.create({
      surface: {
        frag: SHADER
      }
    })
  }

  componentDidMount() {
    eachFrame(this.lifecycle.whileAlive).subscribe(([time]) => {
      if (this.lifecycle.isAlive) {
        this.setState({
          time: time / 1000,
          threshold: ((Math.cos(time / 20000) + 1) / 2) * 0.4 + 0.6
        })
      }
    })
  }

  componentWillUnmount() {
    this.lifecycle.unmount()
  }

  contextErrorHandler = err => {
    console.log('context error', err)
  }

  render() {
    const { uniforms, time, threshold } = this.state
    const width = window.innerWidth
    const height = window.innerHeight
    if (!width || !height || !this.shaders) {
      return null
    }

    const style = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    }

    const pixelRatio = window.devicePixelRatio || 1
    uniforms.iResolution = [width * pixelRatio, height * pixelRatio]
    uniforms.time = time
    uniforms.threshold = threshold

    return (
      <div className="website">
        <Surface
          width={width}
          height={height}
          pixelRatio={pixelRatio}
          webglContextAttributes={this.webglContextAttributes}
          onContextFailure={this.contextErrorHandler}
          style={style}
          className="backdrop"
        >
          <Node shader={this.shaders.surface} uniforms={uniforms} ignoreUnusedUniforms={true} />
        </Surface>
      </div>
    )
  }
}
