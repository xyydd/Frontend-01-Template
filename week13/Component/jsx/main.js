import { createElement } from "./framework";
import Carousel from "./Carousel";
import { Timeline, Animation } from './animation'
import './animation-demo'

let arr = [
  'https://user-gold-cdn.xitu.io/2020/7/22/173747ad4c70725c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  'https://user-gold-cdn.xitu.io/2020/7/17/1735a9e289ba275c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
  'https://user-gold-cdn.xitu.io/2020/7/1/17308d080d86fa71?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1'
]
const a = <Carousel src={arr} classList="carousel"></Carousel>



a.mountTo(document.body)

// window.tl = new Timeline()

// window.tl.add(new Animation({ set a (v) {console.log(v)} }, 'a', 0, 100, 1000, null))

// window.tl.start()
// window.animation = new Animation({ set a (v) {console.log(v)} }, 'a', 0, 100, 10000, null)
