export default (val) => {
  let str = ''
  if (val > 1000) {
    str = val / 1000
    str = str.toFixed(1) + 'km'
  } else {
    str = val + 'm'
  }
  return str
}
