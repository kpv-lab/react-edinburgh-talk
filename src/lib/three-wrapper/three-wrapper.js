import React, { Component } from 'react'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { Lifecycle } from '../rxjs/lifecycle'
import { eachFrame } from '../rxjs/each-frame'
import './three-wrapper.css'

export class ThreeWrapper extends Component {
  lifecycle = new Lifecycle()
  state = {}

  render() {
    return <div className="three-wrapper" ref={this.setCanvas} />
  }

  componentWillUnmount() {
    this.lifecycle.unmount()
  }

  setCanvas = canvas => {
    if (!canvas) {
      return
    }

    const { state } = this.props

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new Scene()
    const camera = new PerspectiveCamera(60, width / height, 0.1, 1000)
    const renderer = new WebGLRenderer()
    renderer.setClearColor(0x000000)
    renderer.shadowMap.enabled = true
    renderer.setPixelRatio(window.devicePixelRatio || 1)

    renderer.setSize(width, height)
    canvas.appendChild(renderer.domElement)

    const frame = eachFrame().pipe(this.lifecycle.whileAlive)
    state.enter({ scene, camera, renderer, canvas, frame })
    frame.subscribe(() => renderer.render(scene, camera))
  }
}
