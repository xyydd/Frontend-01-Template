import { createElement, Component, STATE, ATTRIBUTES } from "./framework";
import { enableGesture } from "./gesture.js";

export { STATE, ATTRIBUTES } from "./framework";

export default class Button extends Component {
  constructor() {
    super()
  }

  render () {
    this.childContent = <span></span>
    this.root = (<button>{this.childContent}</button>).render()
    return this.root
    // console.log(this.root)
    // return this.root
  }

  appendChild(child) {
    if (!this.childContent) {
      this.render()
    }
    this.childContent.appendChild(child)
  }
}