<template>
  <div class="video-view">
    <div v-if="iframeLink">
      <iframe frameborder="0" width="100%" :height="height" :src="iframeLink" allowfullscreen></iframe>
    </div>
    <div v-if="mp4Link">
      <video-player :src="mp4Link" :width="width" :height="height" :poster="poster"></video-player>
    </div>
  </div>
</template>
<script>
import videoPlayer from './video-player'

// 匹配连接地址xx`
const formatLink = (str) => {
  if (str) {
    let rel = str.match(/((http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w\u4e00-\u9fa5\-./?@%!&=+~:#;,]*)?)/i)
    return rel ? unescape(rel[0]) : null
  }
}

// 读取连接地址里的某个参数
const getQuery = (link, name) => {
  if (link) {
    var reg = new RegExp('(^|)' + name + '=([^&]*)(&|$)')
    var r = link.match(reg)
    if (r !== null) return unescape(r[2])
    else return null
  }
}

// 获取腾讯视频播放器
const parseQQLink = link => {
  if (link) {
    let vid = getQuery(link, 'vid')
    if (!vid) {
      let rel = link.match(/(\/)([0-9a-zA-Z]*)(\.html)/)
      vid = rel ? unescape(rel[2]) : null
    } else {}
    return vid ? 'https://v.qq.com/iframe/player.html?vid=' + vid + '&auto=0' : null
  }
}

// 爱奇艺播放器
const parseIqiyi = link => {
  return null
}

// 优酷
const parseYouku = link => {
  if (link) {
    if (link.indexOf('/embed/') !== -1) {
      return link
    } else {
      let rel = link.match(/(\/id_)([0-9a-zA-Z=]*)(\.html)/i)
      return rel ? ('https://player.youku.com/embed/' + unescape(rel[2])) : null
    }
  } else {
    return null
  }
}

// 土豆

// 自己的播放器

// 是否使用系统播放器
const getIframeLink = link => {
  if (link) {
    if (link.indexOf('v.qq.com') !== -1) {
      return parseQQLink(link)
    } else if (link.indexOf('iqiyi.com') !== -1) {
      return parseIqiyi(link)
    } else if (link.indexOf('youku.com') !== -1) {
      return parseYouku(link)
    } else {
      return null
    }
  }
}

export default {
  components: {
    videoPlayer
  },
  props: {
    src: {
      type: String
    },
    allowfullscreen: {
      type: Boolean,
      default: true
    },
    // 按宽度缩放， 如50%，则设置 50
    zoom: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    iframeLink: null,
    mp4Link: null,
    height: 212,
    width: 375,
    poster: null
  }),
  methods: {
    // 初始化数据
    init () {
      this.initHeight()
      this.initPoster()
      this.initSrc()
    },

    // 设置宽高
    initHeight () {
      let ratio = getQuery(this.src, 'wfc_ratio')
      if (ratio) {
        let newRatio = ratio.split(':')
        if (this.zoom && (parseInt(newRatio[0]) < parseInt(newRatio[1]))) {
          this.width = this.$el.clientWidth * this.zoom / 100 // 没有定义autoWidth, 且为竖屏视频 则按当前元素的2/3显示
        } else {
          this.width = this.$el.clientWidth
        }
        this.height = Math.ceil(this.width * parseInt(newRatio[1]) / parseInt(newRatio[0]))
      } else {
        this.width = this.$el.clientWidth
        this.height = Math.ceil(this.width * 9 / 16)
      }
    },

    // 设置封面
    initPoster () {
      let poster = getQuery(this.src, 'wfc_poster')
      if (poster) this.poster = poster
    },

    // 过滤视频地址
    initSrc () {
      this.mp4Link = null
      this.iframeLink = null
      let link = formatLink(this.src)
      if (link) {
        // 判断是否为mp4格式
        if (link.indexOf('.mp4') !== -1 || link.indexOf('.webm') !== -1 || link.indexOf('.mov') !== -1) {
          this.mp4Link = link
        } else {
          this.iframeLink = getIframeLink(link)
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
  .video-view {
    position: relative;
    padding: 0 0;
    margin: 0 0;
    line-height: .1;
  }
</style>
