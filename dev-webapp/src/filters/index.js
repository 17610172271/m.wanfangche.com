export const parseLocation = item => {
  return 'http://map.wanfangche.com/?lng=' + item.lon + '&lat=' + item.lat + '&name=' + item.postion
}

export const ossImageResize = (url, h, w) => {
  let height = h ? ',h_' + h : ''
  let width = w ? ',w_' + w : ''
  return url ? url + '?x-oss-process=image/resize,m_fill' + height + width : url
}

export const avatarResize = url => {
  return url ? url + '?x-oss-process=style/avatar' : '/static/avatar_default_menu@3x.png'
}

export const parseTag = str => {
  var path = '/topic/'
  return str.replace(/#([^#|.]+)#/g, function (word) {
    return '<a href="' + path + 'k/' + word.replace(/#/g, '') + '">' + word + '</a>'
  })
}

function GetQueryString (str, name) {
  var reg = new RegExp('(^|)' + name + '=([^&]*)(&|$)')
  var r = str.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  else return null
}

function getLink (str) {
  if (str) {
    let regexp = /((http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w\u4e00-\u9fa5\-./?@%!&=+~:#;,]*)?)/ig

    return str.match(regexp)
  } else {
    return false
  }
}

function getId (str) {
  let qqVideoM = '//m.v.qq.com/'
  let qqVideo = '//v.qq.com/'
  if (str.indexOf(qqVideo) !== -1) {
    let rel = str.substr(0, str.lastIndexOf('.html'))
    return rel.substr(rel.lastIndexOf('/') + 1, rel.length)
  } else if (str.indexOf(qqVideoM) !== -1) {
    if (str.indexOf('/x/page') !== -1) {
      let rel = str.substr(0, str.lastIndexOf('.'))
      return rel.substr(rel.lastIndexOf('/') + 1, rel.length)
    } else {
      let id = GetQueryString(str, 'vid')
      return id
    }
  } else {
    return null
  }
}

export const parseVideo = str => {
  let links = getLink(str)
  if (links && links[0]) return 'https://v.qq.com/iframe/player.html?vid=' + getId(links[0]) + '&tiny=0&auto=0'
  else return null
  // let newLinks = []
  // if (links && links.length > 0) {
  //   for (var i = 0, link; link = links[i++];) { // eslint-disable-line
  //     let nLink = getId(link)
  //     if (nLink) newLinks.push('https://v.qq.com/iframe/player.html?vid=' + nLink + '&tiny=0&auto=0')
  //   }
  //   return newLinks
  // } else {
  //   return false
  // }
  // let id = getId(str)
  // return id
  // return id ? 'https://v.qq.com/iframe/player.html?vid=' + getId(str) + '&tiny=0&auto=0' : null
}
// 移除所有HTML标签
export const removeHtmlTab = str => {
  return str ? str.replace(/<[^<>]+?>/g, '') : null
}

export const substr = (str, len) => {
  return str && len && str.length > len ? str.substring(0, len) + '...' : str
}

export default {
  parseLocation,
  parseVideo,
  ossImageResize,
  avatarResize,
  parseTag,
  substr
}
