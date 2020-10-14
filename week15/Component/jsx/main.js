import { createElement } from "./framework";
import Button from "./Button";
import List from "./List";
// import Carousel from "./Carousel";
// import { Timeline, Animation } from './animation'
// import './animation-demo'

let arr = [
  {
    img: 'https://user-gold-cdn.xitu.io/2020/7/22/173747ad4c70725c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
    url: 'www.baidu.com',
    content: 'baidu'
  },
  {
    img: 'https://user-gold-cdn.xitu.io/2020/7/17/1735a9e289ba275c?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
    url: 'www.baidu.com',
    content: 'baidu2'
  },
  {
    img: 'https://user-gold-cdn.xitu.io/2020/7/1/17308d080d86fa71?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
    url: 'www.baidu.com',
    content: 'baidu3'
  }
]
// const a = <Carousel src={arr} classList="carousel" onChange={event => console.log(event.detail.position)} onClick={event => console.log(event.detail.data.url)}></Carousel>

let btn = <Button>123</Button>


btn.mountTo(document.body)

let list = <List data={arr}>
  {(record) => (
   <div>
     <img src={record.img} alt=""/>
     <a href={record.url}>{record.content}</a>
   </div>
  )
  }
</List>
list.mountTo(document.body)
// window.tl = new Timeline()

// window.tl.add(new Animation({ set a (v) {console.log(v)} }, 'a', 0, 100, 1000, null))

// window.tl.start()
// window.animation = new Animation({ set a (v) {console.log(v)} }, 'a', 0, 100, 10000, null)
