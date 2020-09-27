import {Animation, Timeline} from "./animation";

window.tl = new Timeline()
console.log(1233)
tl.add(new Animation(
  document.querySelector('#el').style,
  'transform',
  0,
  500,
  5000,
  0,
  null,
    v => `translateX(${v}px)`))

tl.start()

document.querySelector('#pause').addEventListener('click', () => tl.pause())
document.querySelector('#resume').addEventListener('click', () => tl.resume())
