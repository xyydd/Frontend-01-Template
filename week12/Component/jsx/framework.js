export function createElement (el, attr, ...children) {

  if (typeof el === 'string') {
    el = new ElementWrapper(el)
  } else {
    el = new el
  }
  if (Array.isArray(attr) || typeof attr === 'string') {
    children = attr
    attr = null
  }
  if (attr) {
    attr = {...attr}
    for (let key in attr) {
      el.setAttribute(key, attr[key])
    }
  }
  if (children.length > 0) {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      el.appendChild(child)
    }
  }

  return el
}
export class Component {
  constructor(el) {
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild (child) {
    child.mountTo(this.root)
  }
  mountTo (parent) {
    parent.appendChild(this.root)
  }
}
class TextWrapper extends Component{
  constructor(el) {
    super()
    this.root = document.createTextNode(el)
  }
}

class ElementWrapper extends Component{
  constructor(el) {
    super()
    this.root = document.createElement(el)
  }

}
