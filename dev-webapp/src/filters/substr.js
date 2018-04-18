module.exports = function (str, len) {
  return str && len && str.length > len ? str.substring(0, len) + '...' : str
}
