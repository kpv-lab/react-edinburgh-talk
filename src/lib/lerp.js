import { linear } from './ease'

export function lerp(start, end, ease) {
  const delta = end - start
  return p => start + delta * ease(p)
}

export function lerpVector3(start, end, easeX = linear, easeY = linear, easeZ = linear) {
  const output = start.clone()
  const x = lerp(start.x, end.x, easeX)
  const y = lerp(start.y, end.y, easeY)
  const z = lerp(start.z, end.z, easeZ)
  return p => output.set(x(p), y(p), z(p))
}
