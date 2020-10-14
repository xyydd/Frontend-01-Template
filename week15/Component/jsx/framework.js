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
    let processChildren = (children) => {
      for (let child of children) {
        if (typeof child === 'object' && (child instanceof Array)) {
          processChildren(child)
          continue
        }
        if (typeof child === 'string') {
          child = new TextWrapper(child)
        }
        el.appendChild(child)
      }
    }
    processChildren(children)
  }

  return el
}

export const STATE = Symbol('state')
export const ATTRIBUTES = Symbol('attributes')


export class Component {
  constructor(el) {
    this[ATTRIBUTES] = Object.create(null)
    this[STATE] = Object.create(null)
  }
  setAttribute (name, value) {
    this[ATTRIBUTES][name] = value
  }
  render () {
    return this.root
  }
  appendChild (child) {
    child.mountTo(this.root)
  }
  mountTo (parent) {
    if (!this.root) {
      this.render()
    }
    parent.appendChild(this.root)
  }

  triggerEvent (type, args) {
    this[ATTRIBUTES][`on${type.replace(/^[\s\S]/, s => s.toUpperCase())}`](new CustomEvent(type, { detail: args }))
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

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
}
