import { Subject } from 'rxjs'
import { scan, share } from 'rxjs/operators'

export function eachFrame() {
  const subject = new Subject()
  function tick() {
    subject.next(performance.now())
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  return subject.pipe(
    scan(([prev], time) => [time, time - prev], [performance.now(), 0]),
    share()
  )
}
