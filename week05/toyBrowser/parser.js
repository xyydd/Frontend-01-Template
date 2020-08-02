const css = require('css')

const EOF = Symbol('EOF') //  End Of File

const layout = require('./layout.js')
// 有限状态机FSM
// 状态机初始状态
/**
 * 标签解析
 * 开始标签
 * 结束标签
 * 自封闭标签
 */
let currentToken = null
let currentAttribute = null
let currentTextNode = null
let stack = [{type: 'document', children: []}]

let rules = []
function addCSSRules (text) {
  let ast = css.parse(text)
  console.log(ast)
  rules.push(...ast.stylesheet.rules)
}

function match (element, selector) {
  // console.log(selector)
  if (!selector || !element.attributes) {
    return false
  }

  if (selector.charAt(0) === '#') {
    let attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) {
      return true
    }
  } else if (selector.charAt(0) === '.') {
    let attr = element.attributes.filter(attr => attr.name === 'class')[0]
    // console.log(attr)
    if (attr && attr.value === selector.replace('.', '')) {
      return true
    }
  } else {
    if (element.tagName === selector) {
      return true
    }
  }

  return false
}

function specificity (selector) {
  let p = [0, 0, 0, 0]
  let selectorParts = selectors.split(' ')
  for (let part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p3 += 1
    }
  }
  return p
}

function compare (sp1,sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }
  return sp1[3] - sp2[3]
}

function computeCSS (element) {
  console.log(rules)
  // console.log('compute CSS for Element', element)
  // 获取父元素，调用slice 为了防止后续解析html会对当前stack污染，而使用slice，会默认复制一遍数组
  const elements = stack.slice().reverse()
  if (element.computedStyle) {
    element.computedStyle = {}
  }


  for (let rule of rules) {
    console.log('rule', rule)
    let selectorParts = rule.selectors[0].split(' ').reverse()
    // console.log(selectorParts)
    if (!match(element, selectorParts[0])) {
      continue
    }


    let matched = false
    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[i])) {
        j++
      }
    }


    if (j >= selectorParts.length) {
      matched = true
    }


    if (matched) {
      // 如果匹配
      let sp = specificity(rule.selectors[0])
      let computedStyle = element.computedStyle

      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {}
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
      console.log(element.computedStyle)
    }

  }

  let inlineStyle = element.attributes.filter(p => p.name === 'style')
  css.parse(`* {${inlineStyle}}`)
  sp = [1, 0, 0, 0]
}

function emit (token) {
  // console.log(token);
  let top = stack[stack.length - 1]
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagname') {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    computeCSS(element)

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null

  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error(`Tag ${token.tagName} start end doesn\'t match`)
    } else {
      if (top.tagName === 'style') {
        // console.log(top.children[0].content)
        addCSSRules(top.children[0].content)
      }
      layout(top)
      stack.pop()
    }

    currentTextNode = null

  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
  // console.log(stack)
}

function data (c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: 'EOF'
    })
    return
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}

function tagOpen (c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c);
  } else {
    return 
  }
}

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === ">") {

  }else if (c === 'EOF') {
    return 
  } else {

  }
}

function tagName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>' || c === '/' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    
  } else{
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<') {

  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '"') {
    return doubleQuoteAttributeValue
  } else if (c === "'") {
    return singleQuoteAttributeValue
  } else if (c === '>') {

  }else {
    return UnquoteAttributeValue(c)
  }
}

function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}

function singleQuoteAttributeValue (c) {
  if ("'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return singleQuoteAttributeValue
  }
}

function afterQuoteAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentAttribute += c
    return doubleQuoteAttributeValue
  }
}

function UnquoteAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingSatrtTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {

  } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {

  } else if (c === EOF) {

  } else {
    currentAttribute.value += c
    return UnquoteAttributeValue
  }
}

function afterAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function selfClosingSatrtTag (c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === 'EOF') {

  } else {

  }
}



module.exports.parseHTML = function parseHTML (html) {
  console.log(html)
  let state = data;
  // console.log(state, data)
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  // console.log(stack)
}
