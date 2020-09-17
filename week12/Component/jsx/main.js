import { Component, createElement } from "./framework";

class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value
  }

  render () {
    console.log(this.attributes)
    this.root = document.createElement('div')
    if (this.attributes.classList) {
      this.root.classList.add(this.attributes.classList.split(' '))
    }
    for (let source of this.attributes.src) {
      let img = document.createElement('div')
      img.style.backgroundImage = `url(${source})`
      img.classList.add('carousel-item')
      this.root.appendChild(img)
    }
    this.position = 0
    this.isAuto = true
    this.root.addEventListener('mousedown', this.mouseDown.bind(this))

    this.autoPlay()

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

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
let arr = [
  'https://user-gold-cdn.xitu.io/2020/7/22/173747ad4c70725c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  'https://user-gold-cdn.xitu.io/2020/7/17/1735a9e289ba275c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  'https://user-gold-cdn.xitu.io/2020/7/1/17308d080d86fa71?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
]
const a = <Carousel src={arr} classList="carousel"></Carousel>



a.mountTo(document.body)
