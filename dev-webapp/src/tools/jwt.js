/**
* JWT
* by @Jianbo 2017
*
**/

export const payload = token => {
  if (valid(token)) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace('-', '+').replace('_', '/')
    let pl = JSON.parse(window.atob(base64))
    let now = new Date().getTime()
    return pl.exp !== undefined && parseInt(pl.exp) > now / 1000 ? pl : false
  } else {
    return false
  }
}

export const valid = token => {
  return token !== undefined && token !== null && (token.split('.').length === 3)
}

export default {
  payload,
  valid
}
