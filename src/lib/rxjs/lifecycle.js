import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

export class Lifecycle {
  isAlive = true

  constructor() {
    this.finalize = new Subject()
    this.whileAlive = takeUntil(this.finalize)
  }

  unmount = () => {
    this.isAlive = false
    this.finalize.next()
    this.finalize.complete()
  }
}
