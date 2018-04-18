/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Check if string can be parsed by JSON.stringify
 * @return true | false
**/
export function isJson (str) {
  if (str && str !== null && typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  } else {
    return false
  }
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual (a, b) {
  // eslint-disable-next-line eqeqeq
  return a == b || (
    isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false
  )
}

/**
 * Check if a val exists in arr using looseEqual comparison
 */
export function looseIndexOf (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i
    }
  }

  return -1
}

/**
 * Check if the given string starts with the query, beginning
 * at the given position
 */
export function startsWith (string, query, position = 0) {
  return string.substr(position, query.length) === query
}

// 读取连接地址里的某个参数
export function getQuery (link, name) {
  if (link) {
    var reg = new RegExp('(^|)' + name + '=([^&]*)(&|$)')
    var r = link.match(reg)
    if (r !== null) return unescape(r[2])
    else return null
  }
}
