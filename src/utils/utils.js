const moneyFormat = (money = 0, splitPosition = 3) => {
  let tempIndex = 0
  const textList = `${money}`.split('')
  let result = ''
  for (let i = textList.length - 1; i >= 0; i--) {
    const value = textList[i]
    if (tempIndex === 0) {
      result = value
    } else if (tempIndex % splitPosition === 0) {
      result = `${value},${result}`
    } else {
      result = `${value}${result}`
    }
    tempIndex += 1
  }
  return result
}
const useDebounce = (func, wait) => {
  let time
  return function (...args) {
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
export { moneyFormat, useDebounce }
