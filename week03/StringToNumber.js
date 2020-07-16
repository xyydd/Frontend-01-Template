function stringToNumber (str) {
  let strCopy = str.trim().toLowerCase()
  const number = [0,1,2,3,4,5,6,7,8,9]
  const number16 = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  }
  let pattern10 = /^[0-9]*$/
  // 2进制
  if (strCopy.startsWith('0b')) {
    let binary = strCopy.replace('0b', '')
    const pattern = /^[0-1]*$/
    if (pattern.test(binary)) {
      binary = removeStartsZero(binary)
      len = binary.length
      let res = 0
      for (let i = 0; i < len; i++) {
        if (binary[i] !== '0') {
          res += 2**(len - i - 1)
        }
      }
      return res
    } else {
      return NaN
    }
  }
  // 8进制
  else if (strCopy.startsWith('0o')) {
    let octal = strCopy.replace('0o', '')
    const pattern = /^[0-7]*$/
    if (pattern.test(octal)) {
      octal = removeStartsZero(octal)
      len = octal.length
      let res = 0
      for (let i = 0; i < len; i++) {
        if (octal[i] === '1') {
          res += 8**(len - i - 1)
        } else {
          res += number[octal[i]]
        }
      }
      return res
    } else {
      return NaN
    }
  }
  // 16进制
  else if (strCopy.startsWith('0x')) {
    let hex = strCopy.replace('0x', '')
    const pattern = /^[0-9a-f]*$/
    if (pattern.test(hex)) {
      hex = removeStartsZero(hex)
      len = hex.length
      let res = 0
      for (let i = 0; i < len; i++) {
        if (hex[i] === '1') {
          res += 16**(len - i - 1)
        } else {
          if (number[hex[i]] === 0 || number[hex[i]]) {
             res += number[hex[i]]
          } else {
            res += number16[hex[i]]
          }
        }
      }
      return res
    } else {
      return NaN
    }
  } else {
    // 10进制
    pattern10 = /^[0-9.e]*$/
    if (pattern10.test(strCopy)) {
      strCopy = removeStartsZero(strCopy)
      const strCopyArr = strCopy.split('e')
      let strCopy2 = strCopyArr[0].split('.')
      len = strCopy2[0].length
      let res = 0
      for (let i = len - 1; i >= 0; i--) {
        res += strCopy2[0][i] * (10 ** (len - 1 - i))
        // if (strCopy2[0][i] === '1') {
        //   res += 10**(len - i - 1)
        // } else {
        //   res += number[strCopy2[0][i]]
        // }
      }
      if (strCopy2[1]) {
        len = strCopy2[1].length
        for (let i = 0; i < len; i++) {
          res += number[strCopy2[1][i]] * (0.1 ** (i + 1))
        }
      }
      let strCopy3 = 1
      if (strCopyArr[1]) {
        strCopy3 = 10 ** strCopyArr[1]
      }
      res *= strCopy3
      return res
    } else {
      return NaN
    }
  }
}

function removeStartsZero (str) {
  let len = str.length
  let sliceIndex = 0
  for (let i = 0; i < len; i++) {
    if (i === 0 && str[i] === '0') {
      sliceIndex++
    } else {
      if (str[i] === '0' && str[i - 1] === '0' && sliceIndex !== 0) {
        sliceIndex++
      }
    }
  }
  return str.slice(sliceIndex)
}

console.log(stringToNumber(' 1.03e2 '))
