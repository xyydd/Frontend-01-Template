function numberToString (number, radix = 10) {
  if (typeof radix === 'string') {
    radix = Number(radix)
  }
  const hex = []
  for (let i = 0; i < 26; i++) {
    hex.push(String.fromCharCode(97 + i))
  }
  if (!isNaN(radix) && !isNaN(number)) {
    if (radix >= 2 && radix <= 36) {
      if (radix === 10) {
        return number + ''
      } else {
        let resNum = 0
        let remainder = number
        while (remainder >= radix) {
          resNum++
          remainder = remainder - radix
        }
        let a = resNum >= radix ? numberToString(resNum, radix) : (resNum > 0 ? resNum + '' : '')
        if (radix < 10 || (radix >= 10 && remainder < 10)) {
          return a + remainder
        } else {
          return a + hex[remainder - 10]
        }
      }
    } else {
      return new Error('numberToString() radix argument must be between 2 and 36')
    }
  } else {
    return number + ''
  }
}

console.log(numberToString(1e2, 2))
