// export { linear }

const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')
export class Timeline {
  constructor () {
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this.state = 'inited'
  }
  start () {
    if (this.state !== 'inited') {
      throw new Error('state is not right')
    }
    this.state = 'started'
    const startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[TICK] = () => {
      const now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t

        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
        }

        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }

        if (t > 0) {
          animation.receive(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  /*set rate (v) {
    return v
  }// 播放速率
  get rate () {}
*/
  pause () {
    if (this.state !== 'started') {
      throw new Error('state is not right')
    }
    this.state = 'paused'
    this.isPause = true
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }// 暂停
  resume () {
    if (this.state !== 'paused') {
      throw new Error('state is not right')
    }
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }// 恢复

  reset () {
    this.pause()
    this.state = 'inited'
    this[PAUSE_TIME] = 0
    this[PAUSE_START] = 0
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[TICK_HANDLER] = null
  }

  add (animation, startTime = Date.now()) {
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation { // 属性动画
  constructor (object, property, startValue, endValue, duration, delay = 0, timingFunction, template) {
    timingFunction = timingFunction || (v => v)
    template = template || (v => v)
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
    this.template = template
  }

  receive (time) {
    const range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(this.startValue + range * progress)
  }

}
