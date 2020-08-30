class Heap { // 最小二叉堆
  constructor(data, compare) {
    this.data = data
    this.compare = compare || ((a, b) => {return a - b})
  }
  take () { // 取最小，就是最小二叉堆中的最顶层
    if (!this.data.length) {
      return
    }
    let min = this.data[0]
    let i = 0
    while (i < this.data.length) {
      if (i * 2 + 1 >= this.data.length) {
        break
      }
      if (i * 2 + 2 >= this.data.length) {
        this.data[i] = this.data[i * 2 + 1]
        i = i * 2 + 1
        break
      }
      if (this.compare(this.data[i * 2 + 1], this.data[i * 2 + 2]) < 0) {
        this.data[i] = this.data[i * 2 + 1]
        i = i * 2 + 1
      } else {
        this.data[i] = this.data[i * 2 + 2]
        i = i * 2 + 2
      }
    }
    if (i < this.data.length - 1) {
      this.insertAt(i, this.data.pop())
    } else {
      this.data.pop()
    }
    return min
  }
  insert (v) {
    debugger
    this.insertAt(this.length, v)
  }
  insertAt (index, val) {
    this.data[index] = val
    while (index > 0 && this.compare(val, this.data[Math.floor((index - 1) / 2)]) < 0) {
      this.data[index] = this.data[Math.floor((index - 1) / 2)]
      this.data[Math.floor((index - 1) / 2)] = val
      index = Math.floor((index - 1) / 2)
    }
  }
  get length () {
    return this.data.length
  }
}

const heap = new Heap([0])
heap.insert(1)
heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)
heap.insert(6)
heap.insert(2)

console.log(heap.data)
