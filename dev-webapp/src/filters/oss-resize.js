import { ossimage } from '@/config'
const style = ossimage

export default (url, size) => {
  return style[size] ? url + style[size] : url + style.large
}
