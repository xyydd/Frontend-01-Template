import { createElement, Component, STATE, ATTRIBUTES } from "./framework";
import { enableGesture } from "./gesture.js";

export { STATE, ATTRIBUTES } from "./framework";

export default class Button extends Component {
  constructor() {
    super()
  }

  render () {
    this.children = this[ATTRIBUTES].data.map(this.template)
    this.root = (<div>{this.children}</div>).render()
    return this.root
    // console.log(this.root)
    // return this.root
  }

  appendChild(child) {
    this.template = (child)
    this.render()
  }
}