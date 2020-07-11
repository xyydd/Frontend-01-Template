function UTF8_Encoding (string) {
  const res = []
  for (let i = 0; i < string.length; i++) {
    const num = string[i].charCodeAt()
    const code2 = parseInt(num).toString(2)
    if (code2.length === 7) {
      res.push('0'+code2)
    } else {
      const a = Math.floor(code2.length / 6) // 10开头有几个
      let b = code2.slice(0, code2.length % 6) // 第一串
      const c = Math.round(code2.length / 6) // 开头几个1
      for (let j = 0; j < 8 - c - (code2.length % 6); j++) {
        b = '0' + b
      }
      // b = '0' + b
      for (let j = 0; j < c; j++) {
        b = '1' + b
      }
      let last = ''
      for (let j = 0; j < a; j++) {
        last = last + ' 10' + code2.slice(j * 6 + code2.length % 6, (j + 1) * 6 + code2.length % 6)
      }
      res.push({
        code: code2,
        encode: b + last
      })
    }
  }
  return res
}

console.log(UTF8_Encoding('一二'))
