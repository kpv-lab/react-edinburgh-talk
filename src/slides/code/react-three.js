export const REACT_THREE = `import React, { Component } from 'react'
import THREE from 'three'

class Platonic extends Component {
    
  render() {
    return <canvas ref={this.setCanvasRef} />
  }
  
  setCanvasRef = (canvas) => {
    const renderer = new THREE.WebGLRenderer()
    canvas.appendChild(renderer.domElement)
    // etc...
  }
}`
