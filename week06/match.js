const EOS = Symbol('EOS')

let select = ''
let dom
let res = true
function read (s) {
  if (s === '.') {
    return matchClass(s)
  } else if (s === '#') {
    return matchId(s)
  } else if (s === ' ') {
    return goParent
  } else if (s === '>') {
    return goFather
  } else if (s === '+') {
    return goBrother
  // } else if (s === '~') {
  } else if (s === EOS) {
    return EOS
  } else if (s.match(/^[a-zA-Z0-9]$/)) {
    select = s + select
    return read
  } else {
    return EOS
  }
}

function matchTag (s) {
  if (!Array.isArray(dom)) {
    if (dom.tagName.toLowerCase() === select) {
      res = res && true
    } else {
      res = res && false
    }
  } else {
    res = false
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].tagName.toLowerCase() === select) {
        res = res || true
      }
    }
  }
  return read
}

function matchClass (s) {
  if (!Array.isArray(dom)) {
    // console.log(select)
    if (dom.className.toLowerCase() === select) {
      res = res && true
      select = ''
    } else {
      res = res && false
    }
  } else {
    res = false
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].className.toLowerCase() === select) {
        res = res || true
        select = ''
      }
    }
  }
  return read
}

function matchId (s) {
  if (!Array.isArray(dom)) {
    if (dom.id.toLowerCase() === select) {
      res = res && true
      select = ''
    } else {
      res = res && false
    }
  } else {
    res = false
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].id.toLowerCase() === select) {
        res = res || true
        select = ''
      }
    }
  }
  return read
}
function goParent (s) {
  dom = dom.parentNode || (void 0)
  if (select !== '' && dom) {
    if (dom.tagName.toLowerCase() === select) {
      res = res && true
      select = ''
      return read(s)
    } else {
      goParent(s)
    }
  } else {
    return read(s)
  }
}
function goFather (s) {
  dom = dom.parentNode
  if (select !== '' && dom) {
    if (dom.tagName.toLowerCase() === select) {
      res = res && true
      select = ''
      return read(s)
    }
  }
  return read(s)
}
function goBrother (s) {
  dom = dom.parentNode.childNodes || (void 0)
  if (select !== '' && dom) {
    res = false
    for (let i = 0; i < dom.length; i++) {
      if (dom[i].tagName.toLowerCase() === select) {
        res = res || true
        select = ''
        return read(s)
      }
    }
  }
  return read(s)
}
function match(selector, element) {
  selector = selector.toLowerCase().split('').reverse()
  dom = element
  let state = read
  for (let s of selector) {
    // console.log(s)
    state = state(s)
    // console.log(res)
  }
  // console.log(select, dom.tagName)
  if (select !== '' && dom) {
    if (!Array.isArray(dom)) {
      if (dom.tagName.toLowerCase() === select) {
        res = res && true
      } else {
        res = res && false
      }
    } else {
      res = false
      for (let i = 0; i < dom.length; i++) {
        if (dom[i].tagName.toLowerCase() === select) {
          res = res || true
        }
      }
    }
  }
  return res
}


match("div #id.class", document.getElementById("id"));