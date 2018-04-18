// 移动设备
export function isSmartDevice () {
  // Adapted from http://www.detectmobilebrowsers.com
  var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera']
  // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
  return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)
}

// 微信
export function isWechat () {
  var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera']
  return (/MicroMessenger/).test(ua)
}

// IOS
export function isIOS () {
  var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera']
  return (/iPhone|iPod|iPad/).test(ua)
}

export default {
  isSmartDevice,
  isWechat,
  isIOS
}
