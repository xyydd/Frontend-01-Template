var assert = require('assert')
import { parseHTML } from '../src/parser'

describe('test parseHTML', () => {
  it('<a></a>', () => {
    const tree = parseHTML('<a></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href="www.baidu.com"></a>', () => {
    const tree = parseHTML('<a href="www.baidu.com"></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href=www.baidu.com></a>', () => {
    const tree = parseHTML('<a href=www.baidu.com></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href></a>', () => {
    const tree = parseHTML('<a href ></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a id="test" href></a>', () => {
    const tree = parseHTML('<a id="test" href ></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a href id="test"></a>', () => {
    const tree = parseHTML('<a href id="test"></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<a id=></a>', () => {
    const tree = parseHTML('<a id=></a>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it("<a id='test'></a>", () => {
    const tree = parseHTML("<a id='test'></a>")
    console.log(tree)
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<br/> test', () => {
    const tree = parseHTML('<br/>')
    assert.equal(tree.children[0].tagName, 'br')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<br alt="换行"/>', () => {
    const tree = parseHTML('<br alt="换行"/>')
    assert.equal(tree.children[0].tagName, 'br')
    assert.equal(tree.children[0].children.length, 0)
  })
  it('<style>a{color:#000}</style>', () => {
    const tree = parseHTML('<style>a{color:#000}</style>')
    assert.equal(tree.children[0].tagName, 'style')
    assert.equal(tree.children[0].children.length, 1)
  })
  it('<a id="test">123</a><style>a{color:#000}</style>', () => {
    const tree = parseHTML('<a id="test">123</a><style>#test{color:#000}</style>')
    assert.equal(tree.children[0].tagName, 'a')
    assert.equal(tree.children.length, 2)
  })
  it('<$', () => {
    const tree = parseHTML('<$')
    assert.equal(tree.children.length, 0)
  })
  it('<style>#test .cla{color:#000}</style><a id="test"><span class="cla">123</span></a>', () => {
    const tree = parseHTML('<style>#test .cla{color:#000}</style><a id="test"><span class="cla">123</span></a>')
    assert.equal(tree.children[0].tagName, 'style')
    assert.equal(tree.children.length, 2)
  })
  it(`<style>.cla{color:#000}span{color:#fff}</style><a class="test" id="test"><span class="cla">123</span></a>`, () => {
    const tree = parseHTML('<style>.cla{color:#000}span{color:#fff}</style><a class="test" id="test"><span class="cla">123</span></a>')
    assert.equal(tree.children[0].tagName, 'style')
    assert.equal(tree.children.length, 2)
  })
})