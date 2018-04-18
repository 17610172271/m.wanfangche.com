<template>
  <div class="text-view" v-html="currentValue">
    {{currentValue}}
  </div>
</template>

<script>
/**
* 属性名, 类型, 默认值, 说明
* html, Blean, false, 是否支持html
* enter, Boolean, true, 是否支持会车符
* type, String, 'plain', 格式, 可选值 plain, html, simple
**/

// 去除所有HTML标签
const parsePlain = (str, len) => {
  let rel = str ? str.replace(/<[^<>]+?>/g, '') : ''
  return len && rel && rel.length > len ? rel.substring(0, len) + '...' : rel
}

// 转换空格和回车符
const parseSimple = (str, len) => {
  return str ? str.replace(/\r/g, '&nbsp;').replace(/\n/g, '<br />') : ''
}

const parseHTML = (str, len) => {
  return str
}

export default {
  props: {
    enter: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'plain'
    },
    length: {
      type: Number
    },
    value: null
  },
  computed: {
    currentValue () {
      switch (this.type) {
        case 'plain':
          return parsePlain(this.value, this.length)
        case 'html':
          return parseHTML(this.value, this.length)
        case 'simple':
          return parseSimple(this.value, this.length)
        default:
          return parsePlain(this.value, this.length)
      }
    }
  }
}
</script>

<style>
.text-view {
  word-break: break-all;
  display: inline;
}
</style>
