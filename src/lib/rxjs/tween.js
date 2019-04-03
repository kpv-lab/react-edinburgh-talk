import { concat, of } from 'rxjs'
import { filter, map, scan, takeWhile } from 'rxjs/operators'
import { linear } from '../ease'

const DEFAULTS = {
  duration: 1000,
  delay: 0,
  ease: linear
}

export function tween(props) {
  const { frame, duration, delay, ease } = { ...DEFAULTS, ...props }
  return concat(
    frame.pipe(
      scan((cumulative, [, delta]) => cumulative + delta, -delay),
      map(t => t / duration),
      takeWhile(t => t <= 1),
      filter(t => t > 0),
      map(p => (ease ? ease(p) : p))
    ),
    of(1)
  )
}
