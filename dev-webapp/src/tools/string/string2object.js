export default str => {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str)
    } catch (e) {
      return {}
    }
  }
}
