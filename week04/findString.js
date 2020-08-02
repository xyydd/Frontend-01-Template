const findString = function (str, pattern) {
  let state = generateState(pattern)
  let i = 0 // str 指针
  let j = 0 // pattern指针
  while (i < str.length && j < pattern.length) {
    if(str[i] === pattern[j] || j === -1){
      i++
      j++
    }else{
      j = state[j] // 右移
    }
  }
  if(j === pattern.length){
      return {
        result: true,
        index: i - j
      }
  }else{
      return false
  }
}

function generateState (pattern) {
    let i = 0
    let j = -1
    let state = []
    state[0] = -1
    while (i<pattern.length) {
        if(j === -1 || pattern[i] === pattern[j]){
            i++
            j++
            state[i] = j
        }else{
            j = state[j]
        }
    }
    return state
}

console.log(findString('abcabcabx', 'abcabx'))