// Mealy 型状态机

// 每个函数就是一个状态机
// function state (input) { // 函数参数就是输入
//   //...code
//   return next // 返回值为下一个状态机
// }

// // 以下是调用

// while (input) {
//   state = state(input) // 把状态机的返回值作为下一个状态
// }

// 问题 在一个字符串中，找到字符'a'

function finda (input) {
  for (let i of input) {
    if (i === 'a') {
      return true
    }
  }
  return false
}

findA('wertyuiasdf')

// 问题 在一个字符串中找到'ab'

function findAB (input) {
   for (let i = 0;i < input.length; i++) {
    if (input[i] === 'a' && input[i + 1]) {
      if (input[i + 1] === 'b') {
        return true
      }
    }
  }
  return false
}

findAB('asdasjhsafdkjab')

// 问题 在一个字符串中找到'abcdef'
// 非状态机版本
function findMoreNoState (input) {
  for (let i = 0;i < input.length; i++) {
    if (input[i] === 'a' && input[i + 1]) {
      if (input[i + 1] === 'b' && input[i + 2]) {
        if (input[i + 2] === 'c' && input[i + 3]) {
          if (input[i + 3] === 'd' && input[i + 4]) {
            if (input[i + 4] === 'e' && input[i + 5]) {
              if (input[i + 5] === 'f') {
                return true
              }
            }
          }
        }
      }
    }
  }
  return false
}

findMoreNoState('asdasdfhabcdef;lakdf;lkas')

// 状态机版本
function findMore (input) {
  let state = findA
  for (let i of input) {
    state = state(i)
  }
  return state === end
}

function findA (i) {
  if (i === 'a') {
    return findB
  } else {
    return findA(i) // reComsume
  }
}
function findB (i) {
  if (i === 'b') {
    return findC
  } else {
    return findA(i) // reComsume
  }
}
function findC (i) {
  if (i === 'c') {
    return findD
  } else {
    return findA(i) // reComsume
  }
}
function findD (i) {
  if (i === 'd') {
    return findE
  } else {
    return findA(i) // reComsume
  }
}
function findE (i) {
  if (i === 'e') {
    return findF
  } else {
    return findA(i) // reComsume
  }
}
function findF (i) {
  if (i === 'f') {
    return end
  } else {
    return findA(i) // reComsume
  }
}
function end () { // trap 
  return end
}
findMore('asdasdfhabcdef;lakdf;lkas')





// 问题 用状态机实现找到'abcabx'

function findMoreX (input) {
  let state = findA
  for (let i of input) {
    state = state(i)
  }
  return state === end
}
function findA (i) {
  if (i === 'a') {
    return findB
  } else {
    return findA(i) // reComsume
  }
}
function findB (i) {
  if (i === 'b') {
    return findC
  } else {
    return findA(i) // reComsume
  }
}
function findC (i) {
  if (i === 'c') {
    return findA2
  } else {
    return findA(i) // reComsume
  }
}
function findA2 (i) {
  if (i === 'a') {
    return findB2
  } else {
    return findA(i)
  }
}
function findB2 (i) {
  if (i === 'b') {
    return findX
  } else {
    return findA(i)
  }
}
function findX (i) {
  if (i === 'x') {
    return end
  } else {
    return findC(i)
  }
}

findMoreX('abcabcabx')


// 找'abababx'
//   'ababababx'
function findMoreStrX (input) {
  let state = findA
  for (let i of input) {
    state = state(i)
  }
  return state === end
}
function end () { // trap 
  return end
}
function findA (i) {
  if (i === 'a') {
    return findB
  } else {
    return findA
  }
}
function findB (i) {
  if (i === 'b') {
    return findA2
  } else {
    return findA(i)
  }
}
function findA2 (i) {
  if (i === 'a') {
    return findB2
  } else {
    return findA(i)
  }
}
function findB2 (i) {
  if (i === 'b') {
    return findA3
  } else {
    return findA(i)
  }
}
function findA3 (i) {
  if (i === 'a') {
    return findB3
  } else {
    return findA(i)
  }
}
function findB3 (i) {
  if (i === 'b') {
    return findX
  } else {
    return findA(i)
  }
}
function findX (i) {
  if (i === 'x') {
    return end
  } else {
    return findA3(i)
  }
}

// 问题 用状态机处理完全未知的 pattern





















