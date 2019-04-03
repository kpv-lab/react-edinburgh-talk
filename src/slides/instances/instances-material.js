import { MeshStandardMaterial, MeshDepthMaterial } from 'three'
import { addSimplexNoiseToMaterial } from './simplex-noise'

export class InstancesMaterial extends MeshStandardMaterial {
  constructor(props) {
    super(props)

    addSimplexNoiseToMaterial(this)

    const { size, timeObs } = props
    this.userData.size.value.set(size, size)
    timeObs.subscribe(t => (this.userData.time.value = t))
  }

  onBeforeCompile(shader) {
    shader.vertexShader = shader.vertexShader
      .replace('void main() {', PATCH_MAIN)
      .replace('#include <color_pars_vertex>', DEFINE_COLOR_VARYING)
      .replace('#include <project_vertex>', APPLY_POSITION)

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <color_pars_fragment>', DEFINE_COLOR_VARYING)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', APPLY_COLOR)
  }
}

export class InstancesDepthMaterial extends MeshDepthMaterial {
  constructor(props) {
    super(props)

    addSimplexNoiseToMaterial(this)
  }

  onBeforeCompile(shader) {
    shader.vertexShader = shader.vertexShader
      .replace('void main() {', PATCH_MAIN)
      .replace('#include <project_vertex>', APPLY_DEPTH)
  }
}

const PATCH_MAIN = `
  attribute vec3 iPosition;
  attribute vec3 iScale;
  attribute vec3 iColor;

  float lessThan(float x, float y) {
    return max(sign(y - x), 0.0);
  }

  float greaterThan(float x, float y) {
    return max(sign(x - y), 0.0);
  }

  float getScale() {
    return iScale.y * (
      1.0 +
      (4.0 * simplex3D(iPosition.xz / 200.0)) + 
      (2.0 * simplex3D(iPosition.xz / 100.0)) + 
      (1.0 * simplex3D(iPosition.xz / 50.0)) + 
      (0.5 * simplex3D(iPosition.xz / 10.0))
    );
  }

  vec3 applyInstanceValues(vec3 position, float scale) {
    float y = greaterThan(scale, 0.0) * greaterThan(position.y, 0.0) * position.y;
    
    return vec3(
      iScale.x * position.x + iPosition.x,
      y * scale + iPosition.y,
      iScale.z * position.z + iPosition.z
    );
  }

  void main() {
`

const DEFINE_COLOR_VARYING = `
  varying vec3 vColor;
`

const APPLY_COLOR = 'vec4 diffuseColor = vec4( vColor, opacity );'

const APPLY_POSITION = `
  float scale = getScale();
  vec4 mvPosition = modelViewMatrix * vec4(applyInstanceValues(transformed, scale), 1.0);
  vColor.rgb = greaterThan(scale, 0.0) * iColor.rbg + lessThan(scale, 0.0) * iColor.rgb;
  gl_Position = projectionMatrix * mvPosition;
`

const APPLY_DEPTH = `
  vec4 mvPosition = modelViewMatrix * vec4(applyInstanceValues(transformed, getScale()), 1.0);
  gl_Position = projectionMatrix * mvPosition;
`
