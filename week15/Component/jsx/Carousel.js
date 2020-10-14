import { Component, STATE, ATTRIBUTES } from "./framework";
import { enableGesture } from "./gesture.js";
import { Timeline, Animation } from "./animation.js";
import { ease } from './ease.js'

export { STATE, ATTRIBUTES } from "./framework";

export default class Carousel extends Component {
  constructor() {
    super()
  }

  render () {
    this.root = document.createElement('div')
    if (this[ATTRIBUTES].classList) {
      this.root.classList.add(this[ATTRIBUTES].classList.split(' '))
    }
    for (let source of this[ATTRIBUTES].src) {
      let img = document.createElement('div')
      img.style.backgroundImage = `url(${source.img})`
      img.classList.add('carousel-item')
      this.root.appendChild(img)
    }

    enableGesture(this.root)

    let timeline = new Timeline()

    timeline.start()

    let children = this.root.children
    this.isAuto = true
    this[STATE]['position'] = 0

    let t = 0
    let ax = 0

    this.root.addEventListener('start', e => {
      timeline.pause()
      clearInterval(this.autoSetInt)
      if ((Date.now() - t) / 500 < 1500) {
        let progress = (Date.now() - t) / 500
        ax = ease(progress) * 400 - 400
      } else {
        ax = 0
      }
    })

    this.root.addEventListener('tap', e => {
      this.triggerEvent('click', {
        position: this[STATE]['position'],
        data: this[ATTRIBUTES].src[this[STATE]['position']]
      })
    })

    this.root.addEventListener('pan', e => {
      let x = e.clientX - e.startX - ax

      let current = this[STATE]['position'] - ((x - x % 400) / 400)

      for (let offset of [-2, -1, 0, 1, 2]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translate(${- pos * 400 + offset * 400 + x % 400}px)`
      }
    })

    this.root.addEventListener('end', e => {

      console.log(e)

      timeline.reset()
      timeline.start()
      this.autoSetInt = setInterval(nextP, 3000)

      let x = e.clientX - e.startX - ax

      let current = this[STATE]['position'] - ((x - x % 400) / 400)

      let direction = Math.round((x % 400) / 400)

      if (e.isFlick) {
        console.log(e.velocity)
        if (e.velocity < 0) {
          direction = Math.ceil((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length
        children[pos].style.transition = 'none'
        timeline.add(new Animation(children[pos].style, 'transform',
          - pos * 400 + offset * 400 + x % 400,
          - pos * 400 + offset * 400 + direction * 400,
          300, 0, ease, v => `translateX(${v}px)`))
      }

      this[STATE]['position'] = this[STATE]['position'] - ((x - x % 400) / 400) - direction
      this[STATE]['position'] = (this[STATE]['position'] % children.length + children.length) % children.length
      this.triggerEvent('change', {
        position: this[STATE]['position']
      })
    })

    let nextP = () => {
      let children = this.root.children
      let nextIndex = (this[STATE]['position'] + 1) % children.length

      let current = children[this[STATE]['position']]
      let next = children[nextIndex]

      t = Date.now()

      timeline.add(new Animation(current.style, 'transform',
        -this[STATE]['position'] * 400,
        -400 - this[STATE]['position'] * 400,
        500, 0, ease, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, 'transform',
        400 - nextIndex * 400,
        - nextIndex * 400,
        500, 0, ease, v => `translateX(${v}px)`))
      this[STATE]['position'] = nextIndex
      this.triggerEvent('change', {
        position: this[STATE]['position']
      })
    }

    this.autoSetInt = setInterval(nextP, 3000)

    return this.root
  }

  autoPlay () {
    this.isAuto = true
    console.log('auto', this.position)
    this.position =  this.position % this.root.children.length
    this.autoSetInt = setInterval(() => {
      if (this.isAuto) {
        let children = this.root.children
        let nextIndex = (this.position + 1) % children.length

        let current = children[this.position]
        let next = children[nextIndex]

        next.style.transition = 'none'
        next.style.transform = `translateX(${100 - nextIndex * 100}%)`

        this.autoSetTime = setTimeout(() => {
          next.style.transition = ''
          current.style.transform = `translateX(${-100 - this.position * 100}%)`
          next.style.transform = `translateX(${-nextIndex * 100}%)`
          this.position = nextIndex
        }, 16)
      }
    }, 3000)
  }

  mouseDown (event) {
    this.isAuto = false
    clearInterval(this.autoSetInt)
    clearTimeout(this.autoSetTime)
    let children = this.root.children
    let startX = event.clientX
    const mouseMove = (e) => {
      let x = e.clientX - startX

      let current = this.position - ((x - x % 400) / 400)

      for (let offset of [-2, -1, 0, 1, 2]) {
        let pos = current + offset
        pos = (pos + children.length) % children.length
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translate(${- pos * 400 + offset * 400 + x % 400}px)`
      }
    }
    const mouseUp = (e) => {
      console.log('up')
      let x = e.clientX - startX
      this.position = this.position - Math.round(x / 400)

      for (let offset of [0, -Math.sign(Math.round(x / 400) - x + 200 * Math.sign(x))]) {
        let pos = this.position + offset
        pos = (pos + children.length) % children.length
        children[pos].style.transition = ''
        children[pos].style.transform = `translate(${- pos * 400 + offset * 400}px)`
      }

      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
      // console.log(this.position)
      this.autoPlay()
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

}
